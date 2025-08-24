// nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('open');
    });
}

// theme toggle (persists)
const btn = document.getElementById('themeToggle');
const root = document.documentElement;
function setTheme(next) {
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
btn?.addEventListener('click', () => {
    const current = root.dataset.theme || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// current year
document.getElementById('year').textContent = new Date().getFullYear();
