import express, { Express, Request, Response } from "express";
import cors from 'cors';
const bodyParser = require('body-parser');
require('./connection');
const handler = require('./handler');
const port = process.env.port || 3000;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


// Routes
app.get('/allLaunch', handler.allLaunch); // From spacex api
app.post('/saveLaunch', handler.saveLaunch);
app.get('/getLaunch', handler.getLaunch); // locally saved
app.delete('/removeLaunch/:id', handler.removeLaunch);
app.get('/savedLaunchId', handler.savedLaunchId);

app.listen(port, () => console.log(`Server running on ${port}`));