// let isSubmitting = false;

// document.getElementById('booking-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Check if already submitting to prevent duplicate submissions
//     if (isSubmitting) return;

//     isSubmitting = true; // Set flag to true to prevent multiple submissions

//     const firstName = document.getElementById('first-name').value;
//     const lastName = document.getElementById('last-name').value;
//     const email = document.getElementById('email').value;
//     const date = document.getElementById('date').value;
//     const time = document.getElementById('time').value;

//     // Validate the inputs
//     if (!firstName || !lastName || !email || !date || !time) {
//         alert('Please fill out all fields.');
//         isSubmitting = false; // Reset flag
//         return;
//     }

//     const bookingRequest = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         date: date,
//         time: time,
//         submittedAt: new Date().toISOString(),
//         status: 'pending'
//     };

//     let requests = JSON.parse(localStorage.getItem('bookingRequests')) || [];
//     requests.push(bookingRequest);
//     localStorage.setItem('bookingRequests', JSON.stringify(requests));

//     // Clear form fields
//     document.getElementById('first-name').value = '';
//     document.getElementById('last-name').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('date').value = '';
//     document.getElementById('time').value = '';

//     // Show success message
//     showSuccessMessage('Request submitted successfully!');

//     isSubmitting = false; // Reset flag after submission
// });

// // Function to display success message
// function showSuccessMessage(message) {
//     const messageDiv = document.getElementById('message');
//     if (messageDiv) {
//         messageDiv.textContent = message;
//         messageDiv.style.display = 'block'; // Ensure the message is visible

//         // Hide the message after 3 seconds
//         setTimeout(() => {
//             messageDiv.style.display = 'none';
//         }, 2000);
//     }
// }

// let isSubmitting = false;

// document.getElementById('booking-form').addEventListener('submit', async function(event) {
//     event.preventDefault();
//     console.log('Form submission intercepted'); // Debugging

//     // Check if already submitting to prevent duplicate submissions
//     if (isSubmitting) return;

//     isSubmitting = true; // Set flag to true to prevent multiple submissions

//     const firstName = document.getElementById('first-name').value;
//     const lastName = document.getElementById('last-name').value;
//     const email = document.getElementById('email').value;
//     const date = document.getElementById('date').value;
//     const time = document.getElementById('time').value;

//     // Validate the inputs
//     if (!firstName || !lastName || !email || !date || !time) {
//         alert('Please fill out all fields.');
//         isSubmitting = false; // Reset flag
//         return;
//     }

//     const bookingRequest = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         date: date,
//         time: time,
//         submittedAt: new Date().toISOString(),
//         status: 'pending'
//     };

//     try {
// 	console.log('Attempting to add document'); // Debugging
// 	// Add request to Firestore
// 	const docRef = await addDoc(collection(db, 'bookingRequests'), bookingRequest);
// 	console.log('Document written with ID: ', docRef.id);

// 	// Clear form fields
// 	document.getElementById('first-name').value = '';
// 	document.getElementById('last-name').value = '';
// 	document.getElementById('email').value = '';
// 	document.getElementById('date').value = '';
// 	document.getElementById('time').value = '';

//         // Show success message
//         showSuccessMessage('Request submitted successfully!');
//     } catch (e) {
// 	console.error('Error adding document: ', e);
//     }
//     isSubmitting = false; // Reset flag after submission
// });

// function showSuccessMessage(message) {
//     const messageElement = document.getElementById('message');
//     if (messageElement) {
// 	messageElement.textContent = message;
// 	messageElement.style.color = 'black';
// 	messageElement.style.fontWeight = 'bold';

// 	setTimeout(() => {
// 	    messageElement.textContent = '';
// 	}, 2000);
//     } else {
// 	console.error('Message element not found.');
//     }
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

function showSuccessMessage(message) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = 'black';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.fontSize = '1.2em';

        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    } else {
        console.error('Message element not found.');
    }
}

// Existing form submission logic
document.getElementById('booking-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Check if already submitting to prevent duplicate submissions
    // if (isSubmitting) return;

    // isSubmitting = true; // Set flag to true to prevent multiple submissions

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // // Validate the inputs
    // if (!firstName || !lastName || !email || !date || !time) {
    //     alert('Please fill out all fields.');
    //     isSubmitting = false; // Reset flag
    //     return;
    // }

    const bookingRequest = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        date: date,
        time: time,
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };

    try {
        // Add a new document with a generated ID
        const docRef = await addDoc(collection(db, 'bookingRequests'), bookingRequest);
        console.log('Document written with ID: ', docRef.id);

        // Clear form fields
        document.getElementById('first-name').value = '';
        document.getElementById('last-name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';

        // Show success message
        showSuccessMessage('Request submitted successfully!');
    } catch (e) {
        console.error('Error adding document: ', e);
        showSuccessMessage('Failed to submit request.');
    }

});

