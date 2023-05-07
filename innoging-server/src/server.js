'use strict'

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3300;

const app = express();

const allowedOrigins = ['http://localhost:3300', '*'];
const options = {
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // This is important.
  origin: allowedOrigins,
  methods: ['GET', 'PUT', 'POST','DELETE', ]
};

app.use(cors(options));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({limit: '100mb'}));



const shapes = ['line', 'triangle', 'rectangle', 'circle'];
const colors = ['red', 'orange','yellow', 'green', 'blue', 'indigo', 'violet'];

const random = (endpoint) => {
  return Math.floor(Math.random() * (endpoint === 'shape' ? shapes.length : colors.length));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/shape', (req, res) => {
  res.send(shapes[random('shape')]);
});

app.get('/color', (req, res) => {
  res.send(colors[random('color')]);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
