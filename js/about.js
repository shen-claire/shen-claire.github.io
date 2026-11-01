// Edit these lists to add, remove, or reorder About content. All bracketed text
// is intentionally a placeholder. Image paths can be relative, e.g. img/ABOUT/photo.jpg.
const ABOUT_CONTENT = {
    introduction: "Hi, I'm Claire. I've been creating art for as long as I can remember.",
    portrait: { src: 'img/ABOUT/headshot.png', alt: 'Portrait of Claire Shen', placeholder: 'Optional portrait', caption: '' },
    recognition: [
        {
            title: 'National Gold Medal — Scholastic Art & Writing Awards',
            detail: 'Category: Painting',
            year: '2026'
        },
        {
            title: 'National Silver Medals — Scholastic Art & Writing Awards',
            detail: 'Cartegories: Painting, Editorial Cartoon, and Photography',
            year: '2025-2026'
        },
        {
            title: 'Congressional Art Competition Winner — IL-11',
            detail: 'Painting displayed at the U.S. Capitol.',
            year: '2026'
        },
        {
            title: 'Sister Cities International Young Artists and Authors Competition',
            detail: 'International Winner, representing Naperville.',
            year: '2026'
        }
    ],
    // Publication labels appear in the ribbon, linking directly to each supplied article.
    press: [
        { publication: 'Chicago Tribune', logo: 'img/PRESS/chicago-tribune-logo.png', logoStyle: 'chicago-tribune', url: 'https://www.chicagotribune.com/2026/07/28/naperville-student-second-international-art-contest/' },
        { publication: 'NCTV17', logo: 'img/PRESS/nctv17-logo.png', logoStyle: 'nctv17', url: 'https://www.nctv17.org/news/naperville-student-places-2nd-at-international-art-showcase/' },
        { publication: 'Daily Herald', logo: 'img/PRESS/daily-herald-logo.png', logoStyle: 'daily-herald', url: 'https://www.dailyherald.com/20260803/visual-arts/naperville-central-teen-takes-2nd-in-international-art-contest/' },
        { publication: 'NaperToday', logo: 'img/PRESS/naper-today-logo.png', logoStyle: 'naper-today', url: 'https://napertoday.com/articles/naperville-central-student-s-oil-painting-earns-second-place-in-international-art-competition-ms5ui04n' },
        { publication: 'Positively Naperville', logo: 'img/PRESS/positively-naperville-logo.png', logoStyle: 'positively-naperville', url: 'https://www.positivelynaperville.com/2026/10/01/community-members-recognized-for-creativity-service-and-global-connection/161381' }
    ],
    // Set to true to display the saved captions and any years beneath highlight photos.
    showHighlightCaptions: true,
    // Use layout: 'wide', 'portrait', 'standard', or 'compact' (three across).
    highlights: [
        { src: 'img/ABOUT/IMG_4175.jpeg', alt: 'Artist and the congressman holding the framed painting Through the Looking Glass with its award ribbon', caption: 'With Congressman Foster', year: '', layout: 'standard' },
        { src: 'img/ABOUT/IMG_2856.jpeg', alt: 'Artist beside a display of framed artwork beneath the Gallery 777 sign', caption: '@ Lisle Public Library: Gallery 777', year: '', layout: 'standard' },
        { src: 'img/ABOUT/IMG_8394.jpeg', alt: 'Artist posing with a photo frame in front of the Congressional Art Competition backdrop', caption: '@ the Congressional Art Competition', year: '', layout: 'standard' },
        { src: 'img/ABOUT/IMG_8472.jpeg', alt: 'Through the Looking Glass displayed on a screen at the Congressional Art Competition event', caption: '', year: '', layout: 'standard' },
        { src: 'img/ABOUT/IMG_7127.jpeg', alt: 'Artist holding a Scholastic Art & Writing Awards national medal in a theater', caption: '@ Carnegie Hall', year: '', layout: 'standard' },
        { src: 'img/ABOUT/IMG_9615.jpeg', alt: 'Group posing with Naperville Sister Cities recognition plaques', caption: 'Recognition @ Naperville Sister Cities International Festival', year: '', layout: 'standard' },
        { src: 'img/ABOUT/FullSizeRender.jpeg', alt: 'Artist and a presenter holding a certificate at a community recognition event', caption: 'With Naperville Mayor Wehrli', year: '', layout: 'standard' },
        { src: 'img/ABOUT/IMG_8428.jpeg', alt: 'Artist in an auditorium with the Congressional Art Competition stage in the background', caption: '@ the Congressional Art Competition', year: '', layout: 'standard' }
    ]
};

