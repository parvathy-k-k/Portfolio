class ThemeManager {
    constructor(options) {
        this.toggleBtn = document.getElementById(options.toggleBtnId);
        this.root = document.documentElement;
        this.icon = document.getElementById(options.iconId);
        this.logo = document.querySelector(options.logoSelector);
        this.yearElem = document.getElementById(options.yearId);
        this.logoLightSrc = options.logoLightSrc;
        this.logoDarkSrc = options.logoDarkSrc;

        this.init();
    }

    init() {
        // Apply saved or system theme on load
        document.addEventListener("DOMContentLoaded", () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.setTheme(savedTheme);
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.setTheme(prefersDark ? 'dark' : 'light');
            }

            this.setYear();
            this.bindEvents();
        });
    }

    bindEvents() {
        // Theme toggle button
        this.toggleBtn?.addEventListener('click', () => {
            const current = this.root.dataset.theme || 'light';
            this.setTheme(current === 'dark' ? 'light' : 'dark');
        });

        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            nav.classList.toggle('open');
        });

        nav.addEventListener('click', (event) => {
            const target = event.target;
            // Check if the clicked element or its ancestor is an anchor inside nav
            if (target.tagName === 'A' || target.closest('a')) {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.toggle('open');
            }
        });

    }

    setTheme(theme) {
        this.root.dataset.theme = theme;
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            // this.icon.classList.replace('fa-sun', 'fa-moon');
            // this.toggleBtn.setAttribute('aria-label', 'Switch to light theme');
            if (this.logo) this.logo.src = this.logoDarkSrc;
        } else {
            // this.icon.classList.replace('fa-moon', 'fa-sun');
            // this.toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
            if (this.logo) this.logo.src = this.logoLightSrc;
        }
    }

    setYear() {
        if (this.yearElem) {
            this.yearElem.textContent = new Date().getFullYear();
        }
    }
}

// Usage example
const themeManager = new ThemeManager({
    toggleBtnId: 'themeToggle',
    iconId: 'switchIcon',
    logoSelector: '.logo',
    yearId: 'year',
    logoLightSrc: './images/logo_new.svg',
    logoDarkSrc: './images/logo_new.svg'
});
