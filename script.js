document.addEventListener('DOMContentLoaded', () => {
    const anmeldeformular = document.getElementById('anmeldeformular');
    const nachrichtElement = document.getElementById('form-nachricht');

    anmeldeformular.addEventListener('submit', function(event) {
        // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
        event.preventDefault();

        // Formular-Daten auslesen
        const vorname = document.getElementById('vorname').value.trim();
        const nachname = document.getElementById('nachname').value.trim();
        const email = document.getElementById('email').value.trim();
        const anzahl = document.getElementById('anzahl').value;

        // Validierung: Prüfen, ob Pflichtfelder ausgefüllt sind
        if (!vorname || !nachname || !email || !anzahl) {
            zeigeNachricht('Bitte füllen Sie alle Pflichtfelder aus.', 'fehler');
            return;
        }

        // Validierung: Prüfen, ob die E-Mail ein gültiges Format hat
        if (!istEmailGueltig(email)) {
            zeigeNachricht('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'fehler');
            return;
        }

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzX4lT6eGCqfR8_m8DOpOzWWSyYCXg2Fo9CzacFgXMa6w5F-bKQ7pJQPEG_uEfulLEGLw/exec'; 
    

        const submitButton = document.getElementById('submit-button');
        const messageElement = document.getElementById('form-nachricht');

      
        e.preventDefault(); // Prevent the default form submission

        // Show loading state
        setLoading(true);

        // Create a FormData object from the form
        const formData = new FormData(anmeldeformular);

        // Use fetch to send the data to the Google Apps Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                showMessage('Vielen Dank! Ihre Anmeldung war erfolgreich.', 'erfolg');
                anmeldeformular.reset(); // Clear the form
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
     * Zeigt eine Statusnachricht im Formular an (Erfolg oder Fehler).
     * @param {string} text - Der anzuzeigende Text.
     * @param {string} typ - 'erfolg' oder 'fehler' für die entsprechende Farbe.
     */
    function zeigeNachricht(text, typ) {
        nachrichtElement.textContent = text;
        nachrichtElement.className = typ; // CSS-Klasse für die Farbe setzen
    }

    /**
     * Überprüft eine E-Mail-Adresse auf ein gültiges Format.
     * @param {string} email - Die zu prüfende E-Mail-Adresse.
     * @returns {boolean} - True, wenn die E-Mail gültig ist.
     */
    function istEmailGueltig(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});