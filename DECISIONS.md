# DECISIONS.md

Este documento describe las decisiones técnicas, enfoque y criterios utilizados durante el desarrollo de la prueba.

---

## Enfoque general

Se diseñó una arquitectura fullstack desacoplada, separando claramente las responsabilidades entre el backend y el frontend. Bajo este enfoque, el backend se encarga de obtener, procesar, transformar y entregar los datos en una estructura limpia y lista para ser consumida, mientras que el frontend se enfoca en presentar esa información al usuario de una manera clara, ordenada y visualmente entendible.

La decisión de separar ambas capas permite que cada parte del sistema tenga un propósito específico. El backend concentra la lógica relacionada con el tratamiento de datos, como la lectura del archivo mock, la limpieza de la información original, el cálculo del nivel de hype y la construcción del JSON final. De esta forma, el frontend no necesita conocer la estructura completa de los datos originales ni repetir reglas de negocio.

Por su parte, el frontend consume la respuesta ya procesada y se encarga de la experiencia visual del usuario. Allí se manejan aspectos como la renderización de tarjetas, el estado de carga, el manejo de errores y la lógica visual asociada al nivel de hype, como la identificación de la categoría Crown Jewel. Esto permite mantener una interfaz más flexible y enfocada en la presentación.

Aunque se trata de una arquitectura simple, resulta adecuada para el alcance de la prueba técnica, ya que cumple con los requerimientos sin agregar complejidad innecesaria. Se priorizó una solución clara, mantenible y fácil de revisar, evitando sobreingeniería o dependencias que no aportaran valor directo al objetivo del proyecto.

Además, este enfoque permite que el proyecto pueda escalar de forma ordenada en el futuro. Por ejemplo, el archivo mock podría ser reemplazado por una API real, el cálculo del hype podría ajustarse con nuevas reglas y el frontend podría incorporar filtros, ordenamientos o nuevas vistas sin modificar completamente la estructura base del sistema.

---

##  Decisiones técnicas principales

### 1. Backend - Separación (controller / service / types)

Para el desarrollo del backend se decidió implementar una arquitectura modular, separando claramente las responsabilidades entre controller, service y types. Esta decisión permite mantener una estructura más organizada, legible y escalable, siguiendo buenas prácticas similares a las utilizadas en entornos empresariales.

* El controller se encarga únicamente de exponer los endpoints de la aplicación y recibir las peticiones del cliente. De esta manera, su responsabilidad se limita a manejar la entrada y salida de información, evitando incluir lógica de negocio directamente en esta capa.

* El service concentra la lógica principal de la aplicación, como el procesamiento de los datos, la transformación de la información recibida y la aplicación de reglas necesarias para generar la respuesta esperada. Esto permite que la lógica del sistema sea más fácil de mantener, probar y modificar en el futuro.

* Adicionalmente, se creó una capa de types para definir los contratos de datos utilizados dentro del backend. Esto ayuda a mantener consistencia en la estructura de la información, mejora la claridad del código y reduce posibles errores al trabajar con objetos o respuestas esperadas.

### 2. Backend y Frontend - Hype

Inicialmente se consideró calcular la propiedad Crown Jewel desde el backend. Sin embargo, finalmente se decidió manejar esta clasificación en el frontend, debido a que el JSON final entregado por el backend no incluye explícitamente esa propiedad.

La razón principal es que Crown Jewel se comporta más como una representación visual o una interpretación de interfaz basada en el valor de hypeLevel, y no necesariamente como una regla de negocio central del sistema. Es decir, el backend entrega el dato principal calculado, mientras que el frontend decide cómo representarlo visualmente ante el usuario.

Esta decisión también hace que el frontend sea más resiliente ante cambios en el payload. Mientras el backend siga entregando el campo hypeLevel, la interfaz puede adaptar etiquetas, insignias, estilos o categorías visuales sin necesidad de modificar la API.

Además, permite mayor flexibilidad en la experiencia de usuario. Por ejemplo, en el futuro el frontend podría mostrar diferentes niveles visuales, colores, íconos o mensajes dependiendo del hype, sin alterar la estructura de datos entregada por el backend.

### 3. Frontend - Manejo de estados

En el frontend se implementó un manejo básico pero importante de estados para representar correctamente el ciclo de carga de la información. Se contemplaron los estados de loading, error y success, lo cual permite mejorar la experiencia del usuario y cumplir con una estructura más robusta de consumo de datos.

El estado loading permite mostrar que la información se está cargando y evita que la interfaz parezca vacía o congelada mientras se espera la respuesta del backend. Esto mejora la percepción de rendimiento y claridad para el usuario.

