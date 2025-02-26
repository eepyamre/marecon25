import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { Tooltip } from '@/components/Tooltip';
import { TrackData, useSchedule } from '@/helpers/useSchedue';
import css from './style.module.scss';

export function Schedule() {
  const route = useRoute();
  const { day } = route.params;

  const { events, times } = useSchedule(day);

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
  }, [schedule]);

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
      <div className={css.row}>
        <p class={css.hint}>Time is adjusted according to (you)r time zone!</p>
        <a
          class={`global_btn ${css.apply}`}
          target={'_blank'}
          href={'https://forms.gle/kXxHwiyC1iBdmTFT8'}
        >
          Apply for panels!
        </a>
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
