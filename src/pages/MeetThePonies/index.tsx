import { useEffect, useRef, useState } from 'preact/hooks';
import mares from '@/assets/images/mares.png';
import bg from '@/assets/images/bg.png';
import css from './style.module.scss';

const mareColors = {
  everymare: new Set([
    '#ea4cb8',
    '#eabea7',
    '#e8a962',
    '#b13e37',
    '#ffffff',
    '#ff0b1',
  ]),
  comfy: new Set([
    '#81d88c',
    '#e9e3c1',
    '#ff8f4a',
    '#daffdf',
    '#c3246a',
    '#85244c',
  ]),
  nawni: new Set(['#ed241c', '#7f7f7f', '#346ad5', '#282777']),
};

export function MeetThePonies() {
  const ref = useRef<HTMLCanvasElement>();
  const bgRef = useRef<HTMLCanvasElement>();
  const [hover, setHover] = useState(false);
  const maresImg = new Image(3000, 2000);
  const bgImg = new Image(1280, 720);
  const maresRatio = 0.666;
  maresImg.src = mares;
  bgImg.src = bg;

  const drawFrame = () => {
    if (!ref.current) return;
    const parentRect = ref.current.parentElement!.getBoundingClientRect();
    ref.current.width = Math.min(parentRect.width, 980);
    ref.current.height = Math.min(parentRect.height, 578);
    const ctx = ref.current.getContext('2d');
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, w, h);

    const maresHeight = w * maresRatio;
    const y = h - maresHeight;
    ctx.drawImage(maresImg, 0, y, w, maresHeight);
  };

  const drawBg = () => {
    if (!bgRef.current) return;
    const parentRect = bgRef.current.parentElement!.getBoundingClientRect();
    bgRef.current.width = Math.min(parentRect.width, 980);
    bgRef.current.height = Math.min(parentRect.height, 578);
    const ctx = bgRef.current.getContext('2d');
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, w, h);

    const x = (w - 770) / 3;
    ctx.drawImage(bgImg, x, 0, 770, 578);
  };

  const hoverCheck = (e: MouseEvent) => {
    const ctx = ref.current.getContext('2d');
    const data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    if (data[3] === 0) return;
    const hex = `#${data[0].toString(16)}${data[2].toString(
      16
    )}${data[1].toString(16)}`;

    if (mareColors.comfy.has(hex)) {
      console.log('comfy');
      return;
    }
    if (mareColors.nawni.has(hex)) {
      console.log('nawni');
      return;
    }
    if (mareColors.everymare.has(hex)) {
      console.log('everymare');
      return;
    }
  };

  useEffect(() => {
    drawFrame();

    maresImg.addEventListener('load', drawFrame);
    ref.current.addEventListener('mousemove', hoverCheck);
    bgImg.addEventListener('load', drawBg);
    addEventListener('resize', drawFrame);
    addEventListener('resize', drawBg);

    return () => {
      ref.current.removeEventListener('mousemove', hoverCheck);
      removeEventListener('resize', drawFrame);
      removeEventListener('resize', drawBg);
    };
  }, [ref, bgRef]);

  return (
    <div class={css.wrapper}>
      <canvas
        ref={bgRef}
        class={`${css.canvas} ${css.canvasBg} ${hover ? css.active : ''}`}
        width={770}
        height={578}
      ></canvas>
      <canvas ref={ref} class={css.canvas} width={770} height={578}></canvas>
    </div>
  );
}
