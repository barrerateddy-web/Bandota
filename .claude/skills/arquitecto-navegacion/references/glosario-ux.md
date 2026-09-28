# Glosario de arquitectura de la información / UX — para explicarle a Teddy

Cada entrada: definición en una frase simple + ejemplo anclado al sitio real de LA BANDOTA. No leas esto textual — adapta la frase al momento de la conversación. Actualiza los ejemplos si el sitio cambia y dejan de ser precisos.

**Arquitectura de la información (IA)**
Cómo organizas y agrupas el contenido para que alguien encuentre rápido lo que busca, sin pensar mucho.
Ejemplo: en vez de tener "Bodas" y "Corporativos" como dos páginas separadas que repetían casi lo mismo, se fusionaron en una sola página "Servicios" — esa es una decisión de arquitectura de la información: agrupar por lo que la gente busca (contratar la banda), no por cómo tú divides internamente tu oferta.

**Jerarquía visual**
Qué ve la gente primero, segundo, tercero — controlado por tamaño, color y posición, no por el orden en que aparece en el código.
Ejemplo: en el home, el carrusel de banners y el título grande son lo primero que se ve; los stats (años de trayectoria, shows realizados) son más pequeños y van después — eso comunica "esto es lo importante, esto es el respaldo".

**Embudo de conversión (funnel)**
El camino de pasos que sigue alguien desde que llega al sitio hasta que hace lo que quieres que haga (en este caso: cotizar/contratar).
Ejemplo: Home → Servicios → elegir formato/pack → agendar videollamada → recibe PDF y WhatsApp. Cada paso de más es un lugar donde alguien se puede ir sin terminar.

**Above the fold / below the fold**
"Above the fold" es lo que se ve sin hacer scroll al entrar a una página; "below the fold" es todo lo que hay que bajar a ver.
Ejemplo: el carrusel de banners y el CTA "Cotiza con Nosotros" están above the fold en el home — son lo primero que ve cualquiera, sin mover el mouse.

**CTA (call to action / llamado a la acción)**
El botón o link que le dice explícitamente a alguien qué hacer ahora.
Ejemplo: "Cotiza con Nosotros" en el hero del home, o el botón de WhatsApp flotante que aparece en todas las páginas — son CTAs. Tener muchos CTAs distintos compitiendo en una misma pantalla diluye cuál debería seguir el visitante.

**Profundidad de clics (click depth)**
Cuántos clics le toma a alguien llegar desde la portada hasta lo que busca.
Ejemplo: hoy, cotizar toma 2 clics (Home → Servicios → cotizador). Entre más corto ese camino para la acción más importante, mejor — lo ideal en sitios de venta directa suele ser 1 a 3 clics.

**Wayfinding (orientación)**
Qué tan fácil es para alguien saber en qué parte del sitio está y cómo volver o seguir.
Ejemplo: el menú marca con un subrayado o color distinto la página activa ("Inicio" resaltado cuando estás en el home) — eso es wayfinding: le dice al visitante "estás aquí".

**Breadcrumbs (migas de pan)**
Una lista de links tipo "Inicio > Blog > Nombre del artículo" que muestra la ruta hasta la página actual.
Ejemplo: el sitio de Bandota hoy no las tiene — con solo 5 páginas y navegación plana, probablemente no las necesita todavía. Se vuelven útiles cuando hay muchos niveles (por ejemplo, si el blog creciera mucho).

**Tasa de rebote / abandono**
El punto donde la gente se va sin completar la acción que querías.
Ejemplo: si en el cotizador mucha gente elige un formato pero nunca llega a agendar la videollamada, ese paso del formulario sería donde hay "abandono" — vale la pena preguntarle a Teddy si ha notado algo así (aunque sin analítica instalada, hoy solo lo sabría por intuición o por lo que le cuentan los clientes).

**Página huérfana**
Una página que existe pero a la que casi nadie llega porque no está enlazada desde ningún lugar visible de la navegación normal.
Ejemplo: si un artículo del blog no está enlazado desde `blog/index.html` ni desde ningún otro lado, es huérfano — existe, pero solo alguien con el link directo lo encuentra.

**Navegación global vs local**
La navegación global es el menú que se repite en todas las páginas (arriba, con Inicio/Servicios/etc.); la navegación local es la que existe solo dentro de una página o sección (como los links entre los formatos del cotizador).
Ejemplo: el menú de arriba (`nav-menu`) es navegación global; los links de "Explora" en el home que llevan a Servicios/Universo Bandota/Blog son más bien atajos locales de esa sección.
