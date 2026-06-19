const PORTFOLIO_OBJECTS = [
    {
        id: 1,
        name: "Project One Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "Q1 2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your first project goes here. It will display inside the side panel when clicked.",
        visual: `<img src="img/Through_the_Looking_Glass.jpeg" alt="Project 1" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 2,
        name: "Project Two Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "Q2 2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your second project goes here.",
        visual: `<img src="img/IMG_9129.jpeg" alt="Project 2" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 3,
        name: "Project Three Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "Q3 2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your third project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 3" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 4,
        name: "Project Four Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "Q4 2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your fourth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 4" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 5,
        name: "Project Five Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your fifth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 5" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 6,
        name: "Project Six Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your sixth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 6" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 7,
        name: "Project Seven Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2026",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your seventh project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 7" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 8,
        name: "Project Eight Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2025",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your eighth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 8" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 9,
        name: "Project Nine Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2025",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your ninth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 9" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 10,
        name: "Project Ten Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2025",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your tenth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 10" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 11,
        name: "Project Eleven Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2025",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your eleventh project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 11" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
    },
    {
        id: 12,
        name: "Project Twelve Title",
        category: "Category Here",
        role: "Your Role",
        timeline: "2025",
        client: "Client Name",
        tools: "Tools Used",
        description: "A short, simple description of your twelfth project goes here.",
        visual: `<img src="img/IMG_9120.jpeg" alt="Project 12" class="w-full h-full object-cover rounded-xl drop-shadow-sm">`
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
    if (ring) {
        ring.style.transform = `rotateY(${currentRotation}deg)`;
    }

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
// Highlighting active nodes and dimming distant backplane cards
function updateHighlight() {
    const totalItems = PORTFOLIO_OBJECTS.length;
    const radius = calculateRadius();
    
    for (let i = 0; i < totalItems; i++) {
        const card = document.getElementById(`item-${i}`);
        if (!card) continue;

        const angle = i * (360 / totalItems);

        if (i === selectedItemIndex) {
            card.classList.remove('opacity-50', 'blur-[1.5px]');
            card.classList.add('opacity-100', 'border-sky-200', 'z-30');
            
            // Pop the item closer to the screen (radius + 30) and make it larger (scale(1.3))
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius + 30}px) scale(1.3)`;
            
            // Update active bottom indicators
            const indexEl = document.getElementById('active-item-index');
            const nameEl = document.getElementById('active-item-name');
            if (indexEl) indexEl.innerText = String(i + 1).padStart(2, '0');
            if (nameEl) nameEl.innerText = PORTFOLIO_OBJECTS[i].name.toUpperCase();
        } else {
            card.classList.remove('opacity-100', 'border-sky-200', 'z-30');
            card.classList.add('opacity-50', 'blur-[1.5px]');
            
            // Keep normal items at standard radius and regular scale(1)
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1)`;
        }
    }
}

// UI navigation interactions
function openTab(tabId, event) {
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
        if (panel) {
            if (t === tabId) {
                panel.classList.remove('translate-y-full');
            } else {
                panel.classList.add('translate-y-full');
            }
        }
    });
}

function closeActiveTab() {
    const tabs = ['about', 'lab', 'contact'];
    tabs.forEach(t => {
        const panel = document.getElementById(`tab-${t}`);
        if (panel) panel.classList.add('translate-y-full');
    });

    // Set projects as highlighted
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
    if (container) container.innerHTML = item.visual;

    // Trigger slides
    const drawer = document.getElementById('detail-drawer');
    if (drawer) drawer.classList.remove('translate-x-full');

    // Sound design chimes
    playAmbientNote(450, 'triangle', 1.5, 0.08);
    setTimeout(() => {
        playAmbientNote(900, 'sine', 0.8, 0.03);
    }, 100);
}

function closeDetails() {
    const drawer = document.getElementById('detail-drawer');
    if (drawer) drawer.classList.add('translate-x-full');
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
    if (webFrame) webFrame.style.backgroundColor = sel.bg;
    
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

// Open Full-Screen Art Lightbox with Awards
function initLightboxViewer() {
    const drawerVisual = document.getElementById('drawer-visual-container');
    const lightbox = document.getElementById('art-lightbox');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxAwards = document.getElementById('lightbox-awards');

    if (!drawerVisual || !lightbox) return;

    // Make the side panel image container look clickable
    drawerVisual.classList.add('cursor-zoom-in');

    // When clicking the side panel image
    drawerVisual.addEventListener('click', () => {
        const currentArtwork = PORTFOLIO_OBJECTS[selectedItemIndex];
        
        // Clone the img into the lightbox and style it to fit the screen
        lightboxImgContainer.innerHTML = currentArtwork.visual;
        const img = lightboxImgContainer.querySelector('img');
        if (img) {
            img.className = "max-w-[90vw] max-h-[80vh] object-contain rounded-lg";
        }

        // Inject Award information if it exists
        if (currentArtwork.awards) {
            lightboxAwards.innerHTML = currentArtwork.awards;
            lightboxAwards.classList.remove('hidden');
        } else {
            lightboxAwards.innerHTML = "";
            lightboxAwards.classList.add('hidden');
        }

        // Fade in lightbox
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
    });

    // Close lightbox when clicking anywhere on the dark screen
    lightbox.addEventListener('click', () => {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
    });
}

// Call this function inside window.onload to initialize it
const originalOnload = window.onload;
window.onload = function() {
    if (originalOnload) originalOnload();
    initLightboxViewer();
};
