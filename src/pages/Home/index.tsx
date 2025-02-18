import { useEffect, useState } from 'preact/hooks';
import { formatTimeUntil } from '@/utils';
import teaParty from '@/assets/images/tea_party.png';
import css from './style.module.scss';

const date = 1740771000;

export function Home() {
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
      {/* <div className={css.bg}></div>
      <h1 class={css.title}>LIV LIV LIV</h1>

      <a target={'_blank'} href={'https://cytu.be/r/marecon'} class={css.video}>
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
      </a> */}

      <h1 class={css.title}>(\ Soon /)</h1>
      <h2 class={css.timer}>{remainig}</h2>
      <img class={css.img} src={teaParty} alt='mmm yummy tea ' />
    </div>
  );
}
