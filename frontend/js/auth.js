// Function to check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Function to logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Skip auth check for login page
    if (!window.location.pathname.includes('login.html')) {
        checkAuth();
    }
}); 