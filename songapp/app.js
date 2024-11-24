const API_KEY = "AIzaSyBjEvyc3zRXQNIX0BUddODPwOOxbaABOIU";
const player = document.getElementById("player");
const results = document.getElementById("results");

// Search for songs
async function searchSong() {
  const query = document.getElementById("search-input").value;
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&key=${API_KEY}&maxResults=5`;

  const response = await fetch(url);
  const data = await response.json();

  displayResults(data.items);
}

// Display search results
function displayResults(videos) {
  results.innerHTML = ""; // Clear previous results
  videos.forEach((video) => {
    const title = video.snippet.title;
    const videoId = video.id.videoId;

    const button = document.createElement("button");
    button.innerText = title;
    button.onclick = () => playVideo(videoId);

    results.appendChild(button);
    results.appendChild(document.createElement("br"));
  });
}

// Play selected video
function playVideo(videoId) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  player.src = embedUrl;
}
