// Project/Object Mock Database with highly creative descriptive text and custom vector representations
const PORTFOLIO_OBJECTS = [
    {
        id: 1,
        name: "The Curve Bag",
        category: "Fashion & Identity",
        role: "Product & Digital Sculptor",
        timeline: "Q1 2026",
        client: "Sarah Sarazen Inc.",
        tools: "SubD Modeling, WebGL Engine",
        description: "A gorgeous, powder-blue high fashion shoulder bag displaying elegant sweeping contours. Created with sustainability at its center using vegan apple leather composites and ultra-light architectural frame stabilizers. Represented in our spatial ring to capture organic ergonomic movement under warm procedural light sources.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-sky-200 fill-current drop-shadow-md">
                <!-- Handle -->
                <path d="M 30 50 C 30 10, 70 10, 70 50" fill="none" stroke="#2a3040" stroke-width="4.5" stroke-linecap="round"/>
                <!-- Decorative Ribbons -->
                <path d="M 30 50 C 27 55, 25 75, 28 80" fill="none" stroke="#2a3040" stroke-width="1.8"/>
                <path d="M 70 50 C 73 55, 75 75, 72 80" fill="none" stroke="#2a3040" stroke-width="1.8"/>
                <!-- Bag Body -->
                <path d="M 28 50 C 26 48, 74 48, 72 50 C 70 72, 60 82, 50 82 C 40 82, 30 72, 28 50 Z" fill="#b0cddb"/>
                <path d="M 32 54 C 35 70, 65 70, 68 54" fill="none" stroke="white" stroke-width="1" stroke-opacity="0.4"/>
            </svg>
        `
    },
    {
        id: 2,
        name: "Editorial Graphic Design",
        category: "Brand & Typography",
        role: "Lead Typographer",
        timeline: "Q4 2025",
        client: "Arcane Press",
        tools: "InDesign, Glyphs, OpenType",
        description: "Elegant serif typography representing modern editorial layout directions. This asset demonstrates high-fidelity visual density and experimental typographic systems, optimized for tactile luxury publications and digital high-end displays alike.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full flex items-center justify-center">
                <rect x="15" y="15" width="70" height="70" rx="4" fill="white" stroke="#ece9e2" stroke-width="1"/>
                <text x="50%" y="42%" text-anchor="middle" font-family="'Playfair Display', serif" font-weight="600" font-size="9" fill="#2d2d2d">Graphic</text>
                <text x="50%" y="54%" text-anchor="middle" font-family="'Playfair Display', serif" font-weight="400" font-size="9" fill="#2d2d2d" font-style="italic">Design</text>
                <line x1="25" y1="65" x2="75" y2="65" stroke="#333" stroke-width="0.5" stroke-opacity="0.5"/>
                <circle cx="50" cy="74" r="1.5" fill="#333"/>
            </svg>
        `
    },
    {
        id: 3,
        name: "Abstract Canvas No. 4",
        category: "Modern Painting",
        role: "Spatial Artist",
        timeline: "Q2 2025",
        client: "Sonder Gallery",
        tools: "Generative Art, Acrylics",
        description: "A colorful abstract fluid canvas mapping vibrant generative gradients. Embodying organic digital painting styles, this piece explores chromatic fields and soft liquid dynamics, interacting with spatial light fields on our user interface.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full">
                <rect x="20" y="20" width="60" height="60" rx="6" fill="#fcfcfc" stroke="#eae5d9" stroke-width="1" />
                <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#fed7aa;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#f472b6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect x="24" y="24" width="52" height="52" rx="4" fill="url(#grad3)"/>
                <circle cx="45" cy="45" r="12" fill="white" fill-opacity="0.15" filter="blur(2px)"/>
            </svg>
        `
    },
    {
        id: 4,
        name: "Echo Vinyl",
        category: "Media Packaging",
        role: "Visual Designer",
        timeline: "Q3 2025",
        client: "Soundscape Label",
        tools: "Vector Art, Poly-Rendering",
        description: "An iridescent, emerald green vinyl record mapping translucent refraction and high groove detail. An aesthetic tribute to physical audio culture and tactile modern music distribution systems.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
                <circle cx="50" cy="50" r="38" fill="#10b981" fill-opacity="0.8"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#047857" stroke-width="0.5"/>
                <!-- Grooves -->
                <circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-opacity="0.15" stroke-width="0.3"/>
                <circle cx="50" cy="50" r="24" fill="none" stroke="white" stroke-opacity="0.15" stroke-width="0.3"/>
                <circle cx="50" cy="50" r="18" fill="none" stroke="white" stroke-opacity="0.2" stroke-width="0.3"/>
                <!-- Center Label -->
                <circle cx="50" cy="50" r="12" fill="white" stroke="#065f46" stroke-width="0.5"/>
                <circle cx="50" cy="50" r="4" fill="#047857"/>
            </svg>
        `
    },
    {
        id: 5,
        name: "Avant-Garde Chair",
        category: "Industrial Furniture",
        role: "3D Spatial Artist",
        timeline: "Q1 2025",
        client: "Atelier Chrome",
        tools: "Rhino, V-Ray, Splines",
        description: "A sleek tubular futuristic design armchair. Crafted using continuous highly polished stainless steel chrome pipelines and premium leather supports, representing a balanced combination of Bauhaus precision and digital organic style.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-[#4a5568]">
                <!-- Left Tube Leg -->
                <path d="M35 70 L35 45 C35 38, 65 38, 65 45 L65 70" fill="none" stroke="#cbd5e0" stroke-width="4.5" stroke-linecap="round"/>
                <path d="M35 70 L35 45 C35 38, 65 38, 65 45 L65 70" fill="none" stroke="#4a5568" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Cushion Seat -->
                <rect x="30" y="52" width="40" height="6" rx="3" fill="#1a202c"/>
                <!-- Back Cushion -->
                <rect x="38" y="42" width="24" height="10" rx="2" fill="#2d3748"/>
            </svg>
        `
    },
    {
        id: 6,
        name: "Branding Typography",
        category: "Visual Identity",
        role: "Design Director",
        timeline: "Q3 2025",
        client: "Studio Sarah",
        tools: "Vector Typography",
        description: "An elegant typographic artwork displaying high design contrast. Created to push the limits of interactive online branding, making sure layout density feels beautifully calculated.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full">
                <rect x="15" y="15" width="70" height="70" rx="4" fill="#111111" />
                <text x="50%" y="54%" text-anchor="middle" font-family="'Playfair Display', serif" font-weight="400" font-size="12" fill="#fff" font-style="italic">Thorne</text>
            </svg>
        `
    },
    {
        id: 7,
        name: "Luxury Fragrance Box",
        category: "Tactile Packaging",
        role: "Structural Designer",
        timeline: "Q2 2025",
        client: "Maison d'Aura",
        tools: "ArtiosCAD, Keyshot",
        description: "A minimalist fragrance outer box featuring fine linen textures and blind-embossed brand details. A pristine study of luxury physical packaging and spatial sensory branding.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full">
                <rect x="30" y="20" width="40" height="60" rx="3" fill="#ecd5c5" stroke="#dbbca6" stroke-width="1"/>
                <line x1="30" y1="28" x2="70" y2="28" stroke="#fff" stroke-width="1" stroke-opacity="0.4"/>
                <!-- Mini Brand Label -->
                <rect x="38" y="38" width="24" height="24" fill="white" rx="1"/>
                <rect x="42" y="42" width="16" height="16" fill="none" stroke="#111" stroke-width="0.5"/>
            </svg>
        `
    },
    {
        id: 8,
        name: "Monolith Cap",
        category: "Apparel Accessory",
        role: "Product Designer",
        timeline: "Q1 2026",
        client: "Noire Concept Store",
        tools: "Embroidery CAD, Marvelous Designer",
        description: "A minimalist six-panel unstructured baseball cap made of heavy double-woven washed canvas. Featuring custom tone-on-tone sculptural typography embroidery that represents dark streetwear visual paradigms.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-neutral-800 fill-current">
                <!-- Cap Dome -->
                <path d="M 25 60 C 25 30, 75 30, 75 60 Z"/>
                <!-- Cap Brim -->
                <path d="M 22 59 C 10 58, 12 70, 32 70 C 45 70, 75 68, 77 59 Z" fill="#2d3748"/>
                <!-- Button on top -->
                <circle cx="50" cy="30" r="3" fill="#1a202c"/>
            </svg>
        `
    },
    {
        id: 9,
        name: "Retro Sunglasses",
        category: "Eyewear Design",
        role: "Lead Designer",
        timeline: "Q2 2025",
        client: "Elysium Frames",
        tools: "3D Surfaces, Rhino",
        description: "Retro-inspired statement sunglasses featuring bold tortoiseshell rims and amber-tinted polarized lenses. Crafted using bio-acetate compounds for absolute environmental compatibility.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-amber-900 fill-current">
                <!-- Sunglasses bridge -->
                <rect x="45" y="44" width="10" height="3" rx="1" fill="#e28743"/>
                <!-- Left Rim -->
                <rect x="22" y="38" width="24" height="18" rx="8" fill="#e28743" stroke="#763e1a" stroke-width="1.5"/>
                <rect x="26" y="42" width="16" height="10" rx="5" fill="#f97316" fill-opacity="0.8"/>
                <!-- Right Rim -->
                <rect x="54" y="38" width="24" height="18" rx="8" fill="#e28743" stroke="#763e1a" stroke-width="1.5"/>
                <rect x="58" y="42" width="16" height="10" rx="5" fill="#f97316" fill-opacity="0.8"/>
            </svg>
        `
    },
    {
        id: 10,
        name: "The Sculptural Vase",
        category: "Ceramic Design",
        role: "Tactile Sculptor",
        timeline: "Q4 2025",
        client: "Atelier Clay",
        tools: "Clay Sculpting, Blender 3D",
        description: "A contemporary stoneware vase with a raw tactile clay exterior and double organic handles. Merging primitive geometric craft principles with clean, high-end visual systems.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-[#eed9c4]">
                <!-- Left Handle -->
                <path d="M36 40 C24 40, 24 60, 36 60" fill="none" stroke="#eed9c4" stroke-width="3" stroke-linecap="round"/>
                <!-- Right Handle -->
                <path d="M64 40 C76 40, 76 60, 64 60" fill="none" stroke="#eed9c4" stroke-width="3" stroke-linecap="round"/>
                <!-- Vase Body -->
                <path d="M 38 28 C 36 28, 64 28, 62 28 C 66 50, 70 74, 58 78 C 50 80, 42 78, 38 74 C 30 74, 34 50, 38 28 Z" fill="#dfc0a5"/>
                <ellipse cx="50" cy="28" rx="12" ry="3" fill="#eed9c4"/>
            </svg>
        `
    },
    {
        id: 11,
        name: "Studio Fragrance No. 9",
        category: "Scent Identity",
        role: "Concept Designer",
        timeline: "Q3 2025",
        client: "Ochre Labs",
        tools: "Glass Refraction Renderer",
        description: "An elegant, heavyweight amber glass bottle containing high-end custom oil formulations. Explores structural glass weight, tactile ergonomics, and minimal label structures.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-amber-700 fill-current">
                <!-- Cap -->
                <rect x="42" y="20" width="16" height="12" rx="2" fill="#111"/>
                <rect x="47" y="31" width="6" height="3" fill="#666"/>
                <!-- Bottle Body -->
                <rect x="32" y="34" width="36" height="46" rx="5" fill="#ca8a04" fill-opacity="0.9"/>
                <!-- White Minimalist Label -->
                <rect x="38" y="44" width="24" height="24" fill="white" rx="1"/>
                <rect x="42" y="48" width="16" height="16" fill="none" stroke="#111" stroke-width="0.3"/>
                <text x="50" y="58" text-anchor="middle" font-size="3" font-family="monospace" fill="#111">N°9</text>
            </svg>
        `
    },
    {
        id: 12,
        name: "The Monograph Book",
        category: "Tactile Publishing",
        role: "Editorial Designer",
        timeline: "Q4 2025",
        client: "Phaidon Press Ltd.",
        tools: "Editorial Layout systems",
        description: "A luxury hardcover monograph detailing spatial layouts and digital typography compositions. Features an unstructured fabric spine with high-density printing details, perfect for physical coffee table appreciation.",
        visual: `
            <svg viewBox="0 0 100 100" class="w-full h-full text-neutral-200 fill-current">
                <rect x="25" y="15" width="50" height="70" rx="3" fill="#fdfbf7" stroke="#eae6dd" stroke-width="1.5"/>
                <!-- Spine -->
                <rect x="25" y="15" width="5" height="70" fill="#db2777" rx="0.5"/>
                <!-- Cover Design -->
                <circle cx="52" cy="45" r="10" fill="none" stroke="#111" stroke-width="0.5" stroke-dasharray="2 2"/>
                <line x1="38" y1="62" x2="66" y2="62" stroke="#111" stroke-width="1"/>
                <text x="52" y="70" text-anchor="middle" font-size="3" font-family="monospace" fill="#111">MONOGRAPH</text>
            </svg>
        `
    }
];

// System state
let isMockupFrame = true;
let activeTabIndex = null; // 'works', 'about', 'lab', 'contact'
let selectedItemIndex = 0; // index inside PORTFOLIO_OBJECTS
let currentRotation = 0; // ongoing rot angle in degrees
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragVelocity = 0;
let autoSpinActive = true;
let lastTime = performance.now();
let targetRotation = 0; // Target for animated snaps or ease-to-index

// Web Audio Synthesizer Controls
let audioCtx = null;
let synthEnabled = true;

// Initialize Lucide Icons
window.onload = function() {
    lucide.createIcons();
    buildCarouselRing();
    initInteractionHandlers();
    runAnimationLoop();
};

// Synthesizer Engine (Pristine interactive chimes using physical modeling approximation)
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playAmbientNote(frequency = 440, type = 'sine', duration = 1.2, volume = 0.08) {
    if (!synthEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        
        // Keep context alive
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        // Crystalline physical chime envelope (sharp attack, exponential ring out)
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
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
        playAmbientNote(600, 'triangle', 0.8, 0.06);
    } else {
        btn.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-[#333333]/40"></i>`;
        showNotification("Interface muted");
    }
    lucide.createIcons();
}

