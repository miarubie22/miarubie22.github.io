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
