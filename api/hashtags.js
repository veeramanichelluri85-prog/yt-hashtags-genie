export default async function handler(req, res) {
  const title = req.query.title || 'youtube';

  // Fetch similar words from Datamuse API
  const response = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(title)}`);
  const json = await response.json();

  // Step 1: Take top 20 results
  const rawWords = json.slice(0, 20).map(w => w.word);

  // Step 2: Remove unrelated or generic words
  const blockedWords = [
    'cat','dog','mtv','stopwatch','clip','train','trained','archive','archived',
    'means','get','way','admit','fasten','cram','teach','find','stopwatch','speed'
  ];

  const filtered = rawWords.filter(w => !blockedWords.includes(w.toLowerCase()));

  // Step 3: Add core YouTube SEO tags
  const baseTags = [
    'YouTubeTips', 'YouTubeGrowth', 'ContentCreation', 'VideoMarketing',
    'YouTubeBeginners', 'YTTips', 'YouTubeAlgorithm'
  ];

  // Step 4: Create topic-related custom tags from user input
  const userWords = title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  const topicTags = [
    `HowTo${userWords}`,
    `${userWords}Tutorial`,
    `${userWords}Tips`,
    `Learn${userWords}`,
    `Improve${userWords}`
  ];

  // Step 5: Merge all hashtags cleanly
  const hashtags = [...new Set([...topicTags, ...baseTags, ...filtered])]
    .slice(0, 15)
    .map(tag => `#${tag.replace(/\s+/g, '')}`);

  res.status(200).json({ hashtags });
}
