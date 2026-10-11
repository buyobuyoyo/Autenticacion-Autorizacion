const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../servicios/auth.service');

function registro(req, res) {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!nombre || !correo || !contrasena || !rol) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    bcrypt.hash(contrasena, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        authService.registrarUsuario(nombre, correo, hash, rol, (error) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ mensaje: 'Ese correo ya está registrado' });
                }
                return res.status(500).json({ mensaje: 'Error del servidor' });
            }
            res.status(201).json({ mensaje: 'Usuario registrado' });
        });
    });
}

function login(req, res) {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    authService.buscarPorCorreo(correo, (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const usuario = resultados[0];

        bcrypt.compare(contrasena, usuario.contrasena, (error, coincide) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error del servidor' });
            }

            if (!coincide) {
                return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
            }

            const token = jwt.sign(
                { id: usuario.id, rol: usuario.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token, nombre: usuario.nombre, rol: usuario.rol });
        });
    });
}

module.exports = { registro, login };