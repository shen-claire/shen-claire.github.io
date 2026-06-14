// 1. DATA MODEL 
const PORTFOLIO_OBJECTS = [
    {
        id: "nebula-ring",
        title: "Nebula Ring",
        category: "Digital Sculpture",
        role: "Creative Direction & Dev",
        timeline: "Q1 2026",
        client: "Aethel Luxury",
        tools: "Procedural CAD, Rhino 3D",
        story: "An exploration of organic algorithms constrained within precious boundaries. The design features micro-droplets of gold mathematically generated around raw minerals, representing celestial dust.",
        soundFreq: 440,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "aura-shell",
        title: "Aura Shell",
        category: "Exoskeletal Jewelry",
        role: "Structural Modeling",
        timeline: "Q3 2025",
        client: "Siren & Co.",
        tools: "Grasshopper, SLA Printing",
        story: "Designed directly around ergonomic hand scans to construct a protective shield that feels like an second skin. Highly polished fluid channels catch sunlight playfully.",
        soundFreq: 494,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "gravity-node",
        title: "Gravity Node",
        category: "Generative Pendants",
        role: "Parametric Design",
        timeline: "Q4 2025",
        client: "Vectra Labs",
        tools: "Blender Geometry Nodes",
        story: "Visualizing gravitational ripples pulling structural golden vectors toward a centralized obsidian gravity well. Rendered at extreme precision to allow for micro-injection molding.",
        soundFreq: 523,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "quantum-helix",
        title: "Quantum Helix",
        category: "Dynamic Wearables",
        role: "Interaction Design",
        timeline: "Q2 2026",
        client: "Personal Experiment",
        tools: "Shapr3D, CNC Plating",
        story: "Bespoke continuous helix links that weave dynamically over finger joints. Features intricate, hidden double-hinges to guarantee complete range of tactile movement.",
        soundFreq: 587,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "eclipse-crown",
        title: "Eclipse Crown",
        category: "Conceptual Headpieces",
        role: "Aesthetic Design",
        timeline: "Q2 2025",
        client: "Studio Thorne",
        tools: "ZBrush, Titanium Sintering",
        story: "A regal, sweeping headpiece showcasing sharp contrasts between raw volcanic textures and absolute mirror finishes, capturing the transition of solar occlusions.",
        soundFreq: 659,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"
    }
];

// 2. STATE MANAGER
let selectedItemIndex = 0;
let isDragging = false;
let startX = 0;
let currentRotation = 0;
let baseRotation = 0;
let isAudioEnabled = true;
let audioCtx = null;

// Backdrop preset palettes matching original look
const BACKDROP_PALETTES = [
    { bg: "radial-gradient(circle at 50% 40%, #b3cddb 0%, #7b9eb3 100%)", ringColor: "border-amber-400/25", frameBg: "#f6f5f3" },
    { bg: "radial-gradient(circle at 50% 40%, #e3c4bc 0%, #a98075 100%)", ringColor: "border-amber-500/20", frameBg: "#f8f4f1" },
    { bg: "radial-gradient(circle at 50% 40%, #cad1c3 0%, #87927f 100%)", ringColor: "border-emerald-300/15", frameBg: "#f3f4f1" },
    { bg: "radial-gradient(circle at 50% 40%, #cfc0db 0%, #8c769e 100%)", ringColor: "border-purple-300/15", frameBg: "#f6f2f8" },
    { bg: "radial-gradient(circle at 50% 40%, #2b303c 0%, #111318 100%)", ringColor: "border-white/10", frameBg: "#16171a" }
];

// 3. ENGINE INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initRing();
    updateActiveMetadata();

    // Attach Interactivity Hooks
    const dragSurface = document.getElementById("drag-surface");
    
    dragSurface.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);

    dragSurface.addEventListener("touchstart", (e) => dragStart(e.touches[0]), { passive: true });
    document.addEventListener("touchmove", (e) => dragMove(e.touches[0]), { passive: false });
    document.addEventListener("touchend", dragEnd);

    // Keyboard bindings
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") rotateStep(-1);
        if (e.key === "ArrowRight") rotateStep(1);
    });
});

