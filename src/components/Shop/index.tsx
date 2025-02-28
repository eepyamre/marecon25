import { useLocation } from 'preact-iso';
import numget from '@/assets/images/numbeam.png';
import nawni from '@/assets/images/nawni_shop.png';
import play from '@/assets/images/play.png';
import css from './styles.module.scss';

export const Shop = () => {
  return null;
  const location = useLocation();
  if (location.path !== '/') return null;

  return (
    <div class={css.wrapper}>
      <div class={css.bg}></div>
      <div className={css.content}>
        <div class={css.header}>
          <img src={nawni} class={css.nawni} alt='shopkeeper' />
          <h2>Marecon Merch </h2>
        </div>
        <div class={css.items}>
          <a target={'_blank'} href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
          <a target={'_blank'} href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
          <a target={'_blank'} href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
          <a target={'_blank'} href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
        </div>
        <div>
          <a href='#' class={css.btn}>
            SEE ALL PRODUCTS
          </a>
        </div>
      </div>

      <div className={css.content}>
        <div class={`${css.header} ${css.header2}`}>
          <img src={play} class={css.nawni} alt='play play play play play' />
          <h2>Play</h2>
        </div>
        <div class={css.items}>
          <a
            target={'_blank'}
            href={'https://ponkerds.itch.io/post-poners'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMDY3NTYzLnBuZw==/315x250%23c/q2wDsX.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Post Poners </p>
          </a>
          <a
            target={'_blank'}
            href={'https://marejam.itch.io/farmare'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMDE2MTcwLnBuZw==/315x250%23c/aTzeV1.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Farmare </p>
          </a>
        </div>
      </div>

      <div class={css.bg}></div>
    </div>
  );
};
