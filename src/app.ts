import 'tsconfig-paths/register';
import express from 'express';

import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './core/config/swaggerConfig';

import userRoutes from './modules/user/routes';
import divisionRoutes from './modules/division/routes';
import sessionRoutes from './modules/session/routes';
import attendanceRoutes from './modules/attendance/routes';
import dashboardRoutes from './modules/dashboard/routes';
import announcementRouter from './modules/announcement/routes';
import groupRouter from './modules/group/routes';
import headsUpRoutes from './modules/headsup/routes';
import { errorHandler } from './app/middleware/errorHandler';
import roleRouter from './modules/role/routes';
import eventRouter from './modules/_event/routes';
import cookieParser from 'cookie-parser';
import { corsOptions } from './core/config/cors.config';



const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const filePath = path.join(__dirname, '../src/index.html');  
  console.log('filePath', filePath);
app.get('/', (req, res) => {
  res.sendFile(filePath);
});


app.use('/api/user', userRoutes);
app.use('/api/division', divisionRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/event', eventRouter);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/announcement', announcementRouter);
app.use('/api/group', groupRouter);
app.use('/api/headsup', headsUpRoutes);
app.use('/api/role', roleRouter);


// Error handling middleware
app.use(errorHandler);


export default app;
