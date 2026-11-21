# SPEC 01 — Landing Home: Chromebook + Capacitación para personas mayores

> **Estado:** Aprobado
> **Depende de:** —
> **Fecha:** 2026-11-21
> **Objetivo:** Implementar en Astro la landing page de una sola página que vende el paquete Chromebook + capacitación en seguridad digital, fiel al diseño del canvas y accesible para personas de 30 a 90 años.

---

## Por qué existe esta spec

El producto tiene dos públicos que leen la misma página.
Los hijos (30–60 años) deciden y pagan la compra.
Los padres (60–90 años) usan el equipo y tienen que sentir que es para ellos.
Por eso la página prioriza legibilidad, confianza y un único llamado a la acción claro.

La fuente de verdad del contenido y del diseño es el canvas:
`https://claude.ai/artifact/5g54WEAayguZ8tuCVQjvsC`, artboard `project/Main.dc.html` ("Home · Landing").
Se lee con la tool `Artifact` (`action: "read"`, `path: "project/Main.dc.html"`).
El copy de cada sección se toma de ahí, textual, salvo los ajustes indicados en esta spec.

---

## Alcance

**Incluye:**

- Página única `src/pages/index.astro` con las 17 secciones del artboard `Main.dc.html`, en este orden:
  1. Header fijo (marca, WhatsApp, CTA, navegación, control de tamaño de letra).
  2. Hero (`#inicio`).
  3. Problema: "Internet les abrió una puerta. También a los estafadores." (`#problema`).
  4. El paquete: equipo + capacitación (`#paquete`).
  5. Usos diarios: "Lo que hacen todos los días…" (`#usos`).
  6. Cuatro pasos (`#como-funciona`).
  7. Capacitación: 3 módulos + duración (`#capacitacion`).
  8. Embajadores (`#embajadores`).
  9. El equipo: ficha técnica + "Por qué Chromebook" (`#equipo`).
  10. Comparativa celular / notebook / paquete (`#comparativa`).
  11. Dónde encontrarnos + próximas fechas (`#donde`).
  12. Financiación (`#financiacion`).
  13. Aliados (`#aliados`).
  14. Resumen del proyecto con 3 cifras (`#proyecto`).
  15. Preguntas frecuentes (`#preguntas`).
  16. Contacto con formulario (`#contacto`).
  17. Footer con fuentes de datos y links legales.
- Paleta, tipografías y estructura del canvas, con pulido de espaciado, responsive y animaciones sutiles.
- Archivo central de contenido `src/data/site.ts` con todos los datos de negocio.
- Datos pendientes visibles como marcador amarillo punteado (estilo del canvas) hasta que se completen.
- Control de tamaño de letra en el header: 3 niveles, recordado en `localStorage`.
- Botón flotante de WhatsApp abajo a la derecha.
- Formulario de contacto como maqueta: valida y muestra éxito, no envía datos.
- Fotos de stock con licencia libre (Unsplash o Pexels), guardadas en `src/assets/images/` y optimizadas con `astro:assets`.
- SEO básico: `title`, `description`, Open Graph con la imagen del hero, `lang="es-AR"`, favicon.
- `specs/.spec-config.yml` con `BaseBranch: chore/migrar-astro`.

**Fuera de alcance (para specs futuras):**

- Página `/proyecto` (artboard `Proyecto.dc.html`: FODA, estrategia, fases, plan de acción).
- Envío real del formulario (WhatsApp, Formspree o backend propio).
- Tienda online, carrito, pagos y simulador de cuotas.
- Páginas de Términos y condiciones y Política de privacidad.
- Botón de arrepentimiento (Res. 424/2020) — se exige recién cuando haya venta online.
- Analytics, píxeles, cookies y banner de consentimiento.
- Sitemap, robots y datos estructurados (JSON-LD).
- Internacionalización.
- Fotografías reales de producción (las reemplaza el usuario).
- Configuración de deploy y dominio.

---

## Modelo de datos

Todo dato de negocio vive en `src/data/site.ts`.
Ningún componente tiene precios, teléfonos, nombres de marca ni fechas hardcodeados.

