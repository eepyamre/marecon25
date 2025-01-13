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

const randomIntFromInterval = (min = 0, max = 1) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const nawniList = [
  'She can spot a zebra from a mile away.',
  'She’s been banned from Griffonstone on 8 separate occasions.',
  'She’s the true identity of the mysterious Mare Do Well.',
  'She once ate Celestia under the table at a cake eating contest.',
  'She is the hacker known as 4chan.',
  'She singlehoofedly caused the Scruffening.',
  'She was dashieleaks this whole time',
  'Her teats are even bigger than Milky Way’s.',
  'She’s even more unhinged than Flutterschizo.',
  'She made Discord cry.',
  'She cucked Glimmer.',
  'She killed Applejack’s parents.',
  'She’s actually zippers with a toupee',
  'She regularly spams the Marecon chat with porn on her sockpuppets. We asked her to stop but she just replied with our doxes.',
  'She’s Parumpi’s top guy.',
  'Her favorite word is █igger.',
];

const getTraits = () => {
  const i = randomIntFromInterval(0, nawniList.length - 1);
  let j = randomIntFromInterval(0, nawniList.length - 1);
  while (i === j) {
    j = randomIntFromInterval(0, nawniList.length - 1);
  }
  return `${nawniList[i]}
${nawniList[j]}`;
};

const mares = {
  [Mares.COMFY]: {
    name: 'Comfy Cuddles',
    description: `She’s the comfiest pony around, it’s in her name! Comfy Cuddles is the earth pony in charge of keeping things at marecon comfy. Whether it’s brewing up some hot cocoa, tending to the fire, or handing out blankets, Comfy just wants to see you… well, comfy! She’s not one to talk much, except for the occasional nod or gesture towards the hot cocoa! She’s a very bright pony, but she’s also very reserved, only speaking up when needed to keep things on track or keep the other two mascots in line.

She would never take another life. Maybe if they were being annoying or something, just to keep things comfy. Like, you know when you're on a 9 hour flight and there’s a baby crying the whole time? And you're just trying to relax, eat the crappy airplane food and watch and watch the newest Hollywood slop, but this baby just keeps screaming and crying and whining and crying. Then you hit some turbulence and you accidentally knock your drink over onto the meathead wearing the Eagles jersey, and he starts screaming in your ear about some shit. You try to apologize but he’s getting all up in your face, so you decide to go use the bathroom and get away from him, but then you trip on some jackass’s headphone cable and eat shit in the middle of the gangway, and then everyone starts laughing at you, even the baby. Yeah, she’d probably kill the baby or something.
`,
    img: comfy,
  },
  [Mares.NAWNI]: {
    name: 'Nawni',
    description: `This pony loves to ████! ████████ ████████ is a mysterious pegasus that likes to stay anonymous. She doesn’t like it when we use her real name, so we just call her “Nawni” (get it? Like anonymous!) Her cutie mark is a █████ with █████ - very cool! When we asked her what her special talent was, she said “doing ur mom, lul”. She can be a bit crude and kind of a wildcard at times, but we love her all the same!

Some say that:
${getTraits()}`,
    img: nawni,
  },
  [Mares.SMILEY]: {
    name: 'Smiley Face',
    description: `She looks like a sugar cookie and she’s just as sweet! Smiley Face is a mare that embodies the best part of every mare… their smiley faces! We like to call her “Ms. Everymare” because of it. Smiley is very creative and goofy, she loves to have fun with her friends! She may not be the brightest spoon in the shed, but she has a huge heart! Talking to her is an absolute joy, she’s a little ray of sunshine that’s always looking to brighten your day!

She’s also got the best butt of the three. I mean, holy crap man, have you seen that absolute dumper? 

Maybe you could be her Mr. Everymare?

Smiley has been nationally recognized as “The mare-iest mare that ever mared mare” 3 times in the last 2 years
3 time reigning champion of the mare smackdown
Grand champion of the “Smile Off” against every single other pony con mascot ever
`,
    img: smiley,
  },
};

export function MeetThePonies() {
  const ref = useRef<HTMLCanvasElement>();
  const bgRef = useRef<HTMLCanvasElement>();
  const content = useRef<HTMLDivElement>();
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
  let maresComfy = null;
  let maresSmiley = null;
  let maresNawni = null;
  let bgImg = null;

  if (typeof window !== 'undefined') {
    maresComfy = new Image(3000, 2000);
    maresSmiley = new Image(3000, 2000);
    maresNawni = new Image(3000, 2000);
    bgImg = new Image(1280, 720);
    maresComfy.src = maresComfyImg;
    maresSmiley.src = maresSmileyImg;
    maresNawni.src = maresNawniImg;
    bgImg.src = bg;
  }
  const maresRatio = 0.666;

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
    content.current &&
      content.current.scrollTo({ top: 0, behavior: 'instant' });
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
        <div ref={content} class={`${css.content} ${show ? css.active : ''}`}>
          <p>{mares[mare].description}</p>
          <button onClick={onBack} class={css.btn}>
            Select another pony
          </button>
        </div>
      </div>
    </div>
  );
}