function triggerObjectChime() {
    // Synthesize high aesthetic value frequency based on current selected item's index
    const freq = 400 + (selectedItemIndex * 70);
    playAmbientNote(freq, 'triangle', 2.0, 0.12);
    // Slight echo effect
    setTimeout(() => {
        playAmbientNote(freq * 1.5, 'sine', 1.0, 0.04);
    }, 180);
}

// Toggles Mockup Frame Mode
function toggleMockupFrame() {
    isMockupFrame = !isMockupFrame;
    const webFrame = document.getElementById('web-frame');
    const backdrop = document.getElementById('backdrop-container');
    const icon = document.getElementById('frame-icon');

    playAmbientNote(350, 'sine', 0.8, 0.05);

    if (isMockupFrame) {
        // Mimic image frame
        webFrame.classList.remove('rounded-none', 'max-w-none', 'max-h-none', 'p-0', 'border-0');
        webFrame.classList.add('rounded-[32px]', 'max-w-7xl', 'max-h-[850px]', 'shadow-2xl');
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        icon.setAttribute('data-lucide', 'minimize');
    } else {
        // Edge-to-edge absolute layout
        webFrame.classList.add('rounded-none', 'max-w-none', 'max-h-none', 'p-0', 'border-0');
        webFrame.classList.remove('rounded-[32px]', 'max-w-7xl', 'max-h-[850px]', 'shadow-2xl');
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        icon.setAttribute('data-lucide', 'maximize');
    }
    lucide.createIcons();
    // recalculate coordinates
    setTimeout(updateRingSpacing, 300);
}

