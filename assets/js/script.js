document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendarHeaderEl = document.getElementById('month-year');
    const bookingForm = document.getElementById('booking-form');
    const calendarData = {}; // Store bookings

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week the month starts on
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month

        // Adjusting firstDay so that Monday is the first day of the week
        const startDay = (firstDay === 0) ? 6 : firstDay - 1; // Convert Sunday to 6

        let html = '<thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead>';
        html += '<tbody><tr>';

        // Add empty cells before the first day of the month
        for (let i = 0; i < startDay; i++) {
            html += '<td></td>';
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const bookingKey = date.toDateString();
            const dayBookings = calendarData[bookingKey] || {};

            html += '<td>';
            html += `<div>${day}</div>`;
            Object.keys(dayBookings).forEach(time => {
                const status = dayBookings[time].status;
                html += `<div class="${status === 'pending' ? 'pending' : 'booked'}" title="${dayBookings[time].name} - ${dayBookings[time].time}"></div>`;
            });
            html += '</td>';

            // Start a new row for each week
            if ((startDay + day) % 7 === 0) {
                html += '</tr><tr>';
            }
        }

        // Fill in the remaining cells in the last row
        if ((startDay + daysInMonth) % 7 !== 0) {
            for (let i = (startDay + daysInMonth) % 7; i < 7; i++) {
                html += '<td></td>';
            }
        }

        html += '</tr></tbody>';
        calendarEl.innerHTML = html;
    }

    function updateCalendar() {
        calendarHeaderEl.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        generateCalendar(currentYear, currentMonth);
    }

    function getMonthName(monthIndex) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const bookingDate = new Date(`${date}T${time}`);
        const bookingKey = bookingDate.toDateString();
        const timeKey = bookingDate.toTimeString().split(' ')[0]; // Use the time part of the date

        if (calendarData[bookingKey] && calendarData[bookingKey][timeKey]) {
            alert('This time slot is already requested.');
            return;
        }

        // Send booking request to server (pseudo-code, adapt as necessary)
        fetch('/api/bookings/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, date, time })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (!calendarData[bookingKey]) {
                    calendarData[bookingKey] = {};
                }
                calendarData[bookingKey][timeKey] = { name, email, time, status: 'pending' };
                alert('Request submitted!');
                updateCalendar(); // Regenerate the calendar
                bookingForm.reset();
                saveToLocalStorage();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting the request.');
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('calendarData', JSON.stringify(calendarData));
    }

    function loadFromLocalStorage() {
        const storedData = localStorage.getItem('calendarData');
        if (storedData) {
            Object.assign(calendarData, JSON.parse(storedData));
        }
    }

    loadFromLocalStorage();
    updateCalendar();
    bookingForm.addEventListener('submit', handleFormSubmit);
	event.preventDefault(); // Prevent default form submission

    // Add event listener to handle clicks on calendar cells
    calendarEl.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'TD' && !target.querySelector('.pending')) {
            const date = new Date(target.dataset.date);
            document.getElementById('date').value = date.toISOString().split('T')[0];
            document.getElementById('time').value = '09:00'; // Default time
        }
    });

    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });
});

