document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzX4lT6eGCqfR8_m8DOpOzWWSyYCXg2Fo9CzacFgXMa6w5F-bKQ7pJQPEG_uEfulLEGLw/exec'; 
    // --- END OF CONFIGURATION ---

    const form = document.getElementById('anmeldeformular');
    const submitButton = document.getElementById('submit-button');
    const messageElement = document.getElementById('form-nachricht');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Show loading state
        setLoading(true);

        // Create a FormData object from the form
        const formData = new FormData(form);

        // Use fetch to send the data to the Google Apps Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                showMessage('Vielen Dank! Ihre Anmeldung war erfolgreich.', 'erfolg');
                form.reset(); // Clear the form
            } else {
                // Show the error message from the script if available
                throw new Error(data.error || 'Ein unbekannter Fehler ist aufgetreten.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage(`Fehler bei der Anmeldung: ${error.message}`, 'fehler');
        })
        .finally(() => {
            // Hide loading state
            setLoading(false);
        });
    });

    /**
     * Toggles the loading state of the submit button.
     * @param {boolean} isLoading - True to show loading, false to hide.
     */
    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        if (isLoading) {
            submitButton.classList.add('loading');
        } else {
            submitButton.classList.remove('loading');
        }
    }

    /**
     * Displays a status message in the form.
     * @param {string} text - The message to display.
     * @param {string} type - 'erfolg' or 'fehler' for styling.
     */
    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = type;
    }
});
