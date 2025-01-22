const API_BASE_URL = 'http://localhost:3000';

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
const registrationFee = 200;
const couponCodes = {
  IOTSTUDENT: registrationFee,
  SOI80:160,
  SOI50: 100,
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
    showPopup(`Coupon Applied Successfully!`);
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
    const name = decodeURIComponent(urlParams.get('name'));
    const email = decodeURIComponent(urlParams.get('email'));
    const phone = decodeURIComponent(urlParams.get('phone'));
    const year = decodeURIComponent(urlParams.get('year'));
    const college = decodeURIComponent(urlParams.get('college'));
    const course = decodeURIComponent(urlParams.get('course'));
    const address = decodeURIComponent(urlParams.get('address'));
    const couponCodeRaw = decodeURIComponent(urlParams.get('couponCode'));
    const couponCode = new URLSearchParams(couponCodeRaw).get('couponCode');

    if(name | email | phone|year |college |course |address){
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;
        document.getElementById('year').value = year;
        document.getElementById('college-input').value = college;
        document.getElementById('course-input').value = course;
        document.getElementById('address').value = address;
    }

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
    } else if (couponCode === 'DISCOUNT10') {
        discount = registrationFee * 0.10; // 15% discount
        showPopup('Congratulations! You have won a 10% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT20') {
        discount = registrationFee * 0.20; // 30% discount
        showPopup('Congratulations! You have won a 20% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT30') {
        discount = registrationFee * 0.30; // 45% discount
        showPopup('Congratulations! You have won a 30% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT40') {
        discount = registrationFee * 0.40; // 60% discount
        showPopup('Congratulations! You have won a 40% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else if (couponCode === 'DISCOUNT50') {
        discount = registrationFee * 0.50; // 75% discount
        showPopup('Congratulations! You have won a 50% discount.');
        updateFeeBreakdown(discount);
        couponApplied();
    } else {
        showPopup('....Invalid Coupon Code. Please Try Again.');
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
        console.log(err);
        errorContainer.textContent = 'Failed to connect to the server. Please try again.';
    }
});

document.getElementById('quiz-link').addEventListener('click',async (e) => {
    e.preventDefault();

    input_name = document.getElementById('name').value;
    input_email = document.getElementById('email').value;
    input_phone = document.getElementById('phone').value;
    input_year = document.getElementById('year').value;
    input_college = document.getElementById('college-input').value;
    input_course = document.getElementById('course-input').value;
    input_add = document.getElementById('address').value;

    const query = `./quiz.html?name=${encodeURIComponent(input_name)}&email=${encodeURIComponent(input_email)}&phone=${encodeURIComponent(input_phone)}&year=${encodeURIComponent(input_year)}&college=${encodeURIComponent(input_college)}&course=${encodeURIComponent(input_course)}&address=${encodeURIComponent(input_add)}`;
    window.location.href = query;
})