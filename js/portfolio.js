const PORTFOLIO_OBJECTS = [
    {
        id: 1,
        name: "Through the Looking Glass",
        medium: "Oil",
        year: "2026",
        awards: "",
        visual: `<img src="img/Through_the_Looking_Glass.jpeg" alt="Through the Looking Glass" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 2,
        name: "Sunday Morning",
        medium: "Oil",
        year: "2026",
        awards: "",
        visual: `<img src="img/Sunday_Morning.jpeg" alt="Sunday Morning" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 3,
        name: "Starry Blues",
        medium: "Oil",
        year: "2026",
        awards: "",
        visual: `<img src="img/Starry%20Blues.jpeg" alt="Starry Blues" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 4,
        name: "Admiring",
        medium: "Oil",
        year: "2026",
        awards: "",
        visual: `<img src="img/Admiring.jpeg" alt="Admiring" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 5,
        name: "Flash",
        medium: "Acrylic",
        year: "2026",
        awards: "",
        visual: `<img src="img/Flash.jpeg" alt="Flash" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 6,
        name: "Angel's Corner",
        medium: "Oil on acrylic",
        year: "2026",
        awards: "",
        visual: `<img src="img/Angel%E2%80%99s%20Corner.jpeg" alt="Angel's Corner" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 7,
        name: "Footprints",
        frame: "silver-slim",
        medium: "Acrylic",
        year: "2026",
        awards: "",
        visual: `<img src="img/Footprints.jpeg" alt="Footprints" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 8,
        name: "Lost",
        medium: "Oil",
        year: "2025",
        awards: "",
        visual: `<img src="img/Lost.jpeg" alt="Lost" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 9,
        name: "Night",
        frame: "silver",
        medium: "Acrylic",
        year: "2025",
        awards: "",
        visual: `<img src="img/Night.jpeg" alt="Night" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    }
];
// System state
let selectedItemIndex = 0; // index inside PORTFOLIO_OBJECTS
let currentRotation = 0; // ongoing rot angle in degrees
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragVelocity = 0;
let autoSpinActive = true;
let lastTime = 0;
let targetRotation = 0; // Target for animated snaps or ease-to-index
let stepTween = null;
let animationFrame = null;
let activePage = 'works';
let carouselRing = null;
let carouselCards = [];
let artworkStages = [];
let resizeFrame = null;
let frameFitRequest = null;
const artworkDecodePromises = new WeakMap();
const ACTIVE_CARD_SCALE = 1.55;
let activeProjectIndex = null;
let isDetailOpen = false;
let hoverLockedIndex = null;
let isGridView = false;
let isGalleryTransitioning = false;
let artworkSizeObserver = null;

// Web Audio Synthesizer Controls
let audioCtx = null;
let synthEnabled = true;
let audioUnlocked = false;
let activeHoverVoice = null;
let lastHoverToneTime = 0;
const PENTATONIC_FREQUENCIES = [261.63, 293.66, 329.63, 392, 440, 523.25];
const SOUND_VOLUME_MULTIPLIER = 1.3;

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    buildCarouselRing();
    initInteractionHandlers();
    initAudioUnlock();
    wakeAnimationLoop();
    initLightboxViewer(); // Safely loaded right here!
});

// Synthesizer Engine (Pristine interactive chimes using physical modeling approximation)
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

async function unlockAudio() {
    if (!synthEnabled || (audioUnlocked && audioCtx?.state === 'running')) return;

    try {
        initAudio();
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }
        audioUnlocked = audioCtx.state === 'running';
    } catch (err) {
        audioUnlocked = false;
    }
}

function initAudioUnlock() {
    document.addEventListener('pointerdown', unlockAudio, { capture: true });
    document.addEventListener('keydown', unlockAudio, { capture: true });
}

function playAmbientNote(frequency = 440, type = 'sine', duration = 1.2, volume = 0.08) {
    if (!synthEnabled || !audioUnlocked || audioCtx?.state !== 'running') return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        // Crystalline physical chime envelope (sharp attack, exponential ring out)
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(volume * SOUND_VOLUME_MULTIPLIER, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
        // Audio silent fail
    }
}

function playHoverTone(index) {
    if (!synthEnabled || !audioUnlocked || audioCtx?.state !== 'running') return;

    const now = performance.now();
    if (now - lastHoverToneTime < 80) return;
    lastHoverToneTime = now;

    try {
        const startTime = audioCtx.currentTime;
        if (activeHoverVoice) {
            activeHoverVoice.gain.gain.cancelScheduledValues(startTime);
            activeHoverVoice.gain.gain.setValueAtTime(
                Math.max(activeHoverVoice.gain.gain.value, 0.0001),
                startTime
            );
            activeHoverVoice.gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.04);
            activeHoverVoice.osc.stop(startTime + 0.05);
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const frequency = PENTATONIC_FREQUENCIES[index % PENTATONIC_FREQUENCIES.length];

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, startTime);
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.018 * SOUND_VOLUME_MULTIPLIER, startTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.32);
        activeHoverVoice = { osc, gain };
        osc.onended = () => {
            if (activeHoverVoice?.osc === osc) activeHoverVoice = null;
        };
    } catch (err) {
        // Audio silent fail
    }
}

function toggleAudio() {
    synthEnabled = !synthEnabled;
    const btn = document.getElementById('audio-toggle');
    if (synthEnabled) {
        btn.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4 text-[#333333]"></i>`;
        showNotification("Acoustic interactions enabled");
        unlockAudio().then(() => {
            playAmbientNote(600, 'triangle', 0.5, 0.035);
        });
    } else {
        btn.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-[#333333]/40"></i>`;
        showNotification("Interface muted");
    }
    lucide.createIcons();
}

// Fullscreen the whole document so artwork dialogs and all page views stay available.
function syncFullscreenControl() {
    const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    const button = document.getElementById('fullscreen-toggle');
    if (!button) return;
    const label = active ? 'Exit fullscreen' : 'Enter fullscreen';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(active));
    button.innerHTML = `<i id="frame-icon" data-lucide="${active ? 'minimize' : 'maximize'}" class="w-4 h-4 text-[#333333] group-hover:scale-110 transition-transform" aria-hidden="true"></i>`;
    lucide.createIcons();
    scheduleRingSpacing();
}