// Generate the 3D rotating cylindrical items
function buildCarouselRing() {
    const ring = document.getElementById('carousel-ring');
    ring.innerHTML = '';
    
    const totalItems = PORTFOLIO_OBJECTS.length;
    const radius = calculateRadius();

    PORTFOLIO_OBJECTS.forEach((item, index) => {
        const angle = index * (360 / totalItems);
        
        const card = document.createElement('div');
        card.id = `item-${index}`;
        card.className = "carousel-item absolute w-[90px] md:w-[130px] h-[120px] md:h-[160px] cursor-pointer flex flex-col justify-center items-center rounded-2xl border border-black/[0.03] bg-white/70 backdrop-blur-md shadow-sm p-4";
        
        // Cylinder mapping math formula
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        
        // Injected responsive graphic & minimal subtext
        card.innerHTML = `
            <div class="w-full h-[70%] flex items-center justify-center relative select-none pointer-events-none">
                ${item.visual}
            </div>
            <span class="text-[8px] md:text-[9px] text-center tracking-wider text-neutral-500 font-medium block mt-2 select-none truncate w-full pointer-events-none uppercase">
                ${item.name}
            </span>
        `;

        // Item Click details & chime trigger
        card.addEventListener('click', (e) => {
            // Prevent accidental click during long drag sweeps
            if (Math.abs(dragVelocity) > 0.4) return;
            e.stopPropagation();
            selectProject(index);
        });

        // Hover sound effect & pause auto-rotation
        card.addEventListener('mouseenter', () => {
            autoSpinActive = false;
            playAmbientNote(600 + (index * 40), 'sine', 0.4, 0.02);
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius + 20}px) scale(1.08)`;
        });

        card.addEventListener('mouseleave', () => {
            autoSpinActive = true;
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1)`;
        });

        ring.appendChild(card);
    });
    
    updateHighlight();
}

