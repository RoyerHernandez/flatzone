/**
 * OurHome — Demo Data
 * Inmuebles ficticios para Bogotá, Colombia
 */

const PROPERTIES = [
    {
        id: 1,
        tipo: 'Apartamento',
        trans: 'Venta',
        zona: 'Chapinero',
        precio: 380000000,
        hab: 2, ban: 2, m2: 65,
        estrato: 4,
        parq: true,
        desc: 'Moderno apartamento en el corazón de Chapinero con acabados de alta calidad, balcón con vista a la ciudad y cocina integral. Conjunto residencial con portería 24h.',
        img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
        agente: { nombre: 'Carlos Rodríguez', tel: '573001234567' },
        badge: 'Destacado',
        badgeColor: '#6B9E78',
    },
    {
        id: 2,
        tipo: 'Casa',
        trans: 'Venta',
        zona: 'Usaquén',
        precio: 850000000,
        hab: 4, ban: 3, m2: 180,
        estrato: 5,
        parq: true,
        desc: 'Hermosa casa familiar en conjunto cerrado de Usaquén. Amplio jardín privado, sala comedor con doble altura, cocina gourmet y parqueadero para 2 vehículos.',
        img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
        agente: { nombre: 'Ana Martínez', tel: '573009876543' },
        badge: 'Nueva',
        badgeColor: '#1A3A2A',
    },
    {
        id: 3,
        tipo: 'Apartamento',
        trans: 'Arriendo',
        zona: 'Rosales',
        precio: 3500000,
        hab: 3, ban: 2, m2: 95,
        estrato: 6,
        parq: true,
        desc: 'Apartamento amoblado de lujo en El Rosales, piso 12, vista panorámica a los cerros. Cocina integral, sala amplia y cuarto de servicio.',
        img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
        agente: { nombre: 'Diego Peña', tel: '573005551234' },
        badge: 'Amoblado',
        badgeColor: '#7C3AED',
    },
    {
        id: 4,
        tipo: 'Local',
        trans: 'Arriendo',
        zona: 'Salitre',
        precio: 4200000,
        hab: 0, ban: 1, m2: 85,
        estrato: 3,
        parq: false,
        desc: 'Local comercial en zona de alto flujo peatonal sobre Avenida El Dorado. Ideal para restaurante, café o tienda. Planta libre, baño incluido.',
        img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&h=400&fit=crop',
        agente: { nombre: 'María Torres', tel: '573008881234' },
        badge: 'Comercial',
        badgeColor: '#D97706',
    },
    {
        id: 5,
        tipo: 'Apartamento',
        trans: 'Venta',
        zona: 'Santa Bárbara',
        precio: 710000000,
        hab: 3, ban: 3, m2: 110,
        estrato: 5,
        parq: true,
        desc: 'Apartamento de lujo en conjunto exclusivo con piscina, gimnasio y portería 24h. Acabados importados, cocina integral y amplia terraza privada.',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
        agente: { nombre: 'Carlos Rodríguez', tel: '573001234567' },
        badge: null,
        badgeColor: null,
    },
    {
        id: 6,
        tipo: 'Casa',
        trans: 'Venta',
        zona: 'Cedritos',
        precio: 520000000,
        hab: 3, ban: 2, m2: 140,
        estrato: 4,
        parq: true,
        desc: 'Casa en conjunto cerrado de Cedritos. Sala-comedor amplio, cocina abierta tipo americano, patio interior y terraza. Zona tranquila y bien ubicada.',
        img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&h=400&fit=crop',
        agente: { nombre: 'Ana Martínez', tel: '573009876543' },
        badge: 'Oportunidad',
        badgeColor: '#A0634A',
    },
    {
        id: 7,
        tipo: 'Lote',
        trans: 'Venta',
        zona: 'Suba',
        precio: 280000000,
        hab: 0, ban: 0, m2: 300,
        estrato: 3,
        parq: false,
        desc: 'Lote urbanizado en zona en valorización de Suba. Servicios completos (agua, luz, gas, alcantarillado). Acceso a vías principales. Excelente oportunidad de inversión.',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
        agente: { nombre: 'Diego Peña', tel: '573005551234' },
        badge: 'Inversión',
        badgeColor: '#6B9E78',
    },
    {
        id: 8,
        tipo: 'Apartamento',
        trans: 'Venta',
        zona: 'Quinta Camacho',
        precio: 890000000,
        hab: 3, ban: 3, m2: 120,
        estrato: 6,
        parq: true,
        desc: 'Penthouse exclusivo con terraza privada de 40m² y vista de 360° a Bogotá. Acabados de lujo, cocina gourmet, parqueadero doble y depósito.',
        img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
        agente: { nombre: 'María Torres', tel: '573008881234' },
        badge: 'Penthouse',
        badgeColor: '#6366F1',
    },
    {
        id: 9,
        tipo: 'Apartamento',
        trans: 'Arriendo',
        zona: 'Chapinero',
        precio: 2200000,
        hab: 1, ban: 1, m2: 45,
        estrato: 3,
        parq: false,
        desc: 'Estudio moderno amoblado en Chapinero Alto. Incluye servicios públicos, internet y Netflix. Ideal para profesionales y estudiantes universitarios.',
        img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop',
        agente: { nombre: 'Carlos Rodríguez', tel: '573001234567' },
        badge: 'Servicios incluidos',
        badgeColor: '#0891B2',
    },
    {
        id: 10,
        tipo: 'Casa',
        trans: 'Venta',
        zona: 'Kennedy',
        precio: 420000000,
        hab: 3, ban: 2, m2: 120,
        estrato: 3,
        parq: true,
        desc: 'Casa de dos pisos en Kennedy, sala-comedor amplio, 3 habitaciones, cocina independiente, patio y garaje para un vehículo. Barrio tranquilo y bien comunicado.',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        agente: { nombre: 'Ana Martínez', tel: '573009876543' },
        badge: null,
        badgeColor: null,
    },
    {
        id: 11,
        tipo: 'Apartamento',
        trans: 'Venta',
        zona: 'Modelia',
        precio: 310000000,
        hab: 2, ban: 2, m2: 72,
        estrato: 4,
        parq: true,
        desc: 'Apartamento bien conservado en Modelia. Sala-comedor, dos habitaciones con closets, cocina independiente, dos baños y cuarto de lavandería.',
        img: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop',
        agente: { nombre: 'Diego Peña', tel: '573005551234' },
        badge: null,
        badgeColor: null,
    },
    {
        id: 12,
        tipo: 'Casa',
        trans: 'Venta',
        zona: 'La Calera',
        precio: 1200000000,
        hab: 5, ban: 4, m2: 320,
        estrato: 6,
        parq: true,
        desc: 'Casa campestre de lujo en La Calera con jardín de 1.000m², piscina privada, zona BBQ, sala de juegos y vista espectacular a los cerros orientales.',
        img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
        agente: { nombre: 'María Torres', tel: '573008881234' },
        badge: 'Premium',
        badgeColor: '#D97706',
    },
];

