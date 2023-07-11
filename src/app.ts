import express, { Express } from 'express';
import cors from 'cors';
import corsOptions from './constants/corsOptions';
import router from './router';
import firebaseAdmin from 'firebase-admin';
import { firebaseConfig } from '../src/config/firebase';

// Express é um framework que ajudará nas requisições Http
const app: Express = express();
// Express usar a biblioteca cors, para liberar o aplicativo a ter acesso a api
app.use(cors(corsOptions));
// Para a API trabalhar com os dados em JSON (body-parser: converter o body de json para objeto e objeto para json)
app.use(express.json());
// Toda requisição que acontecer vai ser tratada pela classe router, onde terão as rotas
app.use(router);
// Inicializa o firebase
firebaseAdmin.initializeApp(firebaseConfig);

export default app;