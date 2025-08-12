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

        // Erfolgsmeldung anzeigen
        zeigeNachricht('Vielen Dank für Ihre Anmeldung! Sie werden in Kürze eine Bestätigung per E-Mail erhalten.', 'erfolg');
        
        // Optional: Das Formular nach erfolgreicher Übermittlung zurücksetzen
        anmeldeformular.reset();

        // HINWEIS: An dieser Stelle würden Sie die Daten normalerweise an einen Server senden.
        // Für diese reine Frontend-Lösung simulieren wir nur den Erfolg.
        // Um Daten zu sammeln, könnten Sie Dienste wie Formspree oder Netlify Forms nutzen.
        console.log('Formulardaten:', {
            vorname,
            nachname,
            firma: document.getElementById('firma').value.trim(),
            email,
            telefon: document.getElementById('telefon').value.trim(),
            anzahl
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