// Adjusts radius of carousel to match viewport size (responsive layout calculations)
function calculateRadius() {
    const width = window.innerWidth;
    if (width < 640) return 220; // smaller mobile circle
    if (width < 1024) return 330; // tablet
    return 450; // crisp wide high-fidelity desktop screen circle
}

function updateRingSpacing() {
    const totalItems = PORTFOLIO_OBJECTS.length;
    const radius = calculateRadius();
    PORTFOLIO_OBJECTS.forEach((item, index) => {
        const card = document.getElementById(`item-${index}`);
        if (card) {
            const angle = index * (360 / totalItems);
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        }
    });
}

window.addEventListener('resize', updateRingSpacing);

// Interaction Listeners & Swipe Physics Integration
function initInteractionHandlers() {
    const surface = document.getElementById('drag-surface');

    surface.addEventListener('mousedown', (e) => {
        isDragging = true;
        autoSpinActive = false;
        startX = e.clientX;
        currentX = startX;
        dragVelocity = 0;
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
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        autoSpinActive = true;
    });

    // Touch support for sleek responsive mobile sliding
    surface.addEventListener('touchstart', (e) => {
        isDragging = true;
        autoSpinActive = false;
        startX = e.touches[0].clientX;
        currentX = startX;
        dragVelocity = 0;
    });

    surface.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        startX = currentX;
        const rotationFactor = 0.35;
        currentRotation += deltaX * rotationFactor;
        dragVelocity = deltaX * rotationFactor;
    });

    surface.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        autoSpinActive = true;
    });
}

