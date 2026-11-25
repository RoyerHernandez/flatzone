/**
 * FlatZone — Datos de la Propuesta Económica
 */

const FZ = {
    // === Configuración General ===
    info: {
        nombre: 'FlatZone',
        tipo: 'Co-living Premium',
        ciudad: 'Medellín, Colombia',
        año: 2025,
        version: '1.0',
        vigencia: 'Enero 2025 — Diciembre 2026'
    },

    // === Plan de Inversión ===
    inversion: [
        { categoria: 'Adecuación del Inmueble', items: [
            { nombre: 'Remodelación zonas comunes', monto: 45_000_000, estado: 'presupuestado' },
            { nombre: 'Adecuación habitaciones (8)', monto: 32_000_000, estado: 'presupuestado' },
            { nombre: 'Cocina equipada compartida', monto: 18_000_000, estado: 'presupuestado' },
            { nombre: 'Baños (4 unidades)', monto: 12_000_000, estado: 'presupuestado' },
        ]},
        { categoria: 'Equipamiento y Mobiliario', items: [
            { nombre: 'Muebles habitaciones (8 x $4.5M)', monto: 36_000_000, estado: 'presupuestado' },
            { nombre: 'Electrodomésticos y cocina', monto: 15_000_000, estado: 'presupuestado' },
            { nombre: 'Sala / comedor', monto: 8_000_000, estado: 'presupuestado' },
            { nombre: 'Lavandería compartida', monto: 6_500_000, estado: 'presupuestado' },
        ]},
        { categoria: 'Tecnología y Servicios', items: [
            { nombre: 'Internet fibra óptica (instalación)', monto: 1_200_000, estado: 'presupuestado' },
            { nombre: 'Cámaras de seguridad (8)', monto: 3_800_000, estado: 'presupuestado' },
            { nombre: 'Smart locks + control acceso', monto: 4_500_000, estado: 'presupuestado' },
            { nombre: 'Plataforma gestión digital', monto: 2_000_000, estado: 'presupuestado' },
        ]},
        { categoria: 'Capital de Trabajo', items: [
            { nombre: 'Depósito arrendamiento (3 meses)', monto: 12_000_000, estado: 'presupuestado' },
            { nombre: 'Gastos legales y notariales', monto: 3_500_000, estado: 'presupuestado' },
            { nombre: 'Marketing y lanzamiento', monto: 5_000_000, estado: 'presupuestado' },
            { nombre: 'Reserva operativa (2 meses)', monto: 8_000_000, estado: 'presupuestado' },
        ]},
    ],

    // === Ingresos Proyectados ===
    ingresos: [
        { fuente: 'Habitaciones individuales (5 x $1.2M)', tipo: 'Alquiler', mensual: 6_000_000, ocupacion: 85 },
        { fuente: 'Habitaciones premium (3 x $1.8M)', tipo: 'Alquiler', mensual: 5_400_000, ocupacion: 90 },
        { fuente: 'Servicios incluidos (internet, agua, gas)', tipo: 'Servicios', mensual: 1_600_000, ocupacion: 100 },
        { fuente: 'Almacenamiento y parqueadero', tipo: 'Adicional', mensual: 800_000, ocupacion: 70 },
        { fuente: 'Lavandería express', tipo: 'Adicional', mensual: 400_000, ocupacion: 60 },
    ],

    // === Costos Operativos Mensuales ===
    costos: [
        { nombre: 'Arrendamiento del inmueble', categoria: 'Fijo', monto: 4_000_000 },
        { nombre: 'Internet fibra óptica', categoria: 'Fijo', monto: 180_000 },
        { nombre: 'Administración PH', categoria: 'Fijo', monto: 350_000 },
        { nombre: 'Seguro todo riesgo', categoria: 'Fijo', monto: 280_000 },
        { nombre: 'Agua y alcantarillado', categoria: 'Variable', monto: 320_000 },
        { nombre: 'Gas natural', categoria: 'Variable', monto: 180_000 },
        { nombre: 'Energía eléctrica (zonas comunes)', categoria: 'Variable', monto: 250_000 },
        { nombre: 'Aseo y mantenimiento', categoria: 'Variable', monto: 600_000 },
        { nombre: 'Marketing digital', categoria: 'Variable', monto: 400_000 },
        { nombre: 'Gestión y administración (10%)', categoria: 'Gestión', monto: 1_420_000 },
        { nombre: 'Fondo de mantenimiento (3%)', categoria: 'Reserva', monto: 426_000 },
    ],

    // === Cronograma ===
    fases: [
        {
            nombre: 'Fase 1 — Preparación',
            periodo: 'Enero — Febrero 2025',
            estado: 'done',
            tareas: [
                { nombre: 'Estudio de mercado', estado: 'done' },
                { nombre: 'Búsqueda inmueble', estado: 'done' },
                { nombre: 'Negociación contrato', estado: 'done' },
                { nombre: 'Constitución legal', estado: 'done' },
            ]
        },
        {
            nombre: 'Fase 2 — Adecuación',
            periodo: 'Marzo — Mayo 2025',
            estado: 'active',
            tareas: [
                { nombre: 'Remodelación', estado: 'active' },
                { nombre: 'Compra mobiliario', estado: 'active' },
                { nombre: 'Instalación tecnología', estado: 'pending' },
                { nombre: 'Fotografía / tour virtual', estado: 'pending' },
            ]
        },
        {
            nombre: 'Fase 3 — Lanzamiento',
            periodo: 'Junio — Julio 2025',
            estado: 'pending',
            tareas: [
                { nombre: 'Publicación plataformas', estado: 'pending' },
                { nombre: 'Campaña marketing', estado: 'pending' },
                { nombre: 'Primeros residentes', estado: 'pending' },
                { nombre: 'Ajustes operativos', estado: 'pending' },
            ]
        },
        {
            nombre: 'Fase 4 — Consolidación',
            periodo: 'Agosto — Diciembre 2025',
            estado: 'pending',
            tareas: [
                { nombre: 'Ocupación plena (95%)', estado: 'pending' },
                { nombre: 'Optimización procesos', estado: 'pending' },
                { nombre: 'Evaluación expansión', estado: 'pending' },
                { nombre: 'Revisión propuesta v2', estado: 'pending' },
            ]
        },
    ],

    // === Helpers ===
    getTotalInversion() {
        return this.inversion.reduce((s, cat) =>
            s + cat.items.reduce((ss, i) => ss + i.monto, 0), 0);
    },
    getIngresoMensual() {
        return this.ingresos.reduce((s, i) => s + Math.round(i.mensual * i.ocupacion / 100), 0);
    },
    getCostoMensual() {
        return this.costos.reduce((s, c) => s + c.monto, 0);
    },
    getFlujoPuro() {
        return this.getIngresoMensual() - this.getCostoMensual();
    },
    getROI() {
        const anual = this.getFlujoPuro() * 12;
        return ((anual / this.getTotalInversion()) * 100).toFixed(1);
    },
    getPayback() {
        const meses = this.getTotalInversion() / this.getFlujoPuro();
        return meses.toFixed(1);
    }
};

// Formato de moneda
const CUR = { current: 'COP', rate: 4100 };

function fmt(v) {
    if (v === undefined || v === null || isNaN(v)) return '—';
    if (CUR.current === 'USD') {
        v = v / CUR.rate;
        return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' USD';
    }
    return '$' + v.toLocaleString('es-CO', { maximumFractionDigits: 0 }) + ' COP';
}

function fmtShort(v) {
    if (CUR.current === 'USD') v = v / CUR.rate;
    if (v >= 1_000_000) return '$' + (v / 1_000_000).toFixed(1) + 'M';
    if (v >= 1_000) return '$' + (v / 1_000).toFixed(0) + 'K';
    return '$' + v;
}

function switchCurrency(c) {
    CUR.current = c;
    document.getElementById('btnCOP').classList.toggle('active', c === 'COP');
    document.getElementById('btnUSD').classList.toggle('active', c === 'USD');
    if (window.app) app.rerender();
    showToast(c === 'COP' ? 'Moneda: Peso (COP)' : 'Moneda: Dólar (USD)', 'success');
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
}

function toggleSection(hdr) {
    hdr.parentElement.classList.toggle('collapsed');
}
