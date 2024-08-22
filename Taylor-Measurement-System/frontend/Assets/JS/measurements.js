document.addEventListener('DOMContentLoaded', async () => {
    const api = 'http://localhost:5000/api/v1/taylors/pemaish';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const measurementsCards = document.getElementById('measurementsCards');

    await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json().catch(err => {
                throw new Error('Invalid JSON: ' + err.message);
            });
        })
        .then(data => {
            if (!data.data || data.data.length === 0) {
                errorElement.textContent = 'No records found';
                return;
            }

            data.data.forEach(measurement => {
                const allMeasurements = Object.entries(measurement.measurements)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');

                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${measurement.clientName}</h5>
                            <p class="card-text">Phone: ${measurement.clientPhone}</p>
                            <p class="card-text">Measurements: ${allMeasurements}</p>
                            <button class="btn btn-remove" onclick="removeMeasurement('${measurement._id}', this)">Remove</button>
                            <button class="btn btn-remove" onclick="editMeasurement('${measurement._id}', this)">Edit</button>
                        </div>
                    </div>
                `;
                measurementsCards.appendChild(card);
            });

            loadingElement.classList.add('d-none');
            measurementsCards.classList.remove('d-none');
        })
        .catch(error => {
            errorElement.textContent = 'An error occurred: ' + error.message;
            loadingElement.classList.add('d-none');
            console.error('Fetch error:', error);
        });
});

function removeMeasurement(id, buttonElement) {
    try {
        fetch(`http://localhost:5000/api/v1/taylors/DeleteMeasurement/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                const card = buttonElement.closest('.col-md-4');
                card.remove();
            }
        })
        .catch(error => {
            console.error('Error deleting measurement:', error);
            alert('Error while removing measurement');
        });
    } catch (err) {
        console.error('Error:', err);
        alert('Error while removing measurement');
    }
}
function editMeasurement(id, buttonElement) {


}