async function toggleFullscreen() {
    try {
        const active = document.fullscreenElement || document.webkitFullscreenElement;
        if (active) {
            const exit = document.exitFullscreen || document.webkitExitFullscreen;
            if (exit) await exit.call(document);
        } else {
            const root = document.documentElement;
            const enter = root.requestFullscreen || root.webkitRequestFullscreen;
            if (!enter) {
                showNotification('Fullscreen is not supported in this browser.');
                return;
            }
            // Must be called directly from the click to preserve browser user activation.
            await enter.call(root);
        }
        syncFullscreenControl();
    } catch (error) {
        syncFullscreenControl();
        showNotification('Fullscreen is unavailable here. Try opening the site in a browser tab.');
    }
}

// Keep the control accurate when Escape or the browser's own controls exit fullscreen.
document.addEventListener('fullscreenchange', syncFullscreenControl);
document.addEventListener('webkitfullscreenchange', syncFullscreenControl);

// Generate the 3D rotating cylindrical items
function buildCarouselRing() {
    const ring = document.getElementById('carousel-ring');
    carouselRing = ring;
    ring.innerHTML = '';
    artworkSizeObserver?.disconnect();
    if (window.ResizeObserver) {
        artworkSizeObserver = new ResizeObserver(scheduleArtworkFit);
    }
    
    const totalItems = PORTFOLIO_OBJECTS.length;
    const radius = calculateRadius();

    PORTFOLIO_OBJECTS.forEach((item, index) => {
        const angle = index * (360 / totalItems);
        const frameClass = {
            silver: ' artwork-frame-silver',
            'silver-slim': ' artwork-frame-silver artwork-frame-silver-slim'
        }[item.frame] || '';
        
        const card = document.createElement('button');
        card.type = 'button';
        card.setAttribute('aria-label', `View ${item.name}`);
        card.id = `item-${index}`;
        card.className = "carousel-item absolute w-[90px] md:w-[130px] h-[120px] md:h-[160px] cursor-pointer flex flex-col justify-center items-center";
        
        // Cylinder mapping math formula
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        
        // Give the uncropped painting the full card area.
        card.innerHTML = `
            <div class="carousel-artwork w-full flex-1 min-h-0 flex items-center justify-center relative select-none pointer-events-none">
                <div class="artwork-frame${frameClass}">
                    <div class="artwork-mat">${item.visual}</div>
                </div>
            </div>
            <span class="grid-work-title">${item.name}</span>
        `;

        // Item Click details & chime trigger
        card.addEventListener('click', (e) => {
            if (isGalleryTransitioning || (!isGridView && Math.abs(dragVelocity) > 0.4)) return;
            e.stopPropagation();
            selectProject(index);
        });

        // Hover sound effect & pause auto-rotation
        card.addEventListener('mouseenter', () => {
            if (isGalleryTransitioning) return;
            playHoverTone(index);
            if (isGridView) return;
            autoSpinActive = false;
            if (index === selectedItemIndex) {
                hoverLockedIndex = index;
                dragVelocity = 0;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (isGridView || isGalleryTransitioning) return;
            if (hoverLockedIndex === index) {
                hoverLockedIndex = null;
            }
            autoSpinActive = !isDetailOpen;
            wakeAnimationLoop();
        });

        ring.appendChild(card);
        const artworkStage = card.querySelector('.carousel-artwork');
        const artworkImage = artworkStage.querySelector('img');
        artworkImage.decoding = 'async';
        decodeArtwork(artworkImage);
        artworkImage.addEventListener('load', scheduleArtworkFit, { once: true });
        artworkSizeObserver?.observe(artworkStage);
    });
    carouselCards = Array.from(ring.children);
    artworkStages = carouselCards.map(card => card.querySelector('.carousel-artwork'));
    fitAllArtworkFrames();
    updateHighlight();
}

// Fit the painted area, not the surrounding molding, to the original ratio.
// clientWidth/clientHeight deliberately ignore the carousel's 3D magnification.
function measureArtworkFrame(stage) {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height) return null;
    const frame = stage.querySelector('.artwork-frame');
    const image = frame.querySelector('img');
    if (!image.naturalWidth || !image.naturalHeight) return null;
    const rail = parseFloat(getComputedStyle(frame).paddingLeft) || 10;
    const mat = parseFloat(getComputedStyle(frame.querySelector('.artwork-mat')).paddingLeft) || 3;
    const rim = 2 * (rail + mat);
    const ratio = image.naturalWidth / image.naturalHeight;
    const imageWidth = Math.min(Math.max(1, width - rim), Math.max(1, height - rim) * ratio);
    return { frame, width: `${imageWidth + rim}px`, height: `${imageWidth / ratio + rim}px` };
}

