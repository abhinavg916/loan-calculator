// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Show loading spinner
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show results
    document.getElementById("results").style.display = "block";

    // Hide loading spinner
    document.getElementById("loading").style.display = "none";
  } else {
    // console.log("Please check your numbers");
    showError("Please check your number");
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Hide loading spinner
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class to the div
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading); // insertBefore() applies only to the parent element and takes arguements as elements for insertion

  // Clear error after 2 seconds
  setTimeout(clearError, 2000); // setTimeout() is present in Window object
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}

// Light/Dark Mode
