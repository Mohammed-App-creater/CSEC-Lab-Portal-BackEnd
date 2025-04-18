import 'tsconfig-paths/register';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './core/config/swaggerConfig';

import userRoutes from './modules/user/routes';
import divisionRoutes from './modules/division/routes';
import sessionRoutes from './modules/session/routes';
import attendanceRoutes from './modules/attendance/routes';
import dashboardRoutes from './modules/dashboard/routes';
import announcementRouter from './modules/announcement/routes';
import groupRouter from './modules/group/routes';


dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());




app.use('/api/user', userRoutes);
app.use('/api/division', divisionRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/announcement', announcementRouter);
app.use('/api/group', groupRouter);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