```ts
// src/data/site.ts
export type Pendiente = { pendiente: true; etiqueta: string };
export type Dato = string | Pendiente;
export const pendiente = (etiqueta: string): Pendiente => ({ pendiente: true, etiqueta });

export const site = {
  marca: pendiente('Marca'),
  lema: 'Tecnología simple y segura para personas mayores.',
  contacto: {
    whatsapp: '',            // solo dígitos con código de país, ej. '5493764000000'; vacío = pendiente
    telefono: pendiente('teléfono'),
    email: pendiente('email'),
    redes: [] as { nombre: string; url: string }[],
  },
  paquete: {
    precio: pendiente('Precio final del paquete: a definir'),
    cuotas: pendiente('Plan de cuotas: a definir'),
    entrega: pendiente('confirmar: envío a domicilio / retiro en punto de entrega'),
    preconfigurada: pendiente('confirmar si se entrega preconfigurada'),
  },
  equipo: {
    fichaTecnica: [
      { caracteristica: 'Modelo', detalle: pendiente('a confirmar') },
      // Pantalla, Procesador, Memoria RAM, Almacenamiento, Batería, Conectividad,
      // Cámara y micrófono, Sistema operativo, Garantía, Peso (filas del canvas)
    ] as { caracteristica: string; detalle: Dato }[],
  },
  capacitacion: { duracion: pendiente('Duración, frecuencia y cantidad de encuentros por taller: a definir') },
  eventos: [] as { fecha: string; lugar: string; tipo: 'Taller' | 'Demostración' }[], // vacío = 3 filas pendientes
  aliados: [] as { nombre: string; logo: ImageMetadata }[],                          // vacío = 4 logos pendientes
  flags: {
    mostrarLinkProyecto: false, // pasa a true cuando exista /proyecto
  },
} as const;
```

Componente de soporte `src/components/ui/Dato.astro`:

- Recibe `valor: Dato`.
- Si es `string`, lo renderiza tal cual.
- Si es `Pendiente`, renderiza `[etiqueta]` con fondo `#FFF1C2`, borde punteado `#8A6D1F` y texto `#5C4813`.

Preferencia de tamaño de letra:

- Clave de `localStorage`: `fontScale:v1`.
- Valores: `'normal' | 'grande' | 'muy-grande'`.
- Se aplica como atributo `data-font-scale` en `<html>`.
- Escala del `font-size` raíz: `100%` / `112.5%` / `125%`.
- Todo tamaño tipográfico y de espaciado vertical se expresa en `rem` para que escale.
- Si `localStorage` falla (modo privado), se usa `'normal'` sin romper nada.

Tokens de diseño en `src/styles/global.css` (bloque `@theme` de Tailwind v4), tomados del canvas:

| Token                | Valor     | Uso                                   |
| -------------------- | --------- | ------------------------------------- |
| `--color-azul`       | `#1B3A5C` | Títulos, header, links, botón WhatsApp |
| `--color-terracota`  | `#A3471F` | CTA principal, hover de links         |
| `--color-crema`      | `#FBF6EC` | Fondo de secciones alternas           |
| `--color-papel`      | `#FFFDF8` | Fondo de tarjetas                     |
| `--color-borde`      | `#E6DCC8` | Bordes de tarjetas                    |
| `--color-celeste`    | `#E3ECF5` | Fondos de bloques informativos        |
| `--color-texto`      | `#1F2933` | Texto principal                       |
| `--color-texto-suave`| `#4A5563` | Texto secundario                      |
| `--color-foco`       | `#E0A93B` | Outline de `:focus-visible`           |
| `--font-display`     | Fraunces  | Títulos `h1`–`h3`                     |
| `--font-sans`        | Atkinson Hyperlegible | Cuerpo y UI               |

Imágenes en `src/assets/images/`:

- `hero.jpg` — persona mayor frente a una laptop, tranquila, luz natural, mesa de cocina.
- `taller.jpg` — taller grupal, mesa con varias laptops, alguien explicando.
- `embajador.jpg` — persona mayor ayudando a otra con el teclado.
- `chromebook.jpg` — laptop sobre una mesa, sin marcas visibles de terceros.
- `CREDITOS.md` — autor, URL y licencia de cada foto.

Reemplazar una foto = sobrescribir el archivo con el mismo nombre.

---

## Plan de implementación

