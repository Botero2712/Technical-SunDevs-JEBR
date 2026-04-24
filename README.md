# Cartelera de Hype Tecnológico

Prueba técnica desarrollada para Sundevs.
Este proyecto consiste en un sistema fullstack que procesa un mock de datos de YouTube y presenta una “cartelera de conocimiento” con un enfoque limpio, destacando el video con mayor nivel de hype.

---

## Descripción

El sistema se compone de:

* **Backend (NestJS):** Transforma el payload crudo de YouTube.
* **Frontend (React + Vite):** Consume el endpoint y muestra los datos en una interfaz.

---

## Tecnologías utilizadas

### Backend

* NestJS
* Node.js
* TypeScript

### Frontend

* React
* Vite
* JavaScript
* CSS

---

## Estructura del proyecto

```
technical_sundevs/
  backend/
  frontend/
  README.md
  DECISIONS.md
```

---

## Cómo ejecutar el proyecto

**Nota:** Debes tener instalado en tu computador Node.js y Git.

Abre una terminal CMD, o si tienes instalado Git, abre Git Bash.

### 1. Clonar repositorio

Recomiendo crear una carpeta para alojar el proyecto y partir desde ahi, por lo que el primer paso a continuacion es opcional

```
cd path
git clone https://github.com/Botero2712/Technical-SunDevs-JEBR.git
cd technical_sundevs
```

Aqui ya tendrias el proyecto.

---

##  Backend (NestJS)

### Instalar dependencias

En esa misma terminal:

```
cd backend
npm install
```

### Ejecutar

```
npm run start:dev
```

El backend estará disponible en:

```
http://localhost:3000/api/videos
```
Endpoint: GET /api/videos

La respuesta general deberia tener la siguiente forma:

### Respuesta

```json
{
  "thumbnail": "string",
  "title": "string",
  "author": "string",
  "publishedAtRelative": "string",
  "hypeLevel": number
}
```

---

## Frontend (React)

### Instalar dependencias

Abre una segunda terminal, alojada donde este el proyecto y haz lo siguiente:

```
cd frontend
npm install
```

### Ejecutar

```
npm run dev
```

Abrir en el navegador (normalmente):

```
http://localhost:5173
```

---

## Lógica de negocio

### Nivel de Hype

```
(likes + comentarios) / vistas
```

### Reglas adicionales

* Si el título contiene `"tutorial"` → se multiplica por 2
* Si no hay comentarios → hype = 0
* Si vistas = 0 → hype = 0

---

## Crown Jewel

El frontend determina el video con mayor `hypeLevel` y lo destaca visualmente como:

> “Joya de la Corona”

---

##  Flujo de datos

1. Backend lee mock JSON
2. Backend limpia y transforma datos
3. Frontend consume `/api/videos`
4. Frontend calcula el mayor hype
5. UI renderiza:

   * 1 video destacado
   * resto en grilla

---

##  Consideraciones

* No se usan librerías de fechas.

---

##  Autor

Juan Esteban Botero Rodriguez.
Ingeniero Electronico.
