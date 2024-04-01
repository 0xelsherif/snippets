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


// document.addEventListener('DOMContentLoaded', function () {
//   const toggleSwitch = document.querySelector('#themeToggle');

//   // Check the current theme on load
//   if (localStorage.getItem('theme') === 'dark') {
//     document.body.classList.add('dark-mode');
//     toggleSwitch.checked = true;
//   } else {
//     document.body.classList.remove('dark-mode');
//     toggleSwitch.checked = false;
//   }

//   // Switch theme dynamically
//   toggleSwitch.addEventListener('change', function () {
//     if (this.checked) {
//       document.body.classList.add('dark-mode');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.body.classList.remove('dark-mode');
//       localStorage.setItem('theme', 'light');
//     }
//   });
// });
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


document.addEventListener('DOMContentLoaded', function() {
  // Check if unique visitor ID exists in cookies
  let uniqueVisitorId = getCookie('uniqueVisitorId');

  if (!uniqueVisitorId) {
    // If unique visitor ID does not exist, generate a new one
    uniqueVisitorId = generateUniqueId();

    // Set the unique visitor ID in cookies with expiry date
    setCookie('uniqueVisitorId', uniqueVisitorId, 365); // Cookie expires in 365 days
  }

  // Check if the unique visitor ID is counted already
  let isCounted = localStorage.getItem(uniqueVisitorId);

  if (!isCounted) {
    // If the unique visitor ID is not counted, increment the counter
    let uniqueVisitors = parseInt(document.getElementById('uniqueVisitors').textContent);
    uniqueVisitors++;
    document.getElementById('uniqueVisitors').textContent = uniqueVisitors;

    // Mark this unique visitor as counted
    localStorage.setItem(uniqueVisitorId, 'true');
  }
});

// Function to generate a unique ID
function generateUniqueId() {
  return 'visitor_' + Math.random().toString(36).substr(2, 9);
}

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

// Function to get a cookie
function getCookie(name) {
  let nameEQ = name + '=';
  let cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

