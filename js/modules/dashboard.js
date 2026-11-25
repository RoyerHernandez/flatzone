/**
 * Dashboard — Resumen ejecutivo FlatZone
 */
class PageDashboard {
    constructor(el) { this.el = el; this.charts = {}; }

    render() {
        const inv = FZ.getTotalInversion();
        const ing = FZ.getIngresoMensual();
        const cos = FZ.getCostoMensual();
        const flu = FZ.getFlujoPuro();
        const roi = FZ.getROI();
        const pb  = FZ.getPayback();
        const now = new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
        const cap = now.charAt(0).toUpperCase() + now.slice(1);

        this.el.innerHTML = `
        <div class="page-top">
            <div class="page-header">
                <div>
                    <div class="page-title">📊 Resumen Ejecutivo</div>
                    <div class="page-subtitle">FlatZone — Co-living Premium · Medellín</div>
                </div>
                <span class="date-badge">${cap}</span>
            </div>

            <!-- KPIs principales -->
            <div class="kpi-grid">
                <div class="kpi orange">
                    <div class="kpi-label">Inversión Total</div>
                    <div class="kpi-value">${fmt(inv)}</div>
                    <div class="kpi-sub">Capex inicial</div>
                </div>
                <div class="kpi green">
                    <div class="kpi-label">Ingreso Mensual</div>
                    <div class="kpi-value">${fmt(ing)}</div>
                    <div class="kpi-sub">Proyectado (ocu. mixta)</div>
                    <span class="kpi-badge up">▲ Proy.</span>
                </div>
                <div class="kpi ${flu >= 0 ? 'blue' : 'red'}">
                    <div class="kpi-label">Flujo Neto / Mes</div>
                    <div class="kpi-value">${fmt(flu)}</div>
                    <div class="kpi-sub">Ing. − Costos operativos</div>
                </div>
                <div class="kpi yellow">
                    <div class="kpi-label">ROI Anual</div>
                    <div class="kpi-value">${roi}%</div>
                    <div class="kpi-sub">Retorno sobre inversión</div>
                    <span class="kpi-badge up">▲ Positivo</span>
                </div>
                <div class="kpi green">
                    <div class="kpi-label">Payback</div>
                    <div class="kpi-value">${pb} m</div>
                    <div class="kpi-sub">Meses recuperación</div>
                </div>
            </div>
        </div>

        <!-- Gráficos -->
        <div class="grid-2">
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h3>📈 Distribución de Ingresos</h3>
                    <span class="section-toggle">▾</span>
                </div>
                <div class="section-body">
                    <div class="chart-container"><canvas id="chartIngresos"></canvas></div>
                </div>
            </div>
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h3>💸 Flujo Mensual Proyectado</h3>
                    <span class="section-toggle">▾</span>
                </div>
                <div class="section-body">
                    <div class="chart-container"><canvas id="chartFlujo"></canvas></div>
                </div>
            </div>
        </div>

        <!-- Proyección anual -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>📅 Proyección Acumulada 12 meses</h3>
                <span class="section-toggle">▾</span>
            </div>
            <div class="section-body">
                <div class="chart-container" style="height:220px"><canvas id="chartAcum"></canvas></div>
            </div>
        </div>

        <!-- Resumen de costos vs ingresos -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>⚖️ Balance Mensual</h3>
                <div class="section-header-right">
                    <span class="total-badge">Flujo: ${fmt(flu)}/mes</span>
                    <span class="section-toggle">▾</span>
                </div>
            </div>
            <div class="section-body" style="padding:0">
                <div class="summary-row"><span>Ingresos proyectados</span><span class="text-success">${fmt(ing)}</span></div>
                <div class="summary-row"><span>Costos operativos fijos</span><span class="text-danger">− ${fmt(FZ.costos.filter(c=>c.categoria==='Fijo').reduce((s,c)=>s+c.monto,0))}</span></div>
                <div class="summary-row"><span>Costos variables</span><span class="text-danger">− ${fmt(FZ.costos.filter(c=>c.categoria==='Variable').reduce((s,c)=>s+c.monto,0))}</span></div>
                <div class="summary-row"><span>Gestión y reservas</span><span class="text-warning">− ${fmt(FZ.costos.filter(c=>c.categoria==='Gestión'||c.categoria==='Reserva').reduce((s,c)=>s+c.monto,0))}</span></div>
                <div class="summary-row total"><span>FLUJO NETO MENSUAL</span><span class="${flu>=0?'text-success':'text-danger'}">${fmt(flu)}</span></div>
            </div>
        </div>
        `;

        requestAnimationFrame(() => {
            this._chartIngresos();
            this._chartFlujo();
            this._chartAcum();
        });
    }

    _cc() {
        const s = getComputedStyle(document.documentElement);
        return {
            grid: s.getPropertyValue('--chart-grid').trim(),
            text: s.getPropertyValue('--chart-text').trim(),
            border: s.getPropertyValue('--bg-section').trim()
        };
    }

    _chartIngresos() {
        const el = document.getElementById('chartIngresos');
        if (!el) return;
        if (this.charts.ing) this.charts.ing.destroy();
        const cc = this._cc();
        const labels = FZ.ingresos.map(i => i.fuente.split('(')[0].trim());
        const data = FZ.ingresos.map(i => Math.round(i.mensual * i.ocupacion / 100));
        this.charts.ing = new Chart(el, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{ data, backgroundColor: ['#10b981','#3b82f6','#f59e0b','#8b5cf6','#ec4899'], borderColor: cc.border, borderWidth: 2 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: cc.text, font: { size: 11 }, padding: 10 } } }
            }
        });
    }

    _chartFlujo() {
        const el = document.getElementById('chartFlujo');
        if (!el) return;
        if (this.charts.flu) this.charts.flu.destroy();
        const cc = this._cc();
        const ing = FZ.getIngresoMensual();
        const cos = FZ.getCostoMensual();
        const flu = FZ.getFlujoPuro();
        this.charts.flu = new Chart(el, {
            type: 'bar',
            data: {
                labels: ['Ingresos', 'Costos', 'Flujo Neto'],
                datasets: [{
                    data: [ing, cos, flu],
                    backgroundColor: ['rgba(16,185,129,0.8)','rgba(239,68,68,0.8)','rgba(59,130,246,0.8)'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: cc.text }, grid: { color: cc.grid } },
                    y: { beginAtZero: true, ticks: { color: cc.text, callback: v => fmtShort(v) }, grid: { color: cc.grid } }
                }
            }
        });
    }

    _chartAcum() {
        const el = document.getElementById('chartAcum');
        if (!el) return;
        if (this.charts.acum) this.charts.acum.destroy();
        const cc = this._cc();
        const flu = FZ.getFlujoPuro();
        const inv = FZ.getTotalInversion();
        const meses = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);
        const acum = meses.map((_, i) => -inv + flu * (i + 1));
        this.charts.acum = new Chart(el, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Flujo Acumulado',
                    data: acum,
                    borderColor: '#FF8400',
                    backgroundColor: 'rgba(255,132,0,0.08)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 4,
                    pointBackgroundColor: acum.map(v => v >= 0 ? '#10b981' : '#ef4444')
                }]
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
