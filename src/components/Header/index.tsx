import { useMemo } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { replaceWordOnPage } from '@/utils';
import numgetImg from '@/assets/images/numbeam.png';
import css from './style.module.scss';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const location = useLocation();

  const page = useMemo(() => {
    switch (location.path) {
      case '/meet_the_ponies':
        return 'Meet The Ponies';
      case '/schedule':
        return 'Schedule';
      case '/vendors':
        return 'Vendors';
      case '/faq':
        return 'FAQ';
      default:
        return '';
    }
  }, [location.path]);

  const numget = () => {
    const app = document.querySelector<HTMLDivElement>('#app');
    app.style.background = `#c1c1c1 url(${numgetImg})`;
    replaceWordOnPage('mare', 'Numget');
  };

  return (
    <header class={css.wrapper}>
      <div>
        <div class={css.logo} onClick={numget}>
          (\oco/)
        </div>

        <div class={css.breadcrumbs}>
          <a href='https://boards.4chan.org/mlp/'>/mlp/</a>
          <span> {'>'} </span>
          <a href='/'>Marecon</a>
          <span> {'>'} </span>
          <a href={location.path}>{page}</a>
        </div>
      </div>
      <svg
        class={css.toggle}
        onClick={toggleSidebar}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          stroke-linecap='round'
          stroke-linejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          <path
            d='M4 18L20 18'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
          ></path>
          <path
            d='M4 12L20 12'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
          ></path>
          <path
            d='M4 6L20 6'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
          ></path>
        </g>
      </svg>
    </header>
  );
}
