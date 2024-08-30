document.addEventListener('DOMContentLoaded', function() {
    loadPendingRequests();
});

function loadPendingRequests() {
    let requests = JSON.parse(localStorage.getItem('bookingRequests')) || [];
    
    // Sort requests by submission date in descending order
    requests.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    const pendingRequestsDiv = document.getElementById('pending-requests');
    pendingRequestsDiv.innerHTML = ''; // Clear previous content

    const totalRequests = requests.length;

    requests.forEach((request, index) => {
        const requestElement = document.createElement('div');
        requestElement.className = 'request-item';

        const requestNumber = totalRequests - index;

        const lessonDate = formatDate(request.date);
        const lessonTime = formatLessonTime(request.time);
        const submissionDate = formatDate(request.submittedAt);
        const submissionTime = formatSubmissionTime(request.submittedAt);

        requestElement.innerHTML = `
            <p><strong>Request #${requestNumber}</strong></p>
            <p>Name: ${request.firstName} ${request.lastName}</p>
            <p>Email: ${request.email}</p> <!-- Display user email -->
            <p>Lesson Date: ${lessonDate}</p>
            <p>Lesson Time: ${lessonTime}</p>
            <p>Submission Date: ${submissionDate}</p>
            <p>Submission Time: ${submissionTime}</p>
            <p>Status: <span id="status-${requestNumber}" class="status ${request.status}">${request.status}</span></p>
            <select id="status-select-${requestNumber}">
                <option value="pending" ${request.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="approved" ${request.status === 'approved' ? 'selected' : ''}>Approved</option>
                <option value="rejected" ${request.status === 'rejected' ? 'selected' : ''}>Rejected</option>
            </select>
            <button onclick="updateStatus(${requestNumber})">Update Status</button>
        `;

        pendingRequestsDiv.appendChild(requestElement);
    });
}

// Function to update status
function updateStatus(requestNumber) {
    let requests = JSON.parse(localStorage.getItem('bookingRequests')) || [];
    
    const index = requests.length - requestNumber;
    
    const statusSelect = document.getElementById(`status-select-${requestNumber}`);
    const newStatus = statusSelect.value;

    requests[index].status = newStatus;
    localStorage.setItem('bookingRequests', JSON.stringify(requests));
    
    const statusElement = document.getElementById(`status-${requestNumber}`);
    statusElement.textContent = newStatus;
    statusElement.className = `status ${newStatus}`;
}

// Format the date in DD-MM-YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Format the time for submission
function formatSubmissionTime(dateString) {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Format the time for lesson
function formatLessonTime(timeString) {
    if (!timeString) return '00:00';

    const parts = timeString.split(':');
    if (parts.length === 2) {
        const hours = String(parts[0]).padStart(2, '0');
        const minutes = String(parts[1]).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    return '00:00';
}

