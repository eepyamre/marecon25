import construction from '@/assets/images/construction1.png';
import css from './style.module.scss';

export const UnderMarestruction = () => {
  return (
    <div class={css.wrapper}>
      <img class={css.construction} src={construction} alt='line' />
      <p>UNDER MARESTRUCTION</p>
    </div>
  );
};
