import 'tsconfig-paths/register';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './modules/user/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './core/config/swaggerConfig'; // path to your swagger config


dotenv.config();
 
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());



// Register routes
app.use('/api/user', userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