// 4. 3D CARD RENDERING (Injecting Image/Photos)
function initRing() {
    const ring = document.getElementById("carousel-ring");
    ring.innerHTML = "";

    const count = PORTFOLIO_OBJECTS.length;
    const angleIncrement = 360 / count;
    // Compute distance radius dynamically for clean spatial density
    const radius = Math.round(100 / Math.tan(Math.PI / count));

    PORTFOLIO_OBJECTS.forEach((obj, idx) => {
        const itemAngle = idx * angleIncrement;
        const card = document.createElement("div");
        
        card.id = `item-${idx}`;
        // Exact original dimensions, colors, borders, and backdrop-blur
        card.className = "carousel-item absolute w-36 h-48 md:w-44 md:h-60 rounded-2xl border border-black/[0.04] bg-white/40 backdrop-blur-md shadow-sm flex flex-col justify-between p-4 cursor-pointer transition-all duration-300";
        card.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
        
        // Dynamic HTML card structure replacing SVG renders with premium photos/images
        card.innerHTML = `
            <div class="w-full flex justify-between items-center z-10">
                <span class="text-[9px] font-mono font-medium text-neutral-400">0${idx+1}</span>
                <div class="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
            </div>
            
            <!-- Picture container placeholder inside the card frame -->
            <div class="flex-1 w-full flex items-center justify-center py-2 overflow-hidden pointer-events-none z-10">
                <img src="${obj.image}" alt="${obj.title}" class="w-[85%] h-[85%] object-cover rounded-lg shadow-inner-sm transition-transform duration-500 hover:scale-105">
            </div>
            
            <div class="w-full text-left z-10">
                <h4 class="serif-font text-xs text-neutral-800 italic">${obj.title}</h4>
                <p class="text-[8px] tracking-widest text-neutral-400 uppercase mt-0.5">${obj.category}</p>
            </div>
            
            <!-- Beautiful background light refraction effects within glassmorphic card -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
        `;

        // Direct click targeting to rotate to clicked card, or open if active
        card.addEventListener("click", () => {
            if (idx === selectedItemIndex) {
                openDetails();
            } else {
                navigateToIndex(idx);
            }
        });

        ring.appendChild(card);
    });

    applyRotationState();
}

// 5. CAROUSEL SPINNING LOGIC
function dragStart(e) {
    isDragging = true;
    startX = e.clientX;
    document.getElementById("carousel-ring").style.transition = "none";
}

function dragMove(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    // Map drag distance into rotation parameters
    currentRotation = baseRotation + (deltaX * 0.25);
    
    document.getElementById("carousel-ring").style.transform = `rotateY(${currentRotation}deg)`;
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const ring = document.getElementById("carousel-ring");
    ring.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    
    const count = PORTFOLIO_OBJECTS.length;
    const angleStep = 360 / count;
    
    // Snap-to angle logic
    let normalizedRot = currentRotation % 360;
    if (normalizedRot > 180) normalizedRot -= 360;
    if (normalizedRot < -180) normalizedRot += 360;
    
    const nearestIndex = Math.round(-normalizedRot / angleStep);
    selectedItemIndex = (nearestIndex + count) % count;
    
    currentRotation = -selectedItemIndex * angleStep;
    baseRotation = currentRotation;
    
    applyRotationState();
    updateActiveMetadata();
    playAmbientNote(PORTFOLIO_OBJECTS[selectedItemIndex].soundFreq, 'sine', 0.15, 0.08);
}

function rotateStep(dir) {
    const count = PORTFOLIO_OBJECTS.length;
    let targetIdx = (selectedItemIndex + dir + count) % count;
    navigateToIndex(targetIdx);
}

