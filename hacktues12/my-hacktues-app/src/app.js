const apiBase = 'http://localhost:5096';

function getCurrentUser() {
  const raw = localStorage.getItem('currentUser');
  return raw ? JSON.parse(raw) : null;
}

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

async function fetchTeachers() {
  return jsonRequest(`${apiBase}/teachers`);
}

async function fetchUserMessages(userId) {
  return jsonRequest(`${apiBase}/messages/user/${userId}`);
}

async function sendMessage(senderId, receiverId, text) {
  return jsonRequest(`${apiBase}/message/send`, {
    method: 'POST',
    body: JSON.stringify({
      senderId,
      receiverId,
      text
    })
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

function renderTeachers(teachers) {
  const container = document.querySelector('#teacherList');
  if (!container) return;

  if (!teachers || teachers.length === 0) {
    container.innerHTML = '<p class="empty-note">Все още няма публикувани учители.</p>';
    return;
  }

  container.innerHTML = teachers.map(t => `
    <article class="teacher-card">
      <h3>${t.firstName || t.firstname || ''} ${t.lastName || t.lastname || ''}</h3>
      <p>Предмет: ${t.subject || ''}</p>
      <p>Град: ${t.city || ''}</p>
      <p>Начин: ${t.teachingMode || ''}</p>
      <button class="chat-button" data-id="${t.id || t.teacherId || ''}">
        Чат
      </button>
    </article>
  `).join('');

  container.querySelectorAll('.chat-button').forEach(button => {
    button.addEventListener('click', () => {
      const teacherId = button.dataset.id;
      const teacher = teachers.find(t => (t.id || t.teacherId) === teacherId);
      openChatWithTeacher(teacher);
    });
  });
}

function renderChatList(conversations) {
  const container = document.querySelector('#chatList');
  if (!container) return;

  if (!conversations || conversations.length === 0) {
    container.innerHTML = '<p class="empty-note">Все още няма чатове.</p>';
    return;
  }

  container.innerHTML = conversations.map(conv => `
    <button class="chat-item" data-id="${conv.teacherId}">
      <span class="chat-item-name">${conv.teacherName}</span>
      <span class="chat-item-last">${conv.lastMessage || 'Няма съобщения'}</span>
    </button>
  `).join('');

  container.querySelectorAll('.chat-item').forEach(button => {
    button.addEventListener('click', () => {
      const teacherId = button.dataset.id;
      const teacher = convTeachers.find(t => t.id === teacherId || t.teacherId === teacherId);
      if (teacher) openChatWithTeacher(teacher);
    });
  });
}

function renderConversation(messages, teacher) {
  const container = document.querySelector('#chatMessages');
  const title = document.querySelector('#chatWindowTitle');
  if (!container || !title) return;

  title.textContent = `Чат с ${teacher.firstName || teacher.firstname || ''} ${teacher.lastName || teacher.lastname || ''}`;

  if (!messages || messages.length === 0) {
    container.innerHTML = '<p class="empty-note">Започни разговор.</p>';
    return;
  }

  const currentUser = getCurrentUser();
  container.innerHTML = messages.map(msg => `
    <div class="chat-message ${msg.senderId === currentUser.id ? 'my-message' : 'their-message'}">
      <p>${msg.text}</p>
      <time>${new Date(msg.sentAt || msg.sentAtUtc || msg.sentAtDate || Date.now()).toLocaleString()}</time>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

let selectedTeacher = null;
let conversationMessages = [];
let convTeachers = [];

async function openChatWithTeacher(teacher) {
  selectedTeacher = teacher;
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const response = await fetchUserMessages(currentUser.id);
  if (!response.ok) {
    showMessage(response.error || 'Грешка при зареждане на чат', true);
    return;
  }

  const allMessages = response.data || [];
  conversationMessages = allMessages.filter(msg => 
    (msg.senderId === currentUser.id && msg.receiverId === teacher.id) ||
    (msg.senderId === teacher.id && msg.receiverId === currentUser.id)
  );

  renderConversation(conversationMessages, teacher);
}

function initChatForm() {
  const chatForm = document.querySelector('#chatForm');
  if (!chatForm) return;

  chatForm.addEventListener('submit', async event => {
    event.preventDefault();
    const input = document.querySelector('#chatInput');
    const currentUser = getCurrentUser();
    if (!currentUser || !selectedTeacher || !input) return;

    const text = input.value.trim();
    if (!text) return;

    const response = await sendMessage(currentUser.id, selectedTeacher.id, text);
    if (!response.ok) {
      showMessage(response.error || 'Грешка при изпращане', true);
      return;
    }

    input.value = '';
    await openChatWithTeacher(selectedTeacher);
  });
}

async function initTeachersPage() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const teachersResponse = await fetchTeachers();
  if (!teachersResponse.ok) {
    showMessage(teachersResponse.error || 'Грешка при зареждане на учители', true);
    return;
  }

  convTeachers = teachersResponse.data || [];
  renderTeachers(convTeachers);
  initChatForm();
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

      showMessage(result.error || 'Грешка при регистрация', true);
    });
  }

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const result = await loginUser(form.email.value, form.password.value);
      if (result.ok && result.data?.isSuccessfulLogin) {
        localStorage.setItem('currentUser', JSON.stringify({
          id: result.data.id,
          email: form.email.value,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          role: result.data.role
        }));
        window.location.href = 'teachers.html';
      } else {
        showMessage(result.data?.message || 'Грешка при вход', true);
      }
    });
  }
}

async function initPage() {
  initForms();
  initTeachersPage();

  const savedMessage = localStorage.getItem('pageMessage');
  if (savedMessage) {
    const messageType = localStorage.getItem('pageMessageType');
    showMessage(savedMessage, messageType !== 'success');
    localStorage.removeItem('pageMessage');
    localStorage.removeItem('pageMessageType');
  }
}

document.addEventListener('DOMContentLoaded', initPage);