import logo from '@/assets/images/logo.png';
import css from './style.module.scss';
import { useEffect } from 'preact/hooks';

export function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        event.target instanceof HTMLElement &&
        !event.target.closest('.sidebar')
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, close]);

  return (
    <div class={`${css.wrapper} ${open ? css.open : ''} sidebar`}>
      <img src={logo} alt='marecon!' class={css.logo} />
      <nav
        onClick={(e) => {
          if ((e.target as HTMLElement).nodeName === 'A') {
            close();
          }
        }}
      >
        <a href={'/'}>Home</a>
        <a href={'/meet_the_ponies'}>Meet the Ponies</a>
        <a href={'/vendors'}>Vendors</a>
        <a href={'/schedule'}>Schedule</a>
        <a href={'/faq'}>FAQ</a>
        <a target={'_blank'} href={'https://fallenoak.org/'}>
          Help the horsies
        </a>
        <a href={'https://itch.io/jam/marecon-mlp-game-jam-asset-edition'}>
          /mlp/ Game Jam
        </a>
        <a target={'_blank'} href={'https://2024.marecon.live'}>
          Marecon 2024 archive
        </a>
        <a
          target={'_blank'}
          href={'https://boards.4chan.org/mlp/thread/41985912'}
        >
          Current Thread
        </a>
      </nav>
    </div>
  );
}
