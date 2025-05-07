<<<<<<< Updated upstream
import 'dotenv/config'; // This automatically loads the .env file
=======
import 'dotenv/config';
>>>>>>> Stashed changes
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
<<<<<<< Updated upstream
=======
import nodemailer from 'nodemailer'; 
import QRCode from 'qrcode';
>>>>>>> Stashed changes
import bodyParser from 'body-parser';

config();

import connect_DB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import memberRouter from './routes/memberRoute.js';
<<<<<<< Updated upstream
import maintenanceRoute from './routes/maintenanceRoute.js';
import userRouter from './routes/UserRoute.js';
import eventRouter from './routes/eventRoute.js';
import announcementRouter from './routes/annoucemntRouter.js';
import ruleRoutes from './routes/ruleRoutes.js';
import expenseRouter from './routes/expenseRouter.js';
import pollrouter from './routes/pollRoute.js';
import ProfileRouter from './routes/ProfileRoute.js';
import ticketRouter from './routes/TicketRoute.js';
import paymentRouter from './routes/paymentRoute.js'; // Import payment route

// App config
=======
import maintenanceRoute from '../BACKEND/routes/maintenanceRoute.js';
import userRouter from '../BACKEND/routes/UserRoute.js';
import eventRouter from '../BACKEND/routes/eventRoute.js';
import annoucementRoute from '../BACKEND/routes/annoucemntRoute.js';
import rulesRouter from '../BACKEND/routes/rulesRoutes.js';


import expenseRouter from '../BACKEND/routes/expenseRouter.js'
import pollrouter from '../BACKEND/routes/pollRoute.js'
import ProfileRouter from '../BACKEND/routes/ProfileRoute.js'




import paymentRouter from "./routes/paymentRoute.js";





//app config
>>>>>>> Stashed changes
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connect_DB();
connectCloudinary();

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

<<<<<<< Updated upstream
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// API endpoints
app.use('/api/member', memberRouter);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/user', userRouter);
app.use('/api/announcement', announcementRouter);
app.use('/api/rules', ruleRoutes);
app.use('/api/event', eventRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/poll', pollrouter);
app.use('/api/ProfileRouter', ProfileRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/payments', paymentRouter); // Add payment route
=======
//api endpoints
app.use('/api/member', memberRouter);
app.use('/api/maintenace', maintenanceRoute);
app.use('/api/user', userRouter);
app.use('/api/annoucement', annoucementRoute);
app.use('/api/rules', rulesRouter);

app.use('/api/event', eventRouter);
app.use('/api/expense',expenseRouter)
app.use("/api/payments", paymentRouter);
app.use('/api/poll', pollrouter);
app.use('/api/ProfileRouter', ProfileRouter);
>>>>>>> Stashed changes

// QR Code generation endpoint
app.post('/api/generate-qr', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    res.json({ qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

<<<<<<< Updated upstream
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`API available at http://localhost:${port}`);
});
=======
// QR Code generation endpoint
app.post('/api/generate-qr', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    res.json({ qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => console.log('Server started on port', port));
>>>>>>> Stashed changes
