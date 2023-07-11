import nodemailer, { SentMessageInfo, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

// Para as variáveis de ambiente estarem disponíveis para o uso
dotenv.config();

export interface IEmail{
    to: string,
    subject: string,
    contentHTML: string
}

// Transporter SMTP - Entidade responsável pelo envio dos e-mails
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),    // Outlook usa criptografia TLS na porta 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

class EmailService{

    async testarServidorSMTP(){
        try{
            const resultado = await transporter.verify();
            console.log(resultado);
        }catch(erro: any){
            console.log(erro);
        }
    }


    /**
     * Envia o email com os dados informados
     * @param email (to, subject, text)
     * @returns 
     */
    async enviarEmail(email: IEmail): Promise<SentMessageInfo | undefined>{
        try{
            let infoEmail: SendMailOptions = {};
            infoEmail.from = process.env.EMAIL_USER;
            infoEmail.to = email.to;
            infoEmail.subject = email.subject;
            infoEmail.html = `${email.contentHTML}`+
                        '<p style="text-align: center;">&nbsp;</p>'+
                        '<p style="text-align: center;"><span style="font-family: arial, helvetica, sans-serif;">______________________</span></p>'+
                        '<p style="text-align: center;"><span style="font-family: arial, helvetica, sans-serif;">Atenciosamente,</span></p>'+
                        '<p style="text-align: center;"><img style="text-align: start;" src="https://firebasestorage.googleapis.com/v0/b/conciliar-e-possivel.appspot.com/o/logo.png?alt=media&token=bef03422-5875-4fab-b2d6-b6ccfc6db4f4" width="255" height="206"></p>'+
                        '<p style="text-align: center;"><span style="color: rgb(77, 3, 237); font-size: 18pt;"><strong><span style="font-family: arial, helvetica, sans-serif;">Conciliar &eacute; Poss&iacute;vel</span></strong></span></p>'+
                        '<p style="text-align: center;"><span style="color: rgb(186, 55, 42); font-size: 8pt;"><strong><span style="font-family: arial, helvetica, sans-serif;">Esta mensagem &eacute; autom&aacute;tica, n&atilde;o responda a este email!</span></strong></span></p>'+
                        '<p>&nbsp;</p>'+
                        '<p><img style="float: right;" src="https://firebasestorage.googleapis.com/v0/b/conciliar-e-possivel.appspot.com/o/citec.png?alt=media&token=c0345b2d-e874-468f-8477-9f0d1737e1dc" width="74" height="70"></p>';
            
            const resultado = await transporter.sendMail(infoEmail);
            return resultado;
        }catch(erro: any){
            console.log(erro);
            return undefined;
        }
    }

}

export default EmailService;