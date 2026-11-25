# Robot aumentado · AR.js

Ejercicio del Taller de Diseño de Interfaces de la Universidad Adolfo Ibáñez. Una figura animada aparece sobre el marcador HIRO. El robot se construye en el navegador con cajas, esferas, cilindros y anillos de A-Frame.

[Probar la experiencia](https://ambrosiovaldesbw.github.io/Modulo-02-AR/)

## Cómo usar

1. Abre o descarga el [marcador HIRO](./hiro.png). Imprímelo con margen blanco o muéstralo en otra pantalla.
2. En un navegador con cámara, abre la experiencia por HTTPS y pulsa **Activar cámara**. Concede el permiso.
3. Encuadra el marcador completo y mantén una iluminación uniforme. Cuando AR.js lo detecta, el robot queda anclado al cuadrado y mueve la cabeza y los brazos.
4. **Terminar escaneo** vuelve a la vista previa.

El patrón HIRO y el archivo de calibración incluidos viajan con el sitio. AR.js suaviza la pose del marcador entre fotogramas. La detección se procesa en el navegador.

## Ejecutar en local

Sirve esta carpeta completa con un servidor estático. Si tienes Python, ejecuta `python -m http.server 8000` y abre `http://localhost:8000/`. En GitHub Pages usa `main` y `/ (root)`. Se necesita conexión para cargar A-Frame 1.6.0 y AR.js 3.4.7.

[Documentación de marcadores de AR.js](https://ar-js-org.github.io/AR.js-Docs/marker-based/) · [Licencia de los recursos de AR.js](./LICENSE-ARjs.txt)
