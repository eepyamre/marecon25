import { useEffect, useState } from 'preact/hooks';
import css from './styles.module.scss';

export const Ad = () => {
  const [idx, setIdx] = useState<number | null>(null);
  const ad = [
    {
      url: 'https://ko-fi.com/rocketlawnchair/shop/',
      image: '/vendors/rocket_lawn_chair/banner.png',
    },
    // {
    //   url: 'https://borntosilly.com/',
    //   image: '/vendors/silly/banner.webp',
    // },
    {
      url: 'https://fungeon.etsy.com/',
      image: '/vendors/fungeon/banner.gif',
    },
    {
      url: 'https://snowpity.shop/',
      image: '/vendors/snowpity/banner.png',
    },
  ];

  useEffect(() => {
    setIdx(Math.floor(Math.random() * ad.length));
  }, []);

  if (idx === null) return null;

  return (
    <a class={css.ad_wrapper} href={ad[idx].url} target={'_blank'}>
      <img class={css.ad} src={ad[idx].image} alt='ad ad ad ad' />
    </a>
  );
};
