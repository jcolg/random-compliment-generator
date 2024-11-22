const container = document.getElementById("post-it-container");
const generateButton = document.getElementById("generate");

// Function to fetch compliments
async function fetchCompliments() {
  try {
    const response = await fetch("compliments.json");
    if (!response.ok) {
      throw new Error("Failed to fetch compliments.");
    }
    const compliments = await response.json();
    return compliments;
  } catch (error) {
    console.error(error);
    return [{ text: "Oops! Something went wrong. You're still amazing!" }];
  }
}

// Function to create a Post-it note
async function createPostIt() {
  // Clear any existing Post-it
  container.innerHTML = "";

  // Fetch compliments
  const compliments = await fetchCompliments();
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const randomCompliment = compliments[randomIndex]?.text || "You're awesome!";

  // Create a new Post-it
  const postIt = document.createElement("div");
  postIt.className = "post-it";

  // Add compliment text
  const complimentText = document.createElement("h4");
  complimentText.textContent = randomCompliment;

  postIt.appendChild(complimentText);

  // Add event listeners for showing the compliment
  postIt.addEventListener("click", () => {
    complimentText.style.opacity = "1";
  });

  postIt.addEventListener("touchend", (event) => {
    event.preventDefault(); // Prevent default long-press behavior
    complimentText.style.opacity = "1";
  });

  postIt.addEventListener("mouseenter", () => {
    complimentText.style.opacity = "1";
  });

  postIt.addEventListener("mouseleave", () => {
    complimentText.style.opacity = "0";
  });

  // Add share button
  const shareButton = document.createElement("button");
  shareButton.textContent = "Share this Compliment";
  shareButton.style.marginTop = "10px";

  shareButton.addEventListener("click", () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?compliment=${encodeURIComponent(randomCompliment)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard! Share it with your friends.");
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  });

  container.appendChild(postIt);
  container.appendChild(shareButton);
}


// Function to check for a compliment in the URL
function loadComplimentFromURL() {
  const params = new URLSearchParams(window.location.search);
  const compliment = params.get("compliment");
  if (compliment) {
    container.innerHTML = "";

    const postIt = document.createElement("div");
    postIt.className = "post-it";

    const complimentText = document.createElement("h4");
    complimentText.textContent = compliment;

    postIt.appendChild(complimentText);
    container.appendChild(postIt);
  }
}

// Event Listeners
generateButton.addEventListener("click", createPostIt);

// Load compliment from URL if present
window.addEventListener("DOMContentLoaded", loadComplimentFromURL);

