function generateHashtags() {
  const title = document.getElementById('videoTitle').value.trim();
  const output = document.getElementById('output');

  if (!title) {
    output.innerHTML = "⚠️ Please enter a video title!";
    return;
  }

  const words = title.split(" ");
  let hashtags = words
    .filter(w => w.length > 2)
    .map(w => "#" + w.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());

  hashtags.push("#youtube", "#trending", "#viral", "#ytshorts");

  output.innerHTML = hashtags.join(" ");
}
