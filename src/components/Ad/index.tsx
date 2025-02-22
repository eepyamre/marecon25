import css from './styles.module.scss';

export const Ad = () => {
  const ad = [
    {
      url: 'https://ko-fi.com/rocketlawnchair/shop',
      image: '/vendors/rocket_lawn_chair/banner.png',
    },
  ];

  return (
    <a class={css.ad_wrapper} href={ad[0].url} target={'_blank'}>
      <img class={css.ad} src={ad[0].image} alt='ad ad ad ad' />
    </a>
  );
};
