export default async function handler(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Missing video title" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert in YouTube marketing and SEO hashtags."
          },
          {
            role: "user",
            content: `Generate 15 trending YouTube hashtags for: ${title}`
          }
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const hashtags = data.choices[0].message.content;

    res.status(200).json({ hashtags });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate hashtags" });
  }
          }
