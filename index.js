//@ts-check
'use strict';

const path = require('path');
const ugly = require('uglify-js');
const fs = require('fs');
const obfuscator = require('javascript-obfuscator');
const inputPath = path.resolve(__dirname, 'input.js');

const file = fs.readFileSync(inputPath, { encoding: 'utf-8' });

const obf =
    '"use strict";' +
    obfuscator
        .obfuscate(file, {
            optionsPreset: 'medium-obfuscation',
            identifierNamesGenerator: 'mangled-shuffled',
            stringArrayEncoding: ['rc4'],
            stringArrayWrappersType: 'variable',
            stringArrayThreshold: 1,
            deadCodeInjectionThreshold: 1,
        })
        .getObfuscatedCode();
const min = ugly.minify(obf).code;

const outPath = path.resolve(__dirname, 'dist', 'out.js');

// Create the directory if it doesn't exist
if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
}

// Write the file
fs.writeFileSync(outPath, min);
// fs.appendFileSync(outPath, obf);

// fs.writeFileSync(outPath, obf);

// const crypto = require("crypto")

// crypto
