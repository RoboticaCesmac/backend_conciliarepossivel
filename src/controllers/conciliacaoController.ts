import { Request, Response } from 'express';
import ZoomService from '../services/zoomService';
import EmailService from '../services/emailService';

const conciliacaoController = {
    
    async agendarReuniao(request: Request, response: Response){
        const zoomService = new ZoomService();
        const reuniao = await zoomService.agendarReuniao(request.body);
        
        if(reuniao.error !== null){
            return response.status(201).json(reuniao);
        }else{
            return response.status(reuniao.error!.status || 400).json(reuniao.error);
        }
    },

    async enviarEmail(request: Request, response: Response){
        const emailService = new EmailService();
        const dadosEmail = await emailService.enviarEmail(request.body);

        if(dadosEmail !== undefined){
            return response.status(201).json(dadosEmail);
        }else{
            return response.status(400).json({ message: "Um erro ocorreu ao tentar enviar o e-mail" });
        }
    }
}

export default conciliacaoController;