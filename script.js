const container = document.getElementById("post-it-container");
const generateButton = document.getElementById("generate");
const resetButton = document.getElementById("reset");

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
  container.appendChild(postIt);

  // Animate Post-it popping up
  setTimeout(() => {
    postIt.style.transform = "rotateX(0)";
  }, 100); // Slight delay for a smoother effect
}

// Event Listeners
generateButton.addEventListener("click", createPostIt);