// Accessibility click helpers (forward/backward step buttons)
function rotateStep(direction) {
    autoSpinActive = false;
    const stepAngle = 360 / PORTFOLIO_OBJECTS.length;
    // Snap target rotation smoothly to neighboring elements
    const currentSnapped = Math.round(currentRotation / stepAngle) * stepAngle;
    targetRotation = currentSnapped - (direction * stepAngle);
    
    playAmbientNote(500, 'sine', 0.6, 0.04);
    
    // Temporary tween
    let count = 0;
    function animateStep() {
        if (count < 15) {
            currentRotation += (targetRotation - currentRotation) * 0.25;
            count++;
            requestAnimationFrame(animateStep);
        } else {
            currentRotation = targetRotation;
            autoSpinActive = true;
        }
    }
    animateStep();
}

// Animation Frame loop (Physics momentum modeling)
function runAnimationLoop() {
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    if (isDragging) {
        // Cap extreme velocities
        dragVelocity = Math.max(-10, Math.min(10, dragVelocity));
    } else {
        // Inertial ring slide-out
        currentRotation += dragVelocity;
        dragVelocity *= 0.94; // friction coefficient

        // Constant idle rotation when inactive
        if (autoSpinActive && Math.abs(dragVelocity) < 0.05) {
            currentRotation += 0.08; // smooth constant drift
        }
    }

    // Apply rotation matrices to physical element
    const ring = document.getElementById('carousel-ring');
    ring.style.transform = `rotateY(${currentRotation}deg)`;

    // Figure out which card is currently closest to the front projection camera center
    calculateClosestFrontItem();

    requestAnimationFrame(runAnimationLoop);
}