(() => {
    const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const image = (item, label) => item.src
        ? `<img src="${escape(item.src)}" alt="${escape(item.alt)}" loading="lazy" decoding="async">`
        : `<div class="about-image-placeholder"><span>${escape(label)}</span><small>Image placeholder</small></div>`;

    document.getElementById('about-introduction').textContent = ABOUT_CONTENT.introduction;
    document.getElementById('about-portrait').innerHTML = `${image(ABOUT_CONTENT.portrait, ABOUT_CONTENT.portrait.placeholder)}${ABOUT_CONTENT.portrait.caption ? `<figcaption>${escape(ABOUT_CONTENT.portrait.caption)}</figcaption>` : ''}`;

    document.getElementById('about-recognition').innerHTML = ABOUT_CONTENT.recognition.map(award => `
        <article class="recognition-group">
            <h4 class="recognition-award">${escape(award.title)}</h4>
            <div class="recognition-support">
                <p class="recognition-detail">${escape(award.detail)}</p>
                <span class="about-meta">${escape(award.year)}</span>
            </div>
        </article>`).join('');

    const pressRibbon = document.getElementById('press-publications');
    const pressGroup = duplicate => `<div class="press-ribbon-group"${duplicate ? ' aria-hidden="true"' : ''}>${ABOUT_CONTENT.press.map(article => `
        <div class="press-ribbon-item">
            <span class="press-logo press-logo-${escape(article.logoStyle)}"><img src="${escape(article.logo)}" alt="" width="64" height="34" decoding="async"></span>
            <span class="press-publication-name">${escape(article.publication)}</span>
            <a class="press-article-link" href="${escape(article.url)}" target="_blank" rel="noopener noreferrer"${duplicate ? ' tabindex="-1"' : ''} aria-label="Read coverage in ${escape(article.publication)} (opens in a new tab)">Read the article here</a>
            <span class="press-ribbon-dot" aria-hidden="true"></span>
        </div>`).join('')}</div>`;
    // Two identical groups meet edge-to-edge; translate exactly one group's width.
    pressRibbon.innerHTML = `<div class="press-ribbon-track">${pressGroup(false)}${pressGroup(true)}</div>`;
    // Start after the typeface settles so a late font swap cannot shift the loop.
    (document.fonts?.ready || Promise.resolve()).then(() => pressRibbon.classList.add('is-ready'));

    document.getElementById('about-highlights').innerHTML = ABOUT_CONTENT.highlights.map(photo => `
        <figure class="highlight-photo highlight-${['wide', 'portrait', 'standard', 'compact'].includes(photo.layout) ? photo.layout : 'standard'}">
            <div class="highlight-image">${image(photo, photo.placeholder)}</div>
            ${ABOUT_CONTENT.showHighlightCaptions && (photo.caption || photo.year) ? `<figcaption><span>${escape(photo.caption)}</span>${photo.year ? `<span>${escape(photo.year)}</span>` : ''}</figcaption>` : ''}
        </figure>`).join('');

    // Break out of the centered catalog while accounting for the actual scrollbar.
    const pressScroll = pressRibbon.closest('.press-scroll');
    const fitRibbonWidth = () => {
        const width = `${pressScroll.clientWidth}px`;
        if (pressScroll.style.getPropertyValue('--press-page-width') !== width) {
            pressScroll.style.setProperty('--press-page-width', width);
        }
    };
    fitRibbonWidth();
    if (window.ResizeObserver) new ResizeObserver(fitRibbonWidth).observe(pressScroll);
    else window.addEventListener('resize', fitRibbonWidth);
})();
