/**
 * Estructura de Costos
 */
class PageCostos {
    constructor(el) { this.el = el; this.chart = null; }

    render() {
        const total = FZ.getCostoMensual();
        const cats = ['Fijo', 'Variable', 'Gestión', 'Reserva'];
        const totCat = cats.map(c => ({
            cat: c,
            total: FZ.costos.filter(x => x.categoria === c).reduce((s, x) => s + x.monto, 0)
        }));

        const filas = FZ.costos.map(c => {
            const pct = Math.round((c.monto / total) * 100);
            const colorMap = { Fijo: 'danger', Variable: 'warning', Gestión: 'info', Reserva: 'success' };
            return `
            <div class="item-row">
                <div class="item-info">
                    <div class="item-name">${c.nombre}</div>
                    <div class="item-detail">
                        <span class="badge badge-${colorMap[c.categoria]}">${c.categoria}</span>
                        <div class="progress-wrap" style="max-width:160px;margin-top:4px">
                            <div class="progress-bar"><div class="progress-fill ${c.categoria==='Fijo'?'red':c.categoria==='Variable'?'orange':'blue'}" style="width:${Math.max(pct*3,2)}%"></div></div>
                            <span class="progress-pct">${pct}%</span>
                        </div>
                    </div>
                </div>
                <div class="item-amount">
                    <div class="item-amount-label">Mensual</div>
                    <div class="item-amount-value">${fmt(c.monto)}</div>
                </div>
                <div class="item-amount">
                    <div class="item-amount-label">Anual</div>
                    <div class="item-amount-value text-muted">${fmt(c.monto * 12)}</div>
                </div>
            </div>`;
        }).join('');

        const catCards = totCat.map(c => {
            const pct = Math.round((c.total / total) * 100);
            const colorMap = { Fijo: 'red', Variable: 'yellow', Gestión: 'blue', Reserva: 'green' };
            return `
            <div class="kpi ${colorMap[c.cat]}">
                <div class="kpi-label">Costos ${c.cat}s</div>
                <div class="kpi-value">${fmt(c.total)}</div>
                <div class="kpi-sub">${pct}% del total mensual</div>
            </div>`;
        }).join('');

        this.el.innerHTML = `
        <div class="page-top">
            <div class="page-header">
                <div>
                    <div class="page-title">🧾 Estructura de Costos</div>
                    <div class="page-subtitle">Costos operativos mensuales por categoría</div>
                </div>
                <span class="total-badge" style="font-size:0.9rem;padding:6px 14px">${fmt(total)}/mes</span>
            </div>

            <div class="kpi-grid">${catCards}</div>
        </div>

        <!-- Gráfico -->
        <div class="grid-2">
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h3>📊 Por Categoría</h3>
                    <span class="section-toggle">▾</span>
                </div>
                <div class="section-body">
                    <div class="chart-container"><canvas id="chartCostCat"></canvas></div>
                </div>
            </div>
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h3>📉 Top Costos</h3>
                    <span class="section-toggle">▾</span>
                </div>
                <div class="section-body">
                    <div class="chart-container"><canvas id="chartCostTop"></canvas></div>
                </div>
            </div>
        </div>

        <!-- Detalle -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>💸 Detalle de Costos (${FZ.costos.length} ítems)</h3>
                <div class="section-header-right">
                    <span class="total-badge">Total: ${fmt(total)}/mes</span>
                    <span class="section-toggle">▾</span>
                </div>
            </div>
            <div class="section-body" style="padding:0">
                ${filas}
                <div class="summary-row total">
                    <span>TOTAL COSTOS MENSUALES</span>
                    <span class="text-danger">${fmt(total)}</span>
                </div>
                <div class="summary-row total">
                    <span>TOTAL COSTOS ANUALES</span>
                    <span class="text-danger">${fmt(total * 12)}</span>
                </div>
            </div>
        </div>
        `;

        requestAnimationFrame(() => {
            this._chartCat(totCat, total);
            this._chartTop();
        });
    }

    _chartCat(cats, total) {
        const el = document.getElementById('chartCostCat');
        if (!el) return;
        if (this.chart) this.chart.destroy();
        const s = getComputedStyle(document.documentElement);
        const cc = { text: s.getPropertyValue('--chart-text').trim(), border: s.getPropertyValue('--bg-section').trim() };
        this.chart = new Chart(el, {
            type: 'doughnut',
            data: {
                labels: cats.map(c => c.cat),
                datasets: [{ data: cats.map(c => c.total), backgroundColor: ['#ef4444','#f59e0b','#3b82f6','#10b981'], borderColor: cc.border, borderWidth: 2 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: cc.text, font: { size: 11 }, padding: 10 } } }
            }
        });
    }

    _chartTop() {
        const el = document.getElementById('chartCostTop');
        if (!el) return;
        const s = getComputedStyle(document.documentElement);
        const cc = { grid: s.getPropertyValue('--chart-grid').trim(), text: s.getPropertyValue('--chart-text').trim() };
        const sorted = [...FZ.costos].sort((a, b) => b.monto - a.monto).slice(0, 6);
        new Chart(el, {
            type: 'bar',
            data: {
                labels: sorted.map(c => c.nombre.split(' ')[0]),
                datasets: [{ data: sorted.map(c => c.monto), backgroundColor: 'rgba(255,132,0,0.7)', borderRadius: 6 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: cc.text }, grid: { color: cc.grid } },
                    y: { ticks: { color: cc.text, callback: v => fmtShort(v) }, grid: { color: cc.grid } }
                }
            }
        });
    }
}
