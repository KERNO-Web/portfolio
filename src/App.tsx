import { useEffect, useRef, useState } from 'react';
import { fine, reduced, scrollTo, startMotion, useReveal } from './motion';

export const TG = 'https://t.me/Roma_Pereverzev';
const ERGAKI = 'https://taplink.cc/ergakitours';
const img = (n: string) => `${import.meta.env.BASE_URL}img/${n}.webp`;
const reel = (n: number, ext: 'mp4' | 'webp') => `${import.meta.env.BASE_URL}reels/reel-${n}.${ext}`;

const NAV: [string, string][] = [['Опыт', '#about'], ['Кейс', '#case'], ['Ролики', '#reels'], ['Сцена', '#stage'], ['Контакты', '#contact']];

function Arrow({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>;
}
function TgIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.4 4.6 2.9 11.7c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.3ZM9.6 14.4l8.6-7.7-6.9 8.4-.3 3.5z" /></svg>;
}

/* ---------------- header ---------------- */

function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(scrollY > innerHeight * 0.6);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  return (
    <header className={'hdr' + (solid ? ' solid' : '')}>
      <button className="hdr-name" onClick={() => scrollTo(0)}>Роман Переверзев</button>
      <nav aria-label="Разделы">
        {NAV.map(([l, id]) => <button key={id} onClick={() => scrollTo(id)}>{l}</button>)}
      </nav>
      <a className="btn red sm" href={TG} target="_blank" rel="noreferrer"><TgIcon size={16} />Написать</a>
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return;
    let raf = 0, mx = 0, my = 0, tx = 0, ty = 0;
    const move = (e: PointerEvent) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; };
    const tick = () => {
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
      el.style.setProperty('--s', Math.min(1.2, scrollY / innerHeight).toFixed(4));
      el.style.setProperty('--mx', mx.toFixed(4));
      el.style.setProperty('--my', my.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    if (fine()) addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); };
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero-name" aria-hidden="true">
        <span className="hn-1">Роман</span>
        <span className="hn-2">Переверзев</span>
      </div>
      <div className="hero-figure">
        <img src={img('roman')} srcSet={`${img('roman-sm')} 700w, ${img('roman')} 1086w`} sizes="(max-width: 760px) 92vw, 50vw" alt="Роман Переверзев с микрофоном и красным планшетом ведёт мероприятие" width="1086" height="1448" {...{ fetchpriority: 'high' }} />
      </div>
      <div className="hero-copy">
        <h1 className="sr-only">Роман Переверзев — контент, события и коммуникации</h1>
        <span className="hero-tag"><i aria-hidden="true" />Контент, события и коммуникации</span>
        <p className="hero-lead">Создаю контент, работаю с&nbsp;аудиторией и&nbsp;превращаю внимание в&nbsp;действие.</p>
        <div className="hero-cta">
          <a className="btn red" href={TG} target="_blank" rel="noreferrer"><TgIcon />Связаться</a>
          <button className="btn ghost" onClick={() => scrollTo('#about')}>Смотреть опыт</button>
        </div>
      </div>
      <div className="hero-meta">
        <span>Красноярск</span>
        <span>2+ года в SMM и контенте</span>
        <span>Последний проект — Ergaki Tours</span>
      </div>
    </section>
  );
}

/* ---------------- intro ---------------- */

function Intro() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="intro" id="about" ref={root}>
      <span className="label" data-reveal="">Коротко обо мне</span>
      <p className="intro-big" data-reveal="">
        Работаю на стыке <mark>контента</mark>, <mark>коммуникаций</mark> и&nbsp;<mark>событий</mark>. За&nbsp;два с&nbsp;лишним года успел поработать с&nbsp;продвижением, живой аудиторией и&nbsp;организацией процессов.
      </p>
      <div className="intro-row">
        <figure className="intro-photo" data-reveal="">
          <img src={img('night')} alt="Роман вечером у колоннады" loading="lazy" width="1400" height="2107" />
        </figure>
        <div className="intro-side" data-reveal="">
          <p>Мне одинаково комфортно и&nbsp;за&nbsp;монтажом Reels, и&nbsp;с&nbsp;микрофоном перед залом.</p>
          <p className="muted">Я&nbsp;не&nbsp;только публикую посты: продумываю, кому и&nbsp;что мы&nbsp;говорим, снимаю, монтирую, пишу тексты, смотрю на&nbsp;цифры и&nbsp;меняю план, если формат не&nbsp;работает.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- numbers ---------------- */