// Identify front-facing active items & apply blur/focus shadows dynamically
function calculateClosestFrontItem() {
    const totalItems = PORTFOLIO_OBJECTS.length;
    const stepAngle = 360 / totalItems;
    
    // Normalize ongoing rotation angle between 0 and 360 degrees
    let normalizedRotation = (-currentRotation) % 360;
    if (normalizedRotation < 0) normalizedRotation += 360;

    const closestIndex = Math.round(normalizedRotation / stepAngle) % totalItems;
    
    if (closestIndex !== selectedItemIndex) {
        selectedItemIndex = closestIndex;
        updateHighlight();
        // Tick audio generator lightly on each cylinder segment pass
        playAmbientNote(200, 'triangle', 0.15, 0.015);
    }
}

// Highlighting active nodes and dimming distant backplane cards
function updateHighlight() {
    const totalItems = PORTFOLIO_OBJECTS.length;
    
    for (let i = 0; i < totalItems; i++) {
        const card = document.getElementById(`item-${i}`);
        if (!card) continue;

        if (i === selectedItemIndex) {
            card.classList.remove('opacity-50', 'blur-[1.5px]');
            card.classList.add('opacity-100', 'border-sky-200', 'scale-105', 'z-30');
            
            // Update active bottom indicators
            document.getElementById('active-item-index').innerText = String(i + 1).padStart(2, '0');
            document.getElementById('active-item-name').innerText = PORTFOLIO_OBJECTS[i].name.toUpperCase();
        } else {
            card.classList.remove('opacity-100', 'border-sky-200', 'scale-105', 'z-30');
            card.classList.add('opacity-50', 'blur-[1.5px]');
        }
    }
}

