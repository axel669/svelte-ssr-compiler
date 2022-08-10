#!/usr/bin/env node

import fs from "fs-jetpack"
import { compile } from "svelte/compiler"

const [, , source] = process.argv
const options = {
    generate: "ssr",
    format: "esm",
    css: false
}

const files = fs.find(
    source,
    { matching: "**/*.svelte" }
)

for (const file of files) {
    const dest = file.replace(/\.svelte$/, ".mjs")

    console.log(`Compile: ${file}`)
    const result = compile(
        fs.read(file),
        options
    )
    fs.write(dest, result.js.code)
}
