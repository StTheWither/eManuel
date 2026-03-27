// ============================================
// Subscription Plan Handler
// ============================================

const subscribeButtons = document.querySelectorAll('.btn-subscribe');

subscribeButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        const plan = e.target.dataset.plan;
        const price = e.target.dataset.price;
        
        // Check if user is logged in
        if (!checkAuth()) {
            showNotification('Трябва да си логиран за да закупиш абонамент!', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        // Simulate payment processing
        showNotification(`Обработка на план: ${plan} (${price}€)...`, 'info');
        
        // Here you would integrate with payment gateway like Stripe
        console.log(`Plan selected: ${plan} - Price: ${price}€`);
        
        // For now, just show success
        setTimeout(() => {
            showNotification('План успешно закупен! Благодарим ти!', 'success');
        }, 2000);
    });
});