// UI navigation interactions
function openTab(tabId) {
    // Remove underline highlight from all nav anchors
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-black', 'border-black');
        link.classList.add('text-[#333333]/60', 'border-transparent');
    });

    // Add back to correct tab
    const sender = event ? event.currentTarget : null;
    if (sender) {
        sender.classList.remove('text-[#333333]/60', 'border-transparent');
        sender.classList.add('text-black', 'border-black');
    }

    playAmbientNote(400, 'sine', 0.5, 0.05);

    // Toggle sliding panels
    const tabs = ['about', 'lab', 'contact'];
    tabs.forEach(t => {
        const panel = document.getElementById(`tab-${t}`);
        if (t === tabId) {
            panel.classList.remove('translate-y-full');
        } else {
            panel.classList.add('translate-y-full');
        }
    });
}

function closeActiveTab() {
    const tabs = ['about', 'lab', 'contact'];
    tabs.forEach(t => {
        document.getElementById(`tab-${t}`).classList.add('translate-y-full');
    });

    // Set projects as highlighted
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-black', 'border-black');
        link.classList.add('text-[#333333]/60', 'border-transparent');
    });
    const firstLink = document.querySelectorAll('.nav-link')[0];
    firstLink.classList.remove('text-[#333333]/60', 'border-transparent');
    firstLink.classList.add('text-black', 'border-black');

    playAmbientNote(300, 'sine', 0.5, 0.03);
}

// Project selection - slide out details card drawer
function selectProject(index) {
    const item = PORTFOLIO_OBJECTS[index];
    selectedItemIndex = index;
    updateHighlight();

    // Populate text elements
    document.getElementById('drawer-title').innerText = item.name;
    document.getElementById('drawer-category').innerText = item.category.toUpperCase();
    document.getElementById('drawer-role').innerText = item.role;
    document.getElementById('drawer-timeline').innerText = item.timeline;
    document.getElementById('drawer-client').innerText = item.client;
    document.getElementById('drawer-tools').innerText = item.tools;
    document.getElementById('drawer-description').innerText = item.description;

    // Clone graphic to drawer visualization section
    const container = document.getElementById('drawer-visual-container');
    container.innerHTML = item.visual;

    // Trigger slides
    const drawer = document.getElementById('detail-drawer');
    drawer.classList.remove('translate-x-full');

    // Sound design chimes
    playAmbientNote(450, 'triangle', 1.5, 0.08);
    setTimeout(() => {
        playAmbientNote(900, 'sine', 0.8, 0.03);
    }, 100);
}

function closeDetails() {
    document.getElementById('detail-drawer').classList.add('translate-x-full');
    playAmbientNote(350, 'sine', 0.4, 0.04);
}

// Randomize visual color palettes (Aesthetic Lab Sketch demo)
function randomizePalette() {
    const palettes = [
        { bg: '#f6f5f3', accent: 'rgba(186, 230, 253, 0.35)', desc: 'Warm Ivory & Powder Sky' },
        { bg: '#faf6f0', accent: 'rgba(253, 186, 116, 0.25)', desc: 'Sandstone & Soft Citrus' },
        { bg: '#f0f5f5', accent: 'rgba(110, 231, 183, 0.25)', desc: 'Crystalline Glacier & Mint' },
        { bg: '#faf0f5', accent: 'rgba(244, 114, 182, 0.2)', desc: 'Blush Velvet & Rose Petal' }
    ];

    const sel = palettes[Math.floor(Math.random() * palettes.length)];
    const webFrame = document.getElementById('web-frame');
    webFrame.style.backgroundColor = sel.bg;
    
    showNotification(`Palette shifted to: ${sel.desc}`);
    playAmbientNote(520, 'sine', 1.0, 0.05);
}

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
    document.getElementById('notification-text').innerText = text;
    
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 3000);
}

function viewFullCase() {
    showNotification(`Launching full case study detail window...`);
    playAmbientNote(700, 'sine', 1.0, 0.05);
}

function shareProject() {
    // Safe fallback for clipboard copying inside sandbox containers
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href + `?project=${PORTFOLIO_OBJECTS[selectedItemIndex].id}`;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    showNotification("Case study URL copied to clipboard!");
    playAmbientNote(800, 'sine', 0.6, 0.05);
}
