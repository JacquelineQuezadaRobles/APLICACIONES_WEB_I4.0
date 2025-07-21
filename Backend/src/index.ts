import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; // ← AÑADIDO
import authRoute from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.rutes';
import menuRoutes from './routes/menu.routes';
import connectDBMongo from './config/db';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // ← PERMITE que el frontend se comunique
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/v1/auth', authRoute);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1/menu', menuRoutes);

// Conexión y levantamiento del servidor
connectDBMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