function fitAllArtworkFrames() {
    // Measure all cards before changing any dimensions, avoiding repeated forced layout.
    const measurements = artworkStages.map(measureArtworkFrame);
    measurements.forEach(size => {
        if (!size) return;
        if (size.frame.style.width !== size.width) size.frame.style.width = size.width;
        if (size.frame.style.height !== size.height) size.frame.style.height = size.height;
    });
}

function scheduleArtworkFit() {
    if (frameFitRequest !== null) return;
    frameFitRequest = requestAnimationFrame(() => {
        frameFitRequest = null;
        fitAllArtworkFrames();
    });
}

function decodeArtwork(image) {
    if (!image || !image.decode) return Promise.resolve();
    if (!artworkDecodePromises.has(image)) {
        artworkDecodePromises.set(image, image.decode().catch(() => {}));
    }
    return artworkDecodePromises.get(image);
}

// Keep the same artwork buttons when switching layouts, preserving their handlers.
async function toggleGalleryView() {
    if (isGalleryTransitioning || isDetailOpen) return;
    isGalleryTransitioning = true;
    pauseAnimationLoop();
    autoSpinActive = false;
    isDragging = false;
    dragVelocity = 0;
    hoverLockedIndex = null;
    stepTween = null;

    const main = document.getElementById('gallery-main');
    const button = document.getElementById('gallery-view-toggle');
    const scene = document.getElementById('carousel-scene');
    const viewport = document.getElementById('works-grid-viewport');
    const ring = document.getElementById('carousel-ring');
    const grid = document.getElementById('works-grid');
    const cards = PORTFOLIO_OBJECTS.map((_, index) => document.getElementById(`item-${index}`));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    button.disabled = true;

    const applyLayout = () => {
        isGridView = !isGridView;
        const destination = isGridView ? grid : ring;
        cards.forEach(card => destination.appendChild(card));
        scene.hidden = isGridView;
        viewport.hidden = !isGridView;
        document.getElementById('gallery-active-work').hidden = isGridView;
        document.getElementById('gallery-instructions').textContent = isGridView
            ? `${PORTFOLIO_OBJECTS.length} WORKS · SELECT A PAINTING` : 'DRAG OR SWIPE OR SPIN';
        document.getElementById('carousel-title-hint').textContent = isGridView ? 'All Works' : 'Select Works';
        button.setAttribute('aria-pressed', String(isGridView));
        button.innerHTML = isGridView
            ? '<i data-lucide="rotate-3d" class="w-3.5 h-3.5" aria-hidden="true"></i><span>Back to carousel</span>'
            : '<i data-lucide="layout-grid" class="w-3.5 h-3.5" aria-hidden="true"></i><span>View all works</span>';
        if (isGridView) {
            viewport.scrollTop = 0;
            cards.forEach(card => {
                card.classList.remove('opacity-50', 'blur-[1.5px]', 'is-active', 'z-30');
                card.style.transform = 'none';
            });
        } else {
            currentRotation = -selectedItemIndex * (360 / PORTFOLIO_OBJECTS.length);
            ring.style.transform = `rotateY(${currentRotation}deg)`;
            updateHighlight();
        }
        fitAllArtworkFrames();
        lucide.createIcons();
    };

    const readFrames = () => cards.map(card => {
        const frame = card.querySelector('.artwork-frame');
        const rect = frame.getBoundingClientRect();
        return {
            rect,
            rail: parseFloat(getComputedStyle(frame).paddingLeft) || 10,
            mat: parseFloat(getComputedStyle(frame.querySelector('.artwork-mat')).paddingLeft) || 3,
            opacity: parseFloat(getComputedStyle(card).opacity) || 1
        };
    });
    const layer = document.createElement('div');
    layer.className = 'gallery-transition-layer';
    layer.setAttribute('aria-hidden', 'true');
    let animations = [];
    const stopAnimation = () => animations.forEach(animation => animation.cancel());

    try {
        // Reuse decoded artwork rather than capturing blurred 3D browser layers.
        await Promise.all(cards.map(card => decodeArtwork(card.querySelector('img'))));
        const before = readFrames();
        main.classList.add('is-rearranging');
        applyLayout();
        const after = readFrames();

        if (reducedMotion) {
            main.classList.remove('is-rearranging');
            const surface = isGridView ? viewport : scene;
            if (surface.animate) {
                await surface.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 120 }).finished;
            }
        } else {
            main.appendChild(layer);
            const bounds = layer.getBoundingClientRect();
            const visible = rect => rect.bottom > bounds.top && rect.top < bounds.bottom
                && rect.right > bounds.left && rect.left < bounds.right;
            const keyframe = ({ rect, rail, mat, opacity }) => ({
                left: `${rect.left - bounds.left}px`,
                top: `${rect.top - bounds.top}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                '--frame-rail': `${rail}px`,
                '--frame-mat': `${mat}px`,
                opacity
            });
            animations = cards.flatMap((card, index) => {
                const start = before[index];
                const end = after[index];
                const wasVisible = visible(start.rect);
                const willBeVisible = visible(end.rect);
                if (!wasVisible && !willBeVisible) return [];
                const proxy = card.querySelector('.artwork-frame').cloneNode(true);
                proxy.classList.add('gallery-transition-card');
                const image = proxy.querySelector('img');
                image.alt = '';
                layer.appendChild(proxy);
                // Offscreen rows fade locally instead of sweeping across the frame.
                const from = wasVisible ? keyframe(start) : { ...keyframe(end), opacity: 0 };
                const to = willBeVisible ? keyframe(end) : { ...keyframe(start), opacity: 0 };
                Object.assign(proxy.style, from);
                return [proxy.animate([from, to], {
                    duration: 680,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'forwards'
                })];
            });
            window.addEventListener('resize', stopAnimation, { once: true });
            await Promise.allSettled(animations.map(animation => animation.finished));
        }
    } finally {
        window.removeEventListener('resize', stopAnimation);
        layer.remove();
        stopAnimation();
        main.classList.remove('is-rearranging');
        isGalleryTransitioning = false;
        autoSpinActive = !isGridView && !isDetailOpen;
        button.disabled = false;
        wakeAnimationLoop();
    }
}

// Adjusts radius of carousel to match viewport size (responsive layout calculations)
function calculateRadius() {
    const width = window.innerWidth;
    if (width < 640) return 220; // smaller mobile circle
    if (width < 1024) return 330; // tablet
    return 450; // crisp wide high-fidelity desktop screen circle
}

function updateRingSpacing() {
    fitAllArtworkFrames();
    if (isGridView || isGalleryTransitioning) return;
    updateHighlight();
}

function scheduleRingSpacing() {
    if (resizeFrame !== null) return;
    resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        updateRingSpacing();
    });
}
window.addEventListener('resize', scheduleRingSpacing);

// Interaction Listeners & Swipe Physics Integration
function initInteractionHandlers() {
    // CHANGE THIS LINE: Target the .scene wrapper container instead of the hidden overlay
    const surface = document.querySelector('.scene');

    surface.addEventListener('mousedown', (e) => {
        if (isGridView || isGalleryTransitioning || e.target.closest('button:not(.carousel-item)')) return;
        isDragging = true;
        stepTween = null;
        autoSpinActive = false;
        startX = e.clientX;
        currentX = startX;
        dragVelocity = 0;
        wakeAnimationLoop();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const deltaX = currentX - startX;
        startX = currentX;
        
        // Map screen drag pixels to 3D cylinder degrees
        const rotationFactor = 0.25;
        currentRotation += deltaX * rotationFactor;
        dragVelocity = deltaX * rotationFactor;
        wakeAnimationLoop();
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        autoSpinActive = true;
        wakeAnimationLoop();
    });

    // Touch support for sleek responsive mobile sliding
    surface.addEventListener('touchstart', (e) => {
        if (isGridView || isGalleryTransitioning) return;
        isDragging = true;
        stepTween = null;
        autoSpinActive = false;
        startX = e.touches[0].clientX;
        currentX = startX;
        dragVelocity = 0;
        wakeAnimationLoop();
    });

    surface.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        startX = currentX;
        const rotationFactor = 0.35;
        currentRotation += deltaX * rotationFactor;
        dragVelocity = deltaX * rotationFactor;
        wakeAnimationLoop();
    });

    surface.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        autoSpinActive = true;
        wakeAnimationLoop();
    });
}

// Accessibility click helpers (forward/backward step buttons)
function rotateStep(direction) {
    if (isGridView || isGalleryTransitioning) return;
    autoSpinActive = false;
    dragVelocity = 0;
    hoverLockedIndex = null;
    const stepAngle = 360 / PORTFOLIO_OBJECTS.length;
    const currentSnapped = stepTween !== null
        ? targetRotation
        : Math.round(currentRotation / stepAngle) * stepAngle;
    targetRotation = currentSnapped - (direction * stepAngle);
    
    playAmbientNote(500, 'sine', 0.6, 0.04);
    
    stepTween = { elapsed: 0 };
    wakeAnimationLoop();
}

function canAnimateCarousel() {
    return activePage === 'works' && !document.hidden && !isDetailOpen
        && !isGridView && !isGalleryTransitioning;
}

function pauseAnimationLoop() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    lastTime = 0;
}

function wakeAnimationLoop() {
    if (animationFrame === null && canAnimateCarousel()) {
        lastTime = 0;
        animationFrame = requestAnimationFrame(runAnimationLoop);
    }
}

// One clock for drift, inertia, and arrow steps, calibrated to the original 60Hz motion.
function runAnimationLoop(now) {
    animationFrame = null;
    if (!canAnimateCarousel()) { lastTime = 0; return; }
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
    const frames = dt * 60;
    lastTime = now;

    if (stepTween) {
        stepTween.elapsed += dt;
        currentRotation += (targetRotation - currentRotation) * (1 - Math.pow(0.75, frames));
        if (stepTween.elapsed >= 0.25) {
            currentRotation = targetRotation;
            stepTween = null;
            autoSpinActive = true;
        }
    } else if (isDragging) {
        dragVelocity = Math.max(-10, Math.min(10, dragVelocity));
    } else {
        const friction = Math.pow(0.94, frames);
        currentRotation += dragVelocity * (1 - friction) / (1 - 0.94);
        dragVelocity *= friction;
        if (Math.abs(dragVelocity) < 0.0001) dragVelocity = 0;

        if (autoSpinActive && Math.abs(dragVelocity) < 0.05) {
            currentRotation += 4.8 * dt;
        }
    }

    if (carouselRing) {
        carouselRing.style.transform = `rotateY(${currentRotation}deg)`;
    }

    calculateClosestFrontItem();
    if (isDragging || stepTween || autoSpinActive || dragVelocity !== 0) {
        animationFrame = requestAnimationFrame(runAnimationLoop);
    } else {
        lastTime = 0;
    }
}

document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('is-document-hidden', document.hidden);
    if (document.hidden) pauseAnimationLoop();
    else wakeAnimationLoop();
});

// Identify front-facing active items & apply blur/focus shadows dynamically
function calculateClosestFrontItem() {
    if (hoverLockedIndex !== null) return;

    const totalItems = PORTFOLIO_OBJECTS.length;
    const stepAngle = 360 / totalItems;
    
    let normalizedRotation = (-currentRotation) % 360;
    if (normalizedRotation < 0) normalizedRotation += 360;

    const closestIndex = Math.round(normalizedRotation / stepAngle) % totalItems;
    
    if (closestIndex !== selectedItemIndex) {
        selectedItemIndex = closestIndex;
        updateHighlight();
    }
}

// --- DYNAMIC MAGNIFIED FOCUS HIGHLIGHTING ---
function updateHighlight() {
    if (isGridView) return;
    const totalItems = PORTFOLIO_OBJECTS.length;
    const radius = calculateRadius(); // Get current 3D spacing radius
    
    for (let i = 0; i < totalItems; i++) {
        const card = carouselCards[i];
        if (!card) continue;

        const angle = i * (360 / totalItems);

        if (i === selectedItemIndex) {
            card.classList.remove('opacity-50', 'blur-[1.5px]');
            card.classList.add('opacity-100', 'is-active', 'z-30');
            
            // Keep the selected card at the requested scale without extra perspective magnification.
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${ACTIVE_CARD_SCALE})`;
            
            // Update active bottom indicators
            document.getElementById('active-item-index').innerText = String(i + 1).padStart(2, '0');
            document.getElementById('active-item-name').innerText = PORTFOLIO_OBJECTS[i].name.toUpperCase();
        } else {
            card.classList.remove('opacity-100', 'is-active', 'z-30');
            card.classList.add('opacity-50', 'blur-[1.5px]');
            
            // Return inactive items back to their normal 3D circle positions
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1)`;
        }
    }
}

// UI navigation interactions
function openTab(tabId, event) {
    activePage = tabId;
    if (tabId === 'works') wakeAnimationLoop();
    else pauseAnimationLoop();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-black', 'border-black');
        link.classList.add('text-[#333333]/60', 'border-transparent');
    });

    const sender = event ? event.currentTarget : null;
    if (sender) {
        sender.classList.remove('text-[#333333]/60', 'border-transparent');
        sender.classList.add('text-black', 'border-black');
    }

    playAmbientNote(400, 'sine', 0.5, 0.05);

    const tabs = ['about', 'contact'];
    const gallery = document.getElementById('gallery-main');
    if (gallery) gallery.classList.toggle('is-page-inactive', tabId !== 'works');
    tabs.forEach(t => {
        const panel = document.getElementById(`tab-${t}`);
        if (panel) {
            if (t === tabId) {
                panel.classList.add('is-active');
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.classList.remove('is-active');
                panel.setAttribute('aria-hidden', 'true');
            }
        }
    });
}

function closeActiveTab() {
    activePage = 'works';
    wakeAnimationLoop();
    const tabs = ['about', 'contact'];
    document.getElementById('gallery-main')?.classList.remove('is-page-inactive');
    tabs.forEach(t => {
        const panel = document.getElementById(`tab-${t}`);
        if (panel) {
            panel.classList.remove('is-active');
            panel.setAttribute('aria-hidden', 'true');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-black', 'border-black');
        link.classList.add('text-[#333333]/60', 'border-transparent');
    });
    const firstLink = document.querySelectorAll('.nav-link')[0];
    if (firstLink) {
        firstLink.classList.remove('text-[#333333]/60', 'border-transparent');
        firstLink.classList.add('text-black', 'border-black');
    }

    playAmbientNote(300, 'sine', 0.5, 0.03);
}

// panel selection, expand center panel
function selectProject(index) {
    const project = PORTFOLIO_OBJECTS[index];
    if (!project || isGalleryTransitioning) return;
    if (isGridView) selectedItemIndex = index;

    activeProjectIndex = index;
    isDetailOpen = true;
    pauseAnimationLoop();
    autoSpinActive = false;
    dragVelocity = 0;

    document.getElementById('drawer-title').innerText = project.name;
    document.getElementById('drawer-medium-heading').innerText = project.medium || 'Medium';
    document.getElementById('drawer-medium').innerText = project.medium || 'Medium';
    document.getElementById('drawer-year').innerText = project.year || '';
    document.getElementById('drawer-awards').innerText = project.awards?.trim() || 'None listed';

    const visualSlot = document.getElementById('drawer-visual-container');
    if (visualSlot) {
        visualSlot.innerHTML = project.visual;
        const popupImage = visualSlot.querySelector('img');
        if (popupImage) {
            popupImage.classList.remove('object-cover', 'drop-shadow-sm');
            popupImage.classList.add('object-contain');
        }
    }

    const modal = document.getElementById('detail-drawer');
    if (modal) {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
        modal.setAttribute('aria-hidden', 'false');
        
        const innerCard = document.getElementById('detail-card');
        if (innerCard) {
            innerCard.style.transform = 'scale(1)';
        }
    }
}

function closeDetails() {
    const modal = document.getElementById('detail-drawer');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        modal.setAttribute('aria-hidden', 'true');
        
        const innerCard = document.getElementById('detail-card');
        if (innerCard) {
            innerCard.style.transform = 'scale(0.95)';
        }
    }
    activeProjectIndex = null;
    isDetailOpen = false;
    autoSpinActive = !isGridView;
    wakeAnimationLoop();
}

document.getElementById('detail-drawer')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeDetails();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('detail-drawer')?.getAttribute('aria-hidden') === 'false') {
        closeDetails();
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
    if (isDetailOpen || isDragging || isGridView || isGalleryTransitioning) return;
    if (['about', 'contact'].some(tab => {
        const panel = document.getElementById(`tab-${tab}`);
        return panel && panel.classList.contains('is-active');
    })) return;

    event.preventDefault();
    rotateStep(event.key === 'ArrowRight' ? 1 : -1);
});

// Client form submit action
function handleInquirySubmit(event) {
    event.preventDefault();
    playAmbientNote(880, 'sine', 1.5, 0.1);
    showNotification("Your commission request has been recorded!");
    setTimeout(() => {
        closeActiveTab();
    }, 1500);
}

// Custom micro notification toast generator
function showNotification(text) {
    const toast = document.getElementById('custom-notification');
    const toastText = document.getElementById('notification-text');
    if (toastText) toastText.innerText = text;
    
    if (toast) {
        toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        toast.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }, 3000);
    }
}

function viewFullCase() {
    showNotification(`Launching full case study detail window...`);
    playAmbientNote(700, 'sine', 1.0, 0.05);
}

function shareProject() {
    const url = window.location.href + `?project=${PORTFOLIO_OBJECTS[selectedItemIndex].id}`;
    
    navigator.clipboard.writeText(url).then(() => {
        showNotification("Case study URL copied to clipboard!");
        playAmbientNote(800, 'sine', 0.6, 0.05);
    }).catch(err => {
        console.error('Failed to copy link via Clipboard API: ', err);
    });
}

// --- FULL-SCREEN LIGHTBOX ENGINE ---
function initLightboxViewer() {
    const drawerVisual = document.getElementById('drawer-visual-container');
    const lightbox = document.getElementById('art-lightbox');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxAwards = document.getElementById('lightbox-awards');

    if (!drawerVisual || !lightbox) return;

    // Set cursor styling indicating the element expands
    drawerVisual.style.cursor = 'zoom-in';

    drawerVisual.addEventListener('click', () => {
        if (!Number.isInteger(activeProjectIndex)) return;

        const currentArtwork = PORTFOLIO_OBJECTS[activeProjectIndex];
        if (!currentArtwork) return;
        
        // Render artwork layout inside the lightbox overlay component
        lightboxImgContainer.innerHTML = currentArtwork.visual;
        const img = lightboxImgContainer.querySelector('img');
        if (img) {
            img.className = "max-w-[90vw] max-h-[75vh] object-contain rounded-xl shadow-2xl";
        }

        // Apply awards meta information text dynamically
        if (currentArtwork.awards && currentArtwork.awards.trim() !== "") {
            lightboxAwards.innerHTML = `<span class="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-4 py-2 rounded-full text-xs font-semibold tracking-wider">🏆 ${currentArtwork.awards}</span>`;
            lightboxAwards.style.display = 'block';
        } else {
            lightboxAwards.innerHTML = "";
            lightboxAwards.style.display = 'none';
        }

        // Display overlay component smooth alpha transition
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
    });
}
