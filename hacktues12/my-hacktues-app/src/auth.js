// ============================================
// Login Form Handler
// ============================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');
        
        // Disable button
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span>Зареждане...</span>';
        
        // Call API
        const result = await loginUser(email, password);
        
        if (result.success) {
            showNotification('Успешен вход! Препращане...', 'success');
            setTimeout(() => {
                window.location.href = 'home.html'; // Промени на твоя начална страница
            }, 2000);
        } else {
            showNotification(result.message, 'error');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span>Вход</span><span class="btn-icon">→</span>';
        }
    });
}

// ============================================
// Signup Form Handler
// ============================================
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const phonenumber = document.getElementById('phone').value;
        const role = document.getElementById('role').value;
        const signupBtn = document.getElementById('signupBtn');
        
        // Validation
        if (password !== confirmPassword) {
            showNotification('Паролите не съвпадат!', 'error');
            return;
        }
        
        if (password.length < 8) {
            showNotification('Паролата трябва да е минимум 8 символа!', 'error');
            return;
        }
        
        // Disable button
        signupBtn.disabled = true;
        signupBtn.innerHTML = '<span>Регистриране...</span>';
        
        // Call API
        const result = await registerUser({
            firstname,
            lastname,
            email,
            pass: password,
            phonenumber,
            role
        });
        
        if (result.success) {
            showNotification('Успешна регистрация! Препращане към вход...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showNotification(result.message, 'error');
            signupBtn.disabled = false;
            signupBtn.innerHTML = '<span>Регистрирай се</span><span class="btn-icon">→</span>';
        }
    });
}

// ============================================
// Password Strength Indicator
// ============================================
const passwordInput = document.getElementById('signup-password');
if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
        const strength = calculatePasswordStrength(e.target.value);
        updateStrengthBar(strength);
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    return strength;
}

function updateStrengthBar(strength) {
    const bar = document.querySelector('.strength-bar');
    const text = document.querySelector('.strength-text');
    const colors = ['#A16207', '#FBBF24', '#34D399', '#60A5FA', '#4ADE80'];
    const labels = ['Слаба', 'Средна', 'Добра', 'Силна', 'Много силна'];
    const widths = ['0%', '25%', '50%', '75%', '100%'];
    
    if (bar) {
        bar.style.background = `linear-gradient(90deg, ${colors[strength]}, #4ADE80)`;
        bar.style.width = widths[strength];
    }
    
    if (text) {
        text.textContent = labels[strength];
        text.style.color = colors[strength];
    }
}

// ============================================
// Check Authentication
// ============================================
function checkAuth() {
    const token = localStorage.getItem('authToken');
    return !!token;
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}