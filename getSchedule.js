import { writeFileSync } from 'node:fs';
import { google } from 'googleapis';
import cron from 'node-cron';

const schedule = [[], [], []];

const writeJSON = () => {
  writeFileSync('./public/schedule.json', JSON.stringify(schedule));
};

const getSchedule = async () => {
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
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowIdx = i + 5;
    if (rowIdx === 71) {
      day++;
      continue;
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
          from: row[0] + ' GMT-0500',
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

cron.schedule('0 * * * *', () => {
  getSchedule();
});
