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
  
  document.addEventListener("DOMContentLoaded", () => {
    const countdownDate = new Date("February 2, 2025 11:00:00").getTime();
    const daysElement = document.querySelector(".days");
    const hoursElement = document.querySelector(".hours");
    const minutesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");
  
    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = countdownDate - now;
  
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
      } else {
        clearInterval(interval);
        document.querySelector(".tech-countdown-wrapper").innerHTML = `<h2>The Event Has Started!</h2>`;
      }
    };
  
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  });
  
  
  
  