import line from '@/assets/images/yello.png';
import css from './style.module.scss';

export const UnderMarestruction = () => {
  return (
    <div class={css.wrapper}>
      <img src={line} alt='line' />
      <p>UNDER MARESTRUCTION</p>
    </div>
  );
};
