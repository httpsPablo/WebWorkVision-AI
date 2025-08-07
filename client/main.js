document.getElementById('generate-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;

  const response = await fetch('/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    document.getElementById('image-result').src = data.image_url;
  }
});
