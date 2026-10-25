const { execFileSync } = require('node:child_process');
const { mkdirSync, copyFileSync } = require('node:fs');
const { join, dirname } = require('node:path');
const { buildSync } = require('esbuild');
const root = join(__dirname, '../..');

execFileSync(process.execPath, [require.resolve('tailwindcss/lib/cli.js'),
    '-c', 'tooling/tailwind.config.cjs', '-i', 'tooling/css/tailwind.input.css',
    '-o', 'css/utilities.css', '--minify'], { cwd: root, stdio: 'inherit' });
mkdirSync(join(root, 'js/vendor'), { recursive: true });
buildSync({ entryPoints: [join(__dirname, 'icons.js')],
    outfile: join(root, 'js/vendor/icons.js'), bundle: true,
    minify: true, format: 'iife', target: ['es2020'], legalComments: 'eof' });
// Keep third-party licenses with the checked-in assets.
mkdirSync(join(root, 'licenses'), { recursive: true });
for (const name of ['tailwindcss', 'lucide']) {
    copyFileSync(join(dirname(require.resolve(`${name}/package.json`)), 'LICENSE'),
        join(root, 'licenses', `${name}.txt`));
}
