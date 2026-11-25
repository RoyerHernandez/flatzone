/**
 * OurHome — Admin Panel
 * Dashboard · Leads · Agentes · Propiedades
 */

const AdminPanel = (() => {

    let _section = 'dashboard';
    let _leadsFilter = 'todos';

    /* ── helpers ─────────────────────────────────── */
    function _statusClass(e) {
        const m = {
            'Nuevo': 'status-nuevo', 'Contactado': 'status-contactado',
            'Visita': 'status-visita', 'Negociación': 'status-negociacion',
            'Cerrado': 'status-cerrado', 'Descartado': 'status-descartado',
        };
        return m[e] || 'status-nuevo';
    }

    function _pipelineColor(e) {
        const m = {
            'Nuevo': '#1D4ED8', 'Contactado': '#D97706', 'Visita': '#7C3AED',
            'Negociación': '#EA580C', 'Cerrado': '#059669', 'Descartado': '#DC2626',
        };
        return m[e] || '#64748B';
    }

    function _initials(nombre) {
        return nombre.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    }

    function _agentStats(nombre) {
        const all = LEADS.filter(l => l.agente === nombre);
        return {
            asignados: all.length,
            enCurso: all.filter(l => ['Contactado','Visita','Negociación'].includes(l.estado)).length,
            cerrados: all.filter(l => l.estado === 'Cerrado').length,
        };
    }

    function _stats() {
        const today = new Date().toISOString().slice(0,10);
        const total    = LEADS.length;
        const nuevosHoy = LEADS.filter(l => l.fecha === today).length;
        const activas  = PROPERTIES.length;
        const cerrados = LEADS.filter(l => l.estado === 'Cerrado').length;
        const tasa     = total > 0 ? Math.round((cerrados / total) * 100) : 0;
        return { total, nuevosHoy, activas, cerrados, tasa };
    }

    function _toast(msg, type = 'default') {
        const ex = document.getElementById('adminToast');
        if (ex) ex.remove();
        const bg = type === 'success' ? '#059669' : type === 'warn' ? '#D97706' : '#0C1A2E';
        const t  = document.createElement('div');
        t.id     = 'adminToast';
        t.style.cssText = `position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:11px 22px;border-radius:10px;font-family:Inter,sans-serif;font-size:0.82rem;font-weight:600;z-index:9999;box-shadow:0 8px 28px rgba(0,0,0,0.25);animation:fadeInUp .25s ease;white-space:nowrap`;
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t && t.remove(), 2800);
    }

    /* ── public API ──────────────────────────────── */
    function open() {
        const badge = document.getElementById('leadsCountBadge');
        if (badge) badge.textContent = LEADS.filter(l => l.estado === 'Nuevo').length;
        document.getElementById('adminOverlay').classList.add('open');
        document.body.style.overflow = 'hidden';
        renderSection('dashboard');
    }

    function close() {
        document.getElementById('adminOverlay').classList.remove('open');
        document.body.style.overflow = '';
    }

    function renderSection(section) {
        _section = section;

        document.querySelectorAll('.admin-nav-item').forEach(el =>
            el.classList.toggle('active', el.dataset.section === section)
        );

        const titles = {
            dashboard: 'Dashboard', leads: 'Gestión de Leads',
            agentes: 'Agentes', propiedades: 'Propiedades', config: 'Configuración',
        };
        const titleEl = document.getElementById('adminSectionTitle');
        if (titleEl) titleEl.textContent = titles[section] || section;

        const content = document.getElementById('adminContent');
        if (!content) return;

        const renderers = {
            dashboard:   _renderDashboard,
            leads:       _renderLeads,
            agentes:     _renderAgentes,
            propiedades: _renderPropiedades,
            config:      _renderConfig,
        };
        content.innerHTML = renderers[section] ? renderers[section]() : '';

        // animate pipeline bars after paint
        if (section === 'dashboard') {
            requestAnimationFrame(() => {
                document.querySelectorAll('.pipeline-bar[data-pct]').forEach(el => {
                    el.style.width = el.dataset.pct + '%';
                });
            });
        }
    }

    /* ── DASHBOARD ───────────────────────────────── */
    function _renderDashboard() {
        const s  = _stats();
        const pipeline = ['Nuevo','Contactado','Visita','Negociación','Cerrado','Descartado'].map(e => ({
            e, count: LEADS.filter(l => l.estado === e).length,
        }));
        const max = s.total || 1;

        const activity = [
            { text: '<strong>Carlos Rodríguez</strong> cerró lead de Andrés Moreno — $4.2M/mes',    time: 'Hace 20 min', color: '#059669' },
            { text: 'Nuevo lead <strong>María Puentes</strong> vía WhatsApp en Chapinero',           time: 'Hace 45 min', color: '#1D4ED8' },
            { text: '<strong>Ana Martínez</strong> agendó visita para Ricardo Castro',               time: 'Hace 1h',     color: '#7C3AED' },
            { text: 'Inmueble <strong>Penthouse Q. Camacho</strong> actualizado — $890M',            time: 'Hace 2h',     color: '#D97706' },
            { text: '<strong>María Torres</strong> cerró arriendo local en Salitre',                  time: 'Hace 3h',     color: '#059669' },
            { text: 'Nuevo lead <strong>Carlos Mendoza</strong> vía WhatsApp en Santa Bárbara',      time: 'Hace 4h',     color: '#1D4ED8' },
        ];

        return `
<div class="admin-kpi-row">
    ${_kpi('Total Leads', s.total, '↑ 12% vs mes anterior', 'up', '#EFF6FF', '#1D4ED8',
        '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>')}
    ${_kpi('Nuevos Hoy', s.nuevosHoy, '↑ activos en pipeline', 'up', '#ECFDF5', '#059669',
        '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>')}
    ${_kpi('Propiedades', s.activas, '↑ 2 esta semana', 'up', '#FFF7ED', '#D97706',
        '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>')}
    ${_kpi('Tasa Cierre', s.tasa + '%', (s.tasa >= 15 ? '↑' : '↓') + ' objetivo: 20%', s.tasa >= 15 ? 'up' : 'down', '#F3E8FF', '#7C3AED',
        '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>')}
</div>

<div class="admin-grid-2">
    <div class="admin-card">
        <div class="admin-card-title">
            Pipeline de Leads
            <span style="font-size:0.7rem;font-weight:500;color:var(--muted)">${s.total} leads</span>
        </div>
        <div class="pipeline-row">
            ${pipeline.map(p => `
            <div class="pipeline-item">
                <span class="pipeline-label">${p.e}</span>
                <div class="pipeline-bar-wrap">
                    <div class="pipeline-bar" data-pct="${Math.round((p.count/max)*100)}"
                         style="background:${_pipelineColor(p.e)}"></div>
                </div>
                <span class="pipeline-count">${p.count}</span>
            </div>`).join('')}
        </div>
    </div>
    <div class="admin-card">
        <div class="admin-card-title">Actividad Reciente</div>
        <div class="activity-feed">
            ${activity.map(a => `
            <div class="activity-item">
                <div class="activity-dot" style="background:${a.color}"></div>
                <div>
                    <div class="activity-text">${a.text}</div>
                    <div class="activity-time">${a.time}</div>
                </div>
            </div>`).join('')}
        </div>
    </div>
</div>

<div>
    <div style="font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">
        Leads Recientes
        <button class="btn-sm btn-sm-outline" onclick="AdminPanel.renderSection('leads')">Ver todos →</button>
    </div>
    <div class="admin-table-wrap">
        <table class="admin-table">
            <thead><tr>
                <th>Nombre</th><th>Fecha</th><th>Zona</th><th>Tipo</th>
                <th>Presupuesto</th><th>Estado</th><th>Agente</th>
            </tr></thead>
            <tbody>
                ${LEADS.slice(0,6).map(l => `
                <tr style="cursor:pointer" onclick="AdminPanel.renderSection('leads')">
                    <td class="td-name">${l.nombre}</td>
                    <td class="td-muted">${l.fecha}</td>
                    <td>${l.zona}</td>
                    <td>${l.tipo}</td>
                    <td>${fmtPrecio(l.presupuesto, l.tipo)}</td>
                    <td><span class="status-badge ${_statusClass(l.estado)}">${l.estado}</span></td>
                    <td class="td-muted">${l.agente.split(' ')[0]}</td>
                </tr>`).join('')}
            </tbody>
        </table>
    </div>
</div>`;
    }

    function _kpi(label, value, delta, dir, iconBg, iconColor, svgPath) {
        return `
<div class="kpi-card">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
        <div>
            <div class="kpi-label">${label}</div>
            <div class="kpi-value">${value}</div>
        </div>
        <div class="kpi-icon" style="background:${iconBg};color:${iconColor}">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${svgPath}</svg>
        </div>
    </div>
    <div class="kpi-delta ${dir}">${delta}</div>
</div>`;
    }

    /* ── LEADS ───────────────────────────────────── */
    function _renderLeads() {
        const estados = ['Todos','Nuevo','Contactado','Visita','Negociación','Cerrado','Descartado'];
        const nuevos  = LEADS.filter(l => l.estado === 'Nuevo').length;
        return `
<div class="admin-section-header">
    <div>
        <div class="admin-section-title">Gestión de Leads</div>
        <div class="admin-section-sub">${LEADS.length} leads en total · <span style="color:#1D4ED8;font-weight:600">${nuevos} nuevos sin contactar</span></div>
    </div>
    <button class="btn-admin-primary" onclick="AdminPanel.exportLeads()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Exportar CSV
    </button>
</div>
<div class="admin-filter-bar">
    ${estados.map(e => {
        const key   = e.toLowerCase();
        const cnt   = e === 'Todos' ? LEADS.length : LEADS.filter(l => l.estado === e).length;
        const active = (_leadsFilter === key || (_leadsFilter === 'todos' && e === 'Todos'));
        return `<button class="admin-filter-btn ${active ? 'active' : ''}"
                    onclick="AdminPanel.filterLeads('${key}')">${e} (${cnt})</button>`;
    }).join('')}
    <span class="admin-filter-sep"></span>
    <div style="position:relative">
        <svg style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--muted);pointer-events:none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="admin-search" id="leadsSearch"
               placeholder="Buscar lead..." oninput="AdminPanel.searchLeads(this.value)"
               style="padding-left:30px;width:175px">
    </div>
</div>
<div class="admin-table-wrap">
    <table class="admin-table">
        <thead><tr>
            <th>#</th><th>Nombre</th><th>Contacto</th><th>Fecha</th>
            <th>Zona</th><th>Tipo</th><th>Presupuesto</th><th>Fuente</th>
            <th>Estado</th><th>Agente</th><th>Acción</th>
        </tr></thead>
        <tbody id="leadsTableBody">${_leadsRows(_filteredLeads())}</tbody>
    </table>
</div>`;
    }

    function _filteredLeads() {
        return _leadsFilter === 'todos'
            ? LEADS
            : LEADS.filter(l => l.estado.toLowerCase() === _leadsFilter);
    }

    function _leadsRows(leads) {
        if (!leads.length) return `<tr><td colspan="11" style="text-align:center;padding:36px;color:var(--muted);font-size:0.82rem">Sin resultados para este filtro</td></tr>`;
        return leads.map(l => `
<tr id="lead-row-${l.id}">
    <td class="td-muted" style="font-size:0.7rem">#${String(l.id).padStart(3,'0')}</td>
    <td>
        <div class="td-name">${l.nombre}</div>
        ${l.nota ? `<div style="font-size:0.68rem;color:var(--muted);margin-top:2px">📝 ${l.nota}</div>` : ''}
    </td>
    <td>
        <div style="font-size:0.72rem;color:var(--muted)">${l.email}</div>
        <div style="font-size:0.72rem;color:var(--muted)">${l.tel}</div>
    </td>
    <td class="td-muted">${l.fecha}</td>
    <td>${l.zona}</td>
    <td><span style="font-size:0.72rem;background:${l.tipo==='Venta'?'#EFF6FF':'#ECFDF5'};color:${l.tipo==='Venta'?'#1D4ED8':'#059669'};padding:2px 8px;border-radius:5px;font-weight:600">${l.tipo}</span></td>
    <td class="td-name" style="white-space:nowrap">${fmtPrecio(l.presupuesto, l.tipo)}</td>
    <td><span style="font-size:0.68rem;background:var(--bg);border:1px solid var(--border);padding:2px 8px;border-radius:5px;white-space:nowrap">${l.fuente}</span></td>
    <td>
        <select class="select-inline" onchange="AdminPanel.changeStatus(${l.id}, this.value)">
            ${['Nuevo','Contactado','Visita','Negociación','Cerrado','Descartado']
                .map(e => `<option value="${e}"${l.estado===e?' selected':''}>${e}</option>`).join('')}
        </select>
    </td>
    <td>
        <select class="select-inline" onchange="AdminPanel.changeAgent(${l.id}, this.value)">
            ${AGENTS.map(a => `<option value="${a.nombre}"${l.agente===a.nombre?' selected':''}>${a.nombre.split(' ')[0]}</option>`).join('')}
        </select>
    </td>
    <td>
        <a href="https://wa.me/57${l.tel}?text=${encodeURIComponent(`Hola ${l.nombre}, soy tu agente de OurHome. ¿Podemos hablar sobre tu búsqueda en ${l.zona}?`)}"
           target="_blank" title="Contactar por WhatsApp"
           style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#ECFDF5;border:1px solid rgba(5,150,105,0.2);border-radius:6px;color:#059669;text-decoration:none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
    </td>
</tr>`).join('');
    }

    /* ── AGENTES ─────────────────────────────────── */
    function _renderAgentes() {
        return `
<div class="admin-section-header">
    <div>
        <div class="admin-section-title">Equipo de Agentes</div>
        <div class="admin-section-sub">${AGENTS.length} agentes · ${AGENTS.filter(a=>a.activo).length} activos ahora</div>
    </div>
    <button class="btn-admin-primary">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Agregar Agente
    </button>
</div>

<!-- mini scoreboard -->
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px">
    ${AGENTS.map(a => {
        const st   = _agentStats(a.nombre);
        const tasa = st.asignados ? Math.round((st.cerrados/st.asignados)*100) : 0;
        return `
    <div style="background:var(--white);border-radius:var(--r-lg);padding:16px;box-shadow:var(--shadow-card);border:1px solid var(--border);text-align:center;cursor:pointer"
         onclick="AdminPanel.renderSection('agentes')">
        <div style="width:44px;height:44px;border-radius:50%;background:${a.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;margin:0 auto 10px">
            ${_initials(a.nombre)}</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--text)">${a.nombre.split(' ')[0]}</div>
        <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${tasa>=20?'var(--green)':'var(--amber)'};margin-top:4px">${tasa}% cierre</div>
    </div>`;
    }).join('')}
</div>

<div class="agents-grid">
    ${AGENTS.map(a => {
        const st   = _agentStats(a.nombre);
        const tasa = st.asignados ? Math.round((st.cerrados/st.asignados)*100) : 0;
        const fillColor = tasa >= 20 ? 'var(--green)' : tasa >= 10 ? 'var(--amber)' : 'var(--red)';
        return `
    <div class="agent-card">
        <div class="agent-header">
            <div class="agent-avatar-lg" style="background:${a.color}">${_initials(a.nombre)}</div>
            <div style="flex:1;min-width:0">
                <div class="agent-info-name">${a.nombre}</div>
                <div class="agent-info-zones">${a.email}</div>
                <div class="agent-info-zones" style="margin-top:3px">📍 ${a.zonas.join(' · ')}</div>
            </div>
            <div class="agent-status">
                <span class="status-badge ${a.activo?'status-cerrado':'status-descartado'}">${a.activo?'Activo':'Inactivo'}</span>
            </div>
        </div>

        <div class="agent-stats">
            <div>
                <div class="agent-stat-num">${st.asignados}</div>
                <div class="agent-stat-lbl">Asignados</div>
            </div>
            <div>
                <div class="agent-stat-num">${st.enCurso}</div>
                <div class="agent-stat-lbl">En Curso</div>
            </div>
            <div>
                <div class="agent-stat-num">${st.cerrados}</div>
                <div class="agent-stat-lbl">Cerrados</div>
            </div>
        </div>

        <div>
            <div class="agent-perf-label">
                <span>Tasa de cierre</span>
                <span style="color:${fillColor};font-weight:700">${tasa}%</span>
            </div>
            <div class="agent-perf-bar">
                <div class="agent-perf-fill" style="width:${tasa}%;background:${fillColor}"></div>
            </div>
        </div>

        <div class="agent-actions">
            <button class="btn-sm btn-sm-outline" style="flex:1" onclick="AdminPanel._editAgent(${a.id})">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Editar perfil
            </button>
            <button class="btn-sm btn-sm-outline" onclick="AdminPanel.filterLeads('${a.zonas[0].toLowerCase()}')">
                Ver leads (${st.asignados})
            </button>
        </div>
    </div>`;
    }).join('')}
</div>`;
    }

    /* ── PROPIEDADES ─────────────────────────────── */
    function _renderPropiedades() {
        const ventas   = PROPERTIES.filter(p => p.trans === 'Venta').length;
        const arriendos = PROPERTIES.filter(p => p.trans === 'Arriendo').length;
        return `
<div class="admin-section-header">
    <div>
        <div class="admin-section-title">Gestión de Propiedades</div>
        <div class="admin-section-sub">${PROPERTIES.length} propiedades · <span style="color:#1D4ED8">${ventas} en venta</span> · <span style="color:#059669">${arriendos} en arriendo</span></div>
    </div>
    <button class="btn-admin-primary" onclick="AdminPanel._newProp()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nueva Propiedad
    </button>
</div>

<div class="admin-table-wrap">
    <table class="admin-table">
        <thead><tr>
            <th>Foto</th><th>Inmueble</th><th>Zona</th><th>Transacción</th>
            <th>Precio</th><th>Especificaciones</th><th>Estrato</th><th>Agente</th>
            <th>Publicado</th><th>Acciones</th>
        </tr></thead>
        <tbody>
            ${PROPERTIES.map(p => `
            <tr id="prop-row-${p.id}">
                <td><img class="prop-thumb" src="${p.img}" alt="${p.tipo}" loading="lazy"></td>
                <td>
                    <div class="td-name">${p.tipo}</div>
                    ${p.badge ? `<span class="status-badge" style="background:${p.badgeColor}22;color:${p.badgeColor};margin-top:4px;display:inline-flex">${p.badge}</span>` : ''}
                </td>
                <td>${p.zona}</td>
                <td><span class="status-badge ${p.trans==='Venta'?'status-nuevo':'status-cerrado'}">${p.trans}</span></td>
                <td class="td-name" style="white-space:nowrap">${fmtPrecio(p.precio, p.trans)}</td>
                <td class="td-muted" style="font-size:0.72rem;white-space:nowrap">
                    ${p.hab>0?p.hab+' hab · ':''}${p.ban>0?p.ban+' baños · ':''}${p.m2}m²
                </td>
                <td class="td-muted">E${p.estrato}</td>
                <td class="td-muted" style="font-size:0.72rem">${p.agente.nombre.split(' ')[0]}</td>
                <td>
                    <label class="toggle-switch" title="Publicar / Despublicar">
                        <input type="checkbox" checked
                               onchange="AdminPanel._toggleProp(${p.id}, this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </td>
                <td>
                    <div style="display:flex;gap:6px">
                        <button class="btn-sm btn-sm-outline" onclick="AdminPanel.close();openModal(${p.id})">Ver</button>
                        <button class="btn-sm btn-sm-outline" onclick="AdminPanel._toast('Próximamente: editor de inmueble','warn')">Editar</button>
                    </div>
                </td>
            </tr>`).join('')}
        </tbody>
    </table>
</div>`;
    }

    /* ── CONFIGURACIÓN ───────────────────────────── */
    function _renderConfig() {
        return `
<div class="admin-section-header">
    <div>
        <div class="admin-section-title">Configuración</div>
        <div class="admin-section-sub">Ajustes generales de la plataforma</div>
    </div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    ${_configCard('Datos de la empresa', [
        ['Nombre', 'OurHome'],
        ['Ciudad', 'Bogotá, Colombia'],
        ['Email', 'hola@ourhome.co'],
        ['WhatsApp', '+57 300 123 4567'],
    ])}
    ${_configCard('Notificaciones', [
        ['Nuevos leads por WhatsApp', 'Activado'],
        ['Resumen diario por email', 'Activado'],
        ['Alertas de visita', 'Activado'],
        ['Reporte semanal', 'Desactivado'],
    ])}
    ${_configCard('Módulos activos', [
        ['Catálogo público', 'Publicado'],
        ['Formulario vendedores', 'Activo'],
        ['Chat WhatsApp directo', 'Activo'],
        ['API Pagos (fase 2)', 'Pendiente'],
    ])}
    ${_configCard('Créditos del sistema', [
        ['Versión', '1.0.0 · Demo'],
        ['Stack', 'HTML · CSS · JS'],
        ['Propuesta', 'No. 001-2026'],
        ['Desarrollo', 'OurHome © 2026'],
    ])}
</div>`;
    }

    function _configCard(title, rows) {
        return `
<div class="admin-card">
    <div class="admin-card-title">${title}</div>
    <div style="display:flex;flex-direction:column;gap:10px">
        ${rows.map(([k,v]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:var(--bg);border-radius:8px;font-size:0.8rem">
            <span style="color:var(--muted);font-weight:500">${k}</span>
            <span style="font-weight:600;color:var(--text)">${v}</span>
        </div>`).join('')}
    </div>
