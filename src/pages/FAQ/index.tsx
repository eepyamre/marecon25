import css from './style.module.scss';

export function FAQ() {
  return (
    <div class={css.wrapper}>
      <h2>FAQ</h2>
      <div>
        <h3>What is marecon?</h3>
        <p>
          Marecon is an online convention organized and run by /mlp/ians. Very
          much like /mlp/ con, but usually with lower attendance numbers and
          lower stakes{' '}
        </p>
      </div>
      <div>
        <h3>Where do check the schedule?</h3>
        <a href={'/schedule'}>https://marecon.live/schedule </a>
      </div>
      <div>
        <h3>When</h3>
        <p>TBD</p>
      </div>
      <div>
        <h3>How do I participate?</h3>
        <a target={'_blank'} href={'https://forms.gle/kXxHwiyC1iBdmTFT8'}>
          https://forms.gle/kXxHwiyC1iBdmTFT8
        </a>
      </div>
      <div>
        <h3>Can I do something other than a panel for marecon?</h3>
        <p>TODO:</p>
      </div>
    </div>
  );
}