El estado error permite mostrar un mensaje cuando ocurre algún problema al consultar los datos. Esto es importante porque evita que la aplicación falle silenciosamente y permite dar retroalimentación clara en caso de errores de conexión, problemas en el endpoint o respuestas inesperadas.

Finalmente, el estado success representa el momento en que la información fue obtenida correctamente y puede mostrarse en pantalla. Esta separación de estados permite que el componente sea más ordenado, fácil de entender y preparado para escenarios reales de consumo de APIs.

### 4. Frontend - Manejo de fechas

Debido a las restricciones del reto, no se utilizaron librerías externas para el manejo de fechas, como Day.js, Moment.js o date-fns. En su lugar, se implementó una función propia utilizando el objeto nativo Date de JavaScript.

Esta decisión permite cumplir con el requerimiento de evitar dependencias adicionales y demuestra que la lógica de fechas puede resolverse manualmente cuando el alcance del problema es controlado. Para este caso, se calculan diferencias de tiempo a partir de la fecha de publicación del video, generando una representación relativa como días, meses o años.

Aunque las librerías de fechas pueden ser muy útiles en proyectos más complejos, especialmente cuando se manejan zonas horarias, internacionalización o formatos avanzados, para esta prueba era suficiente una implementación personalizada.

Esto mantiene el proyecto más liviano y permite evidenciar claramente la lógica utilizada para transformar la fecha original en un texto más amigable para el usuario.

### 5. Github - Control de versiones

Se utilizó GitHub para llevar el control de versiones del proyecto de forma organizada. Además, se aplicaron **Conventional Commits**, con el fin de mantener un historial claro y fácil de revisar.

Esta práctica permite identificar rápidamente el tipo de cambio realizado, por ejemplo: nuevas funcionalidades, correcciones, ajustes de documentación o configuraciones del proyecto. También ayuda a trabajar de una forma más cercana a un entorno empresarial, donde los cambios suelen registrarse de manera ordenada y progresiva.

Este enfoque ya lo he utilizado en empresas en las que he trabajado, y permite mejorar la trazabilidad del desarrollo, facilitar revisiones futuras y mantener el repositorio más limpio y profesional.

---

## Organización del proyecto

Se utilizó estructura tipo monorepo:

```
backend/
  data/
    mock-youtube-api.json
  src/
    main.ts
    app.module.ts
    videos/
      videos.module.ts
      videos.controller.ts
      videos.service.ts
      videos.types.ts
...

frontend/
  src/
    api/
      videos.js
    components/
      CrownJewelCard.jsx
      VideoCard.jsx
    App.jsx
    main.jsx
    index.css
  index.html
...
```

---

## Supuestos

* El backend siempre estará disponible en el puerto 3000 y el frontend en el puerto 5173
* El JSON mantiene la estructura base
* `hypeLevel` siempre será numérico
* Se tiene instalado en el computador Git y Node.js (de igual forma se recuerda en el README.md)
* No se requiere autenticación para consumir el endpoint del backend.
* No se requiere conexión a una base de datos para esta versión del proyecto.
* El proyecto está pensado para ejecutarse en ambiente local.
* El backend y el frontend se ejecutan como aplicaciones separadas.

---

## Simplificaciones realizadas

* No se utilizó `.env`
* No se manejó paginación
* No se cachearon datos

---

## Problemas encontrados

### 1. Repo anidado en backend

Problema:

* Nest creó un `.git` interno

Solución:

* Se eliminó `backend/.git`

### 2. La url de placeholder no esta actualizada

Problema:

* En las pruebas del frontend no cargaban las miniaturas de los videos, por lo que probe en entrar a la url de uno que otro y no existia la url

Solución:

* Al investigar un poco, habia que cambiar el dominio a 'placehold.co', por eso, se hace esta transformacion en videos.service.ts en el backend

---


## Uso de herramientas de IA

Se utilizó IA como apoyo para:

* Estructuración del backend
* Generacion de los conventional commits
* Organización del frontend
* Diseño del CSS del frontend (no se necesitaba un diseño especifico, por lo que el CSS era libre)
* Revisión de buenas prácticas
* Generacion de README.md y DECISIONS.md

Algunos de los prompts utilizados:

* Como hago el conventional commit para lo siguiente, y tambien la branch para hacer el cambio: ...
* Adorna el frontend que esta en el proyecto, cumpliendo con los requisitos de la joya de la corona y los videos en grilla...
* Genera un README.md y DECISIONES.md para el siguiente proyecto teniendo en cuenta los lineamientos...
* Separa en un nuevo archivo la estructura de los datos limpios y raw de la logica del backend.

---
