/**
 * Ingresos Proyectados
 */
class PageIngresos {
    constructor(el) { this.el = el; this.charts = {}; }

    render() {
        const totalMensual = FZ.getIngresoMensual();
        const totalAnual = totalMensual * 12;

        const filas = FZ.ingresos.map(src => {
            const realMes = Math.round(src.mensual * src.ocupacion / 100);
            return `
            <div class="item-row">
                <div class="item-info">
                    <div class="item-name">${src.fuente}</div>
                    <div class="item-detail">
                        <span class="badge badge-info">${src.tipo}</span>
                        <div class="progress-wrap" style="max-width:200px;margin-top:4px">
                            <div class="progress-bar"><div class="progress-fill ${src.ocupacion>=85?'green':'orange'}" style="width:${src.ocupacion}%"></div></div>
                            <span class="progress-pct">${src.ocupacion}%</span>
                        </div>
                    </div>
                </div>
                <div class="item-amount">
                    <div class="item-amount-label">Cap. Máx.</div>
                    <div class="item-amount-value text-muted">${fmt(src.mensual)}</div>
                </div>
                <div class="item-amount">
                    <div class="item-amount-label">Proyectado</div>
                    <div class="item-amount-value text-success">${fmt(realMes)}</div>
                </div>
            </div>`;
        }).join('');

        // Escenarios: pesimista (70%), base (ocu actual), optimista (95%)
        const esc = [
            { nombre: 'Pesimista', factor: 0.70, color: 'red' },
            { nombre: 'Base', factor: null, color: 'orange' },
            { nombre: 'Optimista', factor: 0.95, color: 'green' },
        ];
        const escCards = esc.map(e => {
            const ing = e.factor
                ? FZ.ingresos.reduce((s, i) => s + Math.round(i.mensual * e.factor), 0)
                : totalMensual;
            const flu = ing - FZ.getCostoMensual();
            return `
            <div class="kpi ${e.color}">
                <div class="kpi-label">Escenario ${e.nombre}</div>
                <div class="kpi-value">${fmt(ing)}/mes</div>
                <div class="kpi-sub">Flujo neto: <strong>${fmt(flu)}</strong></div>
            </div>`;
        }).join('');

        this.el.innerHTML = `
        <div class="page-top">
            <div class="page-header">
                <div>
                    <div class="page-title">📈 Ingresos Proyectados</div>
                    <div class="page-subtitle">Proyección con ocupación mixta por fuente</div>
                </div>
                <span class="total-badge" style="font-size:0.9rem;padding:6px 14px">${fmt(totalMensual)}/mes</span>
            </div>

            <div class="kpi-grid">
                <div class="kpi green">
                    <div class="kpi-label">Ingreso Mensual</div>
                    <div class="kpi-value">${fmt(totalMensual)}</div>
                    <div class="kpi-sub">Ocupación mixta</div>
                </div>
                <div class="kpi blue">
                    <div class="kpi-label">Ingreso Anual</div>
                    <div class="kpi-value">${fmt(totalAnual)}</div>
                    <div class="kpi-sub">Proyección 12 meses</div>
                </div>
                <div class="kpi orange">
                    <div class="kpi-label">Capacidad Máxima</div>
                    <div class="kpi-value">${fmt(FZ.ingresos.reduce((s,i)=>s+i.mensual,0))}</div>
                    <div class="kpi-sub">Al 100% de ocupación</div>
                </div>
                <div class="kpi yellow">
                    <div class="kpi-label">Fuentes de Ingreso</div>
                    <div class="kpi-value">${FZ.ingresos.length}</div>
                    <div class="kpi-sub">Diversificadas</div>
                </div>
            </div>
        </div>

        <!-- Escenarios -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>🎯 Análisis de Escenarios</h3>
                <span class="section-toggle">▾</span>
            </div>
            <div class="section-body">
                <div class="kpi-grid">${escCards}</div>
            </div>
        </div>

        <!-- Detalle fuentes -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>💰 Detalle por Fuente (${FZ.ingresos.length})</h3>
                <div class="section-header-right">
                    <span class="total-badge">Total: ${fmt(totalMensual)}/mes</span>
                    <span class="section-toggle">▾</span>
                </div>
            </div>
            <div class="section-body" style="padding:0">
                ${filas}
                <div class="summary-row total">
                    <span>TOTAL MENSUAL PROYECTADO</span>
                    <span class="text-success">${fmt(totalMensual)}</span>
                </div>
            </div>
        </div>

        <!-- Gráfico tendencia -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>📆 Proyección Mensual (Año 1)</h3>
                <span class="section-toggle">▾</span>
            </div>
            <div class="section-body">
                <div class="chart-container"><canvas id="chartTendencia"></canvas></div>
            </div>
        </div>
        `;

        requestAnimationFrame(() => this._chartTendencia(totalMensual));
    }

    _chartTendencia(base) {
        const el = document.getElementById('chartTendencia');
        if (!el) return;
        if (this.charts.t) this.charts.t.destroy();
        const s = getComputedStyle(document.documentElement);
        const cc = { grid: s.getPropertyValue('--chart-grid').trim(), text: s.getPropertyValue('--chart-text').trim() };
        // Ramp up: months 1-3 at 60%, 4-6 at 80%, 7-12 at base
        const ramp = [0.55, 0.65, 0.75, 0.82, 0.88, 0.92, 0.96, 0.98, 1.0, 1.0, 1.02, 1.04];
        const data = ramp.map(r => Math.round(base * r));
        const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        this.charts.t = new Chart(el, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Ingresos',
                        data,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16,185,129,0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4
                    },
                    {
                        label: 'Costos',
                        data: labels.map(() => FZ.getCostoMensual()),
                        borderColor: '#ef4444',
                        borderDash: [5,5],
                        fill: false,
                        tension: 0,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { labels: { color: cc.text, font: { size: 11 } } } },
                scales: {
                    x: { ticks: { color: cc.text }, grid: { color: cc.grid } },
                    y: { beginAtZero: false, ticks: { color: cc.text, callback: v => fmtShort(v) }, grid: { color: cc.grid } }
                }
            }
        });
    }
}
