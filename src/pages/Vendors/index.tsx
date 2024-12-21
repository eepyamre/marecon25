import { MouseEventHandler } from 'preact/compat';
import { UnderMarestruction } from '@/components/UnderMarestruction';
import image from '@/assets/images/numbeam.png';
import css from './style.module.scss';

export const Vendors = () => {
  const mousemove: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget.firstChild as HTMLDivElement;
    const len = target.children.length;
    const width = target.getBoundingClientRect().width;
    const left = target.getBoundingClientRect().left;
    const x = e.clientX - left;
    const idx = Math.max(0, Math.min(len - 1, Math.round(x / (width / len))));

    target.scrollTo({
      left: width * idx,
      behavior: 'smooth',
    });

    Array.from((e.currentTarget.lastChild as HTMLDivElement).children).forEach(
      (item, i) => {
        item.classList.remove('active');
        if (i === idx) {
          item.classList.add('active');
        }
      }
    );
  };

  return (
    <div class={css.wrapper}>
      <UnderMarestruction />
      {/* <h2>Vendors</h2>
      <div class={css.vendors}>
        {new Array(12).fill(0).map((_, i) => (
          <a href={'#'} class={css.vendor}>
            <h3>Vendor Name</h3>
            <div class={css.imagesWrapper} onMouseMove={mousemove}>
              <div class={css.images}>
                <img src={image} alt='vendor image' />
                <img src={image} alt='vendor image' />
                <img src={image} alt='vendor image' />
              </div>
              <div class={css.imgIdx}>
                <div class={'active'} />
                <div />
                <div />
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sint
              cum dolor, libero eum molestiae, soluta vitae fuga dignissimos
              eligendi officia debitis. Nam repudiandae quia ratione
              reprehenderit commodi, sint enim.
            </p>
          </a>
        ))}
      </div> */}
    </div>
  );
};
