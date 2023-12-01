// script.js
document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate');
    const passwordList = document.getElementById('password-list');
    const notification = document.getElementById('notification');

    generateButton.addEventListener('click', function () {
        const passwordLength = document.getElementById('length').value;
        const passwordTitle = document.getElementById('title').value;

        if (!passwordTitle) {
            alert("Veuillez entrer un titre pour le mot de passe.");
            return;
        }

        const newPassword = generatePassword(passwordLength);
        displayPassword(newPassword, passwordTitle);
        showNotification('Nouveau mot de passe généré et sauvegardé!');
    });

    function generatePassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    function displayPassword(password, title) {
        const savedPasswordsList = document.getElementById('saved-passwords');

        const passwordItem = document.createElement('li');
        passwordItem.innerHTML = `<strong>${title}:</strong> ( ${password} )`;
        savedPasswordsList.appendChild(passwordItem);

        // Enregistrer le titre et le mot de passe dans le localStorage
        savePassword({ title, password });
    }

    function savePassword(passwordObject) {
        // Récupérer les mots de passe sauvegardés depuis le localStorage
        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];

        // Ajouter le nouvel objet {title, password} au tableau
        savedPasswords.push(passwordObject);

        // Enregistrer le tableau mis à jour dans le localStorage
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';

        // Cacher la notification après quelques secondes (ajustez la durée si nécessaire)
        setTimeout(function () {
            notification.style.display = 'none';
        }, 3000);
    }


});
