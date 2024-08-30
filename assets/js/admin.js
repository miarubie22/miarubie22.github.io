// document.addEventListener('DOMContentLoaded', function() {
//     loadPendingRequests();
// });

// function loadPendingRequests() {
//     let requests = JSON.parse(localStorage.getItem('bookingRequests')) || [];

//     // Sort requests by submission date in descending order
//     requests.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

//     const pendingRequestsDiv = document.getElementById('pending-requests');
//     pendingRequestsDiv.innerHTML = ''; // Clear previous content

//     const totalRequests = requests.length;

//     requests.forEach((request, index) => {
//         const requestElement = document.createElement('div');
//         requestElement.className = 'request-item';

//         const requestNumber = totalRequests - index;

//         const lessonDate = formatDate(request.date);
//         const lessonTime = formatLessonTime(request.time);
//         const submissionDate = formatDate(request.submittedAt);
//         const submissionTime = formatSubmissionTime(request.submittedAt);

//         requestElement.innerHTML = `
//             <p><strong>Request #${requestNumber}</strong></p>
//             <p>Name: ${request.firstName} ${request.lastName}</p>
//             <p>Email: ${request.email}</p> <!-- Display user email -->
//             <p>Lesson Date: ${lessonDate}</p>
//             <p>Lesson Time: ${lessonTime}</p>
//             <p class="submission-info">Submission Date: ${submissionDate}</p>
//             <p class="submission-info">Submission Time: ${submissionTime}</p>
//             <p>Status: <span id="status-${requestNumber}" class="status ${request.status}">${request.status}</span></p>
//             <select id="status-select-${requestNumber}">
//                 <option value="pending" ${request.status === 'pending' ? 'selected' : ''}>Pending</option>
//                 <option value="approved" ${request.status === 'approved' ? 'selected' : ''}>Approved</option>
//                 <option value="rejected" ${request.status === 'rejected' ? 'selected' : ''}>Rejected</option>
//             </select>
//             <button type="button" onclick="updateStatus(${requestNumber})">Update Status</button>
//         `;

//         pendingRequestsDiv.appendChild(requestElement);
//     });
// }

// // Function to update status
// function updateStatus(requestNumber) {
//     event.preventDefault(); // Prevent default form submission behavior if inside a form

//     let requests = JSON.parse(localStorage.getItem('bookingRequests')) || [];

//     const index = requests.length - requestNumber;

//     const statusSelect = document.getElementById(`status-select-${requestNumber}`);
//     const newStatus = statusSelect.value;

//     requests[index].status = newStatus;
//     localStorage.setItem('bookingRequests', JSON.stringify(requests));

//     const statusElement = document.getElementById(`status-${requestNumber}`);
//     statusElement.textContent = newStatus;
//     statusElement.className = `status ${newStatus}`;
// }

// // Format the date in DD-MM-YYYY
// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
// }

// // // Format the time for submission
// // function formatSubmissionTime(dateString) {
// //     const date = new Date(dateString);
// //     const hours = String(date.getUTCHours()).padStart(2, '0');
// //     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
// //     return `${hours}:${minutes}`;
// // }
// // Format the time for submission with BST adjustment
// function formatSubmissionTime(dateString) {
//     const date = new Date(dateString);
//     // Adjust for BST (GMT+1)
//     const hours = String(date.getUTCHours() + 1).padStart(2, '0');
//     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
// }

// // Format the time for lesson
// function formatLessonTime(timeString) {
//     if (!timeString) return '00:00';

//     const parts = timeString.split(':');
//     if (parts.length === 2) {
//         const hours = String(parts[0]).padStart(2, '0');
//         const minutes = String(parts[1]).padStart(2, '0');
//         return `${hours}:${minutes}`;
//     }

//     return '00:00';
// }

// document.addEventListener('DOMContentLoaded', function() {
//     loadPendingRequests();
// });

// // Function to load pending requests
// async function loadPendingRequests() {
//     try {
// 	const requestsCollection = collection(db, 'bookingRequests');
//         const requestSnapshot = await getDocs(requestsCollection);
//         const requestsList = requestSnapshot.docs.map(doc => doc.data());

// 	// Sort requests by submission date in descending order
//         requestsList.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

//         const pendingRequestsDiv = document.getElementById('pending-requests');
//         pendingRequestsDiv.innerHTML = ''; // Clear previous content

//         requestsList.forEach((request, index) => {
//             const requestElement = document.createElement('div');
//             requestElement.className = 'request-item';

