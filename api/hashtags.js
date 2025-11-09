export default async function handler(req, res) {
  const title = req.query.title || 'youtube';
  
  // Example simulated trending API call
  // You can replace this with real API (like RapidAPI or SerpAPI)
  const response = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(title)}`);
  const json = await response.json();
  
  const hashtags = json
    .slice(0, 15)
    .map(word => `#${word.word.replace(/\s+/g, '')}`);

  res.status(200).json({ hashtags });
}
