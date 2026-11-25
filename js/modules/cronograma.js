/**
 * Cronograma del Proyecto
 */
class PageCronograma {
    constructor(el) { this.el = el; }

    render() {
        const done = FZ.fases.filter(f => f.estado === 'done').length;
        const total = FZ.fases.length;
        const pct = Math.round((done / total) * 100);

        const fases = FZ.fases.map((f, i) => {
            const dotClass = f.estado === 'done' ? 'done' : f.estado === 'active' ? 'active' : 'pending';
            const dotLabel = f.estado === 'done' ? '✓' : f.estado === 'active' ? '▶' : i + 1;
            const tasks = f.tareas.map(t => `
                <span class="timeline-task ${t.estado}">${t.nombre}</span>
            `).join('');
            return `
            <div class="timeline-item">
                <div class="timeline-dot ${dotClass}">${dotLabel}</div>
                <div class="timeline-content">
                    <div class="timeline-title">${f.nombre}</div>
                    <div class="timeline-period">${f.periodo}</div>
                    <div class="timeline-tasks">${tasks}</div>
                </div>
                <div class="item-amount" style="min-width:80px;text-align:right">
                    <span class="badge badge-${dotClass === 'done' ? 'success' : dotClass === 'active' ? 'warning' : 'info'}">${f.estado === 'done' ? 'Completado' : f.estado === 'active' ? 'En Curso' : 'Pendiente'}</span>
                </div>
            </div>`;
        }).join('');

        this.el.innerHTML = `
        <div class="page-top">
            <div class="page-header">
                <div>
                    <div class="page-title">📅 Cronograma del Proyecto</div>
                    <div class="page-subtitle">FlatZone — Enero 2025 a Diciembre 2025</div>
                </div>
            </div>

            <div class="kpi-grid">
                <div class="kpi green">
                    <div class="kpi-label">Fases Completadas</div>
                    <div class="kpi-value">${done} / ${total}</div>
                    <div class="progress-wrap" style="margin-top:8px">
                        <div class="progress-bar"><div class="progress-fill green" style="width:${pct}%"></div></div>
                        <span class="progress-pct">${pct}%</span>
                    </div>
                </div>
                <div class="kpi orange">
                    <div class="kpi-label">Fase Actual</div>
                    <div class="kpi-value" style="font-size:0.95rem">${FZ.fases.find(f=>f.estado==='active')?.nombre || '—'}</div>
                    <div class="kpi-sub">${FZ.fases.find(f=>f.estado==='active')?.periodo || ''}</div>
                </div>
                <div class="kpi blue">
                    <div class="kpi-label">Próxima Fase</div>
                    <div class="kpi-value" style="font-size:0.95rem">${FZ.fases.find(f=>f.estado==='pending')?.nombre || '—'}</div>
                    <div class="kpi-sub">${FZ.fases.find(f=>f.estado==='pending')?.periodo || ''}</div>
                </div>
                <div class="kpi yellow">
                    <div class="kpi-label">Inicio Operación</div>
                    <div class="kpi-value">Jun 2025</div>
                    <div class="kpi-sub">Apertura al público</div>
                </div>
            </div>
        </div>

        <!-- Info -->
        <div class="info-box">
            <span class="material-symbols-rounded" style="font-size:18px">info</span>
            Las fechas son proyectadas. El cronograma puede ajustarse según avance de adecuaciones y disponibilidad de proveedores.
        </div>

        <!-- Timeline -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>🗓️ Fases del Proyecto</h3>
                <span class="section-toggle">▾</span>
            </div>
            <div class="section-body" style="padding:0">
                <div class="timeline">${fases}</div>
            </div>
        </div>

        <!-- Hitos clave -->
        <div class="section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3>🏁 Hitos Clave</h3>
                <span class="section-toggle">▾</span>
            </div>
            <div class="section-body" style="padding:0">
                <div class="item-row">
                    <div class="item-info"><div class="item-name">Firma del contrato de arrendamiento</div><div class="item-detail">Inicio legal del proyecto</div></div>
                    <div class="item-amount"><div class="item-amount-label">Fecha</div><div class="item-amount-value">Ene 2025</div></div>
                    <span class="badge badge-success">✓ Hecho</span>
                </div>
                <div class="item-row">
                    <div class="item-info"><div class="item-name">Inicio remodelación</div><div class="item-detail">Contratistas y permisos</div></div>
                    <div class="item-amount"><div class="item-amount-label">Fecha</div><div class="item-amount-value">Mar 2025</div></div>
                    <span class="badge badge-warning">▶ En Curso</span>
                </div>
                <div class="item-row">
                    <div class="item-info"><div class="item-name">Publicación en plataformas</div><div class="item-detail">Airbnb, Roomies, redes sociales</div></div>
                    <div class="item-amount"><div class="item-amount-label">Fecha</div><div class="item-amount-value">Jun 2025</div></div>
                    <span class="badge badge-info">Pendiente</span>
                </div>
                <div class="item-row">
                    <div class="item-info"><div class="item-name">Primer residente</div><div class="item-detail">Inicio generación de ingresos</div></div>
                    <div class="item-amount"><div class="item-amount-label">Fecha</div><div class="item-amount-value">Jun 2025</div></div>
                    <span class="badge badge-info">Pendiente</span>
                </div>
                <div class="item-row">
                    <div class="item-info"><div class="item-name">Ocupación plena (90%+)</div><div class="item-detail">Estabilización del negocio</div></div>
                    <div class="item-amount"><div class="item-amount-label">Fecha</div><div class="item-amount-value">Sep 2025</div></div>
                    <span class="badge badge-info">Pendiente</span>
                </div>
                <div class="item-row">
                    <div class="item-info"><div class="item-name">Revisión Propuesta Económica v2</div><div class="item-detail">Evaluación expansión o ajuste</div></div>
                    <div class="item-amount"><div class="item-amount-label">Fecha</div><div class="item-amount-value">Dic 2025</div></div>
                    <span class="badge badge-info">Pendiente</span>
                </div>
            </div>
        </div>
        `;
    }
}
