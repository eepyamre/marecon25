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
    {
      url: 'https://www.mouseu.shop/',
      image: '/vendors/loira/banner.png',
    },
    {
      url: 'https://ko-fi.com/floralsh_tpost/shop/',
      image: '/vendors/floral/banner.png',
    },
    {
      url: 'https://www.redbubble.com/people/buttercupsaiyan/shop/',
      image: '/vendors/buttercup/banner.png',
    },
    {
      url: 'https://ponerpics.org/profiles/darkdoomer/commission/',
      image: '/vendors/darkdoomer/banner.png',
    },
    {
      url: 'https://pone.voyage/',
      image: '/vendors/pv/banner.png',
    },
    {
      url: 'https://ko-fi.com/comforble/shop/',
      image: '/vendors/marewear/banner.png',
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
