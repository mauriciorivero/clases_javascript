
/**
 * ACTIVIDADES DE PRÁCTICA: MANIPULACIÓN DEL DOM Y EVENTOS CON JAVASCRIPT
 * Estas tareas están diseñadas para aplicar conceptos de selección, modificación de estructura y manejo de interactividad.
 */

// 1. **Galería de Imágenes Dinámica** (Selección y Atributos)
// Enunciado: Crea una página que muestre una imagen principal y tres miniaturas debajo.
// - Utiliza `querySelectorAll()` para seleccionar todas las miniaturas y `querySelector()` para la imagen principal.
// - Programa un **EventListener** de tipo clic para que, al presionar cualquier miniatura, el atributo `src` de la imagen principal se actualice dinámicamente.

// 2. **Alternador de "Modo Oscuro"** (Manipulación de Clases)
// Enunciado: Diseña una interfaz sencilla con un título, un párrafo y un botón de "Cambiar Modo".
// - Captura el botón mediante su ID usando `getElementById()`.
// - Al dispararse el evento de clic, usa el método `classList.toggle()` para añadir o quitar la clase CSS `.dark-mode` al `document.body`.

// 3. **Lista de Comentarios con Eliminación** (Creación y Remoción de Nodos)
// Enunciado: Desarrolla un sistema donde el usuario escriba en un `<input>` y añada el texto a una lista `<ul>`.
// - Emplea `createElement()` para generar un nuevo `<li>` y `appendChild()` para insertarlo en el árbol DOM.
// - Cada nuevo comentario debe incluir un botón de "Eliminar" que use `removeChild()` o `remove()` para desaparecer ese nodo específico.

// 4. **Editor Interactivo de Gráficos SVG** (SVG DOM)
// Enunciado: Inserta un `<svg>` con un círculo y un cuadrado para manipular sus propiedades geométricas.
// - Selecciona los elementos utilizando las interfaces específicas del **SVG DOM**.
// - Permite que el usuario cambie el color de relleno (`fill`) o el tamaño de las formas mediante el método `setAttribute()`.

// 5. **Monitor de Propiedades de Eventos en Vivo** (Objeto Event)
// Enunciado: Crea una "zona de rastreo" dentro de un `<div>` que muestre información del mouse y teclado.
// - Asocia un evento `mousemove` para capturar el **objeto de evento** y mostrar las coordenadas `clientX` y `clientY`.
// - Identifica qué tecla se está presionando en tiempo real usando el evento `keydown` y la propiedad `key` del objeto de evento.
