import { getAuth } from 'firebase-admin/auth';
import { NextFunction, Request, Response } from 'express';

const autenticacaoMiddleware = {

    /**
     * Verifica se o usuário está autenticado checando no firebase se o token recebido é válido
     * https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=pt-br#web
     * @param request 
     * @param response 
     */
    async verificarToken(request: Request, response: Response, next: NextFunction){
        try{
            const cabecalhoAutorizacao = request.headers['authorization'];

            // É comum incluir o token no cabeçalho de autorização usando o esquema "Bearer". Isso segue a convenção estabelecida pelo padrão HTTP de autenticação com esquemas de autenticação baseados em token.
            if(cabecalhoAutorizacao !== undefined && cabecalhoAutorizacao.startsWith('Bearer ')){
                const idToken = cabecalhoAutorizacao.split(' ')[1]; // Para retirar o Bearer da frente
                await getAuth().verifyIdToken(idToken);
                // Se estiver autorizado continua a requisição
                next();
            }else{
                return response.status(401).json({ message: "Token inválido" });
            }
        }catch(erro){
            return response.status(401).json({ message: "Token inválido" });
        }
    }

}

export default autenticacaoMiddleware;