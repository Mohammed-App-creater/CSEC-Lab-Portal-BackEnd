import 'tsconfig-paths/register';
import express from 'express';

import cors from 'cors';
import { corsOptions } from './core/config/cors.config';
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
import DivisionResourceRouter from './modules/divisionResorce/route';
import { jwtValidator } from './app/middleware/JWTValidator';
import { Request, Response } from "express";




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
app.use('/api/dashboard', jwtValidator, dashboardRoutes);
app.use('/api/announcement', announcementRouter);
app.use('/api/group', groupRouter);
app.use('/api/headsup', headsUpRoutes);
app.use('/api/role', roleRouter);
app.use('/api/division-resources', DivisionResourceRouter);

app.get('/api/astumsjbootcamp', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to ASTUMSJ Bootcamp API',
    version: '1.0.0',
    The_Password: '+2519( x + 4)20( y-3 )488( z + 4 )',
    Hint: 'Replace x, y, and z with the code you get in the lecture'
  });
});

app.post('/api/astumsjbootcamp', (req: Request, res: Response) => {
  if (!req.body || !req.body.password) {
    res.status(400).json({
      message: 'Password is required'
    }); 
    return;
  }
  const { password } = req.body;
  if(!password){
    res.status(400).json({
      message: 'Password is required'
    });
    return;
  }
  if (password === '+251972014889') {
    res.status(200).json({
      message: 'Congratulations! You have successfully completed the ASTUMSJ Bootcamp challenge.',
      your_reward: 'I love you from Mohammed Sadik'
    });
    return;
  } else {
    res.status(401).json({
      message: 'Incorrect Password'
    });
    return;
  }
});


// Error handling middleware
app.use(errorHandler);


export default app;
