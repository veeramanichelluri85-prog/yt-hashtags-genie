export default async function handler(req, res) {
  const title = req.query.title || 'youtube';
  
  // Fetch similar words from Datamuse API
  const response = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(title)}`);
  const json = await response.json();

  // Step 1: Pick top 25 most relevant words
  const rawWords = json.slice(0, 25).map(w => w.word);

  // Step 2: Filter out unrelated/common junk words
  const blockedWords = [
    'cat', 'dog', 'archive', 'mtv', 'trained', 'clip', 'means', 'like',
    'admit', 'way', 'boom', 'get', 'guide', 'governance', 'wikihow'
  ];
  const filtered = rawWords.filter(w => !blockedWords.includes(w.toLowerCase()));

  // Step 3: Smartly add relevant YouTube-related tags
  const baseTags = [
    'YouTubeTips', 'YouTubeGrowth', 'ContentCreation', 
    'YouTubeBeginners', 'VideoMarketing', 'StartYouTubeChannel', 
    'HowToCreateYouTubeChannel', 'YouTubeSetup', 'YTTips'
  ];

  // Step 4: Merge and format hashtags
  const hashtags = [...new Set([...baseTags, ...filtered])]
    .slice(0, 15)
    .map(tag => `#${tag.replace(/\s+/g, '')}`);

  res.status(200).json({ hashtags });
}
