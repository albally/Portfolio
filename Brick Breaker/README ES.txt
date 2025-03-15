Juego de Brick Breaker

Este proyecto es un juego completamente funcional de "Brick Breaker", desarrollado con p5.js. Incluye todas las mecánicas principales, como el movimiento de la paleta y la pelota, detección de colisiones y condiciones de victoria/derrota, además de varias funciones adicionales para mejorar la jugabilidad.

Características principales:
Implementé las mecánicas esenciales del juego, incluyendo una paleta que sigue el movimiento del mouse, la física de la pelota (rebotes contra paredes, la paleta y los ladrillos) y una pantalla de Game Over cuando la pelota cae por el borde inferior. El juego también tiene una condición de victoria cuando se destruyen todos los ladrillos.

Funciones adicionales:
Agregué características avanzadas, como ladrillos de diferentes colores y tamaños, un sistema de puntuación y configuraciones personalizables (por ejemplo, el color de la paleta y el tamaño de la pelota). También implementé ladrillos especiales que cambian de color dinámicamente, lo que presentó un desafío técnico para asegurarse de que solo ciertos ladrillos fueran afectados sin modificar los demás.

Desafíos técnicos:
Uno de los aspectos más complejos fue implementar la funcionalidad para cambiar el color de los ladrillos especiales sin afectar a todos los ladrillos en el lienzo. Para ello, tuve que manipular cuidadosamente el arreglo de ladrillos y la lógica de colisión, un problema que logré resolver con éxito.

Tecnologías utilizadas:
El juego fue desarrollado utilizando JavaScript y la librería p5.js, siguiendo buenas prácticas como el principio de separación de preocupaciones para organizar el código en funciones modulares.