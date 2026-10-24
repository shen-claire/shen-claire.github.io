// Edit these lists to add, remove, or reorder About content. All bracketed text
// is intentionally a placeholder. Image paths can be relative, e.g. img/about/photo.jpg.
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
    // Supply a real URL to make a headline a live link. Empty URLs stay visibly pending.
    press: [
        { headline: '[Article headline]', publication: '[Publication]', date: '[Date]', url: '', thumbnail: '', thumbnailAlt: '' },
        { headline: '[Article headline]', publication: '[Publication]', date: '[Date]', url: '', thumbnail: '', thumbnailAlt: '' }
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

    document.getElementById('about-press').innerHTML = ABOUT_CONTENT.press.map(article => {
        const linked = /^https?:\/\//i.test(article.url);
        const headline = linked
            ? `<a href="${escape(article.url)}" target="_blank" rel="noopener noreferrer">${escape(article.headline)} <span aria-hidden="true">↗</span></a>`
            : `<span>${escape(article.headline)}</span>`;
        return `<article class="press-entry${article.thumbnail ? ' has-thumbnail' : ''}">
            ${article.thumbnail ? `<img src="${escape(article.thumbnail)}" alt="${escape(article.thumbnailAlt)}" loading="lazy" decoding="async">` : ''}
            <div><p class="about-meta">${escape(article.publication)} <span aria-hidden="true">/</span> ${escape(article.date)}</p><h4 class="serif-font">${headline}</h4>${linked ? '' : '<p class="press-pending">Article link to come</p>'}</div>
        </article>`;
    }).join('');

    document.getElementById('about-highlights').innerHTML = ABOUT_CONTENT.highlights.map(photo => `
        <figure class="highlight-photo highlight-${['wide', 'portrait', 'standard'].includes(photo.layout) ? photo.layout : 'standard'}">
            <div class="highlight-image">${image(photo, photo.placeholder)}</div>
            <figcaption><span>${escape(photo.caption)}</span><span>${escape(photo.year)}</span></figcaption>
        </figure>`).join('');
})();
