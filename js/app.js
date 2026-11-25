/**
 * OurHome — App v1
 * Propuesta Económica No. 001-2026
 */

const OHApp = {

    init() {
        this.setupNav();
        this.renderHero();
        this.renderResumen();
        this.renderModulos();
        this.renderStack();
        this.renderCronograma();
        this.renderEquipo();
        this.renderComparativo();
        this.renderEntregables();
        this.animateHeroCounters();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
    },

    update() {
        // Update all price-dependent elements
        document.querySelectorAll('[data-price-usd]').forEach(el => {
            const usd = parseFloat(el.dataset.priceUsd);
            el.textContent = OH.fmt(usd);
        });
        document.querySelectorAll('[data-total]').forEach(el => {
            el.textContent = OH.fmtTotal();
        });
        // Re-render comparativo bars
        this.renderComparativoRows();
    },

    // =============================================
    // NAV
    // =============================================
    setupNav() {
        const nav = document.getElementById('nav');
        const sections = ['hero','resumen','modulos','stack','cronograma','comparativo','entregables'];

        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 20);
            let current = 'hero';
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 110) current = id;
            });
            document.querySelectorAll('.nav-links a').forEach(a => {
                const href = a.getAttribute('href').replace('#','');
                a.classList.toggle('active', href === current);
            });
        }, { passive: true });
    },

    // =============================================
    // HERO COUNTERS
    // =============================================
    renderHero() {
        // Stat items are static HTML, just ensure data- attributes are set
    },

    animateHeroCounters() {
        const counters = document.querySelectorAll('.hstat-num[data-target]');
        counters.forEach(el => {
            const raw     = el.dataset.target;
            const suffix  = el.dataset.suffix || '';
            const prefix  = el.dataset.prefix || '';
            const target  = parseFloat(raw);
            const isFloat = raw.includes('.');
            const duration = 1800;
            let start = null;

            const step = (ts) => {
                if (!start) start = ts;
                const p    = Math.min((ts - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                const cur  = target * ease;
                el.textContent = prefix + (isFloat ? cur.toFixed(1) : Math.round(cur).toLocaleString('en-US')) + suffix;
                if (p < 1) requestAnimationFrame(step);
            };
            setTimeout(() => requestAnimationFrame(step), 400);
        });
    },

    // =============================================
    // RESUMEN — FLUJOS
    // =============================================
    renderResumen() {
        const flujoTypes = ['comprador','vendedor','admin'];
        flujoTypes.forEach(tipo => {
            const container = document.getElementById('flujo-' + tipo);
            if (!container) return;
            const steps = OH.flujos[tipo];
            container.innerHTML = steps.map((s, i) => `
                <div class="flow-step fade-up" style="transition-delay:${i * 80}ms">
                    <div class="flow-step-num">${s.paso}</div>
                    <div class="flow-step-info">
                        <div class="flow-step-accion">${s.accion}</div>
                        <div class="flow-step-detalle">${s.detalle}</div>
                    </div>
                </div>
                ${i < steps.length - 1 ? '<div class="flow-arrow">→</div>' : ''}
            `).join('');
        });
    },

    // =============================================
    // MÓDULOS
    // =============================================
    renderModulos() {
        const container = document.getElementById('modulosGrid');
        if (!container) return;
        container.innerHTML = OH.servicios.map((s, i) => `
            <div class="modulo-card fade-up" style="transition-delay:${(i % 3) * 80}ms; --mod-color:${s.color}">
                <div class="modulo-card-top">
                    <div class="modulo-num">${String(s.id).padStart(2,'0')}</div>
                    <div class="modulo-icon" style="background:${s.color}15; color:${s.color}">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                            <path d="${s.icon}"/>
                        </svg>
                    </div>
                </div>
                <h3 class="modulo-name">${s.nombre}</h3>
                <p class="modulo-desc">${s.desc}</p>
                <div class="modulo-price-row">
                    <span class="modulo-price-usd" data-price-usd="${s.usd}">${OH.fmt(s.usd)}</span>
                    <span class="modulo-price-label">módulo ${s.id} de 7</span>
                </div>
            </div>
        `).join('');
    },

    // =============================================
    // STACK
    // =============================================
    renderStack() {
        const container = document.getElementById('stackGrid');
        if (!container) return;
        container.innerHTML = OH.stack.map((cat, ci) => `
            <div class="stack-cat fade-up" style="transition-delay:${ci * 80}ms">
                <div class="stack-cat-header">
                    <span class="stack-cat-tag" style="background:${cat.color}18;color:${cat.color}">${cat.cat}</span>
                </div>
                <div class="stack-items">
                    ${cat.items.map(item => `
                        <div class="stack-item">
                            <div class="stack-item-dot" style="background:${cat.color}"></div>
                            <div class="stack-item-info">
                                <div class="stack-item-name">${item.n}</div>
                                <div class="stack-item-desc">${item.desc}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    },

    // =============================================
    // CRONOGRAMA
    // =============================================
    renderCronograma() {
        const container = document.getElementById('cronogramaRow');
        if (!container) return;
        container.innerHTML = OH.fases.map((f, i) => `
            <div class="fase-card fade-up" style="transition-delay:${i * 100}ms; --fase-color:${f.color}">
                <div class="fase-header">
                    <div class="fase-dot" style="background:${f.color}">${i + 1}</div>
                    <div class="fase-semanas">${f.semanas}</div>
                </div>
                <h3 class="fase-name">${f.n}</h3>
                <ul class="fase-tareas">
                    ${f.tareas.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    },

    // =============================================
    // EQUIPO
    // =============================================
    renderEquipo() {
        const container = document.getElementById('equipoGrid');
        if (!container) return;
        container.innerHTML = OH.equipo.map((m, i) => `
            <div class="equipo-card fade-up" style="transition-delay:${i * 100}ms">
                <div class="equipo-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                        <path d="${m.icon}"/>
                    </svg>
                </div>
                <h3 class="equipo-rol">${m.rol}</h3>
                <ul class="equipo-resp">
                    ${m.resp.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    },

    // =============================================
    // COMPARATIVO
    // =============================================
    renderComparativo() {
        this.renderComparativoRows();
    },

    renderComparativoRows() {
        const container = document.getElementById('comparativoTable');
        if (!container) return;
        container.innerHTML = OH.comparativo.map((row, i) => {
            const mktMid = (row.mktMin + row.mktMax) / 2;
            const saving = Math.round(((mktMid - row.oh) / mktMid) * 100);
            const barW   = Math.round((row.oh / row.mktMax) * 100);
            const ohStr  = OH.fmt(row.oh);
            const mktStr = '$' + row.mktMin.toLocaleString('en-US') + '–$' + row.mktMax.toLocaleString('en-US') + ' USD';

            return `
            <div class="comp-row fade-up" style="transition-delay:${i * 60}ms">
                <div class="comp-concepto">${row.concepto}</div>
                <div class="comp-mercado">${mktStr}</div>
                <div class="comp-oh">
                    <div class="comp-oh-wrap">
                        <div class="comp-bar-bg">
                            <div class="comp-bar-fill" data-width="${barW}%" style="width:0%"></div>
                        </div>
                        <span class="comp-oh-price" data-price-usd="${row.oh}">${ohStr}</span>
                    </div>
                </div>
                <div class="comp-saving">
                    <span class="comp-saving-badge">−${saving}%</span>
                </div>
            </div>`;
        }).join('');

        // Animate bars
        requestAnimationFrame(() => {
            setTimeout(() => {
                document.querySelectorAll('.comp-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
            }, 300);
        });
    },

    // =============================================
    // ENTREGABLES + FUTURAS
    // =============================================
    renderEntregables() {
        const entContainer = document.getElementById('entregablesList');
        if (entContainer) {
            entContainer.innerHTML = OH.entregables.map((e, i) => `
                <div class="entregable-item fade-up" style="transition-delay:${i * 50}ms">
                    <div class="entregable-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="${e.icon}"/>
                        </svg>
                    </div>
                    <span>${e.texto}</span>
                </div>
            `).join('');
        }

        const futContainer = document.getElementById('futurasList');
        if (futContainer) {
            futContainer.innerHTML = OH.futuras.map((f, i) => `
                <div class="futura-item fade-up" style="transition-delay:${i * 40}ms">
                    <span class="futura-plus">+</span>
                    <span>${f}</span>
                </div>
            `).join('');
        }

        const exclContainer = document.getElementById('exclusionesList');
        if (exclContainer) {
            exclContainer.innerHTML = OH.exclusiones.map(e => `
                <div class="excl-item">
                    <span class="excl-dash">—</span>
                    <span>${e}</span>
                </div>
            `).join('');
        }
    },

    // =============================================
    // SCROLL EFFECTS
    // =============================================
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            document.querySelectorAll('.hero-shape').forEach((s, i) => {
                s.style.transform = `translateY(${y * (0.06 + i * 0.03)}px)`;
            });
        }, { passive: true });
    },

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    // Trigger bar animations when comparativo is visible
                    if (e.target.classList.contains('comp-row')) {
                        const bar = e.target.querySelector('.comp-bar-fill');
                        if (bar) {
                            setTimeout(() => { bar.style.width = bar.dataset.width; }, 150);
                        }
                    }
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

        const observe = () => {
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
        };
        observe();
        setTimeout(observe, 600);
    },
};

window.addEventListener('DOMContentLoaded', () => OHApp.init());
