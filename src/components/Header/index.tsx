import { useMemo } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import css from './style.module.scss';

export function Header() {
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
    console.assert(false, 'TODO');
  };

  return (
    <header class={css.wrapper}>
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
    </header>
  );
}
