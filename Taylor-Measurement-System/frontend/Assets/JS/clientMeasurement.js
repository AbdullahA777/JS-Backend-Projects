
console.log("Script Loaded");

document.getElementById('clientMeasurementForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const api = 'http://localhost:5000/api/v1/taylors/AddMeasurement';
    const formData = {
        taylorID: document.getElementById('taylorID').value.trim(),
        clientName: document.getElementById('clientName').value.trim(),
        clientPhone: document.getElementById('clientPhone').value.trim(),
        measurements: {
            chest: parseFloat(document.getElementById('chest').value),
            waist: parseFloat(document.getElementById('waist').value),
            hips: parseFloat(document.getElementById('hips').value),
            shoulder: parseFloat(document.getElementById('shoulder').value),
            sleeveLength: parseFloat(document.getElementById('sleeveLength').value),
            inseam: parseFloat(document.getElementById('inseam').value),
            outseam: parseFloat(document.getElementById('outseam').value),
            neck: parseFloat(document.getElementById('neck').value),
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value),
        }
    };

    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json()
        console.log(data);

        alert(data.message)


    } catch (error) {
        console.error("Fetching error:", error)
        alert('An error occured. Please check your network and try again.')
    }

});
