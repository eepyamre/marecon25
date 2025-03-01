import { MouseEventHandler, useEffect, useRef } from 'preact/compat';
import css from './style.module.scss';

const getImages = (count: number, folder: string, format: string) => {
  return new Array(count)
    .fill(0)
    .map((_, i) => `/vendors/${folder}/${i + 1}.${format}`);
};

const vendors = [
  {
    title: "Rocket's Equine Outpost",
    description:
      'Pins, wallscrolls, playmats, and hats from artist Rocket-LawnChair ',
    link: 'https://ko-fi.com/rocketlawnchair/shop/',
    images: getImages(4, 'rocket_lawn_chair', 'jpg'),
    hint: 'Use code: "MC25" at checkout for 15% off your order!',
  },
  {
    title: 'Fallen Oak Equine Rescue',
    description: 'Stickers, Enamel Pins, Magnets to Support Horses in need!',
    link: 'https://www.etsy.com/shop/FallenOakRescue/',
    images: getImages(2, 'fallenoak', 'jpg'),
  },
  {
    title: 'Mare Wear',
    description: 'The final word on bespoke mare apparel.',
    link: 'https://ko-fi.com/comforble/shop/',
    images: getImages(5, 'marewear', 'webp'),
  },
  {
    title: 'Mare Fair 2025',
    description:
      'A pony first convention for adult fans of My Little Pony taking place in Orlando, FL, on September 5-7, 2025',
    link: 'https://marefair.org/',
    images: getImages(1, 'marefair', 'png'),
  },

  {
    title: 'Darkdoomer',
    description:
      'Digital art, traditional art, and eventually decals and stuffs.',
    link: 'https://ponerpics.org/profiles/darkdoomer/commission/',
    images: getImages(4, 'darkdoomer', 'png'),
  },
  {
    title: 'Sigil.Horse',
    description: 'USB Drives, Playing Cards, Color Engraved Knives, Cool Shit™',
    link: 'https://www.sigil.horse/',
    images: getImages(3, 'sigil', 'jpg'),
  },
  {
    title: 'Fungeon',
    description: 'Stained glass style resin art of mares',
    link: 'https://fungeon.etsy.com/',
    images: ['/vendors/fungeon/video.mp4', ...getImages(5, 'fungeon', 'jpg')],
  },
  {
    title: 'ButtercupSaiyan',
    description: 'Pony stickers and designs',
    link: 'https://www.redbubble.com/people/buttercupsaiyan/shop/',
    images: getImages(4, 'buttercup', 'jpg'),
  },
  {
    title: "Floral's Garden of Mares",
    description:
      "Why hello there stranger. Do you like mares? Do you enjoy watching mares do mare things? Do you enjoy their snowpity? Then you came to the right place. At Floral's Garden, all of your dreams are in season and ready to be harvested. We have a variety of waifu materials to be purchased, from prints, stickers, dakis, you name it. Come embrace yourself with mares. Do you have an idea for a drawing you're dying to see come to life? Ask the artist for a commission! Come stop by Floral's Garden of Mares, we promise we won't disappoint.",
    link: 'https://ko-fi.com/floralsh_tpost/shop/',
    images: getImages(10, 'floral', 'jpg'),
  },
  {
    title: 'Snowpity.shop',
    description: 'Pony themed soap and fragrance spray',
    link: 'https://snowpity.shop/',
    images: getImages(4, 'snowpity', 'webp'),
  },
  {
    title: 'Limited "Sexy Pants" T-Shirts',
    description: 'One item, limited preorder of Lyra Pants T-Shirts',
    link: 'https://www.mouseu.shop/',
    images: [
      `/vendors/loira/1.gif`,
      `/vendors/loira/2.webp`,
      `/vendors/loira/3.webp`,
    ],
  },
  {
    title: 'Pone Voyage',
    description:
      'Pone Voyage is a My Little Pony fan meetup that takes place on a cruise ship at sea.',
    link: 'https://pone.voyage/',
    images: getImages(1, 'pv', 'png'),
  },
  {
    title: 'Born to Silly',
    description:
      'Born to Silly is a heartfelt art pack featuring adorable fillies and the loving mare moms who care for them. ',
    link: 'https://borntosilly.com/',
    images: getImages(4, 'silly', 'webp'),
  },
];