function navigateToIndex(idx) {
    selectedItemIndex = idx;
    const count = PORTFOLIO_OBJECTS.length;
    currentRotation = -selectedItemIndex * (360 / count);
    baseRotation = currentRotation;
    
    const ring = document.getElementById("carousel-ring");
    ring.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    
    applyRotationState();
    updateActiveMetadata();
    playAmbientNote(PORTFOLIO_OBJECTS[selectedItemIndex].soundFreq, 'sine', 0.15, 0.08);
}

function applyRotationState() {
    document.getElementById("carousel-ring").style.transform = `rotateY(${currentRotation}deg)`;
    
    // Manage visual focus states of cards
    const count = PORTFOLIO_OBJECTS.length;
    for (let i = 0; i < count; i++) {
        const card = document.getElementById(`item-${i}`);
        if (!card) continue;
        
        if (i === selectedItemIndex) {
            card.style.filter = "none";
            card.style.opacity = "1";
        } else {
            // Apply slight blur and dimming to unfocused works
            card.style.filter = "brightness(0.7) blur(0.5px)";
            card.style.opacity = "0.6";
        }
    }
}

function updateActiveMetadata() {
    const current = PORTFOLIO_OBJECTS[selectedItemIndex];
    
    document.getElementById("active-item-index").innerText = `0${selectedItemIndex + 1}`;
    
    // Soft metadata transitions
    const nameSpan = document.getElementById("active-item-name");
    nameSpan.style.opacity = "0";
    
    const hintHeader = document.getElementById("carousel-title-hint");
    hintHeader.style.opacity = "0";
    
    setTimeout(() => {
        nameSpan.innerText = `${current.title} — ${current.category}`;
        nameSpan.style.opacity = "1";
        
        hintHeader.innerText = current.title;
        hintHeader.style.opacity = "0.85";
    }, 200);
}

// 6. DETAILED DRAWER MODULE
function openDetails() {
    const current = PORTFOLIO_OBJECTS[selectedItemIndex];
    
    // Inject correct text fields
    document.getElementById("drawer-category").innerText = current.category;
    document.getElementById("drawer-title").innerText = current.title;
    document.getElementById("drawer-role").innerText = current.role;
    document.getElementById("drawer-timeline").innerText = current.timeline;
    document.getElementById("drawer-client").innerText = current.client;
    document.getElementById("drawer-tools").innerText = current.tools;
    document.getElementById("drawer-description").innerText = current.story;
    
    // INJECT DETAILED WORK PHOTOGRAPHY SHOWCASE INSTEAD OF VECTOR DRAFTS
    const container = document.getElementById("drawer-visual-container");
    container.innerHTML = `
        <img src="${current.image}" alt="${current.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
    `;

    // Slide-out Drawer interaction animation
    const drawer = document.getElementById("detail-drawer");
    drawer.classList.remove("translate-x-full");
    
    playAmbientNote(600, 'triangle', 0.15, 0.25);
}

function closeDetails() {
    const drawer = document.getElementById("detail-drawer");
    drawer.classList.add("translate-x-full");
    playAmbientNote(200, 'sine', 0.2, 0.1);
}

// 7. EXTERNAL TABS (About, Lab, Contact Panels)
function openTab(tabId) {
    // Hide active tabs first
    const overlays = ["about", "lab", "contact"];
    overlays.forEach(id => {
        document.getElementById(`tab-${id}`).classList.add("translate-y-full");
    });
    
    // Open target overlay screen
    const target = document.getElementById(`tab-${tabId}`);
    if (target) {
        target.classList.remove("translate-y-full");
        playAmbientNote(500, 'sine', 0.1, 0.2);
    }
}

function closeActiveTab() {
    const overlays = ["about", "lab", "contact"];
    overlays.forEach(id => {
        document.getElementById(`tab-${id}`).classList.add("translate-y-full");
    });
    playAmbientNote(300, 'sine', 0.1, 0.1);
}

