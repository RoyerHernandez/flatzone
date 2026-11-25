/**
 * Plan de Inversión
 */
class PageInversion {
    constructor(el) { this.el = el; this.chart = null; }

    render() {
        const total = FZ.getTotalInversion();
        const totPorCat = FZ.inversion.map(c => ({
            nombre: c.categoria,
            total: c.items.reduce((s, i) => s + i.monto, 0)
        }));

        const rows = FZ.inversion.map(cat => {
            const catTotal = cat.items.reduce((s, i) => s + i.monto, 0);
            const pct = Math.round((catTotal / total) * 100);
            return `
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h3>📂 ${cat.categoria}</h3>
                    <div class="section-header-right">
                        <span class="total-badge">${fmt(catTotal)} · ${pct}%</span>
                        <span class="section-toggle">▾</span>
                    </div>
                </div>
                <div class="section-body" style="padding:0">
                    ${cat.items.map(item => `
                    <div class="item-row">
                        <div class="item-info">
                            <div class="item-name">${item.nombre}</div>
                            <div class="item-detail">
                                <span class="badge badge-orange">${item.estado}</span>
                            </div>
                        </div>
                        <div class="item-amount">
                            <div class="item-amount-label">Monto</div>
                            <div class="item-amount-value">${fmt(item.monto)}</div>
                        </div>
                    </div>`).join('')}
                    <div class="summary-row total">
                        <span>Subtotal ${cat.categoria}</span>
                        <span class="text-primary-color">${fmt(catTotal)}</span>
                    </div>
                </div>
            </div>`;
        }).join('');

        this.el.innerHTML = `
        <div class="page-top">
            <div class="page-header">
                <div>
                    <div class="page-title">🏦 Plan de Inversión</div>
                    <div class="page-subtitle">Capex inicial requerido para operación</div>
                </div>
                <span class="total-badge" style="font-size:1rem;padding:6px 16px">${fmt(total)}</span>
            </div>

            <div class="kpi-grid">
                ${totPorCat.map((c, i) => {
                    const colors = ['orange','blue','green','yellow'];
                    const pct = Math.round((c.total / total) * 100);
                    return `<div class="kpi ${colors[i % colors.length]}">
                        <div class="kpi-label">${c.nombre}</div>
                        <div class="kpi-value">${fmt(c.total)}</div>
                        <div class="kpi-sub">${pct}% del total</div>
                    </div>`;
                }).join('')}
            </div>
        </div>

        <!-- Gráfico distribución -->
        <div class="section" style="margin-bottom:var(--spacing-lg)">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>📊 Distribución de la Inversión</h3>
                <span class="section-toggle">▾</span>
            </div>
            <div class="section-body">
                <div class="chart-container" style="height:240px"><canvas id="chartInv"></canvas></div>
            </div>
        </div>

        ${rows}

        <div class="section">
            <div class="section-body" style="padding:0">
                <div class="summary-row total">
                    <span>INVERSIÓN TOTAL REQUERIDA</span>
                    <span class="text-primary-color">${fmt(total)}</span>
                </div>
            </div>
        </div>
        `;

        requestAnimationFrame(() => this._chartInv(totPorCat));
    }

    _chartInv(cats) {
        const el = document.getElementById('chartInv');
        if (!el) return;
        if (this.chart) this.chart.destroy();
        const s = getComputedStyle(document.documentElement);
        const cc = { grid: s.getPropertyValue('--chart-grid').trim(), text: s.getPropertyValue('--chart-text').trim(), border: s.getPropertyValue('--bg-section').trim() };
        this.chart = new Chart(el, {
            type: 'bar',
            data: {
                labels: cats.map(c => c.nombre),
                datasets: [{
                    data: cats.map(c => c.total),
                    backgroundColor: ['rgba(255,132,0,0.8)','rgba(59,130,246,0.8)','rgba(16,185,129,0.8)','rgba(245,158,11,0.8)'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: cc.text, callback: v => fmtShort(v) }, grid: { color: cc.grid } },
                    y: { ticks: { color: cc.text }, grid: { color: cc.grid } }
                }
            }
        });
    }
}
