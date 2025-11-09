document.getElementById('generateBtn').addEventListener('click', async () => {
  const title = document.getElementById('videoTitle').value.trim();
  if (!title) return alert('Please enter a video title');

  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');

  try {
    const res = await fetch(`/api/hashtags?title=${encodeURIComponent(title)}`);
    const data = await res.json();
    document.getElementById('hashtagsBox').value = data.hashtags.join(' ');
    document.getElementById('result').classList.remove('hidden');
  } catch (err) {
    alert('Error fetching hashtags.');
  }

  document.getElementById('loader').classList.add('hidden');
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const hashtags = document.getElementById('hashtagsBox');
  hashtags.select();
  document.execCommand('copy');
  alert('Hashtags copied!');
});
