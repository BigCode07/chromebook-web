import type { ImageMetadata } from 'astro';

/** Dato de negocio que todavía no está definido. Se muestra como marcador amarillo. */
export type Pendiente = { pendiente: true; etiqueta: string };
export type Dato = string | Pendiente;
export const pendiente = (etiqueta: string): Pendiente => ({ pendiente: true, etiqueta });

export type FilaFicha = { caracteristica: string; detalle: Dato };
export type Evento = { fecha: string; lugar: string; tipo: 'Taller' | 'Demostración' };
export type Aliado = { nombre: string; logo: ImageMetadata };

/**
 * Única fuente de datos de negocio de la landing.
 * Reemplazá cada `pendiente(...)` por el valor real (string) cuando lo tengas.
 */
export const site = {
  marca: pendiente('Marca') as Dato,
  lema: 'Tecnología simple y segura para personas mayores.',
  contacto: {
    /** Solo dígitos con código de país, ej. '5493764000000'. Vacío = pendiente (los botones llevan a #contacto). */
    whatsapp: '',
    telefono: pendiente('teléfono') as Dato,
    email: pendiente('email') as Dato,
    redes: [] as { nombre: string; url: string }[],
  },
  paquete: {
    precio: pendiente('Precio final del paquete: a definir') as Dato,
    cuotas: pendiente('Plan de cuotas: a definir') as Dato,
    entrega: pendiente('confirmar: envío a domicilio / retiro en punto de entrega') as Dato,
    preconfigurada: pendiente('confirmar si se entrega preconfigurada') as Dato,
  },
  equipo: {
    modeloResumen: pendiente('Modelo y especificaciones') as Dato,
    referencia: 'Referencia actual: Chromebook modelo 2021, compra internacional',
    fichaTecnica: [
      { caracteristica: 'Modelo', detalle: pendiente('a confirmar') },
      { caracteristica: 'Pantalla', detalle: pendiente('pulgadas / resolución') },
      { caracteristica: 'Procesador', detalle: pendiente('a completar') },
      { caracteristica: 'Memoria RAM', detalle: pendiente('a completar') },
      { caracteristica: 'Almacenamiento', detalle: pendiente('a completar') },
      { caracteristica: 'Batería', detalle: pendiente('horas de autonomía') },
      { caracteristica: 'Conectividad', detalle: pendiente('wifi / bluetooth / puertos') },
      { caracteristica: 'Cámara y micrófono', detalle: pendiente('a completar') },
      {
        caracteristica: 'Sistema operativo',
        detalle: 'ChromeOS, con actualizaciones automáticas',
      },
      { caracteristica: 'Garantía', detalle: pendiente('a completar') },
      { caracteristica: 'Peso', detalle: pendiente('a completar') },
    ] as FilaFicha[],
    finSoporte: pendiente('confirmar fecha de fin de soporte') as Dato,
  },
  capacitacion: {
    duracion: pendiente(
      'Duración, frecuencia y cantidad de encuentros por taller: a definir',
    ) as Dato,
    sedes: pendiente('Listado de sedes a completar') as Dato,
    soporte: pendiente('Canal y horario a definir') as Dato,
    detalleCuotas: pendiente('Detalle de cuotas y bancos a confirmar') as Dato,
  },
  /** Vacío = se muestran 3 filas pendientes. */
  eventos: [] as Evento[],
  /** Vacío = se muestran 4 logos pendientes. */
  aliados: [] as Aliado[],
  cobertura: pendiente('confirmar cobertura') as Dato,
  legales: {
    terminos: pendiente('Términos y condiciones') as Dato,
    privacidad: pendiente('Política de privacidad') as Dato,
    defensaConsumidor: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor',
  },
  flags: {
    /** Pasa a true cuando exista la página /proyecto. */
    mostrarLinkProyecto: false,
  },
};
