import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { Tooltip } from '@/components/Tooltip';
import css from './style.module.scss';

type TrackData = {
  title: string;
  width: number;
  description: string;
  time: Date;
};

const startDates = [1740771000000, 1740835800000, 1740922200000];

export function Schedule() {
  const route = useRoute();
  const { day } = route.params;
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
  const [times, setTimes] = useState<Date[]>([]);
  const [events, setEvents] = useState<{
    track1: TrackData[];
    track2: TrackData[];
  }>({
    track1: [],
    track2: [],
  });
  const [active, setActive] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    position: [0, 0] as [number, number],
    text: '',
    visible: false,
  });

  useEffect(() => {
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
          const startTime = new Date(`2025-02-28 ${item.from}`);
          const obj: TrackData = {
            title: item.title,
            description: item.description,
            width: item.duration / 15,
            time: startTime,
          };

          track.push(obj);

          if (next) {
            const endTime = new Date(`2025-02-28 ${next.from}`).getTime();
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

      if (track1[0].time < track2[0].time) {
        const diffBlocks =
          (track2[0].time.getTime() - track1[0].time.getTime()) /
          1000 /
          60 /
          15;

        for (let j = 0; j < diffBlocks; j++) {
          track2.unshift(null);
        }
      }

      const obj: typeof events = {
        track1,
        track2,
      };

      const maxTrack = track1.length > track2.length ? track1 : track2;
      const minTrack = track1.length > track2.length ? track2 : track1;

      let startTime = (maxTrack[0] || minTrack[0]).time.getTime();
      let lastTime = startTime + 15 * 60 * 1000;
      let times: Date[] = [new Date(startTime)];
      for (let j = 1; j < (maxTrack[0] || minTrack[0]).width; j++) {
        times.push(new Date(lastTime));
        lastTime += 15 * 60 * 1000;
      }
      for (let i = 1; i < maxTrack.length; i++) {
        const item = maxTrack[i];

        if (item) {
          for (let j = 0; j < item.width; j++) {
            times.push(new Date(lastTime));
            lastTime += 15 * 60 * 1000;
          }
        } else {
          times.push(new Date(lastTime));
          lastTime += 15 * 60 * 1000;
        }
      }
      setTimes(times);
      setEvents(obj);
    };

    fetchData();
  }, [dayIdx]);

  useEffect(() => {
    const fn = (e: TouchEvent) => {
      if (tooltipData.visible) {
        e.preventDefault();
        setTooltipData({
          position: [0, 0],
          visible: false,
          text: '',
        });
      }
    };
    addEventListener('touchend', fn);
    return () => {
      removeEventListener('touchend', fn);
    };
  }, [tooltipData]);

  const mouseMove = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.dataset.trackdescription) {
      setTooltipData({
        position: [e.clientX + 20, e.clientY + 20],
        visible: true,
        text: e.target.dataset.trackdescription,
      });
      return;
    }
    if (tooltipData.visible) {
      setTooltipData({
        position: [0, 0],
        visible: false,
        text: '',
      });
    }
  };

  const mouseOut = () => {
    setTooltipData({
      position: [0, 0],
      visible: false,
      text: '',
    });
  };

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div class={`${css.wrapper} ${active ? css.active : ''}`}>
      <style>
        {`.global_wrapper {
          max-width: 1360px;
        }`}
      </style>
      <div class={css.dates}>
        <a href={'/schedule/friday'} class={css.date}>
          Friday
        </a>
        <a href={'/schedule/saturday'} class={css.date}>
          Saturday
        </a>
        <a href={'/schedule/sunday'} class={css.date}>
          Sunday
        </a>
      </div>
      <div class={css.schedule} onMouseMove={mouseMove} onMouseOut={mouseOut}>
        <div class={css.times}>
          <div class={css.timeTitle} />
          {times.map((time, i) => {
            return (
              <div class={css.time} key={i}>
                {time.toLocaleTimeString(undefined, {
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: '-05:00',
                })}
              </div>
            );
          })}
        </div>
        <div class={css.track}>{Track(events.track1, 1)}</div>
        <div class={css.track}>{Track(events.track2, 2)}</div>
      </div>
      {tooltipData.visible && (
        <Tooltip position={tooltipData.position}>{tooltipData.text}</Tooltip>
      )}
    </div>
  );
}

const Track = (track: TrackData[], idx: number) => {
  return (
    <>
      <div class={css.trackTitle}>Cytube {idx}</div>
      {track.map((item, i) => {
        if (!item) return <div class={css.emptyItem} />;
        return (
          <div
            key={'_1' + item.title + i}
            style={{
              '--widthColumns': item.width,
            }}
            data-trackdescription={item.description}
            class={css.trackItem}
          >
            {item.title}
          </div>
        );
      })}
    </>
  );
};
