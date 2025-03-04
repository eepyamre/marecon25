import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { formatTimeUntil } from '@/utils';
import css from './style.module.scss';
import { useSchedule } from '@/helpers/useSchedue';
import { getPreview } from '@/helpers/getPreview';

const date = 1740771000;

export function Home() {
  const day = (() => {
    const d1 = 1740841200000;
    const d2 = 1740927600000;

    if (Date.now() > d2) {
      return 'sunday';
    }
    if (Date.now() > d1) {
      return 'saturday';
    }
    return 'friday';
  })();
  const { events } = useSchedule(day);
  const video = useRef<HTMLAnchorElement>();
  const ch1 = useMemo(() => {
    const now = Date.now();
    const activeItem = events.track1.find((item) => {
      if (!item) return false;
      const endTime = new Date(
        item.time.getTime() + item.width * 15 * 60 * 1000
      );
      return item.time.getTime() <= now && now < endTime.getTime();
    });
    return activeItem;
  }, [events]);

  const ch2 = useMemo(() => {
    const now = Date.now();

    const activeItem = events.track2.find((item) => {
      if (!item) return false;
      const endTime = new Date(
        item.time.getTime() + item.width * 15 * 60 * 1000
      );
      return item.time.getTime() <= now && now < endTime.getTime();
    });
    return activeItem;
  }, [events]);

  const updateBg = async () => {
    const data = await getPreview();
    if (!data) return;
    if (data.type === 'yt') {
      const urls = [
        `https://img.youtube.com/vi/${data.id}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${data.id}/0.jpg`,
        `https://img.youtube.com/vi/${data.id}/1.jpg`,
        `https://img.youtube.com/vi/${data.id}/2.jpg`,
        `https://img.youtube.com/vi/${data.id}/3.jpg`,
        '/eeee.png',
      ];
      const setBackgroundYT = (urlIndex: number) => {
        if (urlIndex > 4) return;
        let img = new Image();
        img.src = urls[urlIndex];

        img.onload = function () {
          if (img.naturalWidth === 120 && img.naturalHeight === 90) {
            setBackgroundYT(urlIndex + 1);
          } else {
            video.current.style.backgroundImage = `url('${urls[urlIndex]}')`;
          }
        };

        img.onerror = function () {
          setBackgroundYT(urlIndex + 1);
        };
      };
      setBackgroundYT(0);
    }

    if (data.type === 'fi' && data.img) {
      video.current.style.backgroundImage = `url('${data.img}')`;
    }
  };

  useEffect(() => {
    if (!video.current) return;
    updateBg();
  }, [ch1, video]);

  const [remainig, setRemaining] = useState(formatTimeUntil(date));
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(formatTimeUntil(date));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div class={css.wrapper}>
      <div className={css.bg}></div>
      {true ? (
        <>
          <div />
          <h1 class={css.title}>It's over!</h1>
          {/* <h2 class={css.timer}>{remainig}</h2> */}
          <div class={css.col}>
            <a href='https://pony.tube/w/p/e3DSrvP4wy7QGbfZFcFBoK'>
              Cytube 1 Archive
            </a>
            <a href='https://pony.tube/w/p/hMDBFLM16btxirJ28D5MrQ'>
              Cytube 2 Archive
            </a>
          </div>
          <div />
        </>
      ) : (
        <h1 class={css.title}>We're live!</h1>
      )}
      {/* 
      <div class={css.watchOnline}>
        <div class={css.secondTitle}>
          <p>
            Now on Comfy's Cottage: <span>{ch2?.title || 'Intermission'}</span>
          </p>
        </div>
        <div class={css.btnWrapper}>
          <a
            target={'_blank'}
            href={'https://cytu.be/r/marecon2-comfys-cottage'}
            class={css.btn}
          >
            Watch Online
          </a>
        </div>
      </div> */}

      {/* <a
        target={'_blank'}
        href={'https://cytu.be/r/marecon'}
        ref={video}
        class={css.video}
      >
        <div className={css.videoTitle}>
          On The Main Stage <br /> {ch1?.title || 'Intermission'}
        </div>
        <div class={css.playWrapper}>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width='979'
            height='1024'
            viewBox='0 0 979 1024'
            class={css.play}
          >
            <g id='icomoon-ignore'></g>
            <path
              d='M918.261 517.846c0.027 10.391-2.64 20.614-7.733 29.674-5.098 9.056-12.448 16.642-21.344 22.016l-551.264 337.23c-9.294 5.694-19.939 8.797-30.835 9.002-10.896 0.2-21.649-2.511-31.147-7.854-9.408-5.258-17.245-12.929-22.705-22.225-5.461-9.292-8.347-19.87-8.363-30.649v-674.388c0.016-10.779 2.902-21.359 8.363-30.652s13.297-16.965 22.705-22.225c9.499-5.343 20.251-8.054 31.147-7.852s21.541 3.308 30.835 9l551.264 337.233c8.895 5.374 16.246 12.96 21.344 22.016 5.093 9.060 7.76 19.282 7.733 29.674z'
              fill={'currentColor'}
            ></path>
          </svg>
          <p class={css.cytube}>Watch on Cytube</p>
        </div>
      </a> */}
    </div>
  );
}
