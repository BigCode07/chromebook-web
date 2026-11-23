import type { ImageMetadata } from 'astro';

export type FilaFicha = { caracteristica: string; detalle: string };
export type Evento = { fecha: string; lugar: string; tipo: 'Taller' | 'Demostración' };
export type Aliado = { nombre: string; logo: ImageMetadata };

/**
 * Única fuente de datos de negocio de la landing.
 * Todo campo vacío ('' o []) se oculta en la página. Completalo con el valor real para mostrarlo.
 */
export const site = {
  /** Nombre provisorio: cambialo acá y se actualiza en toda la página. */
  marca: 'De a Poco',
  lema: 'Tecnología simple y segura para personas mayores.',
  contacto: {
    /** Solo dígitos con código de país, ej. '5493764000000'. */
    whatsapp: '',
    telefono: '',
    email: '',
    redes: [] as { nombre: string; url: string }[],
  },
  paquete: {
    precio: '',
    cuotas: '',
    /** Ej. 'Con envío a domicilio o retiro en el punto de entrega.' */
    entrega: '',
  },
  equipo: {
    /** Ej. { caracteristica: 'Pantalla', detalle: '14 pulgadas' } */
    fichaTecnica: [] as FilaFicha[],
  },
  capacitacion: {
    /** Ej. '4 encuentros de 2 horas, una vez por semana.' */
    duracion: '',
    sedes: '',
    /** Canal y horario de soporte. */
    soporte: '',
  },
  eventos: [] as Evento[],
  aliados: [] as Aliado[],
  legales: {
    /** URLs de las páginas legales. */
    terminos: '',
    privacidad: '',
    defensaConsumidor: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor',
  },
};
