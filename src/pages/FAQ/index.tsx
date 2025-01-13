import css from './style.module.scss';

export function FAQ() {
  return (
    <div class={css.wrapper}>
      <h2>FAQ</h2>
      <div>
        <h3>{'>'}What is marecon?</h3>
        <p>
          Marecon is an online My Little Pony convention run by and for anons of
          /mlp/. It consists of livestreams and videos hosted in cytube channels
          with a focus on My Little Pony and its community.
        </p>
      </div>

      <div>
        <h3>{'>'}How did marecon start?</h3>
        <p>
          Marecon kind of started its life as roguecon, an online con that aimed
          to improve upon things that left some anons disappointed in /mlp/ con.
          However, the movement was quickly taken over by another, which named
          the con /Mare/con. Unfortunately this second anon kind of dropped the
          ball and it looked like the con was doomed for a bit, but a handful of
          the anons behind /mlp/ con stepped in and saved it, making for a fun
          and successful /Mare/con in January 2022 The next year was supposed to
          be more organized and prepared, but unfortunately OP disappeared
          again, and once more it was saved by the same people After that, the
          OP of /Mare/con 2022 and 2023 officially resigned and PurpPone took
          over. The con was "rebranded" to marecon (all lowercase, one word, no
          slashes), official mascots were created and adopted, and a few other
          changes were made and experiments ran marecon 2024 was great fun and a
          big success, and we're dedicated to continue improving and trying new
          things for 2025 and beyond! If you want to learn more about marecon's
          early years, check out this panel from /Mare/con 2023{' '}
          <a
            target={'_blank'}
            href='https://pony.tube/w/rfci7WEiBCxfBuYvkLLdqa'
          >
            https://pony.tube/w/rfci7WEiBCxfBuYvkLLdqa
          </a>
        </p>
      </div>

      <div>
        <h3>{'>'}How is marecon organized?</h3>
        <p>
          Anyone can contribute to marecon! marecon relies on the contributions
          of several anonymous helpers that help create art assets, cytube
          scripts, websites, help moderate, etc etc etc. Their efforts are
          coordinated by the head organizer and the anons at marecon HQ
        </p>
      </div>

      <div>
        <h3>{'>'}What is marecon HQ?</h3>
        <p>
          Marecon HQ is an airbnb that's used to host the con and several of its
          panels. The anons at the HQ are chosen from those that are capable of
          finding and filling out a survey posted in the early marecon planning
          thread. We've already filled up the HQ for 2025, but if you want to
          join us next year, just lurk moar ^:)
        </p>
      </div>

      <div>
        <h3>{'>'}How can I help?</h3>
        <p>
          We're always on the lookout for people that can help with art,
          moderation, panels, vending, cytube programming, and just about
          anything else you can think about contributing! If you're interested
          in helping, please post in the marecon thread or send an email to{' '}
          <a target={'_blank'} href='mailto:volunteer@marecon.live'>
            volunteer@marecon.live
          </a>
          !
        </p>
      </div>

      <div>
        <h3>{'>'}Is spec banned?</h3>
        Spec is not permitted to host any panels. He is still allowed in the
        chat (for now)
      </div>

      <div>
        <h3>{'>'}'Ave you gone mad?</h3>
        <p>Haha, yeah oco</p>
      </div>
    </div>
  );
}
