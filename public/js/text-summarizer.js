async function detectLanguage(text) {
  const prompt = `Detecta exclusivamente el idioma del siguiente texto y responde solo con el nombre del idioma en inglés, sin más texto:

Texto:
${text}`;

  const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  const lang = await response.text();
  return lang.trim();
}

async function summarizeText(text) {
  const prompt = `Resume el siguiente texto de forma breve y concisa, sin agregar explicaciones ni saludos, ni despedidas, ni opiniones.

Texto:
${text}`;

  const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  const summary = await response.text();
  return summary.trim();
}

async function translateText(text, targetLanguage) {
  const prompt = `Traduce el siguiente texto al idioma ${targetLanguage} sin agregar nada más:

Texto:
${text}`;

  const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  const translation = await response.text();
  return translation.trim();
}

// Ejemplo de uso completo:
document.getElementById('generate-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('prompt').value.trim();
  const resultEl = document.getElementById('result');

  if (!userInput) {
    resultEl.textContent = 'Please write something to generate.';
    return;
  }

  resultEl.textContent = 'Detecting language...';

  try {
    const detectedLanguage = await detectLanguage(userInput);
    resultEl.textContent = `Detected language: ${detectedLanguage}. Summarizing...`;

    const summary = await summarizeText(userInput);

    const translate = await translateText

    // Si quieres traducir el resumen al idioma detectado (por si cambia el idioma), descomenta:
    const finalText = await translateText(summary, detectedLanguage);
    resultEl.textContent = finalText;

  } catch (error) {
    console.error('Error:', error);
    resultEl.textContent = 'Error generating text.';
  }
});

document.getElementById('copy-btn').addEventListener('click', () => {
  const text = document.getElementById('result').textContent;

  if (!text) {
    alert('No text to copy.');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => alert('Text copied to clipboard.'))
    .catch(() => alert('Could not copy text.'));
});

