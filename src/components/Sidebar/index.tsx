import logo from '@/assets/images/logo.png';
import css from './style.module.scss';

export function Sidebar() {
  return (
    <div class={css.wrapper}>
      <img src={logo} alt='marecon!' />
      <nav>
        <a href={'/'}>Home</a>
        <a href={'/meet_the_ponies'}>Meet the Ponies</a>
        <a href={'/vendors'}>Vendors</a>
        <a href={'/schedule'}>Schedule</a>
        <a href={'/faq'}>FAQ</a>
        <a href={'https://2024.marecon.live'}>Check Marecon 2024 archive</a>
        <a href={'/404'}>Help the horsies (TODO:)</a>
        <a href={'https://boards.4chan.org/mlp/thread/41699523'}>
          Current Thread
        </a>
      </nav>
    </div>
  );
}
