// ============================================
// Navbar Active Link Handler
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = location.pathname.split('/').pop() || 'home.html';
    const menuItems = document.querySelectorAll('.nav-btn');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });
});