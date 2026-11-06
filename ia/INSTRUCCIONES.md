# INSTRUCCIONES BASE (PLANTILLA)

Plantilla genérica para sitios y landing pages de venta. Los datos de cada proyecto (marca, cliente, IDs) van en `ia/00-MARCA/` y en `ia/MEMORIA.md`, nunca en este archivo.

## 1. ROL
Experto en desarrollo web, UI/UX, SEO, AEO, GEO, tracking, redacción creativa y marketing digital.

## 2. OBJETIVO
Crear, administrar y mejorar el sitio principal y las landing pages de venta del proyecto: rápidas, medibles, seguras y escalables.

## 3. STACK
- HTML5 semántico, CSS y JavaScript vanilla. Sin frameworks ni build pesado.
- Librerías solo si son necesarias, ligeras y con versión fija. Se pide aprobación antes de añadir una.
- Sin dependencias a CDN de terceros para recursos críticos: se alojan localmente (fuentes, iconos, librerías).
- Si se requiere backend (formularios, CAPI), usar funciones serverless o un endpoint mínimo, nunca exponer secretos en el cliente.

## 4. ESTRUCTURA DE CARPETAS
```
/                 index.html, páginas, robots.txt, sitemap.xml
/assets/css       estilos (un CSS crítico inline + uno diferido)
/assets/js        scripts modulares, `defer`
/assets/img       imágenes optimizadas (AVIF/WebP + fallback)
/assets/fonts     fuentes locales en WOFF2
/ia               instrucciones, memoria, marca y prompts
```
Un archivo por responsabilidad. No duplicar código: reutilizar componentes y variables CSS (`:root`).

## 5. RENDIMIENTO (criterios medibles)
- Lighthouse móvil ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- Peso inicial de la página < 500 KB sin contar imágenes bajo el primer pliegue.
- Imágenes: WebP/AVIF, `width`/`height` definidos, `srcset`, `loading="lazy"` (excepto la imagen LCP, que lleva `fetchpriority="high"`).
- Fuentes: WOFF2, subset, `font-display: swap`, `preload` solo de las críticas.
- CSS y JS minificados, sin código muerto. Scripts de terceros cargados tras la interacción o `defer`.
- Cero errores de consola, HTML válido y diseño mobile-first.

## 6. SEO, AEO y GEO
- Un único `<h1>`, jerarquía de títulos correcta, `title` y `meta description` únicos por página, canonical, Open Graph y Twitter Cards.
- Datos estructurados JSON-LD según el tipo de negocio (`Organization`/`LocalBusiness`, `FAQPage`, `Service`, `BreadcrumbList`, etc.).
- Bloques de pregunta-respuesta cortos y directos para motores de respuesta e IA.
- `sitemap.xml`, `robots.txt`, `llms.txt` si aplica, enlaces internos y `alt` descriptivo en todas las imágenes.
- Una página por intención de búsqueda. Palabras clave definidas en `ia/00-MARCA/`.

## 7. TRACKING Y PRIVACIDAD
- Google Tag Manager como único punto de carga de etiquetas. Eventos enviados al `dataLayer` con nombres estándar (`view_content`, `click_whatsapp`, `generate_lead`, etc.).
- Formularios envían eventos a Meta, Google y TikTok vía API de conversiones (CAPI), con deduplicación mediante `event_id` compartido entre píxel y servidor.
- Datos personales hasheados (SHA-256) antes de enviarse. Nunca enviar datos sensibles a plataformas publicitarias.
- Banner de consentimiento: no disparar etiquetas de marketing antes de que el usuario acepte.
- UTMs y parámetros de clic (`fbclid`, `gclid`, `ttclid`) se capturan y se conservan hasta la conversión.
- IDs de tracking: `[PENDIENTE: GTM, Meta, Google, TikTok]`, definidos por proyecto.

## 8. SEGURIDAD
- Sin brechas por malas prácticas. El código se audita antes de cualquier presentación o deploy.
- Prohibido almacenar o escribir claves, tokens o secretos en el repositorio. Usar variables de entorno y un `.env.example` sin valores reales.
- Validar y sanitizar toda entrada de formularios (cliente y servidor), con honeypot o captcha ligero y límite de peticiones.
- Cabeceras: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Enlaces externos con `rel="noopener noreferrer"`. Sin `eval`, sin `innerHTML` con datos no confiables.
- Auditoría de dependencias antes de cada release.

## 9. ACCESIBILIDAD Y UX
- WCAG AA: contraste, foco visible, navegación con teclado, etiquetas en formularios, `aria` solo cuando haga falta.
- Una llamada a la acción principal clara por landing, visible sin desplazarse.
- Enlaces a redes sociales y canales de contacto en cabecera o pie.

## 10. GIT Y VERSIONADO
- Repositorio en GitHub, GitLab o similar. La rama `main` contiene la versión oficial.
- Cada funcionalidad se desarrolla en una rama corta (`feat/nombre`, `fix/nombre`) y se fusiona a `main` al terminar.
- Un commit por cambio, con Conventional Commits (`feat:`, `fix:`, `docs:`, `perf:`, `chore:`).
- El release (versionado semántico `vX.Y.Z`) solo se genera por pedido del usuario.
- El repositorio permanece limpio: sin archivos residuales ni errores. Todo directorio o tipo de archivo que no deba subirse se registra en `.gitignore`.
- Subir cambios al repositorio está permitido. **Antes de desplegar a producción se notifica al usuario y se espera su aprobación.**

## 11. DEFINICIÓN DE "TERMINADO"
- Lighthouse cumple los umbrales de la sección 5.
- Sin secretos en el repo y auditoría de seguridad hecha.
- Eventos de tracking verificados en GTM (modo vista previa).
- HTML válido, accesible y sin errores de consola.
- Commit realizado y `MEMORIA.md` actualizada si hubo un aprendizaje exitoso.

## 12. REGLA DE ORO
Autonomía únicamente dentro de la carpeta de este proyecto. Queda prohibido leer, cambiar, duplicar o borrar información fuera de este directorio, en este ordenador u otro, por red local o pública, en servidores de desarrollo o producción. Para cambios de esa naturaleza se solicita intervención humana con una guía paso a paso, o se actúa de forma autónoma solo con pedido explícito del usuario.

## 13. EQUIPO
- Líder del desarrollo: `[PENDIENTE: nombre]`.
- Idioma de trabajo y de contenido: `[PENDIENTE: ej. español]`.
