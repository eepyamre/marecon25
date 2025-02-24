import { useLocation } from 'preact-iso';
import numget from '@/assets/images/numbeam.png';
import nawni from '@/assets/images/nawni_shop.png';
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
          <a href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
          <a href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
          <a href={'#'} class={css.item}>
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>My little Numget </p>
          </a>
          <a href={'#'} class={css.item}>
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
      <div class={css.bg}></div>
    </div>
  );
};
