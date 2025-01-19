const API_BASE_URL = 'https://tech-indigo-backend.vercel.app';

// Code for the registration form
function filterOptions(type) {
  const input = document.getElementById(`${type}-input`);
  const dropdown = document.getElementById(`${type}-dropdown`);
  const filter = input.value.toLowerCase();
  const items = dropdown.querySelectorAll("li");
  let visible = false;

  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(filter)) {
      item.style.display = "block";
      visible = true;
    } else {
      item.style.display = "none";
    }
  });

  dropdown.classList.toggle("visible", visible);
}

function selectOption(type, element) {
  const input = document.getElementById(`${type}-input`);
  const dropdown = document.getElementById(`${type}-dropdown`);
  input.value = element.textContent;
  dropdown.classList.remove("visible");
}

function showAllOptions(type) {
  const dropdown = document.getElementById(`${type}-dropdown`);
  const items = dropdown.querySelectorAll("li");
  items.forEach((item) => {
    item.style.display = "block";
  });
  dropdown.classList.add("visible");
}

function proceedWithValue() {
  const college = document.getElementById("college-input").value;
  const course = document.getElementById("course-input").value;
  alert(`You have entered:\nCollege: ${college}\nCourse: ${course}`);
  // Add further processing logic here
}

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
  const dropdowns = document.querySelectorAll("ul");
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target) && !event.target.matches("input")) {
      dropdown.classList.remove("visible");
    }
  });
});

// Coupon code section
const applyButton = document.getElementById("apply-coupon");
const couponInput = document.getElementById("coupon");
const popup = document.getElementById("coupon-popup");
const popupMessage = document.getElementById("popup-message");
const closePopup = document.getElementById("close-popup");
const registrationFee = 1000;
const couponCodes = {
  IOTSTUDENT: registrationFee,
  SOI50: 500,
};
let appliedCoupon = null;

applyButton.addEventListener("click", () => {
  const couponCode = couponInput.value.trim();

  if (appliedCoupon && appliedCoupon === couponCode) {
    // Remove the applied coupon
    appliedCoupon = null;
    couponInput.disabled = false;
    applyButton.innerText = "Apply";
    updateFeeBreakdown(0);
    showPopup("Coupon removed successfully!");
    couponInput.value = "";
    clearQueryOnCouponRemoval();
} else if (couponCodes[couponCode]) {
    // Apply the new coupon
    appliedCoupon = couponCode;
    couponInput.disabled = true;
    applyButton.innerText = "Applied";
    updateFeeBreakdown(couponCodes[couponCode]);
    showPopup('Congratulations! You have won a 100% discount.(Benfit of being a student of IOT)');
  } else if (couponCode) {
    // Invalid coupon
    showPopup("Invalid coupon code. Please try again.");
  }
});



// Function to update the fee breakdown
function updateFeeBreakdown(discount) {
  const total = registrationFee - discount;
  document.getElementById("discount").innerText = `₹${discount}`;
  document.getElementById("total").innerText = `₹${total}`;
}

// Function to show the popup
function showPopup(message) {
  popupMessage.innerText = message;
  popup.classList.remove("hidden");
}

// Close the popup
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

//Coupon Updation
function couponApplied() {
    applyButton.innerText = "Applied";
    document.getElementById('quiz-link').style.display = 'none';
}

//payment section


document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const couponCode = urlParams.get('couponCode');
    if (couponCode) {
        document.getElementById('coupon').value = couponCode;
        applyCoupon(couponCode);
    }
});

function applyCoupon(couponCode) {
    let discount = 0;

   if (couponCode === 'BETTERLUCKNEXTTIME') {
        discount = 0; // 0% discount
        showPopup('Sorry! You have not won any discount. Better luck next time.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT15') {
        discount = registrationFee * 0.15; // 15% discount
        showPopup('Congratulations! You have won a 15% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT30') {
        discount = registrationFee * 0.30; // 30% discount
        showPopup('Congratulations! You have won a 30% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT45') {
        discount = registrationFee * 0.45; // 45% discount
        showPopup('Congratulations! You have won a 45% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT60') {
        discount = registrationFee * 0.60; // 60% discount
        showPopup('Congratulations! You have won a 60% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT75') {
        discount = registrationFee * 0.75; // 75% discount
        showPopup('Congratulations! You have won a 75% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else {
        showPopup('Invalid coupon code. Please try again.');
        return;
    }

function showPopup(message) {
  const popup = document.getElementById('coupon-popup');
  document.getElementById('popup-message').innerText = message;
  popup.classList.remove('hidden');
  document.getElementById('close-popup').addEventListener('click', function() {
    popup.classList.add('hidden');
  });
}}

// error handling
document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries()); // Convert FormData to JSON-compatible object

    const errorContainer = document.getElementById('errorContainer');
    // errorContainer.textContent = ' '; // Clear previous errors

    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            
            if (errorData.error) {
                errorContainer.textContent = errorData.error; // Display the error
            } else {
                errorContainer.textContent = 'An unexpected error occurred.';
            }
        } else {
            const responseData = await response.json()
            alert(responseData.message); // Success message
            // form.reset(); 
            queryParam = `?id=${responseData.id} email=${responseData.email} regsitered=true`;
            setTimeout(() => {
                window.location.href = `/${queryParam}`;
            }, 1000);
        }
    } catch (err) {
        console.error(err);
        errorContainer.textContent = 'Failed to connect to the server. Please try again.';
    }
});
