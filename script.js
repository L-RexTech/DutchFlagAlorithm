const cardContainer = document.getElementById('cardContainer');
const shuffleButton = document.getElementById('shuffleButton');
const sortStepButton = document.getElementById('sortStepButton');
const lowValue = document.getElementById('lowValue');
const midValue = document.getElementById('midValue');
const highValue = document.getElementById('highValue');

// Card Colors
const colors = ['red', 'white', 'blue'];

// Function to create a card element
function createCard(color) {
  const card = document.createElement('div');
  card.classList.add('card', color);
  card.textContent = color.charAt(0).toUpperCase();
  return card;
}

// Function to shuffle the cards
function shuffleCards() {
  const cards = Array.from(cardContainer.children);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  cardContainer.innerHTML = ''; // Clear container
  cards.forEach(card => cardContainer.appendChild(card));

  // Reset pointers after shuffling
  lowValue.textContent = 0;
  midValue.textContent = 0;
  highValue.textContent = cards.length - 1;
}

// Function to implement one step of the Dutch Flag Algorithm
function sortStep() {
  const cards = Array.from(cardContainer.children);
  let low = parseInt(lowValue.textContent);
  let mid = parseInt(midValue.textContent);
  let high = parseInt(highValue.textContent);

  if (mid <= high) {
    const cardColor = cards[mid].classList[1];

    // Visual feedback: Add 'moving' class to cards being swapped
    cards[low].classList.add('moving');
    cards[mid].classList.add('moving');

    if (cardColor === 'red') {
      [cards[low], cards[mid]] = [cards[mid], cards[low]];
      low++;
      mid++;
    } else if (cardColor === 'white') {
      mid++;
    } else { // cardColor === 'blue'
      [cards[mid], cards[high]] = [cards[high], cards[mid]];
      high--;
    }

    // Update the card container
    cardContainer.innerHTML = ''; // Clear and re-add to visually update
    cards.forEach(card => cardContainer.appendChild(card));

    // Update pointer values in the display
    lowValue.textContent = low;
    midValue.textContent = mid;
    highValue.textContent = high;

    // Remove 'moving' class after a short delay for animation
    setTimeout(() => {
      cards[low]?.classList.remove('moving');
      cards[mid]?.classList.remove('moving');
    }, 300); // Adjust delay (in milliseconds) as needed

  } else {
    // Algorithm is complete
    alert("Sorting complete!");
  }
}

// Initialize with shuffled cards
function initializeCards() {
  for (let i = 0; i < 10; i++) { 
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const card = createCard(randomColor);
    cardContainer.appendChild(card);
  }
  // Initialize pointer values
  lowValue.textContent = 0;
  midValue.textContent = 0;
  highValue.textContent = 9; // Assuming you are creating 10 cards
}

initializeCards(); 

// Event Listeners
shuffleButton.addEventListener('click', shuffleCards);
sortStepButton.addEventListener('click', sortStep);