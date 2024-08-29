let isSubmitting = false;

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Check if already submitting to prevent duplicate submissions
    if (isSubmitting) return;

    isSubmitting = true; // Set flag to true to prevent multiple submissions
    
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Validate the inputs
    if (!firstName || !lastName || !email || !date || !time) {
        alert('Please fill out all fields.');
        isSubmitting = false; // Reset flag
        return;
    }
    
    const bookingRequest = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        date: date,
        time: time,
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };

    let requests = JSON.parse(localStorage.getItem('bookingRequests')) || [];
    requests.push(bookingRequest);
    localStorage.setItem('bookingRequests', JSON.stringify(requests));
    
    // Clear form fields
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    // Show success message
    const message = document.getElementById('message');
    message.textContent = 'Request submitted successfully!';
    setTimeout(() => {
        message.textContent = '';
    }, 3000);

    isSubmitting = false; // Reset flag after submission
});

