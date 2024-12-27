import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { Tooltip } from '@/components/Tooltip';
import { events } from './events';
import css from './style.module.scss';
import { UnderMarestruction } from '@/components/UnderMarestruction';

export function Schedule() {
  const route = useRoute();
  const { day } = route.params;
  const list = events[day || 'friday'];
  const [active, setActive] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    position: [0, 0] as [number, number],
    text: '',
    visible: false,
  });

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
    <div class={css.marestructionWrapper}>
      <UnderMarestruction />
    </div>
    // <div class={`${css.wrapper} ${active ? css.active : ''}`}>
    //   <style>
    //     {`.global_wrapper {
    //       max-width: 1360px;
    //     }`}
    //   </style>
    //   <div class={css.dates}>
    //     <a href={'/schedule/friday'} class={css.date}>
    //       Friday
    //     </a>
    //     <a href={'/schedule/saturday'} class={css.date}>
    //       Saturday
    //     </a>
    //     <a href={'/schedule/sunday'} class={css.date}>
    //       Sunday
    //     </a>
    //   </div>
    //   <div class={css.schedule} onMouseMove={mouseMove} onMouseOut={mouseOut}>
    //     <div class={css.times}>
    //       <div class={css.timeTitle} />
    //       {new Array(48).fill(0).map((_, i) => {
    //         const h = 12 + Math.floor(i / 2) - 1;
    //         const m = i % 2 ? 30 : 0;
    //         const pm = i > 1 && i < 26;
    //         return (
    //           <div class={css.time} key={i}>
    //             {String((h % 12) + 1).padStart(2, '0')}:
    //             {String(m).padStart(2, '0')}
    //             {pm ? ' PM' : ' AM'}
    //           </div>
    //         );
    //       })}
    //     </div>
    //     <div class={css.track}>{Track(list.track1, 1)}</div>
    //     <div class={css.track}>{Track(list.track2, 2)}</div>
    //   </div>
    //   {tooltipData.visible && (
    //     <Tooltip position={tooltipData.position}>{tooltipData.text}</Tooltip>
    //   )}
    // </div>
  );
}

const Track = (
  track: { title: string; width: number; description?: string }[],
  idx: number
) => {
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