1. **Base visual.** Definir tokens en `src/styles/global.css` (`@theme`, base tipográfica 1.125rem, `:focus-visible`, `scroll-behavior: smooth`, `scroll-margin-top` para anclas bajo el header, reglas de `prefers-reduced-motion`). Cargar Fraunces y Atkinson Hyperlegible con la Fonts API de Astro (`fonts` en `astro.config.mjs`, proveedor Google); si la versión instalada no la tiene estable, usar `<link>` a Google Fonts con `preconnect`. Verificar con Context7. Prueba manual: `pnpm dev` muestra texto con ambas fuentes.
2. **Layout y SEO.** Crear `src/layouts/BaseLayout.astro` con `<head>` completo (title, description, Open Graph, favicon), skip link "Saltar al contenido", `lang="es-AR"` y script inline que aplica `data-font-scale` antes del primer pintado. Reemplazar `public/favicon.svg` por una marca simple con la paleta. `index.astro` usa el layout.
3. **Datos.** Crear `src/data/site.ts` con el modelo de arriba y todas las filas, fechas y pendientes del canvas. Crear `src/components/ui/Dato.astro`.
4. **Primitivas UI.** Crear en `src/components/ui/`: `Boton.astro` (variantes `primario` terracota / `secundario` azul con borde, alto mínimo 56px), `Seccion.astro` (contenedor `max-width`, padding, fondo alterno, `id`), `Icono.astro` (SVG inline de trazo, `aria-hidden`).
5. **Header.** `src/components/Header.astro`: barra superior con WhatsApp, marca, CTA "Quiero el paquete", navegación a las anclas y `src/components/ControlLetra.astro` (3 botones `A` / `A+` / `A++` con `aria-pressed`). En menos de 1024px la navegación se colapsa en un botón "Menú" con texto visible, `aria-expanded` y cierre con Escape.
6. **Fotos.** Descargar las 4 fotos de stock a `src/assets/images/` y escribir `CREDITOS.md`. Usar siempre `<Image>` o `<Picture>` de `astro:assets` con `alt` en español, `width`/`height` y `loading="eager"` solo en el hero.
7. **Hero y Problema.** `src/components/sections/Hero.astro` (h1, subtítulo, 2 CTA, 3 garantías con ícono, foto) y `Problema.astro` (cifra 89% con fuente, párrafo, 3 testimonios-situación).
8. **Paquete y Usos.** `Paquete.astro` (tarjetas Equipo y Capacitación, link "Ver la ficha técnica" a `#equipo`, remate "La capacitación no es un extra…") y `Usos.astro` (5 usos con ícono).
9. **Cómo funciona.** `Pasos.astro`: 4 pasos numerados (en fila en desktop, en columna en móvil) y CTA a `#contacto`.
10. **Capacitación y Embajadores.** `Capacitacion.astro` (intro, foto del taller, 3 módulos, duración pendiente) y `Embajadores.astro` (foto, texto, CTA "Quiero ser embajador": abre WhatsApp con texto prearmado, o `#contacto` si no hay número).
11. **Equipo y Comparativa.** `Equipo.astro`: tabla de ficha técnica (`<table>` con `<caption>` y `<th scope>`) y 3 razones. `Comparativa.astro`: tabla de 3 columnas en desktop; en menos de 768px se transforma en una tarjeta por característica. "Sí"/"No" llevan ícono y texto, nunca solo color.
12. **Dónde y Financiación.** `Donde.astro` (5 canales + próximas fechas desde `site.eventos`, o 3 filas pendientes si está vacío). `Financiacion.astro` (texto, fechas destacadas, tarjeta de precio con `Dato`, lista de lo incluido, botón "Ver planes de cuotas" a `#contacto`).
13. **Aliados y Proyecto.** `Aliados.astro` (texto + 4 logos pendientes o los de `site.aliados`). `Proyecto.astro` (título, 3 cifras; botón "Conocer el proyecto" solo si `site.flags.mostrarLinkProyecto` es `true`).
14. **Preguntas frecuentes.** `Preguntas.astro` con las 7 preguntas del canvas en `<details>`/`<summary>` nativos; la primera abierta; ícono `+` que rota; área clickeable de todo el `summary`.
15. **Contacto.** `Contacto.astro`: formulario con `<label>` visibles, campos de 60px de alto, radios grandes "¿Para quién es?". Script chico: valida al enviar (nombre ≥ 2 caracteres, teléfono con 8 a 15 dígitos ignorando espacios, guiones, paréntesis y `+`, localidad requerida, una opción de radio elegida), muestra el error debajo de cada campo con `aria-describedby` y `aria-invalid`, y mueve el foco al primer campo inválido. Si todo es válido reemplaza el formulario por un mensaje de éxito con `role="status"` que usa el nombre ingresado. No envía datos a ningún lado.
16. **Footer y WhatsApp flotante.** `Footer.astro` (marca, lema, contacto, secciones, fuentes de datos, links legales: Términos y Privacidad como `Dato` pendiente, Defensa del consumidor a `https://www.argentina.gob.ar/produccion/defensadelconsumidor`). `WhatsAppFlotante.astro`: botón fijo abajo a la derecha, 64px, texto "Escribinos" visible desde 768px, `aria-label` en móvil; apunta a `wa.me` o a `#contacto` si no hay número; no tapa el botón de envío del formulario.
17. **Animaciones.** Script con `IntersectionObserver` que agrega una clase de aparición (fade + 12px de desplazamiento, 400ms) a las secciones. Desactivado con `prefers-reduced-motion: reduce`. Sin JavaScript el contenido se ve completo.

