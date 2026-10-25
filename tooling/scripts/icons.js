import { createIcons, Volume2, VolumeX, Maximize, Minimize, LayoutGrid,
    Rotate3d, ArrowLeft, ArrowRight, X, Info } from 'lucide';

// Only ship the icons used by the existing interface.
const icons = { Volume2, VolumeX, Maximize, Minimize, LayoutGrid,
    Rotate3d, ArrowLeft, ArrowRight, X, Info };
window.lucide = { createIcons: () => createIcons({ icons }) };
