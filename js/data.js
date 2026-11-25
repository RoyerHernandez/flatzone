/**
 * OurHome — Datos de la Propuesta Económica No. 001-2026
 * TRM: $3,160 COP/USD (10 de noviembre de 2026)
 */
const OH = {
    currency: 'COP', // 'COP' | 'USD'
    trm: 3160,

    info: {
        doc:       'Propuesta Económica No. 001-2026',
        fecha:     '10 de noviembre de 2026',
        version:   '1.0',
        vigencia:  '90 días calendario',
        totalUSD:  8860,
        totalCOP:  27997600,
        semanas:   12,
        fases:     4,
        modulos:   7,
        teamSize:  3,
        infraMin:  5,
        infraMax:  40,
        ahorro:    58,
    },

    servicios: [
        {
            id: 1,
            nombre: 'Catálogo web de inmuebles con filtros',
            desc: 'Plataforma pública donde los compradores exploran propiedades con filtros avanzados (precio, zona, tipo, habitaciones), fichas detalladas con galería, mapa integrado y botón de contacto WhatsApp.',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            usd: 2400,
            cop: 7584000,
            color: '#1D4ED8',
        },
        {
            id: 2,
            nombre: 'Panel de gestión de leads y agentes',
            desc: 'Dashboard interno para administradores y agentes: tabla de leads con estados (nuevo, contactado, en proceso, cerrado), asignación manual agente-lead, historial de actividad y métricas clave.',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
            usd: 2800,
            cop: 8848000,
            color: '#7C3AED',
        },
        {
            id: 3,
            nombre: 'Gestión de propiedades (admin)',
            desc: 'CRUD completo de inmuebles: crear, editar, publicar/despublicar propiedades. Carga de fotos con CDN, campos estructurados (precio, área, tipo, zona, agente asignado) y control de visibilidad.',
            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            usd: 1000,
            cop: 3160000,
            color: '#059669',
        },
        {
            id: 4,
            nombre: 'Landing institucional + formulario captación',
            desc: 'Página de aterrizaje para vendedores ("Quiero vender mi propiedad") con propuesta de valor clara, formulario de captación que crea leads automáticamente, SEO básico y diseño responsive.',
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
            usd: 800,
            cop: 2528000,
            color: '#D97706',
        },
        {
            id: 5,
            nombre: 'Notificaciones email + WhatsApp click-to-chat',
            desc: 'Emails automáticos en eventos clave: nuevo lead, asignación de agente, cambio de estado. Links de WhatsApp click-to-chat pre-cargados por propiedad. Integración con Resend (hasta 100 emails/día gratis).',
            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            usd: 560,
            cop: 1769600,
            color: '#0891B2',
        },
        {
            id: 6,
            nombre: 'Arquitectura, infraestructura y DevOps',
            desc: 'Diseño de arquitectura escalable: modelo de datos PostgreSQL con RLS, autenticación con roles (admin/agente/público), configuración de ambientes (dev/staging/prod), CI/CD con GitHub Actions y monitoreo con Sentry.',
            icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
            usd: 800,
            cop: 2528000,
            color: '#6366F1',
        },
        {
            id: 7,
            nombre: 'Gestión de proyecto y refinamiento',
            desc: 'Coordinación técnica completa: reuniones de refinamiento semanales, gestión de backlog, comunicación con el cliente, ajustes iterativos, documentación funcional y capacitación final de 2 horas al equipo.',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
            usd: 500,
            cop: 1580000,
            color: '#EC4899',
        },
    ],

    flujos: {
        comprador: [
            { paso: 1, accion: 'Llega al sitio',           detalle: 'Desde Google, redes o referido' },
            { paso: 2, accion: 'Busca inmuebles',           detalle: 'Filtra por precio, zona, tipo' },
            { paso: 3, accion: 'Ve ficha de propiedad',     detalle: 'Fotos, datos, Google Maps' },
            { paso: 4, accion: 'Contacta agente',           detalle: 'Botón WhatsApp click-to-chat' },
            { paso: 5, accion: 'Agente gestiona lead',      detalle: 'Desde el panel interno' },
        ],
        vendedor: [
            { paso: 1, accion: 'Ve "Quiero vender"',        detalle: 'En la landing institucional' },
            { paso: 2, accion: 'Llena el formulario',       detalle: 'Nombre, teléfono, datos del inmueble' },
            { paso: 3, accion: 'Lead creado automáticamente', detalle: 'En el panel de administración' },
            { paso: 4, accion: 'Admin asigna agente',       detalle: 'Desde el dashboard de leads' },
            { paso: 5, accion: 'Agente contacta',           detalle: 'Email automático + WhatsApp' },
        ],
        admin: [
            { paso: 1, accion: 'Revisa leads nuevos',       detalle: 'Panel con alertas en tiempo real' },
            { paso: 2, accion: 'Asigna a agentes',          detalle: 'Manual, por zona o disponibilidad' },
            { paso: 3, accion: 'Publica inmuebles',         detalle: 'CRUD con fotos y datos completos' },
            { paso: 4, accion: 'Monitorea estados',         detalle: 'Seguimiento hasta cierre del lead' },
        ],
    },

    stack: [
        {
            cat: 'Frontend',
            color: '#1D4ED8',
            items: [
                { n: 'Next.js 14 + TypeScript', desc: 'SSR/SSG para SEO orgánico' },
                { n: 'Vercel',                  desc: 'Hosting gratis, deploy automático' },
                { n: 'Tailwind CSS',            desc: 'UI responsive, mobile-first' },
            ],
        },
        {
            cat: 'Backend',
            color: '#059669',
            items: [
                { n: 'Go (net/http / Fiber)',   desc: 'API REST ultrarrápida' },
                { n: 'Railway / Fly.io',        desc: '$5–$15/mes, escalable' },
                { n: 'GitHub Actions CI/CD',    desc: 'Deploy automático en push' },
            ],
        },
        {
            cat: 'Base de Datos',
            color: '#7C3AED',
            items: [
                { n: 'PostgreSQL (Supabase)',   desc: 'RLS, roles, migraciones' },
                { n: 'Supabase Auth',           desc: 'JWT, roles: admin/agente/público' },
                { n: 'Supabase Storage',        desc: 'Fotos CDN, optimización automática' },
            ],
        },
        {
            cat: 'Infraestructura',
            color: '#D97706',
            items: [
                { n: 'Cloudflare',             desc: 'CDN + WAF gratuito' },
                { n: 'Resend',                 desc: 'Email gratis hasta 100/día' },
                { n: 'Sentry',                 desc: 'Monitoreo de errores (free tier)' },
            ],
        },
    ],

    fases: [
        {
            n: 'Fundamentos',
            semanas: 'Sem 01–02',
            color: '#1D4ED8',
            tareas: [
                'Requerimientos funcionales',
                'Wireframes UX/UI',
                'Modelo de datos',
                'Setup ambientes',
                'Autenticación con roles',
            ],
        },
        {
            n: 'Catálogo + Landing',
            semanas: 'Sem 03–06',
            color: '#059669',
            tareas: [
                'Catálogo público con filtros',
                'Fichas con galería de fotos',
                'Landing institucional',
                'Formulario captación leads',
                'SEO básico',
            ],
        },
        {
            n: 'Panel de Gestión',
            semanas: 'Sem 07–10',
            color: '#7C3AED',
            tareas: [
                'Admin CRUD inmuebles',
                'Admin CRUD agentes',
                'Tabla de leads con estados',
                'Asignación manual agente',
                'Carga y gestión de fotos',
            ],
        },
        {
            n: 'Integración y Salida',
            semanas: 'Sem 11–12',
            color: '#D97706',
            tareas: [
                'Notificaciones email',
                'WhatsApp click-to-chat',
                'Pruebas funcionales',
                'Deploy producción',
                'Capacitación y transferencia',
            ],
        },
    ],

    equipo: [
        {
            rol: 'Líder Técnico / Arquitecto',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
            resp: ['Arquitectura y modelo de datos', 'Seguridad y roles', 'CI/CD y ambientes', 'Coordinación con cliente'],
        },
        {
            rol: 'Desarrollador Fullstack Senior',
            icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
            resp: ['Catálogo y panel admin', 'APIs REST en Go', 'Lógica de negocio y leads', 'Email + pruebas'],
        },
        {
            rol: 'Desarrollador Fullstack Junior',
            icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
            resp: ['Landing y formularios', 'Maquetación responsive', 'SEO básico', 'Integración UI'],
        },
    ],

    comparativo: [
        { concepto: 'Catálogo web con filtros',   mktMin: 5000,  mktMax: 12000, oh: 2400, usd: true },
        { concepto: 'Panel de leads y agentes',   mktMin: 6000,  mktMax: 15000, oh: 2800, usd: true },
        { concepto: 'Gestión propiedades admin',  mktMin: 3000,  mktMax: 6000,  oh: 1000, usd: true },
        { concepto: 'Landing + formularios',      mktMin: 2000,  mktMax: 5000,  oh: 800,  usd: true },
        { concepto: 'Notificaciones + WhatsApp',  mktMin: 1500,  mktMax: 3000,  oh: 560,  usd: true },
        { concepto: 'Infraestructura y DevOps',   mktMin: 2000,  mktMax: 4000,  oh: 800,  usd: true },
        { concepto: 'Gestión de proyecto',        mktMin: 1500,  mktMax: 3000,  oh: 500,  usd: true },
    ],

    entregables: [
        { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', texto: 'Documento de requerimientos funcionales' },
        { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',                                                                                   texto: 'Código fuente completo (repo privado GitHub)' },
        { icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', texto: 'APIs documentadas (OpenAPI/Swagger)' },
        { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',              texto: 'BD configurada con roles y permisos (Supabase)' },
        { icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',                                                            texto: 'Config de ambientes y pipeline CI/CD' },
        { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', texto: 'Pruebas funcionales básicas documentadas' },
        { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', texto: 'Guía de despliegue y mantenimiento' },
        { icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',           texto: 'Capacitación (1 sesión · 2 horas)' },
        { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', texto: 'Versión productiva desplegada en producción' },
    ],

    futuras: [
        'CRM con pipeline Kanban',
        'Mapa interactivo (Mapbox)',
        'Valuador algorítmico de propiedades',
        'Asignación automática de leads (IA)',
        'Módulo de comisiones y liquidaciones',
        'Reportes y analítica avanzada',
        'WhatsApp Business API (mensajería)',
        'Calculadora hipotecaria integrada',
        'Tour virtual / recorrido 360°',
        'Sistema de referidos de agentes',
        'App móvil nativa (iOS + Android)',
        'Expansión multi-ciudad',
    ],

    exclusiones: [
        'App móvil nativa',
        'Intermediación o asesoría financiera',
        'Soporte 24/7 post-lanzamiento',
        'QA/UAT dedicado (testing masivo)',
        'Generación de contenido (textos, fotos)',
        'Capacitación individual a agentes',
        'Diseño de marca / logotipo',
    ],

    totalUSD() { return this.info.totalUSD; },
    totalCOP() { return this.info.totalCOP; },

    fmt(usdValue) {
        if (this.currency === 'USD') {
            return '$' + usdValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' USD';
        }
        const copValue = usdValue * this.trm;
        return '$' + copValue.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' COP';
    },

    fmtTotal() {
        if (this.currency === 'USD') {
            return '$' + this.info.totalUSD.toLocaleString('en-US') + ' USD';
        }
        return '$' + this.info.totalCOP.toLocaleString('es-CO') + ' COP';
    },
};

function switchCurrency(c) {
    OH.currency = c;
    document.getElementById('btnCOP').classList.toggle('active', c === 'COP');
    document.getElementById('btnUSD').classList.toggle('active', c === 'USD');
    if (window.OHApp) OHApp.update();
}

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navLinks')?.classList.remove('open');
}

function toggleMobileNav() {
    document.getElementById('navLinks')?.classList.toggle('open');
}
