import { site, type Dato } from '../data/site';

export const esPendiente = (d: Dato): d is Exclude<Dato, string> => typeof d !== 'string';

/** Texto plano de un dato: el valor, o `[etiqueta]` si está pendiente. */
export const texto = (d: Dato): string => (typeof d === 'string' ? d : `[${d.etiqueta}]`);

/** Solo dígitos del número de WhatsApp configurado. */
const numeroWhatsapp = () => site.contacto.whatsapp.replace(/\D/g, '');

export const hayWhatsapp = () => numeroWhatsapp().length > 0;

/**
 * Link de WhatsApp con mensaje prearmado.
 * Sin número configurado, lleva al formulario de contacto.
 */
export function enlaceWhatsapp(mensaje: string): string {
  const n = numeroWhatsapp();
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(mensaje)}` : '#contacto';
}
