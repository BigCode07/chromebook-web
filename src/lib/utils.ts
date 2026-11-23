import { site } from '../data/site';

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
