// Edit these lists to add, remove, or reorder About content. All bracketed text
// is intentionally a placeholder. Image paths can be relative, e.g. img/ABOUT/photo.jpg.
const ABOUT_CONTENT = {
    introduction: '[Artist introduction to come — add a short paragraph about your work, subjects, and approach here.]',
    portrait: { src: '', alt: '', placeholder: 'Optional portrait', caption: '[Portrait caption]' },
    recognition: [
        {
            competition: '[Competition / award name]',
            achievements: [
                { distinction: '[Most significant honor]', year: '[Year]', artwork: '[Artwork title]', featured: true },
                { distinction: '[Additional distinction]', year: '[Year]', artwork: '[Artwork title]' }
            ]
        },
        {
            competition: '[Competition / award name]',
            achievements: [
                { distinction: '[Distinction]', year: '[Year]', artwork: '[Artwork title]' },
                { distinction: '[Additional distinction]', year: '[Year]', artwork: '[Artwork title]' }
            ]
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
    // Use layout: 'wide', 'portrait', or 'standard' to vary the editorial rhythm.
    highlights: [
        { src: '', alt: '', placeholder: 'Artwork & artist photo', caption: '[Caption to come]', year: '[Year]', layout: 'wide' },
        { src: '', alt: '', placeholder: 'Art event photo', caption: '[Caption to come]', year: '[Year]', layout: 'portrait' },
        { src: '', alt: '', placeholder: 'Award ceremony photo', caption: '[Caption to come]', year: '[Year]', layout: 'standard' },
        { src: '', alt: '', placeholder: 'Art highlight photo', caption: '[Caption to come]', year: '[Year]', layout: 'standard' }
    ]
};

(() => {
    const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const image = (item, label) => item.src
        ? `<img src="${escape(item.src)}" alt="${escape(item.alt)}" loading="lazy" decoding="async">`
        : `<div class="about-image-placeholder"><span>${escape(label)}</span><small>Image placeholder</small></div>`;

    document.getElementById('about-introduction').textContent = ABOUT_CONTENT.introduction;
    document.getElementById('about-portrait').innerHTML = `${image(ABOUT_CONTENT.portrait, ABOUT_CONTENT.portrait.placeholder)}<figcaption>${escape(ABOUT_CONTENT.portrait.caption)}</figcaption>`;

    document.getElementById('about-recognition').innerHTML = ABOUT_CONTENT.recognition.map(group => `
        <article class="recognition-group">
            <h4>${escape(group.competition)}</h4>
            <ul>${group.achievements.map(award => `
                <li class="recognition-entry${award.featured ? ' recognition-featured' : ''}">
                    <div><p class="recognition-distinction${award.featured ? ' serif-font' : ''}">${escape(award.distinction)}</p>${award.artwork ? `<p class="recognition-artwork">${escape(award.artwork)}</p>` : ''}</div>
                    <span class="about-meta">${escape(award.year)}</span>
                </li>`).join('')}</ul>
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
        <figure class="highlight-photo highlight-${['wide', 'portrait', 'standard'].includes(photo.layout) ? photo.layout : 'standard'}">
            <div class="highlight-image">${image(photo, photo.placeholder)}</div>
            <figcaption><span>${escape(photo.caption)}</span><span>${escape(photo.year)}</span></figcaption>
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
