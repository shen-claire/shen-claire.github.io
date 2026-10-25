// Deterministic clocks exercise animation timing and pause/resume without a browser.
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const source = readFileSync(join(__dirname, '../../js/portfolio.js'), 'utf8');

function simulation() {
    const frames = new Map();
    let nextId = 0;
    const context = vm.createContext({
        document: { hidden: false, addEventListener() {},
            getElementById: () => ({ addEventListener() {} }) },
        window: { addEventListener() {} },
        requestAnimationFrame: callback => { frames.set(++nextId, callback); return nextId; },
        cancelAnimationFrame: id => frames.delete(id),
        console
    });
    vm.runInContext(source, context);
    vm.runInContext('calculateClosestFrontItem = () => {}; carouselRing = { style: {} };', context);
    return {
        run: code => vm.runInContext(code, context),
        pending: () => frames.size,
        tick(now) {
            const batch = [...frames.values()];
            frames.clear();
            batch.forEach(callback => callback(now));
        }
    };
}

function driftAt(hz) {
    const clock = simulation();
    clock.run('wakeAnimationLoop()');
    clock.tick(1);
    for (let i = 1; i <= hz; i++) clock.tick(1 + i * 1000 / hz);
    return clock.run('currentRotation');
}
assert.ok(Math.abs(driftAt(60) - driftAt(120)) < 0.00001, 'Drift should match at 60 and 120Hz');
assert.ok(Math.abs(driftAt(60) - driftAt(144)) < 0.00001, 'Drift should match at 144Hz');

for (const state of ["activePage = 'about'", "activePage = 'contact'", 'document.hidden = true',
    'isGridView = true', 'isDetailOpen = true', 'isGalleryTransitioning = true']) {
    const clock = simulation();
    clock.run('wakeAnimationLoop(); wakeAnimationLoop()');
    assert.equal(clock.pending(), 1, 'Only one animation callback should be scheduled');
    clock.run(state);
    clock.tick(1);
    assert.equal(clock.pending(), 0, `Animation must stop: ${state}`);
}

const resumed = simulation();
resumed.run('wakeAnimationLoop()');
resumed.tick(1);
const beforePause = resumed.run('currentRotation');
resumed.run('pauseAnimationLoop()');
assert.equal(resumed.pending(), 0);
resumed.run('wakeAnimationLoop()');
resumed.tick(600001);
assert.ok(Math.abs(resumed.run('currentRotation') - beforePause - 0.08) < 0.00001,
    'Resuming should not jump to catch up with hidden time');

const sizing = simulation();
sizing.run('scheduleArtworkFit(); scheduleArtworkFit(); scheduleArtworkFit()');
assert.equal(sizing.pending(), 1, 'Repeated resize notifications should share one callback');

for (const hz of [60, 120, 144]) {
    const clock = simulation();
    clock.run('autoSpinActive = false; targetRotation = -40; stepTween = { elapsed: 0 }; wakeAnimationLoop()');
    clock.tick(1);
    for (let i = 1; i <= Math.ceil(hz * 0.25); i++) clock.tick(1 + i * 1000 / hz);
    assert.equal(clock.run('stepTween'), null, 'Arrow step must finish in about 250ms');
    assert.ok(Math.abs(clock.run('currentRotation') + 40) < 0.2, 'Arrow step should reach the same painting');
}
console.log('PASS: refresh-rate timing, hidden-view suspension, single animation clock, resume, resize batching, arrow steps');