const discover = [
  'Uncover More Mares',
  'Unlock the Marebits',
  'Gallop Into More Goodies',
  'Snoot-Deep Into Snowpity',
  'Hoof First Into More',
  'Neigh More, Click Here!',
  'Hyperfixate on This Vendor!',
  'Mares Await',
  'Hoof It Over and See',
  'Click for Maximum Mare',
  'Enter the Maretrix',
  'Deep Dive Into Mares',
  'Sniff Out More',
  'Giddy Up and Click',
  'Embrace the Mare!',
  '100% Certified Mare Content',
  'Prepare for Maximum Equine',
  'Ponies? Ponies!',
  'Pony Portal Here!',
  'Click for Mare Secrets',
  'Extreme Mare Content Ahead!',
  '(You) Like Horses? Prove It.',
  'Mares Are Real And They’re Here!',
  'Are (You) Brave Enough To Face the Horses?',
  'Can (You) Handle the Hooves?',
  'Get Your Pony Mare Here!',
  'Mares at Your Fingertips',
  'Follow the Hoofprints!',
];

export const Vendors = () => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const selectedItem = useRef<string>();
  const selectedDx = useRef<number>(0);

  const mousemove: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget.firstChild as HTMLDivElement;
    const dots = Array.from(
      (e.currentTarget.lastChild as HTMLDivElement).children
    );
    const len = target.children.length;
    const width = target.getBoundingClientRect().width;
    const left = target.getBoundingClientRect().left;
    const x = e.clientX - left;
    const idx = Math.max(0, Math.min(len - 1, Math.floor(x / (width / len))));
    const item = e.currentTarget.parentElement.firstChild.textContent || '';
    if (
      timer.current &&
      (idx !== selectedDx.current || selectedItem.current !== item)
    ) {
      clearTimeout(timer.current);
    }
    selectedDx.current = idx;
    selectedItem.current = item;

    timer.current = setTimeout(() => {
      target.scrollTo({
        left: width * idx + 4 * idx,
        behavior: 'smooth',
      });

      dots.forEach((item, i) => {
        item.classList.remove(css.active);
        if (i === idx) {
          item.classList.add(css.active);
        }
      });
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div class={css.wrapper}>
      <div class={css.row}>
        <h2>Vendors</h2>
        {/* <a
          class={`global_btn ${css.btn}`}
          target={'_blank'}
          href={'https://forms.gle/L1T3pik49oVndbUN9'}
        >
          Want to be a vendor?
        </a> */}
      </div>
      <div class={css.vendors}>
        {vendors.map((item, i) => (
          <div class={css.vendor} key={item.title}>
            <h3>{item.title}</h3>
            <div class={css.imagesWrapper} onMouseMove={mousemove}>
              <div class={css.images}>
                {item.images?.map((image) => (
                  <div
                    key={image}
                    style={{
                      '--src': `url(${image})`,
                    }}
                    className={css.img}
                  >
                    <div class={css.blur}>
                      {image.includes('.mp4') ? (
                        <video
                          src={image}
                          autoplay
                          muted
                          loop
                          controls={false}
                        />
                      ) : (
                        <img src={image} alt='super cool vendor image' />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {item.images?.length > 1 && (
                <div class={css.imgIdx} onClick={(e) => e.stopPropagation()}>
                  {item.images.map((_, i) => (
                    <div class={i === 0 ? css.active : ''} key={i} />
                  ))}
                </div>
              )}
            </div>
            <p>{item.description}</p>
            {item.hint && <p class={css.superSecret}>{item.hint}</p>}
            <a
              target={'_blank'}
              href={item.link}
              class={`global_btn ${css.visitBtn}`}
            >
              {discover[Math.floor(Math.random() * discover.length)]}
            </a>
          </div>
        ))}
      </div>
      {/* <a
        class={`global_btn ${css.btn} ${css.vendorBottom}`}
        target={'_blank'}
        href={'https://forms.gle/L1T3pik49oVndbUN9'}
      >
        Want to be a vendor?
      </a> */}
    </div>
  );
};
