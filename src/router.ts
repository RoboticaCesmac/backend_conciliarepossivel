import express, { Request, Response } from 'express';
import conciliarController from './controllers/conciliacaoController';
import autenticacaoMiddleware from './middleware/autenticacaoMiddleware'

const router = express.Router();

// Rota para servir arquivos estáticos do react (front-end)
router.use('/', express.static('../web_conciliarepossivel/build'));

// A rota recebe os parâmetros request e response (back-end)
router.post('/back-end/agendar-reuniao', autenticacaoMiddleware.verificarToken, conciliarController.agendarReuniao);
router.post('/back-end/enviar-email', autenticacaoMiddleware.verificarToken, conciliarController.enviarEmail);
// router.get('/', (request: Request, response: Response) => response.status(200).send("A API está funcionando"));

export default router;