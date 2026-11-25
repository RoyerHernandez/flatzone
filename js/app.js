/**
 * OurHome — Catalog App
 */

let currentTrans = 'Venta';
let currentHow   = 'comprador';

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderGrid(PROPERTIES);
    renderHowSteps('comprador');
    setupNav();
    // Count up hero
    animateCount('heroCount', 0, PROPERTIES.length, 1200);
});

// ============================================================
// NAV
// ============================================================
function setupNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
}

function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
}
function closeMobileNav() {
    document.getElementById('navLinks').classList.remove('open');
}

// ============================================================
// FILTERS
// ============================================================
function setTab(btn, trans) {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTrans = trans;
    applyFilters();

    // Update catalog section title
    document.getElementById('catalogTitle').textContent =
        trans === 'Venta' ? 'Inmuebles en venta' : 'Inmuebles en arriendo';
}

function quickFilter(tipo) {
    document.getElementById('filterTipo').value = tipo;
    applyFilters();
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

function clearFilters() {
    document.getElementById('filterTipo').value  = '';
    document.getElementById('filterZona').value  = '';
    document.getElementById('filterHab').value   = '';
    document.getElementById('filterPrecio').value= '';
    applyFilters();
}

function applyFilters() {
    const tipo   = document.getElementById('filterTipo').value;
    const zona   = document.getElementById('filterZona').value;
    const hab    = document.getElementById('filterHab').value;
    const precio = document.getElementById('filterPrecio').value;
    const sort   = document.getElementById('sortSelect').value;

    let results = PROPERTIES.filter(p => {
        if (p.trans !== currentTrans) return false;
        if (tipo && p.tipo !== tipo) return false;
        if (zona && p.zona !== zona) return false;
        if (hab) {
            if (hab === '4') { if (p.hab < 4) return false; }
            else { if (p.hab !== parseInt(hab)) return false; }
        }
        if (precio) {
            if (p.precio > parseInt(precio)) return false;
        }
        return true;
    });

    // Sort
    if (sort === 'precio-asc')  results.sort((a,b) => a.precio - b.precio);
    if (sort === 'precio-desc') results.sort((a,b) => b.precio - a.precio);
    if (sort === 'm2-desc')     results.sort((a,b) => b.m2 - a.m2);

    renderGrid(results);
    updateActiveFilters(tipo, zona, hab, precio);

    // Result count
    const countEl = document.getElementById('resultCount');
    countEl.textContent = results.length > 0
        ? `${results.length} inmueble${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
        : '';
}

function updateActiveFilters(tipo, zona, hab, precio) {
    const bar = document.getElementById('activeFilters');
    const tags = [];
    if (tipo)   tags.push({ label: tipo,       clear: () => { document.getElementById('filterTipo').value=''; applyFilters(); } });
    if (zona)   tags.push({ label: zona,       clear: () => { document.getElementById('filterZona').value=''; applyFilters(); } });
    if (hab)    tags.push({ label: hab === '4' ? '4+ hab' : `${hab} hab`, clear: () => { document.getElementById('filterHab').value=''; applyFilters(); } });
    if (precio) tags.push({ label: 'Con límite de precio', clear: () => { document.getElementById('filterPrecio').value=''; applyFilters(); } });

    if (tags.length === 0) { bar.style.display = 'none'; return; }
    bar.style.display = 'flex';
    bar.innerHTML = '<span class="af-label">Filtros:</span>' +
        tags.map((t,i) => `<span class="af-tag">${t.label} <button class="af-rm" onclick="clearTagAt(${i})">×</button></span>`).join('') +
        `<button class="af-clear" onclick="clearFilters()">Limpiar todo</button>`;
    // Store clear callbacks
    bar._clears = tags.map(t => t.clear);
}

window.clearTagAt = (i) => {
    document.getElementById('activeFilters')._clears[i]();
};

// ============================================================
// RENDER GRID
// ============================================================
function renderGrid(list) {
    const grid  = document.getElementById('propGrid');
    const empty = document.getElementById('emptyState');

    if (list.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'flex';
        return;
    }
    empty.style.display = 'none';

    grid.innerHTML = list.map(p => propCard(p)).join('');
}

function propCard(p) {
    const specs = [];
    if (p.hab > 0) specs.push(`<span class="spec"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> ${p.hab}</span>`);
    if (p.ban > 0) specs.push(`<span class="spec"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 12V6a2 2 0 012-2h2a2 2 0 012 2v6M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6"/></svg> ${p.ban}</span>`);
    specs.push(`<span class="spec"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg> ${p.m2}m²</span>`);

    const badge = p.badge
        ? `<span class="prop-badge" style="background:${p.badgeColor}">${p.badge}</span>`
        : '';
    const transBadge = `<span class="prop-trans ${p.trans === 'Arriendo' ? 'arr' : 'vnt'}">${p.trans}</span>`;

    return `
    <div class="prop-card" onclick="openModal(${p.id})">
        <div class="prop-img-wrap">
            <img src="${p.img}" alt="${p.tipo} en ${p.zona}" loading="lazy" class="prop-img" onerror="this.src='https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&h=400&fit=crop'">
            <div class="prop-badges">
                ${transBadge}
                ${badge}
            </div>
            ${p.parq ? '<div class="prop-parq" title="Parqueadero"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm7 4H9v10h2v-4h1a4 4 0 000-8zm0 2a2 2 0 010 4h-1V9h1z"/></svg> P</div>' : ''}
        </div>
        <div class="prop-body">
            <div class="prop-price">${fmtPrecio(p.precio, p.trans)}</div>
            <div class="prop-title">${p.tipo} · ${p.zona}</div>
            <div class="prop-zona">📍 ${p.zona}, Bogotá · Estrato ${p.estrato}</div>
            <div class="prop-specs">${specs.join('')}</div>
            <div class="prop-footer">
                <div class="prop-agente">
                    <div class="agente-avatar">${p.agente.nombre.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                    <span>${p.agente.nombre}</span>
                </div>
                <a class="btn-wa-card"
                   href="${waLink(p.agente.tel, p)}"
                   target="_blank"
                   onclick="event.stopPropagation()"
                   title="Contactar por WhatsApp">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                </a>
            </div>
        </div>
    </div>`;
}

// ============================================================
// MODAL
// ============================================================
function openModal(id) {
    const p = PROPERTIES.find(x => x.id === id);
    if (!p) return;

    const specs = [];
    if (p.hab > 0) specs.push(`<div class="modal-spec"><strong>${p.hab}</strong><span>${p.hab === 1 ? 'Habitación' : 'Habitaciones'}</span></div>`);
    if (p.ban > 0) specs.push(`<div class="modal-spec"><strong>${p.ban}</strong><span>${p.ban === 1 ? 'Baño' : 'Baños'}</span></div>`);
    specs.push(`<div class="modal-spec"><strong>${p.m2}m²</strong><span>Área</span></div>`);
    specs.push(`<div class="modal-spec"><strong>${p.estrato}</strong><span>Estrato</span></div>`);
    if (p.parq) specs.push(`<div class="modal-spec"><strong>Sí</strong><span>Parqueadero</span></div>`);

    document.getElementById('modalContent').innerHTML = `
        <div class="modal-img-wrap">
            <img src="${p.img}" alt="${p.tipo} en ${p.zona}" onerror="this.src='https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=450&fit=crop'">
            <span class="modal-trans ${p.trans === 'Arriendo' ? 'arr' : 'vnt'}">${p.trans}</span>
        </div>
        <div class="modal-body">
            <div class="modal-price">${fmtPrecioFull(p.precio, p.trans)}</div>
            <h2 class="modal-title">${p.tipo} en ${p.zona}</h2>
            <div class="modal-location">📍 ${p.zona}, Bogotá, Colombia</div>
            <div class="modal-specs">${specs.join('')}</div>
            <p class="modal-desc">${p.desc}</p>
            <div class="modal-agente">
                <div class="agente-avatar lg">${p.agente.nombre.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                <div>
                    <div class="agente-name">${p.agente.nombre}</div>
                    <div class="agente-role">Agente OurHome</div>
                </div>
            </div>
            <div class="modal-actions">
                <a class="btn-wa-modal" href="${waLink(p.agente.tel, p)}" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Contactar por WhatsApp
                </a>
                <button class="btn-modal-sec" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ============================================================
// CÓMO FUNCIONA
// ============================================================
function renderHowSteps(type) {
    const steps = HOW_STEPS[type];
    document.getElementById('howSteps').innerHTML = `
        <div class="how-grid">
            ${steps.map((s, i) => `
            <div class="how-step">
                <div class="how-num">${s.n}</div>
                <div class="how-icon">${s.icon}</div>
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
                ${i < steps.length - 1 ? '<div class="how-arrow">→</div>' : ''}
            </div>`).join('')}
        </div>`;
}

function setHowTab(btn, type) {
    document.querySelectorAll('.how-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderHowSteps(type);
}

// ============================================================
// STATS
// ============================================================
function updateStats() {
    const venta   = PROPERTIES.filter(p => p.trans === 'Venta').length;
    const arriendo= PROPERTIES.filter(p => p.trans === 'Arriendo').length;
    animateCount('statVenta', 0, venta, 1000);
    animateCount('statArr',   0, arriendo, 1000);
}

function animateCount(id, from, to, dur) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = null;
    const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

// ============================================================
// VENDEDOR FORM → WHATSAPP
// ============================================================
function enviarWA() {
    const nombre = document.getElementById('fNombre').value.trim();
    const tel    = document.getElementById('fTel').value.trim();
    const tipo   = document.getElementById('fTipo').value;
    const zona   = document.getElementById('fZona').value.trim();
    const m2     = document.getElementById('fM2').value.trim();
    const precio = document.getElementById('fPrecio').value.trim();
    const trans  = document.querySelector('input[name="trans"]:checked')?.value || 'Venta';

    if (!nombre || !tel) {
        alert('Por favor ingresa tu nombre y teléfono.');
        return;
    }

    const msg = encodeURIComponent(
        `Hola OurHome! 👋\n\n` +
        `Quiero ${trans === 'Venta' ? 'vender' : 'arrendar'} mi inmueble:\n` +
        `• Nombre: ${nombre}\n` +
        `• Teléfono: ${tel}\n` +
        `• Tipo: ${tipo}\n` +
        (zona   ? `• Zona: ${zona}\n` : '') +
        (m2     ? `• Área: ${m2}m²\n` : '') +
        (precio ? `• Precio deseado: ${precio}\n` : '') +
        `\n¿Cuándo podemos hablar?`
    );

    window.open(`https://wa.me/573001234567?text=${msg}`, '_blank');
}

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
