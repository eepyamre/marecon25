import { useLocation } from 'preact-iso';
import numget from '@/assets/images/jam/numget.png';
import nawni from '@/assets/images/nawni_shop.png';
import play from '@/assets/images/play.png';
import colgate from '@/assets/images/jam/colgate.png';
import merch1 from '@/assets/images/merch/0.webp';
import merch2 from '@/assets/images/merch/1.webp';
import merch3 from '@/assets/images/merch/2.webp';
import merch4 from '@/assets/images/merch/3.webp';
import css from './styles.module.scss';

export const Shop = () => {
  const location = useLocation();
  if (location.path !== '/') return null;

  return (
    <div class={css.wrapper}>
      <div class={css.bg}></div>
      <div className={`${css.content} ${css.contentMerch}`}>
        <div class={css.header}>
          <img src={nawni} class={css.nawni} alt='shopkeeper' />
          <h2>Marecon Merch </h2>
        </div>
        <div class={css.items}>
          <div className={css.placeholder}>coming soon!</div>
          <a target={'_blank'} class={css.item}>
            <img src={merch1} alt='image' />
            <p class={css.itemTitle}>T-shirt!? </p>
          </a>
          <a target={'_blank'} class={css.item}>
            <img src={merch2} alt='image' />
            <p class={css.itemTitle}>PIN?</p>
          </a>
          <a target={'_blank'} class={css.item}>
            <img src={merch3} alt='image' />
            <p class={css.itemTitle}>Lanyard!</p>
          </a>
          <a target={'_blank'} class={css.item}>
            <img src={merch4} alt='image' />
            <p class={css.itemTitle}>A PONY (REAL)</p>
          </a>
        </div>
        {/* <div>
          <a href='#' class={css.btn}>
            SEE ALL PRODUCTS
          </a>
        </div> */}
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
          <a
            target={'_blank'}
            href={'https://littleinchybit.itch.io/cheharda'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMDgzMjE3LmpwZw==/315x250%23c/OGtLm3.jpg'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Cheharda</p>
          </a>
          <a
            target={'_blank'}
            href={'https://konstantin-kasket.itch.io/anon-vs'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMDkyMjYwLnBuZw==/original/yTR6Te.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Anon VS</p>
          </a>
          <a
            target={'_blank'}
            href={'https://a393.itch.io/colgate-3d-maze'}
            class={css.item}
          >
            <img src={colgate} alt='image' />
            <p class={css.itemTitle}>Colgate 3d</p>
          </a>
          <a
            target={'_blank'}
            href={'https://carrotpone.itch.io/lyra-the-oat-thief'}
            class={css.item}
          >
            <img
              src='https://img.itch.zone/aW1nLzIwMDk1NTk3LnBuZw==/315x250%23c/WGsxw2.png'
              alt='image'
            />
            <p class={css.itemTitle}>Lyra the Oat Thief</p>
          </a>
          <a
            target={'_blank'}
            href={'https://weegeesaurus.itch.io/mare-ware'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMDk4Nzc2LnBuZw==/315x250%23c/4WSw7s.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>MARE WARE</p>
          </a>
          <a
            target={'_blank'}
            href={'https://stubbyshub.itch.io/pixel-buckball'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMTAxNjY3LnBuZw==/315x250%23c/fMi9yZ.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Pixel Buckball</p>
          </a>
          <a
            target={'_blank'}
            href={'https://alki555.itch.io/replica-replica'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMTAzMTU4LnBuZw==/315x250%23c/gNSe%2Bi.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Replica, Replica</p>
          </a>
          <a
            target={'_blank'}
            href={'https://sigilponies.itch.io/numget-survivors'}
            class={css.item}
          >
            <img src={numget} alt='image' />
            <p class={css.itemTitle}>numget survivors</p>
          </a>
          <a
            target={'_blank'}
            href={'https://mcford.itch.io/find-your-mare-simulator-2025'}
            class={css.item}
          >
            <img
              src={
                'https://img.itch.zone/aW1nLzIwMTA3NzMzLnBuZw==/315x250%23c/LrZUB0.png'
              }
              alt='image'
            />
            <p class={css.itemTitle}>Find Your Mare Simulator 2025</p>
          </a>
        </div>
      </div>

      <div class={css.bg}></div>
    </div>
  );
};
