import { UnderMarestruction } from '@/components/UnderMarestruction';
import css from './style.module.scss';

export function MeetThePonies() {
  return (
    <div class={css.wrapper}>
      <UnderMarestruction />
    </div>
  );
}