const HOW_STEPS = {
    comprador: [
        { icon: '🔍', n: '1', title: 'Busca tu inmueble', desc: 'Filtra por tipo, zona, precio y habitaciones en nuestro catálogo.' },
        { icon: '📞', n: '2', title: 'Contacta al agente', desc: 'Haz clic en el botón de WhatsApp y habla directo con el agente asignado.' },
        { icon: '🏠', n: '3', title: 'Visita y cierra', desc: 'El agente coordina la visita y te acompaña en todo el proceso.' },
    ],
    vendedor: [
        { icon: '📝', n: '1', title: 'Registra tu inmueble', desc: 'Llena el formulario con los datos de tu propiedad. Es gratis y toma 2 minutos.' },
        { icon: '👤', n: '2', title: 'Te asignamos un agente', desc: 'Un agente experto en tu zona se encarga de publicar y gestionar los leads.' },
        { icon: '💰', n: '3', title: 'Cierra la negociación', desc: 'Te informamos de cada oferta y te acompañamos hasta el cierre del negocio.' },
    ],
};

function fmtPrecio(v, trans) {
    if (trans === 'Arriendo') {
        return '$' + v.toLocaleString('es-CO') + '/mes';
    }
    if (v >= 1_000_000_000) return '$' + (v / 1_000_000_000).toFixed(2).replace('.00','') + ' Mil M';
    return '$' + (v / 1_000_000).toFixed(0) + 'M';
}

function fmtPrecioFull(v, trans) {
    const str = '$' + v.toLocaleString('es-CO');
    return trans === 'Arriendo' ? str + '/mes' : str;
}

