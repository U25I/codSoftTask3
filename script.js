// JavaScript to handle the form data submission
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(form);
  
  // Send data to server
  fetch('https://your-server-endpoint.com/send-message', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    // Show success message
    status.textContent = "Thank you! Your message has been sent.";
    status.style.display = "block";
    
    // Clear the form
    form.reset();
    
    // Hide success message after a few seconds
    setTimeout(() => {
      status.style.display = "none";
    }, 5000);
  })
  .catch(error => {
    // Handle error
    status.textContent = "Something went wrong. Please try again.";
    status.style.display = "block";
  });
});
