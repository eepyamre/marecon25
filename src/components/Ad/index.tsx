import css from './styles.module.scss';

export const Ad = () => {
  const ad = [
    {
      url: 'https://ko-fi.com/rocketlawnchair/shop',
      image: '/vendors/rocket_lawn_chair/banner.png',
    },
  ];

  const idx = Math.floor(Math.random() * ad.length);

  return (
    <a class={css.ad_wrapper} href={ad[idx].url} target={'_blank'}>
      <img class={css.ad} src={ad[idx].image} alt='ad ad ad ad' />
    </a>
  );
};
