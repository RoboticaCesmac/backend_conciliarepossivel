import express, { Request, Response } from 'express';
import conciliarController from './controllers/conciliacaoController';
import autenticacaoMiddleware from './middleware/autenticacaoMiddleware'

const router = express.Router();

// A rota recebe os parâmetros request e response
router.post('/agendar-reuniao', autenticacaoMiddleware.verificarToken, conciliarController.agendarReuniao);
router.post('/enviar-email', autenticacaoMiddleware.verificarToken, conciliarController.enviarEmail);
router.get('/', (request: Request, response: Response) => response.status(200).send("A API está funcionando"));

export default router;