//             const requestNumber = index + 1;
//             const lessonDate = formatDate(request.date);
//             const lessonTime = formatLessonTime(request.time);
//             const submissionDate = formatDate(request.submittedAt);
//             const submissionTime = formatSubmissionTime(request.submittedAt);

//             requestElement.innerHTML = `
// 		<p><strong>Request #${requestNumber}</strong></p>
// 		<p>Name: ${request.firstName} ${request.lastName}</p>
// 		<p>Email: ${request.email}</p> <!-- Display user email -->
// 		<p>Lesson Date: ${lessonDate}</p>
// 		<p>Lesson Time: ${lessonTime}</p>
// 		<p class="submission-info">Submission Date: ${submissionDate}</p>
// 		<p class="submission-info">Submission Time: ${submissionTime}</p>
// 		<p>Status: <span id="status-${requestNumber}" class="status ${request.status}">${request.status}</span></p>
// 		<select id="status-select-${requestNumber}">
// 		    <option value="pending" ${request.status === 'pending' ? 'selected' : ''}>Pending</option>
// 		    <option value="approved" ${request.status === 'approved' ? 'selected' : ''}>Approved</option>
// 		    <option value="rejected" ${request.status === 'rejected' ? 'selected' : ''}>Rejected</option>
// 		</select>
// 		<button type="button" onclick="updateStatus(${requestNumber})">Update Status</button>
// 	    `;

// 	    pendingRequestsDiv.appendChild(requestElement);
// 	});
//     } catch (e) {
// 	console.error('Error retrieving documents: ', e);
//     }
// }

// // Function to update status
// async function updateStatus(requestId) {
//     const statusSelect = document.getElementById(`status-select-${requestId}`);
//     const newStatus = statusSelect.value;

//     try {
//         const requestRef = doc(db, 'bookingRequests', requestId);
//         await updateDoc(requestRef, { status: newStatus });

//         const statusElement = document.getElementById(`status-${requestId}`);
//         statusElement.textContent = newStatus;
//         statusElement.className = `status ${newStatus}`;
//     } catch (e) {
//         console.error('Error updating document: ', e);
//     }
// }

// // Format the date in DD-MM-YYYY
// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
// }

// // Format the time for submission with BST adjustment
// function formatSubmissionTime(dateString) {
//     const date = new Date(dateString);
//     // Adjust for BST (GMT+1)
//     const hours = String(date.getUTCHours() + 1).padStart(2, '0');
//     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
// }

// // Format the time for lesson
// function formatLessonTime(timeString) {
//     if (!timeString) return '00:00';

//     const parts = timeString.split(':');
//     if (parts.length === 2) {
//         const hours = String(parts[0]).padStart(2, '0');
//         const minutes = String(parts[1]).padStart(2, '0');
//         return `${hours}:${minutes}`;
//     }

//     return '00:00';
// }

// Import necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsD-bjN1GeLhLIJ_1NOQjfZOFcbg9Ygks",
  authDomain: "tutormia-3df78.firebaseapp.com",
  projectId: "tutormia-3df78",
  storageBucket: "tutormia-3df78.appspot.com",
  messagingSenderId: "918075738562",
  appId: "1:918075738562:web:ab2adfebe32419bad5ee5b",
  measurementId: "G-JGPLNGSKL2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    loadPendingRequests();
});

async function loadPendingRequests() {
    try {
        // Get the collection reference
        const requestsCollection = collection(db, 'bookingRequests');
        // Fetch the documents
        const requestSnapshot = await getDocs(requestsCollection);
        // Map the documents to their data
        const requestsList = requestSnapshot.docs.map(doc => doc.data());

        // Get the container element
        const pendingRequestsDiv = document.getElementById('pending-requests');
        // Clear previous content
        pendingRequestsDiv.innerHTML = '';

        // Iterate through the requests and add them to the page
        requestsList.forEach((request, index) => {
            const requestElement = document.createElement('div');
            requestElement.className = 'request-item';

            const requestNumber = index + 1;
            const lessonDate = formatDate(request.date);
            const lessonTime = formatLessonTime(request.time);
            const submissionDate = formatDate(request.submittedAt);
            const submissionTime = formatSubmissionTime(request.submittedAt);

            requestElement.innerHTML = `
                <p><strong>Request #${requestNumber}</strong></p>
                <p>Name: ${request.firstName} ${request.lastName}</p>
                <p>Email: ${request.email}</p>
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
    } catch (error) {
        console.error('Error loading requests: ', error);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function formatSubmissionTime(dateString) {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

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

function updateStatus(requestNumber) {
    console.log('Update status button clicked for request number:', requestNumber);
    // You can implement this function to update the request status in Firestore
}

