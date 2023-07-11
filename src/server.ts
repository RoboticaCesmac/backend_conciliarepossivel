/**
 * Tutorial utilizado:
 * "Como criar uma API completa com NodeJS e Express | Backend - Projeto Full Stack #api #nodejs" de Manual do Dev
 * Link do vídeo: https://www.youtube.com/watch?v=Cdu0WJhI-d8
 */

import app from './app';
import dotenv from 'dotenv';

// Para as variáveis de ambiente estarem disponíveis para o uso
dotenv.config();
const porta = process.env.PORTA || 8000;

// Inicia o servidor para ficar escutando a porta e recebendo as requisições feitas a ele
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));