const NUMBERS: [number, string, string, string][] = [
  [2, '+', 'года', 'в SMM, контенте и коммуникациях'],
  [4, '+', 'площадки', 'веду одновременно: VK, Instagram и другие каналы'],
  [80, '+', 'единиц контента', 'в месяц — посты, Reels, Stories'],
  [400, '+', 'человек в зале', 'на университетском мероприятии, которое я вёл'],
  [60000, ' ₽', 'до', 'стоят туры, которые я продвигал'],
];

function Count({ to, suffix, pre }: { to: number; suffix: string; pre?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(reduced() ? to : 0);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 1400), ease = 1 - Math.pow(1 - k, 4);
        setV(Math.round(to * ease));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="num">{pre && <em className="num-pre">{pre}</em>}{v.toLocaleString('ru-RU').replace(/ /g, ' ')}<small>{suffix}</small></span>;
}

function Numbers() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="numbers" ref={root} aria-label="Опыт в цифрах">
      <ol>
        {NUMBERS.map(([n, suf, unit, text], i) => (
          <li key={i} data-reveal="" style={{ ['--i' as string]: i }}>
            <Count to={n} suffix={suf} pre={unit === 'до' ? 'до' : undefined} />
            <span className="cap">{unit !== 'до' && <b>{unit}</b>}{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- areas ---------------- */

const AREAS: [string, string, string[]][] = [
  ['Контент', 'От идеи до публикации — своими руками.', ['SMM', 'Reels', 'Stories', 'тексты', 'съёмка', 'монтаж', 'контент-планы', 'публикация', 'аналитика']],
  ['Маркетинг', 'Контент, который ведёт к действию, а не просто к охвату.', ['аудитория', 'продукт', 'офферы', 'CTA', 'тесты', 'стратегия коммуникаций', 'блогеры', 'заявки']],
  ['События и коммуникации', 'Там, где нужно говорить с людьми вживую.', ['выступления', 'ведение', 'работа с группами', 'координация', 'сценарии', 'живая аудитория', 'организация']],
];

function Areas() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="areas" ref={root}>
      <h2 className="sec-title" data-reveal="">Чем я&nbsp;занимаюсь</h2>
      <div className="area-list">
        {AREAS.map(([title, lead, tags], i) => (
          <article key={title} className="area" data-reveal="" style={{ ['--i' as string]: i }}>
            <span className="area-n">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{lead}</p>
            <ul>{tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Ergaki Tours case ---------------- */

const CYCLE = ['Аудитория', 'Идея', 'Контент-план', 'Сценарий', 'Съёмка', 'Монтаж', 'Текст', 'Публикация', 'Аналитика', 'Новый круг'];

type Chapter = { n: string; title: string; body: JSX.Element; media: { video?: number; img?: string; cap: string } };

const CHAPTERS: Chapter[] = [
  {
    n: '01', title: 'Три аудитории — три разговора',
    body: (<>
      <p>Одно сообщение для всех не&nbsp;работает. Под каждую группу менял темы, офферы, CTA и&nbsp;сценарии роликов.</p>
      <div className="segments">
        <div><i>С</i><b>Семьи</b><span>безопасность, удобство, что делать с&nbsp;детьми</span></div>
        <div><i>В</i><b>Взрослые туристы</b><span>маршрут, виды, уровень сложности, цена</span></div>
        <div><i>М</i><b>Молодёжь</b><span>эмоции, компания, лёгкий тон и&nbsp;юмор</span></div>
      </div>
    </>),
    media: { video: 2, cap: 'Юмор как вход для молодой аудитории' },
  },
  {
    n: '02', title: 'Контент прямо из\u00a0поездок',
    body: <p>Ездил с&nbsp;группами и&nbsp;собирал материал на&nbsp;месте: фото, видео, реальные истории, полезную информацию от&nbsp;гидов. Потом превращал это в&nbsp;посты и&nbsp;ролики.</p>,
    media: { video: 3, cap: 'Снято в поездке · Ергаки' },
  },
  {
    n: '03', title: 'Не\u00a0только «купите тур»',
    body: (<>
      <p>Помогал развивать личный бренд руководителя компании. Коммуникация сместилась от&nbsp;прямой продажи к&nbsp;доверию и&nbsp;реальному опыту путешествий.</p>
      <ul className="chips"><li>экспертные темы</li><li>интервью</li><li>личные истории</li><li>закулисье</li><li>разговорные форматы</li></ul>
    </>),
    media: { video: 1, cap: 'Подача через впечатление, а не через цену' },
  },
  {
    n: '04', title: 'Цифры, а\u00a0не\u00a0ощущения',
    body: (<>
      <div className="two-col">
        <div><b>Смотрел</b><span>охваты, просмотры, вовлечённость, реакции, клики</span></div>
        <div><b>Тестировал</b><span>темы, хуки, первые секунды видео, CTA, подачу</span></div>
      </div>
      <p>Сравнивал форматы между собой и&nbsp;пересобирал контент-план по&nbsp;результатам. План держал примерно на&nbsp;две недели вперёд.</p>
      <ul className="chips"><li>Reels</li><li>посты</li><li>Stories</li><li>экспертный контент</li></ul>
    </>),
    media: { video: 5, cap: 'Первые секунды решают всё' },
  },
  {
    n: '05', title: 'И\u00a0вне экрана',
    body: (<>
      <p>Координировал группы школьников, общался с&nbsp;участниками поездок, помогал с&nbsp;расселением, планировал активности и&nbsp;досуг.</p>
      <p>Ещё участвовал в&nbsp;организации контент-процессов команды из&nbsp;4+ человек и&nbsp;прорабатывал бартер с&nbsp;блогерами.</p>
    </>),
    media: { img: 'sunset', cap: 'В дороге' },
  },
];

/** Sticky phone-sized screen: shows whatever the chapter in view is about. */
function CaseMedia({ active }: { active: number }) {
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      // a fast scroll can interrupt play(); try once more when the clip is ready
      if (i === active && !reduced()) v.play().catch(() => v.addEventListener('canplay', () => { if (!v.paused) return; v.play().catch(() => {}); }, { once: true }));
      else v.pause();
    });
  }, [active]);
  return (
    <figure className="case-media" aria-hidden="true">
      <div className="cm-frame">
        {CHAPTERS.map((c, i) => (
          <div key={c.n} className={'cm-item' + (i === active ? ' on' : '')}>
            {c.media.video
              ? <video ref={(el) => { vids.current[i] = el; }} src={reel(c.media.video, 'mp4')} poster={reel(c.media.video, 'webp')} muted loop playsInline preload="none" />
              : <img src={img(c.media.img!)} alt="" loading="lazy" />}
          </div>
        ))}
        <span className="cm-n">{CHAPTERS[active].n}<small>/05</small></span>
      </div>
      <figcaption>{CHAPTERS[active].media.cap}</figcaption>
    </figure>
  );
}

function Case() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useReveal(root);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-45% 0px -45% 0px' });
    el.querySelectorAll('.chapter').forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  return (
    <section className="case" id="case" ref={root}>
      <div className="case-head">
        <span className="label" data-reveal="">Главный кейс · около 6 месяцев</span>
        <h2 className="case-title" data-reveal="">Ergaki Tours</h2>
        <p className="case-lead" data-reveal="">Туристическая компания: Ергаки, Байкал, семейные туры, школьные группы и&nbsp;взрослые путешествия. Я&nbsp;вёл соцсети, делал контент и&nbsp;помогал на&nbsp;выездах.</p>
        <a className="btn line" href={ERGAKI} target="_blank" rel="noreferrer" data-reveal="">Ergaki Tours<Arrow /></a>
      </div>

      <div className="cycle" data-reveal="" aria-label="Полный цикл работы с контентом">
        {CYCLE.map((s, i) => <span key={s} style={{ ['--i' as string]: i }}>{s}</span>)}
      </div>

      <div className="case-grid">
        <aside className="case-side">
          <div className="case-quote" data-reveal="">
            <p>«Контент&nbsp;— не&nbsp;публикация ради публикации. Сначала продукт и&nbsp;аудитория, потом идея, формат и&nbsp;подача.»</p>
            <span>Я&nbsp;смотрю не&nbsp;только на&nbsp;охваты, а&nbsp;на&nbsp;то, что человек должен сделать после просмотра.</span>
          </div>
          <CaseMedia active={active} />
        </aside>

        <div className="chapters">
          {CHAPTERS.map((c, i) => (
            <article key={c.n} className={'chapter' + (active === i ? ' on' : '')} data-i={i} data-reveal="">
              <span className="ch-n" aria-hidden="true">{c.n}</span>
              <div className="ch-body">
                <h3>{c.title}</h3>
                {c.body}
                <figure className="ch-media-m">{c.media.video ? <img src={reel(c.media.video, 'webp')} alt="" loading="lazy" /> : <img src={img(c.media.img!)} alt="" loading="lazy" />}<figcaption>{c.media.cap}</figcaption></figure>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- reels ---------------- */

const REELS: [string, string, string][] = [
  ['Висячий камень', 'Место, которое нужно увидеть', 'Сценарий · монтаж · текст'],
  ['Ни бе ни ме', 'Юмор как точка входа', 'Идея · монтаж · текст'],
  ['Ергаки с высоты', 'Атмосферный ролик', 'Монтаж · подача'],
  ['Небо в августе', 'Повод поехать именно сейчас', 'Монтаж · текст'],
  ['Зуб Дракона', 'Локация как герой', 'Сценарий · монтаж · текст'],
];

function Reel({ i, onOpen }: { i: number; onOpen: () => void }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause(); }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [title, sub, role] = REELS[i];
  return (
    <figure className={'reel r' + (i + 1)} data-reveal="" style={{ ['--i' as string]: i }}>
      <button className="reel-frame" onClick={onOpen} aria-label={`Смотреть ролик «${title}» со звуком`}>
        <video ref={v} src={reel(i + 1, 'mp4')} poster={reel(i + 1, 'webp')} muted loop playsInline preload="metadata" />
        <span className="reel-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5l11 7-11 7z" fill="currentColor" /></svg>Со звуком</span>
      </button>
      <figcaption><b>{title}</b><span>{sub}</span><em>{role}</em></figcaption>
    </figure>
  );
}

function Player({ i, onClose, onNav }: { i: number; onClose: () => void; onNav: (d: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('button')?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNav(1); if (e.key === 'ArrowLeft') onNav(-1); };
    addEventListener('keydown', key);
    document.documentElement.classList.add('locked');
    return () => { removeEventListener('keydown', key); document.documentElement.classList.remove('locked'); prev?.focus?.(); };
  }, [onClose, onNav]);
  return (
    <div className="player" role="dialog" aria-modal="true" aria-label={REELS[i][0]} ref={ref} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="pl-close" onClick={onClose} aria-label="Закрыть">✕</button>
      <button className="pl-nav prev" onClick={() => onNav(-1)} aria-label="Предыдущий ролик">←</button>
      <video key={i} src={reel(i + 1, 'mp4')} poster={reel(i + 1, 'webp')} controls autoPlay playsInline />
      <button className="pl-nav next" onClick={() => onNav(1)} aria-label="Следующий ролик">→</button>
      <p className="pl-cap"><b>{REELS[i][0]}</b> · {REELS[i][2]}</p>
    </div>
  );
}

function Reels() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useReveal(root);
  return (
    <section className="reels" id="reels" ref={root}>
      <div className="reels-head">
        <span className="label" data-reveal="">Избранные работы</span>
        <h2 className="sec-title" data-reveal="">Ролики, которые я&nbsp;сделал сам</h2>
        <p className="muted" data-reveal="">Пять Reels для Ergaki Tours. Нажмите на&nbsp;любой, чтобы посмотреть со&nbsp;звуком.</p>
      </div>
      <div className="reel-row">
        {REELS.map((_, i) => <Reel key={i} i={i} onOpen={() => setOpen(i)} />)}
      </div>
      {open !== null && <Player i={open} onClose={() => setOpen(null)} onNav={(d) => setOpen((o) => ((o ?? 0) + d + REELS.length) % REELS.length)} />}
    </section>
  );
}

/* ---------------- stage ---------------- */

function Stage() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="stage" id="stage" ref={root}>
      <figure className="stage-photo" data-reveal="">
        <img src={img('stage')} alt="Роман ведёт университетское мероприятие на сцене" loading="lazy" width="1400" height="2100" />
      </figure>
      <div className="stage-copy">
        <span className="label light" data-reveal="">Живая аудитория</span>
        <h2 data-reveal=""><span className="big-num">400+</span>человек.<br />Одна сцена.</h2>
        <p data-reveal="">Университетское мероприятие, зал больше чем на&nbsp;400 человек. Вёл программу по&nbsp;сценарию, общался с&nbsp;залом и&nbsp;держал темп вечера.</p>
        <ul data-reveal="">
          <li>Публичные выступления</li>
          <li>Ведение по&nbsp;сценарию</li>
          <li>Контакт с&nbsp;залом</li>
          <li>Уверенность на&nbsp;сцене</li>
        </ul>
        <p className="stage-note" data-reveal="">Работаю с&nbsp;аудиторией не&nbsp;только онлайн.</p>
      </div>
    </section>
  );
}

/* ---------------- lifestyle ---------------- */

function Life() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="life" ref={root} aria-label="Вне работы">
      <figure className="life-a" data-reveal=""><img src={img('sunset')} alt="Роман на закате в кабине канатной дороги" loading="lazy" width="1400" height="1867" /></figure>
      <p className="life-line" data-reveal="">Люблю дорогу, горы и&nbsp;воду. Лучшие истории для контента обычно случаются не&nbsp;в&nbsp;офисе.</p>
      <figure className="life-b" data-reveal=""><img src={img('water')} alt="Роман у воды на фоне арочного моста" loading="lazy" width="1400" height="1866" /></figure>
    </section>
  );
}

/* ---------------- contact ---------------- */

function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="contact" id="contact" ref={root}>
      <span className="label" data-reveal="">Контакты</span>
      <h2 className="contact-title" data-reveal="">Есть проект, задача или&nbsp;предложение?</h2>
      <p className="contact-open" data-reveal="">Открыт к&nbsp;работе в&nbsp;SMM, контенте, коммуникациях, маркетинге и&nbsp;событиях — в&nbsp;проектном формате или на&nbsp;полную занятость.</p>
      <a className="tg-big" href={TG} target="_blank" rel="noreferrer" data-reveal="">
        <TgIcon size={28} /><span>Написать в&nbsp;Telegram<small>@Roma_Pereverzev</small></span><Arrow size={28} />
      </a>
      <div className="contact-list" data-reveal="">
        <a href="tel:+79020109718"><small>Телефон</small>+7 902 010-97-18</a>
        <a href="mailto:Pereverzevroman1203@gmail.com"><small>Почта</small>Pereverzevroman1203@gmail.com</a>
        <a href="https://vk.ru/roman__pereverzev" target="_blank" rel="noreferrer"><small>ВКонтакте</small>vk.ru/roman__pereverzev</a>
      </div>
      <footer className="foot">
        <span>Роман Переверзев · Красноярск</span>
        <button onClick={() => scrollTo(0)}>Наверх ↑</button>
      </footer>
    </section>
  );
}

export default function App() {
  useEffect(() => { startMotion(); requestAnimationFrame(() => document.documentElement.classList.add('ready')); }, []);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Numbers />
        <Areas />
        <Case />
        <Reels />
        <Stage />
        <Life />
        <Contact />
      </main>
    </>
  );
}
