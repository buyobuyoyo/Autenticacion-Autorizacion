-- Base de datos de la práctica de autenticación y autorización
-- Cómo usarlo: abrir phpMyAdmin (XAMPP) pestaña SQL pegar este script Continuar

CREATE DATABASE IF NOT EXISTS autenticacion_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    
USE autenticacion_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL
);

-- Los usuarios se crean con la API para que la contraseña se guarde cifrada:
-- POST http://localhost:3000/api/registro
-- { "nombre": "Admin Prueba", "correo": "admin@correo.com", "contrasena": "1234", "rol": "Admin" }
-- { "nombre": "Cliente Prueba", "correo": "cliente@correo.com", "contrasena": "1234", "rol": "Cliente" }