require('dotenv').config();
const authRoutes = require('./router/auth.routes');

const express = require('express');
const cors = require('cors');

require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`);
});

