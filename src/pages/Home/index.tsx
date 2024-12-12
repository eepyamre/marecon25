import { useEffect, useState } from 'preact/hooks';
import { formatTimeUntil } from '@/utils';
import teaParty from '@/assets/images/tea_party.png';
import css from './style.module.scss';

const date = 1739523600;

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
      <h1 class={css.title}>(\ Soon /)</h1>
      <h2 class={css.timer}>{remainig}</h2>
      <img class={css.img} src={teaParty} alt='mmm yummy tea ' />
    </div>
  );
}
