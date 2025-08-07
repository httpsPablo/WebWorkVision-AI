const generateBtn = document.getElementById("generate-btn");
const resultContainer = document.getElementById("result-container");
const generatingText = document.getElementById("generating-text");
const resultImage = document.getElementById("result-image");
const downloadBtn = document.getElementById("download-btn");

let imageUrl = "";

generateBtn.addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Por favor, escribe una idea.");
    return;
  }

  // Mostrar "Generando..." y ocultar imagen y botón
  resultContainer.style.display = "block";
  generatingText.style.display = "block";
  resultImage.style.display = "none";
  downloadBtn.style.display = "none";

  try {
    const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
    imageUrl = response.url;

    resultImage.src = imageUrl;
    resultImage.style.display = "block";
    downloadBtn.style.display = "inline-block";
  } catch (error) {
    generatingText.textContent = "Error al generar la imagen.";
    console.error(error);
    return;
  }

  generatingText.style.display = "none";
});

downloadBtn.addEventListener("click", async () => {
  if (!imageUrl) {
    alert("No hay imagen para descargar.");
    return;
  }

  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "WWVAI-img-ai.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error al descargar la imagen:", error);
    alert("No se pudo descargar la imagen.");
  }
});
