import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { Tooltip } from '@/components/Tooltip';
import css from './style.module.scss';

type TrackData = {
  title: string;
  width: number;
  description: string;
  time: Date;
};

const min15 = 15 * 60 * 1000;
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
  const schedule = useRef<HTMLDivElement>();

  useEffect(() => {
    schedule.current &&
      schedule.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
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
            lastTime =
              item.time.getTime() + item.width * min15 + skipped * min15;
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

    fetchData();
  }, [dayIdx, schedule]);

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
      <div
        class={css.schedule}
        ref={schedule}
        onMouseMove={mouseMove}
        onMouseOut={mouseOut}
      >
        <div class={css.times}>
          <div class={css.timeTitle} />
          {times.map((time, i) => {
            return (
              <div class={css.time} key={i}>
                {time.toLocaleTimeString(undefined, {
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                  // timeZone: '-05:00',
                })}
              </div>
            );
          })}
        </div>
        <div class={css.track}>{Track(events.track1, 1)}</div>
        <div class={css.track}>{Track(events.track2, 2)}</div>
      </div>
      <a
        class={'global_btn'}
        target={'_blank'}
        href={'https://forms.gle/kXxHwiyC1iBdmTFT8'}
      >
        Apply for panels!
      </a>
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
