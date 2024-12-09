import { UnderMarestruction } from '@/components/UnderMarestruction';
import css from './style.module.scss';

export function Vendors() {
  return (
    <div class={css.wrapper}>
      <UnderMarestruction />
    </div>
  );
}
