# 00 - ADN DE MARCA Y SISTEMA VISUAL

> Proyecto: sitio y landing de cirugía bariátrica del Dr. Carlos Gómez (Guayaquil, Ecuador).
> Los datos marcados **[DEL SITIO]** se extrajeron del desarrollo actual y deben ser confirmados. **[PENDIENTE]** = aún sin definir.

---

# 1. IDENTIDAD

| Campo | Valor |
|---|---|
| Marca | Dr. Carlos Gómez · Cirujano Bariátrico [DEL SITIO] |
| Nombre comercial (schema) | Consulta Bariátrica Dr. Carlos Gómez [DEL SITIO] |
| Titulación | MD FACS (Fellow of the American College of Surgeons) [DEL SITIO] |
| Especialidad | Cirugía bariátrica y metabólica; tratamiento quirúrgico de obesidad y diabetes tipo 2 [DEL SITIO] |
| Dominio | https://www.drcarlosgomez.doc.ec/el-cirujano-que-cambia-vidas |
| Registro profesional (ACESS / SENESCYT) | [PENDIENTE] |
| Razón social que gestiona datos de pacientes | CIBAE S.A.S. (Clínica Ángeles) [DEL SITIO, política de privacidad] |
| Agencia / líder del desarrollo | Triaris |

## Ubicación y contacto [DEL SITIO]
- Dirección: Edificio Agora Medical Center, Av. Abel Romeo Castillo y Av. Juan Tanca Marengo (sector Mall del Sol), Guayaquil.
- WhatsApp / teléfono: +593 98 818 8639.
- Correo público: [PENDIENTE]
- Horario de atención: [PENDIENTE]
- Redes sociales (URLs): [PENDIENTE]
- Google Business Profile: [PENDIENTE]

---

# 2. PALETA DE COLOR (HEX) [DEL SITIO, variables `:root` en `css/base.css`]

Sistema **Quiet Luxury**: fondos casi negros, un único acento dorado arena y blanco hueso para el texto. El verde viridian es de uso puntual (cifras clínicas, confirmaciones).

```
Obsidian (fondo base):      #090a0c
Onyx (fondo de sección):    #111316
Charcoal (superficie):      #17191e
Alabaster (texto):          #f4f1e9
Ivory (fondo de sellos):    #fcfbf8
Stone (texto secundario):   #9a9893
Gold (acento principal):    #c5b191
Gold light (hover):         #d4c2a4
Viridian (apoyo clínico):   #3f7964
Hairline (bordes):          rgba(210, 194, 168, 0.14)
Hairline fuerte:            rgba(210, 194, 168, 0.25)
Error (formularios):        #f87171
```
- Reglas de uso: el dorado es el único color de acción (botones, enlaces activos, énfasis en cursiva de los títulos). No añadir colores de acento nuevos.
- Escala del IMC (solo dentro de la calculadora): azul cielo (bajo peso), verde esmeralda (normal), ámbar (sobrepeso), naranja (obesidad I) y rojo (obesidad II/III).
- Degradados: velos de fondo `obsidian → obsidian/75 → obsidian`; hero con sombreado negro de izquierda a derecha.
- Paleta oficial confirmada por el cliente: [PENDIENTE]
- **Histórico:** el sitio anterior (`.doc.ec`) usaba una paleta azul clara (`#0a6fb8`, `#0d2a44`, fondo `#f5fafe`). No aplica a esta landing. `gracias.html` todavía conserva ese tema.

## Tipografía [DEL SITIO]
- **Títulos:** Cormorant Garamond (serif), pesos 400 y 500, con cursiva 400 en dorado para el énfasis de cada título.
- **Texto y interfaz:** Plus Jakarta Sans, pesos 300, 400, 500 y 600 (cursiva 400). Fallback `system-ui`.
- **Etiquetas técnicas** (pasos, contadores): monoespaciada del sistema (`ui-monospace`).
- Carga actual: Google Fonts con `display=swap`. Alojamiento local WOFF2: [PENDIENTE, siguiente tanda]
- Los párrafos (`<p>`) se mantienen a 17 px con interlineado 1,65 en todo el sitio, igual que en producción.

## Logotipos y sellos (carpeta `images/`)
- Logo principal: `logo-carlos-gomez.png`
- Sellos de respaldo: American College of Surgeons, International Federation for the Surgery of Obesity, Sociedad Ecuatoriana de Cirugía Bariátrica, Clínica Ángeles.
- Manual de uso de logo (áreas de respeto, versiones): [PENDIENTE]

