export type Mensaje = {
  /** Qué estaba pasando cuando llegó. */
  contexto: string;
  remitente: string;
  texto: string;
  estafa: boolean;
  /** Por qué es real o estafa. */
  explicacion: string;
  consejo: string;
  /** Caso documentado en el que se basa. Los mensajes legítimos son ejemplos propios. */
  caso?: { texto: string; url: string };
};

/**
 * Textos adaptados. Los links falsos imitan a los reales pero van cortados con "…", como en un SMS:
 * así no existe un dominio al que entrar. Nunca se muestran clickeables.
 */
export const mensajes: Mensaje[] = [
  {
    contexto: 'Publicaste un mueble en internet. Te llama un comprador muy amable.',
    remitente: 'El comprador',
    texto:
      'Te pago desde la cuenta de mi empresa. Para que se acredite tenés que habilitarlo en el cajero. No me des ninguna clave: andá tranquilo, que yo te guío por teléfono.',
    estafa: true,
    explicacion:
      'Para recibir plata no hace falta ir al cajero. Que te diga "no me des ninguna clave" da confianza, pero te guía para generar un acceso a tu cuenta.',
    consejo: 'Para cobrar alcanza con dar tu alias o CBU. Si te mandan al cajero, cortá.',
    caso: {
      texto: 'Pasó en Neuquén en 2021: le vaciaron la cuenta y sacaron un préstamo a su nombre. La Justicia responsabilizó al banco.',
      url: 'https://www.jusneuquen.gov.ar/vendia-un-mueble-le-vaciaron-la-cuenta-y-sacaron-un-credito-un-fallo-responsabilizo-al-banco/',
    },
  },
  {
    contexto: 'Estás por entrar a tu banco desde una computadora nueva.',
    remitente: 'Tu banco (SMS)',
    texto: 'Código 482913 para ingresar desde un dispositivo nuevo. Vence en 5 minutos. Si no fuiste vos, llamá al número de tu tarjeta.',
    estafa: false,
    explicacion:
      'Tiene apuro y un código, pero lo pediste vos. No trae links y, ante la duda, te manda a un número que ya tenés.',
    consejo: 'Escribilo solo donde vos estabas entrando. Si alguien te lo pide, es una estafa.',
  },
  {
    contexto: 'Estás esperando un paquete que compraste.',
    remitente: 'Correo Argentino',
    texto:
      'Su paquete ha llegado al centro de distribución local. La dirección está incompleta: confirme una dirección válida dentro de las 24 horas para evitar la devolución. https://correoargentino.com.ar-seguimiento.c…',
    estafa: true,
    explicacion:
      'No pide plata y coincide con algo que esperabas: por eso engaña. El link imita al oficial, pero después de "com.ar" sigue con un guion: ya es otra página.',
    consejo: 'No toques el link. Buscá el envío en la página oficial, escribiendo vos la dirección.',
    caso: {
      texto: 'Chequeado documentó este mensaje falso, atribuido a Correo Argentino, en 2025.',
      url: 'https://chequeado.com/ultimas-noticias/cuidado-con-los-mensajes-que-aseguran-que-un-paquete-del-correo-no-pudo-ser-entregado-o-esta-retenido-en-la-aduana-como-reconocer-y-evitar-caer-en-este-tipo-de-est/',
    },
  },
  {
    contexto: 'Perdiste la tarjeta. Llamaste al número que figura en el resumen impreso del banco.',
    remitente: 'Operadora del banco',
    texto: 'Para bloquearla necesito confirmar su identidad. ¿Me dice su DNI y su fecha de nacimiento? No le voy a pedir ninguna clave.',
    estafa: false,
    explicacion:
      'La diferencia es quién llamó: marcaste vos un número confiable. Pedir datos para identificarte es esperable; pedir claves o códigos, no.',
    consejo: 'La misma pregunta, si te llaman ellos a vos, merece que cortes y llames.',
  },
  {
    contexto: 'Te llega un comprobante de transferencia y enseguida te escriben.',
    remitente: 'Número desconocido',
    texto:
      'Perdón, le mandé $150.000 por error, era para el alquiler. Le paso el comprobante. ¿Me lo devuelve a este alias? Ya hablé con mi banco y me dijeron que lo arreglemos entre nosotros.',
    estafa: true,
    explicacion:
      'El comprobante puede ser falso. Y si la plata entró, puede venir de un préstamo sacado a tu nombre o de otra estafa.',
    consejo: 'No la devuelvas por tu cuenta. Mirá tu saldo en la app y hablá con tu banco.',
    caso: {
      texto: 'El Banco Central recomienda verificar primero en la propia cuenta si el dinero realmente entró.',
      url: 'https://www.bcra.gob.ar/como-prevenir-estafas-virtuales/',
    },
  },
  {
    contexto: 'Te llaman por WhatsApp. La foto de perfil tiene el escudo del Ministerio.',
    remitente: 'Ministerio de Salud',
    texto:
      'Ya tiene asignado el turno para la vacuna. No necesito datos bancarios ni ninguna clave. Le va a llegar un código de seis números: me lo lee y se lo confirmo.',
    estafa: true,
    explicacion:
      'Ese código no es del turno: es el de tu WhatsApp. Con él te roban la cuenta y les piden plata a tus contactos.',
    consejo: 'No le leas un código a nadie. Activá la verificación en dos pasos de WhatsApp.',
    caso: {
      texto: 'Chequeado registró esta maniobra con las vacunas de COVID, y otra con la del dengue en 2024. El Ministerio respondió que no llama para dar turnos.',
      url: 'https://chequeado.com/el-explicador/estafas-en-whatsapp-sobre-la-vacunacion-contra-el-dengue-como-prevenirlas/',
    },
  },
  {
    contexto: 'Querés saber dónde está tu paquete. Escribiste vos la dirección en el navegador.',
    remitente: 'https://www.correoargentino.com.ar',
    texto: 'Seguimiento de envíos. Ingresá tu número de seguimiento para ver dónde está tu paquete.',
    estafa: false,
    explicacion:
      'Es la dirección oficial: termina justo en "correoargentino.com.ar". Llegaste vos, y solo te pide el número del envío.',
    consejo: 'Mirá qué hay inmediatamente antes de la primera barra sola (/). Si sigue con un guion u otra palabra, no es la oficial.',
  },
  {
    contexto: 'Te llega un aviso un domingo a la noche. Vos no hiciste nada.',
    remitente: 'Aviso dentro de la app de tu banco',
    texto: 'Se inició sesión desde un equipo nuevo. Si no fuiste vos, cambiá la clave desde Seguridad, en esta misma app.',
    estafa: false,
    explicacion:
      'Asusta, pero lo ves dentro de la app que abriste vos. No trae links, no pide datos y no hay nadie guiándote.',
    consejo: 'Cambiá la clave en la app y llamá al banco. Un aviso real también se verifica.',
  },
  {
    contexto: 'Ves un video de Messi recomendando una inversión. Dejás tus datos y te hace una videollamada una asesora.',
    remitente: 'Asesora financiera',
    texto:
      'No me tiene que mandar ninguna clave. Empiece con poco y, cuando vea la ganancia en pantalla, decide. Yo lo acompaño paso a paso en cada transferencia.',
    estafa: true,
    explicacion:
      'El video puede estar hecho con inteligencia artificial, y la ganancia que ves en pantalla puede ser inventada. Que te muestren la cara no prueba nada.',
    consejo: 'No transfieras mientras alguien te guía. Consultá antes con una persona de confianza.',
    caso: {
      texto: 'Según publicó iProUP en octubre de 2026, un jubilado perdió $24,5 millones tras un video falso de Messi hecho con IA.',
      url: 'https://www.iproup.com/economia-digital/72667-estafa-cripto-video-falso-messi-ia-jubilado-mendoza-prestamos-octubre-2026',
    },
  },
];