---

## Criterios de aceptación

- [ ] `pnpm build` termina sin errores ni warnings de Astro.
- [ ] La página muestra las 17 secciones en el orden del alcance, con el copy del artboard `Main.dc.html`.
- [ ] No hay ningún precio, teléfono, marca, fecha ni modelo escrito fuera de `src/data/site.ts`.
- [ ] Cada dato pendiente se ve como marcador amarillo punteado con su etiqueta entre corchetes.
- [ ] Cambiar `site.marca` a un `string` cambia la marca en header, footer, comparativa, embajadores y `<title>`.
- [ ] Existe un solo `h1` y los `h2`/`h3` siguen el orden de las secciones.
- [ ] A 375px de ancho no hay scroll horizontal en ninguna sección.
- [ ] A 1440px el contenido no supera el `max-width` del contenedor y queda centrado.
- [ ] El texto de cuerpo mide al menos 18px con la escala `normal`.
- [ ] Todo botón, link de navegación, radio y campo tiene un área táctil de al menos 48×48px.
- [ ] El control de letra cambia el tamaño de toda la página en los 3 niveles y la elección persiste al recargar.
- [ ] Con `localStorage` bloqueado la página carga sin errores en consola y en tamaño `normal`.
- [ ] Al recargar con escala `muy-grande` no se ve un salto de tamaño (sin parpadeo).
- [ ] El menú móvil abre y cierra con clic y con Escape, y actualiza `aria-expanded`.
- [ ] Cada link de navegación lleva a su sección y el título no queda tapado por el header fijo.
- [ ] La navegación completa se puede recorrer con Tab, con outline de foco visible en cada elemento.
- [ ] "Saltar al contenido" aparece con el primer Tab y lleva al contenido principal.
- [ ] Las 7 preguntas frecuentes abren y cierran con clic, Enter y Espacio.
- [ ] Enviar el formulario vacío muestra 4 errores y pone el foco en "Tu nombre".
- [ ] Un teléfono con menos de 8 dígitos muestra el error de teléfono.
- [ ] Un envío válido muestra el mensaje de éxito con el nombre ingresado y no genera ninguna request de red.
- [ ] Con `site.contacto.whatsapp` vacío, el botón flotante, el link del header y "Quiero ser embajador" llevan a `#contacto`.
- [ ] Con `site.contacto.whatsapp` completo, esos tres abren `https://wa.me/<número>` con texto prearmado.
- [ ] El botón "Conocer el proyecto" no se renderiza con `mostrarLinkProyecto: false`.
- [ ] La comparativa se ve como tabla a 1440px y como tarjetas a 375px, y "Sí"/"No" tienen texto además del ícono.
- [ ] Las 4 fotos se sirven optimizadas por `astro:assets` y cada una tiene `alt` descriptivo en español.
- [ ] `src/assets/images/CREDITOS.md` lista autor, URL y licencia de las 4 fotos.
- [ ] El `<head>` tiene `title`, `meta description`, `og:title`, `og:description`, `og:image` y `lang="es-AR"`.
- [ ] Con `prefers-reduced-motion: reduce` no hay animaciones de aparición.
- [ ] Con JavaScript deshabilitado todo el contenido es visible y las preguntas frecuentes funcionan.
- [ ] La consola del navegador no muestra errores ni warnings al cargar y al usar la página.
- [ ] Revisión con Playwright a 375px y 1440px con screenshots de página completa adjuntos al resumen final.

---

## Decisiones