---

# 3. PÚBLICO OBJETIVO / BUYER PERSONA

| Campo | Valor |
|---|---|
| Género | [PENDIENTE] |
| Edad | 18 a 65 años (rango de elegibilidad indicado en el FAQ) [DEL SITIO]. Core de campaña: [PENDIENTE] |
| Perfil de salud | Personas con obesidad (IMC ≥ 35 o con comorbilidades) y/o diabetes tipo 2 [DEL SITIO] |
| Nivel socioeconómico | [PENDIENTE] |
| Capacidad de pago | Financiamiento con Banco del Austro, plan acumulativo sin intereses y tarjetas diferidas [DEL SITIO] |
| Motivaciones | Recuperar salud, controlar la diabetes, vitalidad y calidad de vida [DEL SITIO] |
| Miedos / objeciones | [PENDIENTE: riesgo quirúrgico, costo, recuperación, estigma] |
| Insight | [PENDIENTE] |
| Canales de decisión | WhatsApp, YouTube (testimonios), búsqueda en Google [DEL SITIO] |

## Geolocalización (prioridad)
1. Guayaquil y área metropolitana (Samborondón, Mall del Sol): [PENDIENTE confirmar]
2. Resto de Ecuador: [PENDIENTE]
3. Pacientes del exterior / Estados Unidos: el sitio menciona pacientes de Ecuador y EE. UU. [PENDIENTE confirmar si es objetivo]

---

# 4. ADN DE LA MARCA

- **Propósito:** [PENDIENTE]
- **Promesa de marca:** transformar la salud y el bienestar del paciente con cirugía segura y acompañamiento humano [BORRADOR a partir del sitio].
- **Posicionamiento:** cirujano bariátrico de élite (MD FACS) en Guayaquil, con tecnología avanzada y trato cercano [BORRADOR].
- **Valores:** excelencia, seguridad, calidez, acompañamiento [BORRADOR].
- **Diferenciadores** (a validar con el cliente):
  - Acreditación FACS.
  - Experiencia: **17 años** [confirmar].
  - Volumen de cirugías: **+7500 en el sitio actual vs +7.500 en la sección "10 razones"** [PENDIENTE: cifra oficial].
  - Cirugía laparoscópica mínimamente invasiva, 90 min de procedimiento, alta en 24-36 h [DEL SITIO].
  - Infraestructura propia: quirófano y suites hospitalarias [DEL SITIO].
  - Equipo multidisciplinario (nutrición, psicología) y financiamiento flexible [DEL SITIO].
  - Jornadas sociales de cirugía bariátrica [DEL SITIO].
- **Competidores a vigilar (3 a 5 URLs):** [PENDIENTE]

## Tono de comunicación [BORRADOR a partir del sitio]
- Cercano, profesional y empático. Trato de "tú".
- Claro y sin tecnicismos innecesarios.
- Evitar promesas de resultado, garantías absolutas y comparativos exagerados (ver sección 7).
- Palabras o expresiones a evitar: [PENDIENTE]

---

# 5. SERVICIOS Y CONVERSIÓN

## Procedimientos [DEL SITIO]
1. Manga gástrica: reduce hasta ~80% del estómago; IMC > 35.
2. Bypass gástrico: obesidad severa y enfermedades asociadas.
3. Cirugía metabólica: control de la diabetes tipo 2.
4. Balón gástrico: opción endoscópica sin incisiones.

- Procedimiento prioritario para campañas: [PENDIENTE]
- Precios o rangos (publicables o no): [PENDIENTE]

## Conversión
- Conversión principal: [PENDIENTE: valoración vía formulario / WhatsApp]
- Conversiones secundarias [DEL SITIO]: clic a WhatsApp, cálculo de IMC, envío de formulario "Recibir cotización" y "Contáctanos".
- Destino de leads: n8n → CRM Kommo [DEL SITIO].
- Meta de leads/mes y CPL objetivo: [PENDIENTE]

---

# 6. SEO / AEO / GEO