function waLink(tel, prop) {
    const msg = encodeURIComponent(`Hola, me interesa el inmueble: ${prop.tipo} en ${prop.zona} · ${fmtPrecio(prop.precio, prop.trans)}. ¿Podemos agendar una visita?`);
    return `https://wa.me/${tel}?text=${msg}`;
}

/* =====================================================
   AGENTS & LEADS — Demo Data
   ===================================================== */

const AGENTS = [
    { id: 1, nombre: 'Carlos Rodríguez', email: 'carlos@ourhome.co', tel: '573001234567', zonas: ['Chapinero', 'Santa Bárbara'], activo: true, color: '#1D4ED8' },
    { id: 2, nombre: 'Ana Martínez',     email: 'ana@ourhome.co',    tel: '573009876543', zonas: ['Usaquén', 'Cedritos', 'Kennedy'], activo: true, color: '#059669' },
    { id: 3, nombre: 'Diego Peña',       email: 'diego@ourhome.co',  tel: '573005551234', zonas: ['Rosales', 'Suba', 'Modelia'],   activo: true, color: '#7C3AED' },
    { id: 4, nombre: 'María Torres',     email: 'maria@ourhome.co',  tel: '573008881234', zonas: ['Salitre', 'Quinta Camacho', 'La Calera'], activo: true, color: '#D97706' },
];

