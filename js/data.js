/**
 * FlatZone — Datos de la Propuesta Económica v2
 */
const FZ = {
    inversion: [
        { cat: 'Adecuación del Inmueble', color: '#E8572A', items: [
            { n: 'Remodelación zonas comunes',   v: 45_000_000 },
            { n: 'Habitaciones × 8',             v: 32_000_000 },
            { n: 'Cocina equipada compartida',   v: 18_000_000 },
            { n: 'Baños (4 unidades)',            v: 12_000_000 },
        ]},
        { cat: 'Mobiliario y Equipamiento', color: '#1B3A6B', items: [
            { n: 'Muebles habitaciones (8×$4.5M)', v: 36_000_000 },
            { n: 'Electrodomésticos',              v: 15_000_000 },
            { n: 'Sala / comedor',                 v: 8_000_000 },
            { n: 'Lavandería compartida',          v: 6_500_000 },
        ]},
        { cat: 'Tecnología', color: '#059669', items: [
            { n: 'Smart locks + control acceso', v: 4_500_000 },
            { n: 'Cámaras de seguridad (8)',     v: 3_800_000 },
            { n: 'Plataforma gestión digital',   v: 2_000_000 },
            { n: 'Internet fibra (instalación)', v: 1_200_000 },
        ]},
        { cat: 'Capital de Trabajo', color: '#D97706', items: [
            { n: 'Depósito arrendamiento (3m)', v: 12_000_000 },
            { n: 'Reserva operativa (2m)',       v: 8_000_000 },
            { n: 'Marketing y lanzamiento',      v: 5_000_000 },
            { n: 'Gastos legales y notariales',  v: 3_500_000 },
        ]},
    ],

    ingresos: [
        { n: 'Habitaciones individuales (5×$1.2M)', base: 6_000_000, ocu: 85 },
        { n: 'Habitaciones premium (3×$1.8M)',      base: 5_400_000, ocu: 90 },
        { n: 'Servicios incluidos',                  base: 1_600_000, ocu: 100 },
        { n: 'Parqueadero y almacenaje',             base: 800_000,   ocu: 70 },
        { n: 'Lavandería express',                   base: 400_000,   ocu: 60 },
    ],

    costos: [
        { n: 'Arrendamiento del inmueble', cat: 'fixed',    v: 4_000_000 },
        { n: 'Administración PH',          cat: 'fixed',    v: 350_000 },
        { n: 'Seguro todo riesgo',         cat: 'fixed',    v: 280_000 },
        { n: 'Internet fibra óptica',      cat: 'fixed',    v: 180_000 },
        { n: 'Aseo y mantenimiento',       cat: 'variable', v: 600_000 },
        { n: 'Marketing digital',          cat: 'variable', v: 400_000 },
        { n: 'Agua y alcantarillado',      cat: 'variable', v: 320_000 },
        { n: 'Energía eléctrica',          cat: 'variable', v: 250_000 },
        { n: 'Gas natural',               cat: 'variable', v: 180_000 },
        { n: 'Gestión y administración',   cat: 'mgmt',     v: 1_420_000 },
        { n: 'Fondo de mantenimiento',     cat: 'reserve',  v: 426_000 },
    ],

    fases: [
        { n: 'Preparación', periodo: 'Ene–Feb 2025', estado: 'done',
          tareas: ['Estudio de mercado','Búsqueda inmueble','Negociación contrato','Constitución legal'].map(t=>({n:t,s:'done'}))
        },
        { n: 'Adecuación', periodo: 'Mar–May 2025', estado: 'active',
          tareas: ['Remodelación','Compra mobiliario','Instalación tecnología','Tour virtual'].map((t,i)=>({n:t,s:i<2?'done':i===2?'active':'pending'}))
        },
        { n: 'Lanzamiento', periodo: 'Jun–Jul 2025', estado: 'pending',
          tareas: ['Publicación plataformas','Campaña marketing','Primeros residentes','Ajustes operativos'].map(t=>({n:t,s:'pending'}))
        },
        { n: 'Consolidación', periodo: 'Ago–Dic 2025', estado: 'pending',
          tareas: ['Ocupación plena 90%','Optimización procesos','Evaluación expansión','Propuesta v2'].map(t=>({n:t,s:'pending'}))
        },
    ],

    milestones: [
        { n: 'Firma del contrato',       desc: 'Inicio legal del proyecto',         fecha: 'Ene 2025', s: 'done'   },
        { n: 'Inicio remodelación',      desc: 'Contratistas y permisos activos',    fecha: 'Mar 2025', s: 'active' },
        { n: 'Entrega inmueble listo',   desc: 'Remodelación 100% completada',       fecha: 'May 2025', s: 'pending'},
        { n: 'Publicación plataformas',  desc: 'Airbnb, Roomies, redes sociales',    fecha: 'Jun 2025', s: 'pending'},
        { n: 'Primer residente',         desc: 'Inicio de generación de ingresos',   fecha: 'Jun 2025', s: 'pending'},
        { n: 'Ocupación plena 90%+',     desc: 'Estabilización y flujo positivo',    fecha: 'Sep 2025', s: 'pending'},
        { n: 'Revisión Propuesta v2',    desc: 'Evaluación expansión a 2 inmuebles', fecha: 'Dic 2025', s: 'pending'},
    ],

    totalInv() { return this.inversion.reduce((s,c)=>s+c.items.reduce((ss,i)=>ss+i.v,0),0); },
    ingMensual(factor) {
        return this.ingresos.reduce((s,i)=>{
            const f = factor !== undefined ? factor : i.ocu/100;
            return s + Math.round(i.base * f);
        },0);
    },
    costoMensual() { return this.costos.reduce((s,c)=>s+c.v,0); },
    flujoNeto(factor) { return this.ingMensual(factor) - this.costoMensual(); },
    roi() { return ((this.flujoNeto() * 12 / this.totalInv()) * 100).toFixed(1); },
    payback() { return (this.totalInv() / this.flujoNeto()).toFixed(0); },
};

// Moneda
const CUR = { current: 'COP', rate: 4100 };

function fmt(v, compact = false) {
    if (!v && v !== 0) return '—';
    if (CUR.current === 'USD') {
        v = v / CUR.rate;
        if (compact) return '$' + (v >= 1000 ? (v/1000).toFixed(0)+'K' : v.toFixed(0)) + ' USD';
        return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' USD';
    }
    if (compact) {
        if (v >= 1_000_000) return '$' + (v/1_000_000).toFixed(1) + 'M';
        if (v >= 1_000) return '$' + (v/1_000).toFixed(0) + 'K';
    }
    return '$' + v.toLocaleString('es-CO', { maximumFractionDigits: 0 });
}

function switchCurrency(c) {
    CUR.current = c;
    document.getElementById('btnCOP').classList.toggle('active', c === 'COP');
    document.getElementById('btnUSD').classList.toggle('active', c === 'USD');
    if (window.FZApp) FZApp.update();
}

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    // close mobile nav if open
    const links = document.getElementById('navLinks');
    if (links) links.classList.remove('open');
}

function toggleMobileNav() {
    document.getElementById('navLinks')?.classList.toggle('open');
}
