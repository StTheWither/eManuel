// ============================================
// Teachers Search Handler
// ============================================

const searchTeachers = document.getElementById('searchTeachers');
const teacherCards = document.querySelectorAll('.teacher-card');

searchTeachers.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    teacherCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const subject = card.querySelector('.teacher-subject').textContent.toLowerCase();

        if (name.includes(searchTerm) || subject.includes(searchTerm)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
});