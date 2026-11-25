/**
 * FlatZone App v2 — Single-page proposal
 */

const FZApp = {
    charts: {},

    init() {
        this.setupNav();
        this.renderKPIs();
        this.renderInversion();
        this.renderScenarios();
        this.renderCosts();
        this.renderCronograma();
        this.renderMilestones();
        this.animateHeroStats();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
    },

    update() {
        this.renderKPIs();
        this.renderInversion();
        this.renderScenarios();
        this.renderCosts();
        this.updateHeroStatsCurrency();
        // Redraw charts
        this.drawFlowChart();
        this.drawYearChart();
        this.drawInvChart();
    },

    // =============================================
    // NAV
    // =============================================
    setupNav() {
        const nav = document.getElementById('nav');
        const links = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 20);
            // Active link highlight
            const sections = ['hero','proyecto','inversion','proyeccion','cronograma'];
            let current = 'hero';
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 100) current = id;
            });
            links.forEach(a => {
                const href = a.getAttribute('href').replace('#','');
                a.classList.toggle('active', href === current);
            });
        }, { passive: true });
    },

    // =============================================
    // HERO STATS ANIMATION
    // =============================================
    animateHeroStats() {
        const stats = document.querySelectorAll('.hstat-num');
        stats.forEach(el => {
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const isCurrency = el.dataset.currency !== undefined;
            const val = isCurrency ? parseInt(el.dataset.currency) : target;

            let start = null;
            const duration = 1600;

            const step = (ts) => {
                if (!start) start = ts;
                const p = Math.min((ts - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                if (isCurrency) {
                    el.textContent = fmt(Math.round(val * ease), true);
                } else {
                    const cur = (val * ease);
                    el.textContent = Number.isInteger(target)
                        ? Math.round(cur) + suffix
                        : cur.toFixed(1) + suffix;
                }
                if (p < 1) requestAnimationFrame(step);
            };
            setTimeout(() => requestAnimationFrame(step), 300);
        });
    },

    updateHeroStatsCurrency() {
        const el = document.querySelector('.hstat-num[data-currency]');
        if (el) el.textContent = fmt(FZ.flujoNeto(), true);
    },

    // =============================================
    // KPIs
    // =============================================
    renderKPIs() {
        const container = document.getElementById('kpisRow');
        if (!container) return;
        const data = [
            { label: 'Inversión Total',      val: fmt(FZ.totalInv(), true), sub: 'Capex inicial',           c: 'c-orange' },
            { label: 'Ingreso Mensual',       val: fmt(FZ.ingMensual(), true), sub: 'Ocupación mixta',      c: 'c-green'  },
            { label: 'Costos Mensuales',      val: fmt(FZ.costoMensual(), true), sub: 'Operación completa', c: 'c-red'    },
            { label: 'Flujo Neto / Mes',      val: fmt(FZ.flujoNeto(), true), sub: 'Ing. − Costos',         c: 'c-blue'   },
            { label: 'ROI Anual',             val: FZ.roi() + '%', sub: 'Retorno anualizado',               c: 'c-yellow' },
        ];
        container.innerHTML = data.map(d => `
            <div class="kpi-card ${d.c} fade-up">
                <div class="kpi-card-label">${d.label}</div>
                <div class="kpi-card-val">${d.val}</div>
                <div class="kpi-card-sub">${d.sub}</div>
            </div>
        `).join('');
    },

    // =============================================
    // INVERSIÓN
    // =============================================
    renderInversion() {
        const totalEl = document.getElementById('invTotalVal');
        if (totalEl) totalEl.textContent = fmt(FZ.totalInv());

        const breakdown = document.getElementById('invBreakdown');
        if (!breakdown) return;

        const total = FZ.totalInv();
        breakdown.innerHTML = FZ.inversion.map(cat => {
            const catTotal = cat.items.reduce((s,i) => s + i.v, 0);
            const pct = Math.round((catTotal / total) * 100);
            return `
            <div class="inv-category open">
                <div class="inv-cat-header" onclick="this.parentElement.classList.toggle('open')">
                    <span class="inv-cat-name">${cat.cat}</span>
                    <span style="display:flex;align-items:center;gap:8px">
                        <span class="inv-cat-amount">${fmt(catTotal, true)}</span>
                        <span class="inv-cat-toggle">▾</span>
                    </span>
                </div>
                <div class="inv-cat-bar">
                    <div class="inv-cat-bar-fill" style="width:${pct}%;background:${cat.color}"></div>
                </div>
                <div class="inv-cat-items">
                    ${cat.items.map(i => `
                    <div class="inv-item">
                        <span class="inv-item-name">${i.n}</span>
                        <span class="inv-item-val">${fmt(i.v)}</span>
                    </div>`).join('')}
                </div>
            </div>`;
        }).join('');

        this.drawInvChart();
    },

    drawInvChart() {
        const el = document.getElementById('chartInv');
        if (!el) return;
        if (this.charts.inv) this.charts.inv.destroy();
        const total = FZ.totalInv();
        const labels = FZ.inversion.map(c => c.cat);
        const data   = FZ.inversion.map(c => c.items.reduce((s,i) => s+i.v, 0));
        const colors = FZ.inversion.map(c => c.color);

        // Legend
        const leg = document.getElementById('invLegend');
        if (leg) {
            leg.innerHTML = FZ.inversion.map((c, idx) => {
                const v = data[idx];
                const pct = Math.round(v/total*100);
                return `<div class="inv-legend-item">
                    <div class="inv-legend-dot" style="background:${c.color}"></div>
                    <span>${c.cat} — ${fmt(v, true)} (${pct}%)</span>
                </div>`;
            }).join('');
        }

        this.charts.inv = new Chart(el, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{ data, backgroundColor: colors, borderColor: '#152236', borderWidth: 3 }]
            },
            options: {
                responsive: true, maintainAspectRatio: true, cutout: '68%',
                plugins: { legend: { display: false } }
            }
        });
    },

    // =============================================
    // ESCENARIOS
    // =============================================
    renderScenarios() {
        const container = document.getElementById('scenariosRow');
        if (!container) return;
        const esc = [
            { label: 'Pesimista', badge: 'pess',  factor: 0.65, titulo: 'Ocupación 65%' },
            { label: 'Base',      badge: 'base-b', factor: null, titulo: 'Ocupación mixta' },
            { label: 'Optimista', badge: 'opt',    factor: 0.95, titulo: 'Ocupación 95%' },
        ];
        container.innerHTML = esc.map(e => {
            const ing = e.factor ? FZ.ingMensual(e.factor) : FZ.ingMensual();
            const flu = ing - FZ.costoMensual();
            const isBase = e.label === 'Base';
            return `
            <div class="scenario-card ${isBase ? 'base' : ''}">
                <span class="sc-badge ${e.badge}">${e.label}</span>
                <div class="sc-title">${e.titulo}</div>
                <div class="sc-label">Flujo mensual proyectado</div>
                <div class="sc-val">${fmt(flu, true)}</div>
                <div class="sc-subdesc">${fmt(ing, true)}/mes ingresos</div>
            </div>`;
        }).join('');

        this.drawFlowChart();
        this.drawYearChart();
    },

    drawFlowChart() {
        const el = document.getElementById('chartFlow');
        if (!el) return;
        if (this.charts.flow) this.charts.flow.destroy();
        const ing = FZ.ingMensual();
        const cos = FZ.costoMensual();
        const flu = FZ.flujoNeto();
        this.charts.flow = new Chart(el, {
            type: 'bar',
            data: {
                labels: ['Ingresos', 'Costos', 'Flujo Neto'],
                datasets: [{
                    data: [ing, cos, flu],
                    backgroundColor: ['rgba(5,150,105,0.85)', 'rgba(220,38,38,0.8)', 'rgba(37,99,235,0.85)'],
                    borderRadius: 10,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: '#6B7280', font: { size: 11 } }, grid: { display: false } },
                    y: { beginAtZero: true, ticks: { color: '#6B7280', font: { size: 11 }, callback: v => fmt(v, true) }, grid: { color: '#F3F4F6' }, border: { display: false } }
                }
            }
        });
    },

    drawYearChart() {
        const el = document.getElementById('chartYear');
        if (!el) return;
        if (this.charts.year) this.charts.year.destroy();
        const base = FZ.ingMensual();
        const costos = FZ.costoMensual();
        const ramp = [0.55, 0.65, 0.75, 0.82, 0.88, 0.92, 0.95, 0.97, 1.0, 1.0, 1.02, 1.04];
        const months = ['E','F','M','A','M','J','J','A','S','O','N','D'];
        this.charts.year = new Chart(el, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Ingresos',
                        data: ramp.map(r => Math.round(base * r)),
                        borderColor: '#059669',
                        backgroundColor: 'rgba(5,150,105,0.06)',
                        fill: true, tension: 0.4, pointRadius: 3,
                        pointBackgroundColor: '#059669', borderWidth: 2
                    },
                    {
                        label: 'Costos',
                        data: months.map(() => costos),
                        borderColor: '#DC2626',
                        borderDash: [6, 4],
                        fill: false, tension: 0, pointRadius: 0, borderWidth: 1.5
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#6B7280', font: { size: 11 }, boxWidth: 12, padding: 16 } } },
                scales: {
                    x: { ticks: { color: '#6B7280', font: { size: 11 } }, grid: { display: false } },
                    y: { ticks: { color: '#6B7280', font: { size: 11 }, callback: v => fmt(v, true) }, grid: { color: '#F3F4F6' }, border: { display: false } }
                }
            }
        });
    },

    // =============================================
    // COSTOS
    // =============================================
    renderCosts() {
        const totalEl = document.getElementById('costTotal');
        if (totalEl) totalEl.textContent = fmt(FZ.costoMensual()) + '/mes';

        const container = document.getElementById('costBars');
        if (!container) return;
        const total = FZ.costoMensual();
        const catMap = { fixed: 'fixed', variable: 'variable', mgmt: 'mgmt', reserve: 'reserve' };
        container.innerHTML = FZ.costos.map(c => {
            const pct = Math.round((c.v / total) * 100);
            const cls = catMap[c.cat] || 'fixed';
            return `
            <div class="cost-bar-row fade-up">
                <div class="cbar-label">${c.n}</div>
                <div class="cbar-wrap">
                    <div class="cbar-fill ${cls}" style="width:0" data-width="${Math.max(pct * 2.8, 2)}%"></div>
                </div>
                <div class="cbar-val">${fmt(c.v, true)}</div>
            </div>`;
        }).join('');

        // Animate bars after paint
        requestAnimationFrame(() => {
            document.querySelectorAll('.cbar-fill').forEach(bar => {
                setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
            });
        });
    },

    // =============================================
    // CRONOGRAMA
    // =============================================
    renderCronograma() {
        const container = document.getElementById('timelineRow');
        if (!container) return;
        container.innerHTML = FZ.fases.map((f, i) => {
            const dotClass = f.estado;
            const dotLabel = f.estado === 'done' ? '✓' : f.estado === 'active' ? '▶' : i + 1;
            return `
            <div class="tl-phase fade-up">
                <div class="tl-dot ${dotClass}">${dotLabel}</div>
                <div class="tl-phase-num">Fase ${i + 1}</div>
                <div class="tl-phase-name">${f.n}</div>
                <div class="tl-phase-period">${f.periodo}</div>
                <div class="tl-tasks">
                    ${f.tareas.map(t => `<span class="tl-task ${t.s}">${t.n}</span>`).join('')}
                </div>
            </div>`;
        }).join('');
    },

    renderMilestones() {
        const container = document.getElementById('milestones');
        if (!container) return;
        const icons = { done: '✓', active: '▶', pending: '○' };
        container.innerHTML = FZ.milestones.map(m => `
            <div class="milestone-row fade-up">
                <div class="ms-icon ${m.s === 'done' ? 'done' : m.s === 'active' ? 'active' : 'pend'}">
                    ${m.s === 'done' ? '✅' : m.s === 'active' ? '🔄' : '📌'}
                </div>
                <div class="ms-info">
                    <div class="ms-name">${m.n}</div>
                    <div class="ms-desc">${m.desc}</div>
                </div>
                <div class="ms-date">${m.fecha}</div>
                <span class="ms-badge ${m.s}">${m.s === 'done' ? 'Completado' : m.s === 'active' ? 'En curso' : 'Pendiente'}</span>
            </div>`).join('');
    },

    // =============================================
    // SCROLL EFFECTS
    // =============================================
    setupScrollEffects() {
        // parallax subtle on hero shapes
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            document.querySelectorAll('.hero-shape').forEach((s, i) => {
                s.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
            });
        }, { passive: true });
    },

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        // Observe all fade-up elements (delayed re-check for dynamically added ones)
        const observe = () => {
            document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
        };
        observe();
        setTimeout(observe, 500);
    }
};

window.addEventListener('DOMContentLoaded', () => FZApp.init());