</div>`;
    }

    /* ── event handlers ──────────────────────────── */
    function filterLeads(estado) {
        _leadsFilter = estado.toLowerCase();
        renderSection('leads');
    }

    function searchLeads(query) {
        const q = query.toLowerCase();
        const src = _filteredLeads().filter(l =>
            l.nombre.toLowerCase().includes(q) ||
            l.zona.toLowerCase().includes(q)   ||
            l.email.toLowerCase().includes(q)  ||
            l.agente.toLowerCase().includes(q)
        );
        const tbody = document.getElementById('leadsTableBody');
        if (tbody) tbody.innerHTML = _leadsRows(src);
    }

    function changeStatus(leadId, newStatus) {
        const l = LEADS.find(x => x.id === leadId);
        if (!l) return;
        l.estado = newStatus;
        // update badge count in sidebar
        const badge = document.getElementById('leadsCountBadge');
        if (badge) badge.textContent = LEADS.filter(x => x.estado === 'Nuevo').length;
        _toast(`${l.nombre} → ${newStatus}`, 'success');
    }

    function changeAgent(leadId, newAgent) {
        const l = LEADS.find(x => x.id === leadId);
        if (!l) return;
        l.agente = newAgent;
        _toast(`Reasignado a ${newAgent.split(' ')[0]}`);
    }

    function exportLeads() {
        const header = ['ID','Nombre','Email','Teléfono','Fecha','Tipo','Zona','Presupuesto','Estado','Agente','Fuente','Nota'];
        const rows   = LEADS.map(l => [
            l.id, `"${l.nombre}"`, l.email, l.tel, l.fecha,
            l.tipo, l.zona, l.presupuesto, l.estado, `"${l.agente}"`, l.fuente, `"${l.nota}"`
        ]);
        const csv  = [header, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url; a.download = 'leads-ourhome.csv'; a.click();
        URL.revokeObjectURL(url);
        _toast('CSV descargado (20 leads)', 'success');
    }

    function _editAgent(id) {
        const a = AGENTS.find(x => x.id === id);
        _toast(a ? `Editando: ${a.nombre} (próximamente)` : 'Agente no encontrado', 'warn');
    }

    function _toggleProp(id, on) {
        _toast(on ? '✓ Propiedad publicada' : 'Propiedad despublicada', on ? 'success' : 'default');
    }

    function _newProp() {
        _toast('Formulario de nueva propiedad (próximamente)', 'warn');
    }

    /* ── init ────────────────────────────────────── */
    // close on overlay click (not panel click)
    document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('adminOverlay');
        if (overlay) {
            overlay.addEventListener('click', e => {
                if (e.target === overlay) close();
            });
        }
    });

    return {
        open, close, renderSection,
        filterLeads, searchLeads,
        changeStatus, changeAgent,
        exportLeads,
        _editAgent, _toggleProp, _newProp, _toast,
    };

})();
