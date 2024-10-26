# ﻿Coworking Management API

## Descripción

Esta API permite gestionar un sistema de coworking, incluyendo la creación y administración de espacios de coworking, reservas y usuarios. Los administradores pueden gestionar todos los aspectos de la aplicación, mientras que los usuarios normales solo pueden interactuar con sus propias reservas.

## Tecnologías

Node.js

Express

MongoDB (Mongoose)

JWT (JSON Web Tokens) para autenticación

Bcrypt para encriptación de contraseñas


## Rutas

### Autenticación y Usuarios
| Método | Ruta                                     | Descripción                           |
|--------|------------------------------------------|---------------------------------------|
| POST  | /api/users/register | Registrar un nuevo usuario (solo rol 'user').  |
|POST| /api/users/login| Iniciar sesión y obtener un token|
|GET |/api/users| Obtener todos los usuarios (solo administradores).|
|PATCH| /api/users/:id| Cambiar el rol de un usuario (solo administradores).|
|DELETE| /api/users/:id1 Eliminar un usuario (administradores pueden eliminar cualquier usuario, los usuarios pueden eliminarse a sí mismos).|

### Coworkings
| Método | Ruta                                     | Descripción                           |
|--------|------------------------------------------|---------------------------------------|
|GET| /api/coworkings| Obtener todos los espacios de coworking (solo administradores).|
|POST| /api/coworkings| Crear un nuevo espacio de coworking (solo administradores).|
|GET| /api/coworkings/:id| Obtener un espacio de coworking específico.|
|PUT |/api/coworkings/:id| Actualizar un espacio de coworking específico (solo administradores).|
|DELETE| /api/coworkings/:id| Eliminar un espacio de coworking específico (solo administradores).|

### Reservas
| Método | Ruta                                     | Descripción                           |
|--------|------------------------------------------|---------------------------------------|
|GET| /api/reservations| Obtener todas las reservas (solo administradores).|
|POST| /api/reservations| Crear una nueva reserva (cualquier usuario autenticado).|
|GET| /api/reservations/:id| Obtener una reserva específica (administradores o el usuario que realizó la reserva).|
|PUT| /api/reservations/:id| Actualizar una reserva (administradores o el usuario que realizó la reserva).|
|DELETE| /api/reservations/:id| Eliminar una reserva (administradores o el usuario que realizó la reserva).|

### Autenticación y Autorización

La API utiliza JWT para la autenticación. Al iniciar sesión, el usuario recibe un token que debe incluir en el encabezado Authorization en sus solicitudes.




