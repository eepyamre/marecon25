import { writeFileSync } from 'node:fs';
import { google } from 'googleapis';
import cron from 'node-cron';

let schedule = [[], [], []];

const writeJSON = () => {
  writeFileSync('./public/schedule.json', JSON.stringify(schedule));
  writeFileSync('./dist/schedule.json', JSON.stringify(schedule));
};

const constructDate = (date, timeStr) => {
  const [time, modifier, gmtPart] = timeStr.split(' '); // ["11:30", "PM", "GMT-0500"]
  let [hours, minutes] = time.split(':').map(Number);

  // Convert to 24-hour format
  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  // Format hours and minutes as two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Extract the timezone offset (e.g., "-0500") and insert a colon to get "-05:00"
  const tzOffset = gmtPart.replace('GMT', ''); // "-0500"
  const formattedTz = `${tzOffset.slice(0, 3)}:${tzOffset.slice(3)}`;
  // Construct the ISO 8601 string
  return new Date(
    `${date}T${formattedHours}:${formattedMinutes}:00${formattedTz}`
  );
};

const getSchedule = async () => {
  schedule = [[], [], []];
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1h3V6BLYj6jlm75CjFO3zY1InVLd2-IfbFf-AnKDPlIM';
  const sheet = await googleSheets.spreadsheets.get({
    spreadsheetId: spreadsheetId,
    includeGridData: true,
  });
  const cells = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Sheet1!A6:D228',
  });
  const rawCells = sheet.data.sheets[0].data[0].rowData;

  const channels = [
    'https://cytu.be/r/marecon',
    'https://cytu.be/r/marecon2-comfys-cottage',
  ];
  const merges = sheet.data.sheets[0].merges;
  const rows = cells.data.values;

  let day = 0;
  let date = '2025-02-28';
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowIdx = i + 5;
    if (rowIdx === 54) {
      date = '2025-03-01';
    }
    if (rowIdx === 71) {
      day++;
      continue;
    }
    if (rowIdx === 134) {
      date = '2025-03-02';
    }
    if (rowIdx === 153) {
      day++;
      continue;
    }
    if (row.length > 1) {
      for (let j = 2; j < row.length; j++) {
        if (!row[j].trim()) continue;
        const obj = {
          title: row[j],
          date,
          from: row[0] + ' GMT-0500',
          unixtime: constructDate(date, row[0] + ' GMT-0500').getTime(),
          duration: 15,
          description: '',
          ch: [channels[j - 2]],
        };
        obj.description = rawCells[rowIdx].values[j].note || '';
        const merged = merges.find(
          (item) => item.startRowIndex === rowIdx && item.startColumnIndex === j
        );
        if (merged) {
          obj.duration = 15 * (merged.endRowIndex - merged.startRowIndex);
          for (
            let n = 1;
            n < merged.endColumnIndex - merged.startColumnIndex;
            n++
          ) {
            obj.ch.push(channels[n]);
          }
        }
        schedule[day].push(obj);
      }
    }
  }
  writeJSON();
};
getSchedule();

cron.schedule('0 * * * *', () => {
  getSchedule();
});
