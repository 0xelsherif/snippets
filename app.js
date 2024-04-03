// Get the element with id 'greeting'
const greetingElement = document.getElementById('greeting');
// Get the current hour of the day
const currentTime = new Date().getHours();
// Get the element with id 'tag'
const tagElement = document.getElementById('tag');
// Variable to store the greeting message
let greeting;

// Determine the appropriate greeting based on the current time
if (currentTime < 12) {
  greeting = 'Good morning,'; // Set greeting to 'Good morning,' if current time is before 12 PM
} else if (currentTime < 18) {
  greeting = 'Good afternoon,'; // Set greeting to 'Good afternoon,' if current time is before 6 PM
} else {
  greeting = 'Good evening,'; // Set greeting to 'Good evening,' if current time is 6 PM or later
}

// Set the text content of the greeting element to the constructed greeting message
greetingElement.textContent = `${greeting}`;
// Append a waving hand emoji to the text content of the tag element
tagElement.textContent += ' \uD83D\uDC4B\uD83C\uDFFB';

// Save the original document title
let docTitle = document.title;
let welcomeBackTimeoutID; // Variable to store the timeout ID for "Welcome back" message

// Change document title when window loses focus
window.addEventListener("blur", () => {
  // Set the document title to "Miss you" only if it's not already set to "Miss you"
  if (document.title !== "Miss you 😥") {
    document.title = "Miss you 😥";
  }
});

// Restore original document title with "Welcome back!" message when window gains focus
window.addEventListener("focus", () => {
  clearTimeout(welcomeBackTimeoutID); // Clear any existing timeout
  document.title = "Welcome back 😍";
  // Set a timeout to revert back to the original title after 5 seconds
  welcomeBackTimeoutID = setTimeout(() => {
    document.title = docTitle;
  }, 5000);
});

// Dark mode
document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.querySelector('#themeToggle');

  // Function to toggle dark mode
  function toggleDarkMode(isDarkMode) {
    document.body.classList.toggle('dark-mode', isDarkMode); // Toggle body class
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.toggle('dark-mode', isDarkMode); // Toggle dark mode for each card
    });
    const headers = document.querySelectorAll('.header');
    headers.forEach(header => {
      header.classList.toggle('dark-mode', isDarkMode); // Toggle dark mode for each header
    });
  }

  // Check the current theme on load
  if (localStorage.getItem('theme') === 'dark') {
    toggleDarkMode(true);
    toggleSwitch.checked = true;
  } else {
    toggleDarkMode(false);
    toggleSwitch.checked = false;
  }

  // Switch theme dynamically
  toggleSwitch.addEventListener('change', function () {
    const isDarkMode = this.checked;
    toggleDarkMode(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
});

// Sort by Date 
// Get all card elements
const cards = document.querySelectorAll('.leftcolumn .card');

// Convert NodeList to Array
const cardsArray = Array.from(cards);

// Sort cards based on the creation date
cardsArray.sort((a, b) => {
    const dateA = new Date(a.querySelector('h5').textContent.replace('Created on, ', ''));
    const dateB = new Date(b.querySelector('h5').textContent.replace('Created on, ', ''));
    return dateB - dateA;
});

// Re-append sorted cards to the leftcolumn
const leftColumn = document.querySelector('.leftcolumn');
leftColumn.innerHTML = ''; // Clear previous content
cardsArray.forEach(card => {
    leftColumn.appendChild(card);
});