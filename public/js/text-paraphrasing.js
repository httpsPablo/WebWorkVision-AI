document.getElementById('generate-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('prompt').value.trim();
  const resultEl = document.getElementById('result');

  if (!userInput) {
    resultEl.textContent = 'Por favor, escribí algo para generar.';
    return;
  }

  const prompt = `parafrasea el siguiente contenido de forma natural, clara y sin introducciones ni despedidas: ${userInput}`;

  resultEl.textContent = 'Generando texto...';

  try {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
    const rawText = await response.text();

    const cleanText = rawText.replace(/^(claro|aquí tienes|vale|por supuesto)[^\n]*\n?/i, '').trim();
    resultEl.textContent = cleanText || 'No se pudo generar texto.';
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    resultEl.textContent = 'Error al generar el texto.';
  }
});

document.getElementById('copy-btn').addEventListener('click', () => {
  const text = document.getElementById('result').textContent;

  if (!text) {
    alert('No hay texto para copiar.');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => alert('Texto copiado al portapapeles.'))
    .catch(() => alert('No se pudo copiar el texto.'));
});
