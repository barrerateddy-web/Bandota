#!/usr/bin/env node
// Edita una imagen existente con la API de OpenAI (gpt-image-1) y guarda el resultado.
// Uso: node scripts/edit-image.mjs "<prompt>" <ruta-imagen-entrada> <ruta-salida> [tamaño]
//
// La API key se resuelve igual que en generate-image.mjs: OPENAI_API_KEY,
// o un "API credential" del entorno cloud si esa función existe en la cuenta.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, basename } from "node:path";

const [, , prompt, inputPath, outputPath, size = "1024x1024"] = process.argv;

if (!prompt || !inputPath || !outputPath) {
  console.error(
    'Uso: node scripts/edit-image.mjs "<prompt>" <imagen-entrada> <ruta-salida> [tamaño]'
  );
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;

const imageBuffer = await readFile(inputPath);
const form = new FormData();
form.append("model", "gpt-image-1");
form.append("prompt", prompt);
form.append("size", size);
form.append("image", new Blob([imageBuffer]), basename(inputPath));

const response = await fetch("https://api.openai.com/v1/images/edits", {
  method: "POST",
  headers: {
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
  },
  body: form,
});

if (!response.ok) {
  const text = await response.text();
  console.error(`Error de la API de OpenAI (${response.status}): ${text}`);
  process.exit(1);
}

const data = await response.json();
const b64 = data?.data?.[0]?.b64_json;
if (!b64) {
  console.error("La respuesta no incluyó una imagen.");
  process.exit(1);
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.from(b64, "base64"));
console.log(`Imagen guardada en ${outputPath}`);
