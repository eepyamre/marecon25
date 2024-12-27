import { useEffect, useRef, useState } from 'preact/hooks';
import maresComfyImg from '@/assets/images/mares_comfy.png';
import maresSmileyImg from '@/assets/images/mares_smiley.png';
import maresNawniImg from '@/assets/images/mares_nawni.png';
import bg from '@/assets/images/bg.png';
import smiley from '@/assets/images/smiley.gif';
import nawni from '@/assets/images/nawni.png';
import comfy from '@/assets/images/comfy.png';
import swoosh from '@/assets/images/swoosh2.png';
import css from './style.module.scss';

enum Mares {
  COMFY,
  NAWNI,
  SMILEY,
}

const mares = {
  [Mares.COMFY]: {
    name: 'Comfy Cuddles',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quasi sunt deserunt odio animi iure quibusdam aperiam, nobis voluptatum dolore illum, aliquam minus aspernatur, quo minima velit obcaecati error sit! ',
    img: comfy,
  },
  [Mares.NAWNI]: {
    name: 'Nawni',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quasi sunt deserunt odio animi iure quibusdam aperiam, nobis voluptatum dolore illum, aliquam minus aspernatur, quo minima velit obcaecati error sit!',
    img: nawni,
  },
  [Mares.SMILEY]: {
    name: 'Smiley Face',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quasi sunt deserunt odio animi iure quibusdam aperiam, nobis voluptatum dolore illum, aliquam minus aspernatur, quo minima velit obcaecati error sit!',
    img: smiley,
  },
};

export function MeetThePonies() {
  const ref = useRef<HTMLCanvasElement>();
  const bgRef = useRef<HTMLCanvasElement>();
  const offscreenCanvases = useRef<HTMLCanvasElement[]>([]);
  const [hover, setHover] = useState<{
    right: number;
    mare: Mares;
    show: boolean;
  }>({
    right: 0,
    mare: Mares.COMFY,
    show: false,
  });
  const [mare, setMare] = useState<Mares>(Mares.COMFY);
  const [show, setShow] = useState(false);
  const maresComfy = new Image(3000, 2000);
  const maresSmiley = new Image(3000, 2000);
  const maresNawni = new Image(3000, 2000);
  const bgImg = new Image(1280, 720);
  const maresRatio = 0.666;
  maresComfy.src = maresComfyImg;
  maresSmiley.src = maresSmileyImg;
  maresNawni.src = maresNawniImg;
  bgImg.src = bg;

  const drawFrame = () => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // mares
    const drawMares = () => {
      const maresHeight = w * maresRatio;
      const y = h - maresHeight;
      ctx.drawImage(maresComfy, 0, y, w, maresHeight);
      ctx.drawImage(maresNawni, 0, y, w, maresHeight);
      ctx.drawImage(maresSmiley, 0, y, w, maresHeight);
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

  const updateOffscren = (canvas: HTMLCanvasElement, src: HTMLImageElement) => {
    const ctx = canvas.getContext('2d');
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const maresHeight = w * maresRatio;
    const y = h - maresHeight;
    ctx.drawImage(src, 0, y, w, maresHeight);
  };

  const hoverCheck = (e: MouseEvent) => {
    let hovered = false;
    for (let i = 0; i < offscreenCanvases.current.length; i++) {
      const ctx = offscreenCanvases.current[i].getContext('2d');
      const data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
      if (data[3] === 0) continue;
      hovered = true;
      setHover({
        right: !i ? 450 : i === 1 ? 100 : 275,
        mare: Mares[Mares[i]],
        show: true,
      });
      drawFrame();
    }

    if (!hovered) {
      setHover({
        ...hover,
        show: false,
      });
    }
  };

  useEffect(() => {
    const parentRect = ref.current.parentElement!.getBoundingClientRect();
    ref.current.width = Math.max(770, parentRect.width);
    ref.current.height = Math.max(578, parentRect.height);

    const canvases = [
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas'),
    ];

    offscreenCanvases.current = canvases;

    offscreenCanvases.current.forEach((item) => {
      item.width = ref.current.width;
      item.height = ref.current.height;
    });

    drawBg();
    drawFrame();

    const fn = () => {
      const parentRect = ref.current.parentElement!.getBoundingClientRect();
      ref.current.width = Math.min(770, parentRect.width);
      ref.current.height = Math.min(578, parentRect.height);
      offscreenCanvases.current.forEach((item) => {
        item.width = ref.current.width;
        item.height = ref.current.height;
      });
      updateOffscren(canvases[0], maresComfy);
      updateOffscren(canvases[1], maresNawni);
      updateOffscren(canvases[2], maresSmiley);
      drawFrame();
    };

    const loaded = {
      comfy: false,
      nawni: false,
      smiley: false,
    };

    maresComfy.addEventListener('load', () => {
      loaded.comfy = true;
      updateOffscren(canvases[0], maresComfy);
      if (!Object.values(loaded).includes(false)) fn();
    });
    maresNawni.addEventListener('load', () => {
      loaded.nawni = true;
      updateOffscren(canvases[1], maresNawni);
      if (!Object.values(loaded).includes(false)) fn();
    });
    maresSmiley.addEventListener('load', () => {
      loaded.smiley = true;
      updateOffscren(canvases[2], maresSmiley);
      if (!Object.values(loaded).includes(false)) fn();
    });
    bgImg.addEventListener('load', drawBg);

    fn();

    addEventListener('resize', fn);
    addEventListener('resize', drawBg);

    return () => {
      removeEventListener('resize', fn);
      removeEventListener('resize', drawBg);
    };
  }, [ref, bgRef]);

  const onBack = () => {
    setShow(false);
  };

  const onClickMare = (e) => {
    if (window.innerWidth < 768) {
      hoverCheck(e);
    }
    setShow(true);
    if (hover) setMare(hover.mare);
  };

  return (
    <div class={css.wrapper}>
      <canvas
        ref={bgRef}
        class={`${css.canvas} ${css.canvasBg} ${hover.show ? css.active : ''}`}
        width={770}
        height={578}
      ></canvas>
      <p class={`${css.clickText} ${hover.show ? css.active : ''}`}>
        Click on the ponies to read about each of their unique personalities!
      </p>

      <div
        style={{
          '--right': `${hover?.right}px`,
        }}
        class={`${css.name} ${hover.show ? css.active : ''}`}
      >
        <p>{mares[hover.mare].name}</p>
      </div>

      <canvas
        ref={ref}
        class={css.canvas}
        width={770}
        height={578}
        onClick={onClickMare}
        onMouseMove={hoverCheck}
        onMouseOut={() => {
          drawFrame();
          setHover({
            ...hover,
            show: false,
          });
        }}
      ></canvas>
      <div class={`${css.ponyWrapper} ${show ? css.active : ''}`}>
        <div class={`${css.titleWrapper} ${show ? css.active : ''}`}>
          <h2 class={css.title}>{mares[mare].name}</h2>
          <img src={swoosh} alt='swoosh' class={css.swoosh} />
        </div>
        <div class={css.hidden} />
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
