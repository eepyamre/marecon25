import { useEffect, useRef, useState } from 'preact/hooks';
import maresImage from '@/assets/images/mares.png';
import bg from '@/assets/images/bg.png';
import smiley from '@/assets/images/smiley.gif';
import nawni from '@/assets/images/nawni.png';
import comfy from '@/assets/images/comfy.png';
import swoosh from '@/assets/images/swoosh2.png';
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

enum Mares {
  SMILEY,
  NAWNI,
  COMFY,
}

const mares = {
  [Mares.SMILEY]: {
    name: 'Smiley Face',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quasi sunt deserunt odio animi iure quibusdam aperiam, nobis voluptatum dolore illum, aliquam minus aspernatur, quo minima velit obcaecati error sit!',
    img: smiley,
  },
  [Mares.NAWNI]: {
    name: 'Nawni',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quasi sunt deserunt odio animi iure quibusdam aperiam, nobis voluptatum dolore illum, aliquam minus aspernatur, quo minima velit obcaecati error sit!',
    img: nawni,
  },
  [Mares.COMFY]: {
    name: 'Comfy Cuddles',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quasi sunt deserunt odio animi iure quibusdam aperiam, nobis voluptatum dolore illum, aliquam minus aspernatur, quo minima velit obcaecati error sit!',
    img: comfy,
  },
};

export function MeetThePonies() {
  const ref = useRef<HTMLCanvasElement>();
  const bgRef = useRef<HTMLCanvasElement>();
  const [hover, setHover] = useState<{
    right: number;
    mare: Mares;
  } | null>(null);
  const [mare, setMare] = useState<Mares>(Mares.COMFY);
  const [show, setShow] = useState(false);
  const maresImg = new Image(3000, 2000);
  const bgImg = new Image(1280, 720);
  const maresRatio = 0.666;
  maresImg.src = maresImage;
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

    // mares
    const drawMares = () => {
      const maresHeight = w * maresRatio;
      const y = h - maresHeight;
      ctx.drawImage(maresImg, 0, y, w, maresHeight);
    };

    drawMares();
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
      setHover({
        right: 450,
        mare: Mares.COMFY,
      });
      drawFrame();
      return;
    }
    if (mareColors.nawni.has(hex)) {
      setHover({
        right: 100,
        mare: Mares.NAWNI,
      });
      drawFrame();
      return;
    }
    if (mareColors.everymare.has(hex)) {
      setHover({
        right: 275,
        mare: Mares.SMILEY,
      });
      drawFrame();
      return;
    }
  };

  useEffect(() => {
    drawBg();
    drawFrame();

    const fn = () => drawFrame();

    maresImg.addEventListener('load', fn);
    ref.current.addEventListener('mousemove', hoverCheck);
    bgImg.addEventListener('load', drawBg);
    addEventListener('resize', fn);
    addEventListener('resize', drawBg);

    return () => {
      ref.current.removeEventListener('mousemove', hoverCheck);
      removeEventListener('resize', fn);
      removeEventListener('resize', drawBg);
    };
  }, [ref, bgRef]);

  const onBack = () => {
    setShow(false);
  };

  const onClickMare = () => {
    setShow(true);
    setMare(hover.mare);
  };

  return (
    <div class={css.wrapper}>
      <canvas
        ref={bgRef}
        class={`${css.canvas} ${css.canvasBg} ${hover ? css.active : ''}`}
        width={770}
        height={578}
      ></canvas>
      <p class={`${css.clickText} ${hover ? css.active : ''}`}>
        Click on the ponies to read about each of their unique personalities!
      </p>
      {hover && (
        <div
          style={{
            '--right': `${hover.right}px`,
          }}
          class={`${css.name} ${hover ? css.active : ''}`}
        >
          <p>{mares[hover.mare].name}</p>
        </div>
      )}
      <canvas
        ref={ref}
        class={css.canvas}
        width={770}
        height={578}
        onClick={onClickMare}
        onMouseOut={() => {
          drawFrame();
          setHover(null);
        }}
      ></canvas>
      <div class={`${css.ponyWrapper} ${show ? css.active : ''}`}>
        <div class={`${css.titleWrapper} ${show ? css.active : ''}`}>
          <h2 class={css.title}>{mares[mare].name}</h2>
          <img src={swoosh} alt='swoosh' class={css.swoosh} />
        </div>
        <img
          class={`${css.image} ${show ? css.active : ''}`}
          src={mares[mare].img}
          alt={mares[mare].name}
        />
        <div class={`${css.content} ${show ? css.active : ''}`}>
          <p>{mares[mare].description}</p>
          <button onClick={onBack} class={css.btn}>
            Select another pony
          </button>
        </div>
      </div>
    </div>
  );
}
