require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor corriendo correctamente!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});