// Form inquiries
function handleInquirySubmit(e) {
    e.preventDefault();
    showNotification("Inquiry sent securely to Studio Thorne");
    setTimeout(() => {
        closeActiveTab();
    }, 1500);
}

// 8. RANDOM PALETTE ENGINE (Preserves visual cohesion!)
function randomizePalette() {
    const randomIndex = Math.floor(Math.random() * BACKDROP_PALETTES.length);
    const selected = BACKDROP_PALETTES[randomIndex];
    
    // Update ambient backdrop element colors
    const backdrop = document.getElementById("backdrop-container");
    backdrop.style.background = selected.bg;
    
    // Apply styling to frame border ring inside
    const refractingRing = document.querySelector("#backdrop-container div div");
    refractingRing.className = `w-[85%] h-[85%] rounded-full border-[22px] ${selected.ringColor} blur-sm animate-[spin_120s_linear_infinite]`;
    
    // Shift layout workspace background variables dynamically
    const frame = document.getElementById("web-frame");
    frame.style.backgroundColor = selected.frameBg;
    
    showNotification("Visual environment colorway adjusted");
    playAmbientNote(650, 'sine', 0.1, 0.1);
}

// 9. SCREEN MODES (Mockup Frame versus Fullscreen Mode)
function toggleMockupFrame() {
    const wrapper = document.getElementById("wrapper");
    const frame = document.getElementById("web-frame");
    const icon = document.getElementById("frame-icon");
    
    if (frame.classList.contains("max-h-[850px]")) {
        // Expand to Fullscreen workspace
        wrapper.className = "absolute inset-0 z-10";
        frame.className = "mockup-frame w-full h-full bg-[#f6f5f3] flex flex-col justify-between overflow-hidden relative pointer-events-auto transition-all duration-700";
        icon.setAttribute("data-lucide", "maximize");
        showNotification("Viewing in Fullscreen Canvas");
    } else {
        // Restrict to Realistic Desktop Frame mockup view
        wrapper.className = "absolute inset-0 flex items-center justify-center p-4 md:p-12 z-10";
        frame.className = "mockup-frame w-full h-full bg-[#f6f5f3] rounded-[32px] shadow-2xl border border-white/30 flex flex-col justify-between overflow-hidden relative pointer-events-auto max-w-7xl max-h-[850px] transition-all duration-700";
        icon.setAttribute("data-lucide", "minimize");
        showNotification("Viewing inside Mockup Studio Frame");
    }
    lucide.createIcons();
    playAmbientNote(400, 'sine', 0.1, 0.1);
}

// 10. WEBAUDIO AMBIENT SYNTHESIZER (Completely self-contained!)
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playAmbientNote(frequency, type = 'sine', volume = 0.2, duration = 0.1) {
    if (!isAudioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
        console.warn("Audio element blocked by user gesture settings.");
    }
}

function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    const button = document.getElementById("audio-toggle");
    
    if (isAudioEnabled) {
        button.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4 text-[#333333] scale-110 transition-transform"></i>`;
        playAmbientNote(440, 'sine', 0.15, 0.08);
        showNotification("Ambient Audio Feedback Activated");
    } else {
        button.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-[#333333]/40 transition-transform"></i>`;
        showNotification("Ambient Feedback Muted");
    }
    lucide.createIcons();
}

function triggerObjectChime() {
    const current = PORTFOLIO_OBJECTS[selectedItemIndex];
    playAmbientNote(current.soundFreq * 1.5, 'triangle', 0.2, 0.4);
    showNotification(`Aesthetic sound waves projected: ${current.soundFreq * 1.5}Hz`);
}

// Custom micro-notification systems
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
    playAmbientNote(700, 'sine', 0.3, 0.05);
}

function shareProject() {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href + `?project=${PORTFOLIO_OBJECTS[selectedItemIndex].id}`;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    showNotification("Case study URL copied to clipboard!");
    playAmbientNote(800, 'sine', 0.2, 0.05);
}
