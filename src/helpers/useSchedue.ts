import { useEffect, useState } from 'preact/hooks';

export type TrackData = {
  title: string;
  width: number;
  description: string;
  time: Date;
};

const min15 = 15 * 60 * 1000;

const constructDate = (timeStr: string) => {
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
    `2025-02-28T${formattedHours}:${formattedMinutes}:00${formattedTz}`
  );
};

export const useSchedule = (day: string) => {
  const [times, setTimes] = useState<Date[]>([]);
  const [events, setEvents] = useState<{
    track1: TrackData[];
    track2: TrackData[];
  }>({
    track1: [],
    track2: [],
  });

  const dayIdx = (() => {
    switch (day) {
      case 'friday':
        return 0;
      case 'saturday':
        return 1;
      case 'sunday':
        return 2;
      default:
        return 0;
    }
  })();

  const fetchData = async () => {
    const response = await fetch('/schedule.json');
    const result = (await response.json()) as {
      title: string;
      from: string;
      duration: number;
      description: string;
      ch: string[];
    }[][];
    let track1: TrackData[] = [];
    let track2: TrackData[] = [];

    const parseTracks = (data: (typeof result)[0]) => {
      const track: TrackData[] = [];

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const next = data[i + 1];

        const startTime = constructDate(item.from);
        const obj: TrackData = {
          title: item.title,
          description: item.description,
          width: item.duration / 15,
          time: startTime,
        };

        track.push(obj);

        if (next) {
          const endTime = constructDate(next.from).getTime();
          const diffBlocks =
            (endTime - startTime.getTime()) / 1000 / 60 / 15 - obj.width;

          for (let j = 0; j < diffBlocks; j++) {
            track.push(null);
          }
        }
      }

      return track;
    };

    const r1 = result[dayIdx].filter((item) =>
      item.ch.includes('https://cytu.be/r/marecon')
    );
    const r2 = result[dayIdx].filter((item) =>
      item.ch.includes('https://cytu.be/r/marecon2-comfys-cottage')
    );

    track1 = parseTracks(r1);
    track2 = parseTracks(r2);

    const obj: typeof events = {
      track1,
      track2,
    };

    const t0Time = track1[0]?.time.getTime();
    const t1Time = track2[0]?.time.getTime();
    let startTime = t0Time < t1Time ? t0Time : t1Time;
    let lastTime = startTime + min15;
    let times: Date[] = [new Date(startTime)];

    for (let i = track1.length - 1; i >= 0; i--) {
      const item = track1[i];
      const skipped = track1.length - 1 - i;
      if (item) {
        lastTime = item.time.getTime() + item.width * min15 + skipped * min15;
        break;
      }
    }

    for (let i = track2.length - 1; i >= 0; i--) {
      const item = track2[i];
      if (item) {
        const time = item.time.getTime();

        const skipped = track2.length - 1 - i;
        if (time >= lastTime) {
          lastTime = item.time.getTime() + item.width * min15 + skipped * min15;
        }
        break;
      }
    }

    for (let i = startTime + min15; i < lastTime; i += min15) {
      times.push(new Date(i));
    }
    const arr1 = [];
    const arr2 = [];

    if (t0Time < t1Time) {
      let l = Math.round((t1Time - t0Time) / min15);
      while (l--) {
        track2.unshift(null);
      }
    }
    if (t1Time < t0Time) {
      let l = Math.round((t0Time - t1Time) / min15);
      while (l--) {
        track1.unshift(null);
      }
    }

    track1.unshift(...arr1);
    track2.unshift(...arr2);
    setTimes(times);
    setEvents(obj);
  };

  useEffect(() => {
    fetchData();
  }, [dayIdx]);

  return { times, events };
};
