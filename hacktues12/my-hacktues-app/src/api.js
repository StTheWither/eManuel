// ============================================
// API Configuration
// ============================================

const API_BASE_URL = 'http://localhost:5000/api'; // Промени с твоя back-end URL

// ============================================
// Login API Call
// ============================================
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.IsSuccessfulLogin) {
            // Запази токена ако е върнат
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            // Запази потребителските данни
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, data: data };
        } else {
            return { success: false, message: data.Message || 'Грешна е-поща или парола' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Грешка при свързване със сървъра' };
    }
}

// ============================================
// Register API Call
// ============================================
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                pass: userData.pass,
                role: userData.role || 'student',
                phonenumber: userData.phonenumber
            })
        });

        const data = await response.json();

        if (data.IsSuccessfulRegistration) {
            return { success: true, data: data };
        } else {
            return { success: false, message: data.Message || 'Грешка при регистрацията' };
        }
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: 'Грешка при свързване със сървъра' };
    }
}

// ============================================
// Subscription API Call (за будещо)
// ============================================
async function createSubscription(userId, planType, duration) {
    try {
        const response = await fetch(`${API_BASE_URL}/subscription/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                userId: userId,
                planType: planType,
                duration: duration
            })
        });

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error('Subscription error:', error);
        return { success: false, message: 'Грешка при свързване със сървъра' };
    }
}

// ============================================
// Notification Helper
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4ADE80' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slide-in 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slide-out 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Add Animations to document
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);