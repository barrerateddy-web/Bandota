#!/usr/bin/env node
// Genera una imagen con la API de OpenAI (gpt-image-1) y la guarda en disco.
// Uso: node scripts/generate-image.mjs "<prompt>" <ruta-salida.png|.webp> [tamaño]
// Requiere la variable de entorno OPENAI_API_KEY.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const [, , prompt, outputPath, size = "1024x1024"] = process.argv;

if (!prompt || !outputPath) {
  console.error(
    'Uso: node scripts/generate-image.mjs "<prompt>" <ruta-salida> [tamaño]'
  );
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Falta la variable de entorno OPENAI_API_KEY.");
  process.exit(1);
}

const response = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-image-1",
    prompt,
    size,
    n: 1,
  }),
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
