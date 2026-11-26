# Robot AR

Ejercicio del Taller de Diseño de Interfaces de la Universidad Adolfo Ibáñez. Un robot animado de A-Frame aparece sobre el marcador HIRO cuando AR.js lo detecta. La pantalla inicial incluye una vista previa 3D y mantiene la cámara apagada.

[Probar Robot AR en GitHub Pages](https://ambrosiovaldesbw.github.io/Modulo-02-AR/)

## Cómo usarlo

1. En el menú, elige **Abrir en otra pestaña**, **Descargar marcador** o **Imprimir marcador**. Puedes mostrar el [HIRO](./hiro.png) en tu celular y usar la cámara del computador para verlo. Conserva visible el margen blanco.
2. Pulsa **Iniciar realidad aumentada** y concede el permiso de cámara cuando lo pida el navegador.
3. Cuando aparezca «Apunta tu cámara hacia el marcador», encuadra el cuadrado completo con buena luz. El indicador cambia a verde cuando se detecta el HIRO y se muestra el robot animado.
4. Usa **Pantalla completa** para ampliar la experiencia. **Cerrar cámara** detiene la captura y regresa al menú. Puedes iniciar otra sesión desde allí.

El marcador es una imagen PNG de 2000 × 2000 píxeles. El patrón y la calibración se cargan desde la misma carpeta. La detección se procesa en el navegador y la experiencia solo solicita vídeo.

## Tecnologías y ejecución

El modelo usa cajas, esferas, cilindros y anillos de A-Frame 1.6.0. AR.js 3.4.7 detecta el marcador y suaviza su posición. Ambos cargan desde CDN y requieren una conexión a Internet.

Sirve la carpeta completa desde HTTPS o localhost para que el navegador pueda solicitar la cámara. Para una prueba local con Python, ejecuta `python -m http.server 8000` y abre `http://localhost:8000/`. GitHub Pages puede servir estos archivos estáticos desde la raíz de `main`.

- [Código fuente de AR.js 3.4.7](https://github.com/AR-js-org/AR.js/tree/3.4.7)
- [Licencia de los recursos de AR.js](./LICENSE-ARjs.txt)
