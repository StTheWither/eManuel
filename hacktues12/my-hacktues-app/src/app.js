const apiBase = 'http://localhost:5000';

async function jsonRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

async function registerUser(user) {
  return jsonRequest(`${apiBase}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(user)
  });
}

async function loginUser(email, password) {
  return jsonRequest(`${apiBase}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

async function createTeacherProfile(profile) {
  return jsonRequest(`${apiBase}/teacher/profile`, {
    method: 'POST',
    body: JSON.stringify(profile)
  });
}

async function createStudentProfile(profile) {
  return jsonRequest(`${apiBase}/student/profile`, {
    method: 'POST',
    body: JSON.stringify(profile)
  });
}

async function fetchTeachers() {
  return jsonRequest(`${apiBase}/teachers`);
}

function showMessage(message, isError = false) {
  const elem = document.querySelector('#messageBox');
  if (elem) {
    elem.textContent = message;
    elem.style.color = isError ? 'red' : 'green';
  } else {
    alert(message);
  }
}

function renderTeachers(teachers) {
  const container = document.querySelector('#teacherList');
  if (!container) return;

  container.innerHTML = teachers.map(t => `
    <div class="teacher-card">
      <h3>${t.firstName || t.firstname || ''} ${t.lastName || t.lastname || ''}</h3>
      <p>Предмет: ${t.subject || ''}</p>
      <p>Град: ${t.city || ''}</p>
      <p>Начин: ${t.teachingMode || ''}</p>
      <p>Цена: ${t.pricePerHour || ''}</p>
    </div>
  `).join('');
}

function initForms() {
  const signupForm = document.querySelector('#signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;

      const user = {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        email: form.email.value,
        pass: form.password.value,
        phoneNumber: form.phone.value,
        role: form.role.value
      };

      const result = await registerUser(user);

      if (result.ok) {
        localStorage.setItem('pageMessage', 'Регистрацията е успешна!');
        localStorage.setItem('pageMessageType', 'success');
        window.location.href = 'index.html';
        return;
      }

      showMessage(result.data?.message || 'Грешка при регистрация', true);
    });
  }

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;

      const result = await loginUser(form.email.value, form.password.value);

      if (result.ok && result.data?.isSuccessfulLogin) {
        localStorage.setItem('userEmail', form.email.value);
        window.location.href = 'teachers.html';
      } else {
        showMessage(result.data?.message || 'Грешка при вход', true);
      }
    });
  }
}

async function initPage() {
  initForms();

  const savedMessage = localStorage.getItem('pageMessage');
  if (savedMessage) {
    const messageType = localStorage.getItem('pageMessageType');
    showMessage(savedMessage, messageType !== 'success');
    localStorage.removeItem('pageMessage');
    localStorage.removeItem('pageMessageType');
  }

  const teacherList = document.querySelector('#teacherList');
  if (teacherList) {
    const response = await fetchTeachers();
    if (response.ok) renderTeachers(response.data || []);
    else showMessage('Не може да се заредят учителите', true);
  }
}

document.addEventListener('DOMContentLoaded', initPage);