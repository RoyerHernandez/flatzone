/**
 * FlatZone App — Router principal
 */
class FlatZoneApp {
    constructor() {
        this.container = document.getElementById('app-content');
        this.currentPage = 'dashboard';
        this.currentModule = null;
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupDate();
        this.setupNavigation();
        this.setupSidebar();
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        this.loadPage(hash);
    }

    setupTheme() {
        const saved = localStorage.getItem('fz_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        this.updateThemeIcon(saved);
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const cur = document.documentElement.getAttribute('data-theme');
                const next = cur === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('fz_theme', next);
                this.updateThemeIcon(next);
                if (this.currentModule) this.currentModule.render();
            });
        }
    }

    updateThemeIcon(t) {
        const el = document.getElementById('themeToggle');
        if (el) el.textContent = t === 'dark' ? '🌙' : '☀️';
    }

    setupDate() {
        const el = document.getElementById('topbarDate');
        if (el) {
            const now = new Date();
            const str = now.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            el.textContent = str.charAt(0).toUpperCase() + str.slice(1);
        }
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
                document.getElementById('sidebar').classList.remove('mobile-open');
                document.getElementById('sidebarOverlay').classList.remove('active');
            });
        });
    }

    setupSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const overlay = document.getElementById('sidebarOverlay');

        toggle?.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
        mobileBtn?.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
        });
        overlay?.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }

    loadPage(page) {
        window.history.replaceState({}, '', `#${page}`);
        document.querySelectorAll('.nav-link').forEach(l =>
            l.classList.toggle('active', l.getAttribute('data-page') === page)
        );
        this.currentPage = page;
        switch (page) {
            case 'dashboard':  this.currentModule = new PageDashboard(this.container); break;
            case 'inversion':  this.currentModule = new PageInversion(this.container); break;
            case 'ingresos':   this.currentModule = new PageIngresos(this.container); break;
            case 'costos':     this.currentModule = new PageCostos(this.container); break;
            case 'cronograma': this.currentModule = new PageCronograma(this.container); break;
            default: this.loadPage('dashboard'); return;
        }
        this.currentModule.render();
        this.container.parentElement.scrollTop = 0;
    }

    rerender() {
        if (this.currentModule) this.currentModule.render();
    }
}

window.addEventListener('DOMContentLoaded', () => { window.app = new FlatZoneApp(); });
