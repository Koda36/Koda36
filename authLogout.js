// Fonction pour vérifier si l'utilisateur est authentifié
function isAuthenticated() {
    return localStorage.getItem('authenticated') === 'true';
}

// Fonction pour rediriger vers la page de connexion si non authentifié
function redirectToLogin() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// Fonction pour gérer la déconnexion
function logout() {
    localStorage.removeItem('authenticated');
    window.location.href = 'login.html';
}

// Fonction pour initialiser l'authentification sur les pages protégées
function initializeAuth() {
    redirectToLogin();
}

// Fonction pour gérer l'authentification lors de la connexion
function handleLogin(event) {
    event.preventDefault();

    const cuid = document.getElementById('cuid').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error');

    fetch('base/agents.json')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.CUID === cuid && user.Mot_de_passe === password);

            if (user) {
                localStorage.setItem('authenticated', 'true');
                window.location.href = 'index.html';
            } else {
                errorDiv.textContent = 'CUID ou Mot de passe incorrect.';
            }
        })
        .catch(error => console.error('Erreur lors du chargement des données:', error));
}
