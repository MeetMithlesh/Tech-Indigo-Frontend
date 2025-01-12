// Select the navbar
const navbar = document.querySelector('.navbar');

// Add scroll event listener
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled'); // Add the "scrolled" class
  } else {
    navbar.classList.remove('scrolled'); // Remove the "scrolled" class
  }
});

function showText(element) {
    const hoverText = element.querySelector('.hover-text');
    if (hoverText) {
      hoverText.style.opacity = '1';
    }
  }
  
  function hideText(element) {
    const hoverText = element.querySelector('.hover-text');
    if (hoverText) {
      hoverText.style.opacity = '0';
    }
  }
  
  document.addEventListener("scroll", () => {
    const items = document.querySelectorAll(".timeline-item");
  
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      // Trigger visibility when the item comes into the middle of the screen
      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        item.classList.add("visible");
      }
    });
  });
  
  
  