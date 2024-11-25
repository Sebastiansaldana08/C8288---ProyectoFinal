// Hago referencia al directorio donde se encuentra el archivo .env
require("dotenv").config({ path: "../.env" });

const express = require("express");
const authRoutes = require("./routes/authRoutes"); // Rutas de autenticación
const recursoRoutes = require("./routes/recursoRoutes"); // Rutas de recursos

// Instancia para el servidor
const app = express();

// Middleware para leer datos JSON enviados desde el cliente
app.use(express.json());

// Rutas web para autenticación: /auth/register, /auth/login, etc.
app.use("/auth", authRoutes);

// Rutas web para la gestión de recursos: /recursos/crear, /recursos/listar, etc.
app.use("/recursos", recursoRoutes);

// Iniciar el servidor en el puerto definido en .env
app.listen(process.env.PUERTO_EXPRESS, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PUERTO_EXPRESS}`);
});
