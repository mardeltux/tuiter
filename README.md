# Tuiter -> código base para ejercitar eventos y manipulación del DOM

# Estructura
El código está dividido en dos partes:

### Backend
Aquí se encuentra lo relacionado al streaming de Tweets en tiempo real. El backend utiliza el módulo `twitter-stream` para obtener tweets de acuerdo a un palabra clave. Cada uno de estos tweets es guardado en la base de datos en tiempo real de `Firebase`.

### Frontend
Aquí se encuentra lo relacionado a la visualización de Tweets en tiempo real.

# Configuración
Para que este código base pueda funcionar, deben crearse en primera instancia una app en Twitter y una app en Firebase. Luego deben configurarse ambas partes de la aplicación.

### Backend
Completar el archivo `config.json` con la siguiente información:

- Twitter

  - Keys de la aplicación
  - Palabra clave para el filtrado de tweets (`filter`)
 
- Firebase
  
  - URL de la base de datos en tiempo real
  - Service Account (https://firebase.google.com/docs/admin/setup)

### Frontend
En el archivo `js/firebase.js` debe modificarse la constante `config` con los datos correspondientes. Mas información en la documentación de Firebase -> https://firebase.google.com/docs/web/setup

# Desafío
El desafío consiste en agregar el código necesario al archivo `js/main.js` del frontend para mostrar Tweets en tiempo real. Consideraciones:

- Cada vez que un nuevo Tweet es generado, se emite el evento `newtweet`. Este evento posee toda la información acerca del Tweet en cuestión.

- El botón `control-btn` es el encargado de pausar/continuar el streaming de Tweets en tiempo real. Esto lo debe hacer a través de la función `controlFeed()`.

- Cuando el streaming se encuentra pausado, el div `pending-tweets` debe hacerse visible. En él se encuentra el span `tweets-count`, en el cual se debe mostrar la cantidad de tweets pendientes de visualización.

- Cuando el streaming se reanuda, el div `pending-tweets` debe ocultarse y los tweets acumulados deben mostrarse en el listado `tweets-list`.