const LEADS = [
    { id: 1,  nombre: 'Santiago Gómez',      email: 'sgomez@gmail.com',       tel: '3112345678', fecha: '2026-11-24', tipo: 'Venta',    zona: 'Chapinero',      presupuesto: 400000000, estado: 'Nuevo',       agente: 'Carlos Rodríguez', fuente: 'WhatsApp',  nota: '' },
    { id: 2,  nombre: 'Laura Jiménez',        email: 'laura.j@hotmail.com',    tel: '3209876543', fecha: '2026-11-23', tipo: 'Arriendo', zona: 'Usaquén',        presupuesto: 3000000,   estado: 'Contactado',  agente: 'Ana Martínez',     fuente: 'Formulario', nota: 'Busca desde enero' },
    { id: 3,  nombre: 'Ricardo Castro',       email: 'rcastro@outlook.com',    tel: '3155554321', fecha: '2026-11-23', tipo: 'Venta',    zona: 'Usaquén',        presupuesto: 900000000, estado: 'Visita',      agente: 'Ana Martínez',     fuente: 'Referido',  nota: 'Visita sábado 10am' },
    { id: 4,  nombre: 'Valentina Ruiz',       email: 'vruiz@gmail.com',        tel: '3002221133', fecha: '2026-11-22', tipo: 'Venta',    zona: 'Rosales',        presupuesto: 700000000, estado: 'Negociación', agente: 'Diego Peña',       fuente: 'Portal',    nota: 'Contraoferta enviada' },
    { id: 5,  nombre: 'Andrés Moreno',        email: 'andres.m@empresa.co',    tel: '3187776655', fecha: '2026-11-22', tipo: 'Arriendo', zona: 'Salitre',        presupuesto: 4500000,   estado: 'Cerrado',     agente: 'María Torres',     fuente: 'WhatsApp',  nota: 'Contrato firmado' },
    { id: 6,  nombre: 'Camila Torres',        email: 'camila.t@gmail.com',     tel: '3104443322', fecha: '2026-11-21', tipo: 'Venta',    zona: 'Santa Bárbara',  presupuesto: 650000000, estado: 'Nuevo',       agente: 'Carlos Rodríguez', fuente: 'WhatsApp',  nota: '' },
    { id: 7,  nombre: 'Felipe Vargas',        email: 'fvargas@hotmail.com',    tel: '3219998877', fecha: '2026-11-21', tipo: 'Venta',    zona: 'Cedritos',       presupuesto: 500000000, estado: 'Contactado',  agente: 'Ana Martínez',     fuente: 'Formulario', nota: '' },
    { id: 8,  nombre: 'Isabela Forero',       email: 'iforero@gmail.com',      tel: '3131112233', fecha: '2026-11-20', tipo: 'Arriendo', zona: 'Chapinero',      presupuesto: 2500000,   estado: 'Visita',      agente: 'Carlos Rodríguez', fuente: 'Portal',    nota: 'Visita coordinada viernes' },
    { id: 9,  nombre: 'Juan Pablo Niño',      email: 'jp.nino@empresa.co',     tel: '3006667788', fecha: '2026-11-20', tipo: 'Venta',    zona: 'Quinta Camacho', presupuesto: 850000000, estado: 'Negociación', agente: 'María Torres',     fuente: 'Referido',  nota: 'Interesado en penthouse' },
    { id: 10, nombre: 'Daniela Ospina',       email: 'dospina@gmail.com',      tel: '3178883344', fecha: '2026-11-19', tipo: 'Venta',    zona: 'Kennedy',        presupuesto: 420000000, estado: 'Cerrado',     agente: 'Ana Martínez',     fuente: 'WhatsApp',  nota: 'Escritura en trámite' },
    { id: 11, nombre: 'Martín Suárez',        email: 'msuarez@outlook.com',    tel: '3245556677', fecha: '2026-11-19', tipo: 'Venta',    zona: 'Modelia',        presupuesto: 310000000, estado: 'Descartado',  agente: 'Diego Peña',       fuente: 'Formulario', nota: 'Presupuesto insuficiente' },
    { id: 12, nombre: 'Sofía Hernández',      email: 'sofia.h@gmail.com',      tel: '3121234567', fecha: '2026-11-18', tipo: 'Arriendo', zona: 'Rosales',        presupuesto: 3800000,   estado: 'Contactado',  agente: 'Diego Peña',       fuente: 'WhatsApp',  nota: '' },
    { id: 13, nombre: 'David Beltrán',        email: 'dbeltran@empresa.co',    tel: '3089990011', fecha: '2026-11-18', tipo: 'Venta',    zona: 'Suba',           presupuesto: 280000000, estado: 'Nuevo',       agente: 'Diego Peña',       fuente: 'Portal',    nota: '' },
    { id: 14, nombre: 'Alejandra Pedraza',    email: 'apedraza@gmail.com',     tel: '3162223344', fecha: '2026-11-17', tipo: 'Venta',    zona: 'La Calera',      presupuesto: 1200000000,estado: 'Visita',      agente: 'María Torres',     fuente: 'Referido',  nota: 'Cliente VIP, muy interesado' },
    { id: 15, nombre: 'Tomás Guerrero',       email: 'tguerrero@hotmail.com',  tel: '3194445566', fecha: '2026-11-17', tipo: 'Arriendo', zona: 'Salitre',        presupuesto: 4200000,   estado: 'Cerrado',     agente: 'María Torres',     fuente: 'WhatsApp',  nota: 'Local comercial arrendado' },
    { id: 16, nombre: 'Natalia Cubillos',     email: 'ncubillos@gmail.com',    tel: '3037778899', fecha: '2026-11-16', tipo: 'Venta',    zona: 'Chapinero',      presupuesto: 380000000, estado: 'Contactado',  agente: 'Carlos Rodríguez', fuente: 'Portal',    nota: '' },
    { id: 17, nombre: 'Esteban Ramírez',      email: 'eramirez@empresa.co',    tel: '3148889900', fecha: '2026-11-15', tipo: 'Venta',    zona: 'Usaquén',        presupuesto: 820000000, estado: 'Negociación', agente: 'Ana Martínez',     fuente: 'Referido',  nota: 'Segunda visita realizada' },
    { id: 18, nombre: 'María Puentes',        email: 'mpuentes@gmail.com',     tel: '3200001122', fecha: '2026-11-24', tipo: 'Arriendo', zona: 'Chapinero',      presupuesto: 2200000,   estado: 'Nuevo',       agente: 'Carlos Rodríguez', fuente: 'WhatsApp',  nota: '' },
    { id: 19, nombre: 'Juliana Vargas',       email: 'jvargas@hotmail.com',    tel: '3061112233', fecha: '2026-11-14', tipo: 'Venta',    zona: 'Cedritos',       presupuesto: 520000000, estado: 'Cerrado',     agente: 'Ana Martínez',     fuente: 'Formulario', nota: 'Negociación exitosa' },
    { id: 20, nombre: 'Carlos Mendoza',       email: 'cmendoza@empresa.co',    tel: '3172223344', fecha: '2026-11-24', tipo: 'Venta',    zona: 'Santa Bárbara',  presupuesto: 710000000, estado: 'Nuevo',       agente: 'Carlos Rodríguez', fuente: 'WhatsApp',  nota: '' },
];