- **Sí:** solo la Home en esta spec. `/proyecto` es otra audiencia (bancos, inversores) y va en su propia spec.
- **Sí:** fiel al canvas más pulido. El canvas ya resolvió copy, jerarquía y accesibilidad; se mejora espaciado, responsive y movimiento.
- **No:** réplica pixel a pixel. Frena mejoras responsive necesarias en móvil.
- **No:** rediseño libre. Se perdería el trabajo de copy y estructura ya validado en el canvas.
- **Sí:** formulario como maqueta. El envío real necesita decidir canal y tratamiento de datos personales.
- **No:** WhatsApp o Formspree en el formulario por ahora. Queda para la spec de envío.
- **Sí:** fotos de stock libres locales con nombre fijo. El usuario las reemplaza sin tocar código.
- **No:** placeholders ilustrados ni imágenes generadas por IA. Se ven menos profesionales y las IA suelen fallar en manos y rostros mayores.
- **Sí:** `src/data/site.ts` central con pendientes visibles. Evita publicar con un dato olvidado.
- **No:** inventar datos de ejemplo. Un precio o un banco ficticio podría publicarse por error.
- **Sí:** control de letra de 3 niveles con `localStorage` (`fontScale:v1`). El público tiene baja visión frecuente y no siempre conoce el zoom del navegador.
- **Sí:** botón flotante de WhatsApp. Es el canal que este público usa a diario.
- **Sí:** ocultar "Conocer el proyecto" con un flag hasta que exista `/proyecto`. Un link roto resta confianza.
- **Sí:** Astro puro con `<script>` mínimos, sin React en esta página. Menos JavaScript, carga más rápida en equipos y conexiones viejas.
- **No:** islas React. No aportan para menú, FAQ, letra y validación simple.
- **Sí:** `<details>`/`<summary>` nativos para FAQ. Funcionan sin JavaScript y con teclado.
- **Sí:** comparativa como tarjetas en móvil. Una tabla de 4 columnas con scroll lateral es difícil para este público.
- **Sí:** SEO básico con Open Graph. La página se va a compartir mucho por WhatsApp entre familiares.
- **No:** sitemap, analytics y JSON-LD. Sin dominio definido aún.
- **Sí:** validación con `pnpm build` y revisión visual con Playwright, sin instalar dependencias. El repo no tiene lint ni tests y no se agregan en esta spec.
- **No:** `@astrojs/check` ni Lighthouse en esta spec. Agregan dependencias o tooling no pedidos.
- **Sí:** `BaseBranch: chore/migrar-astro` en `specs/.spec-config.yml`. `main` todavía tiene el proyecto Next.js.
- **Sí:** base tipográfica de 18px y botones de 56px de alto. El canvas usa 17–24px y el público tiene 60–90 años.

---

## Riesgos

| Riesgo | Mitigación |
| ------ | ---------- |
| Se publica con el formulario maqueta y se pierden contactos reales | El mensaje de éxito no promete contacto inmediato; el envío real es la próxima spec y se lista en el resumen final como pendiente. |
| Se publica con datos pendientes visibles | Los marcadores amarillos son intencionalmente llamativos; la lista completa está en `src/data/site.ts`. |
| Fotos de stock con marcas de terceros visibles (logos de laptops) | Elegir tomas sin logos legibles; se registra la fuente en `CREDITOS.md`. |
| Afirmación de seguridad interpretada como garantía | Se conserva textual la pregunta "¿Esto garantiza que no lo van a estafar?" con su respuesta honesta. |
| Cifras citadas (89%, INDEC 2021) desactualizadas o mal atribuidas | Se mantienen las fuentes del canvas en el footer; validar antes de publicar. |
| La Fonts API de Astro cambia entre versiones | Consultar Context7 en la implementación; fallback a `<link>` de Google Fonts. |
| Venta online sin botón de arrepentimiento | Fuera de alcance porque no hay venta online aún; obligatorio en la spec de tienda. |
| Header fijo tapa contenido con letra `muy-grande` | Altura del header en `rem` y `scroll-margin-top` calculado desde la misma variable. |

---

## Lo que **no** está en esta spec

- Página `/proyecto`.
- Envío real del formulario.
- Tienda, pagos, cuotas reales y botón de arrepentimiento.
- Páginas legales de Términos y Privacidad.
- Analytics, cookies, sitemap y JSON-LD.
- Fotos reales de producción.
- Deploy y dominio.

Cada uno de esos puntos, si se hace, va en su propia spec.
