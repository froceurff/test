// script.js
document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate');
    const passwordList = document.getElementById('password-list');
    const notification = document.getElementById('notification');
    const downloadButton = document.getElementById('downloadButton');

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

    downloadButton.addEventListener('click', downloadPasswords);

    function downloadPasswords() {
        const passwords = [];
        const passwordItems = document.querySelectorAll('.password-list li');
        
        passwordItems.forEach(item => {
            const title = item.querySelector('strong').textContent;
            const password = item.textContent.split(":")[1].trim();
            passwords.push(`${title} ${password}`);
        });

        const content = passwords.join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'passwords.txt';
        a.click();
    }

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

        savePassword({ title, password });
    }

    function savePassword(passwordObject) {
        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
        savedPasswords.push(passwordObject);
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(function () {
            notification.style.display = 'none';
        }, 3000);
    }

    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
    displayPasswords(savedPasswords);
});
