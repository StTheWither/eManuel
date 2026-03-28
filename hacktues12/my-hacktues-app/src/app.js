const apiBase = 'http://localhost:5096';

async function jsonRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });

    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch {}

    return {
      ok: response.ok,
      status: response.status,
      data,
      error: response.ok ? null : (data?.message || text || 'Грешка в заявката')
    };
  } catch (ex) {
    return { ok: false, status: 0, data: null, error: ex.message };
  }
}

async function registerUser(user) {
  return jsonRequest(`${apiBase}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(user)
  });
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
      console.log('register result', result);

      if (result.ok) {
        localStorage.setItem('pageMessage', 'Регистрацията е успешна!');
        localStorage.setItem('pageMessageType', 'success');
        window.location.href = 'index.html';
        return;
      }

      showMessage(result.error || 'Грешка при регистрация', true);
    });
  }
}

document.addEventListener('DOMContentLoaded', initForms);