- Palabras clave principales: "cirugía bariátrica Guayaquil", "manga gástrica Guayaquil", "bypass gástrico Guayaquil" [BORRADOR]. Lista oficial: [PENDIENTE]
- Páginas por intención de búsqueda: [PENDIENTE: una landing o una por procedimiento]
- URL oficial de la landing: `https://www.drcarlosgomez.doc.ec/el-cirujano-que-cambia-vidas/` (canonical, `og:url`, JSON-LD y sitemap la usan; todas las rutas de imágenes y metas sociales son absolutas desde ese dominio).
- Archivos existentes: `robots.txt`, `sitemap.xml`. Pendiente: `llms.txt`. Nota: como la landing está en una subcarpeta, los buscadores solo leen `robots.txt` y `sitemap.xml` desde la raíz del dominio; estos archivos deben copiarse o fusionarse allí.

---

# 7. CUMPLIMIENTO Y CONTENIDO MÉDICO

- Normativa aplicable a revisar: publicidad médica (ARCSA / Ministerio de Salud) y LOPDP de Ecuador. Criterios concretos: [PENDIENTE]
- Responsable de aprobar el contenido médico: [PENDIENTE]
- Consentimientos de casos "antes y después" / testimonios: [PENDIENTE: confirmar que existen]
- Descargo de responsabilidad médico: [PENDIENTE: texto]
- Afirmaciones absolutas a revisar: "cura la diabetes", "mejora considerablemente la fertilidad", "garantizando", "reduce significativamente los riesgos".

---

# 8. TRACKING Y PLATAFORMAS

| Plataforma | ID / estado |
|---|---|
| Google Tag Manager | GTM-TVL2KNGP |
| GA4 | G-0PYMD6LKVR |
| Meta Pixel / CAPI | 1384318510353602 |
| Google Ads (conversión) | [PENDIENTE] |
| TikTok Pixel / Events API | [PENDIENTE] |
| Banner de cookies / consentimiento | Implementado: aviso propio (`#consent-banner`) + Google Consent Mode v2 en `js/tracking.js`. Decisión guardada en `localStorage` (`drg_consent`). |

**Cómo está implementado** (`js/tracking.js`):
- GTM (`GTM-TVL2KNGP`) es el único punto de carga de etiquetas. Se carga en `index.html` y `gracias.html`.
- El consentimiento arranca **denegado** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`) y pasa a concedido solo si la persona pulsa "Aceptar". En GTM, las etiquetas de Meta, Google y TikTok deben exigir ese consentimiento.
- Eventos del `dataLayer` (cada uno lleva `event_id`): `click_whatsapp`, `calculate_bmi`, `generate_lead` (solo si el envío a n8n tuvo éxito; incluye `form_id`).
- El mismo `event_id` de `generate_lead` se envía al webhook de n8n para deduplicar con la API de conversiones (CAPI).
- Se conservan `utm_*`, `fbclid`, `gclid` y `ttclid` durante la sesión y viajan con el formulario.

> Revisar: en esta tabla GA4 y Meta Pixel comparten el mismo número. Un ID de GA4 empieza por `G-`, así que uno de los dos es incorrecto.

Los tokens y secretos de CAPI **no se guardan en el repositorio**: variables de entorno en el servidor/n8n.

---

# 9. DIRECTRICES VISUALES

- Estilo [DEL SITIO]: **Quiet Luxury**. Oscuro, sobrio y editorial: secciones alternas `obsidian` / `onyx`, líneas finas (hairline) en lugar de sombras de color, **esquinas rectas** (sin redondeo; solo círculos en botones de play, iconos y WhatsApp), mucho espacio vertical (96 a 128 px por sección) y títulos serif grandes con una frase en cursiva dorada.
- Interacción: aparición progresiva al hacer scroll, fondos fijos con parallax, tarjetas que se elevan y trazan una línea dorada inferior al pasar el mouse, y la sección "Cita privada" que se revela como telón al terminar la página (escritorio).
- Etiquetas de sección ("eyebrow"): mayúsculas de 10,9 px con espaciado de 3,48 px y una línea dorada delante.
- Botones: rectangulares, mayúsculas con espaciado amplio (3 px). Primario dorado sólido; secundario con borde dorado translúcido.
- Fotografía: retrato del doctor, quirófano y suites reales de Clínica Ángeles. Las fotos se oscurecen con velos para integrarse al fondo. Banco de referencias: [PENDIENTE]
- Iconografía: trazo lineal fino (Lucide, licencia ISC) en un sprite SVG incrustado al inicio de `index.html` (funciona también al abrir el archivo sin servidor), en color dorado o stone. Los iconos de play, flecha, WhatsApp y ubicación son SVG propios en `images/`.
- Restricciones visuales de marca: [PENDIENTE]
- Uso del logo en imágenes: [PENDIENTE]
