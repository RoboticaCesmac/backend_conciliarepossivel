import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

// Para as variáveis de ambiente estarem disponíveis para o uso
dotenv.config();

export interface IAutenticacao {
    access_token: string | null,
    expires_in: number | null,
    error: AxiosError | null
}

export interface IReuniao {
    // Principais
    start_time?: string, //yyyy-MM-ddTHH:mm:ssZ
    join_url?: string,
    error?: AxiosError | null,
    // Podem ser úteis
    id?: number,
    end_date_time?: string,
    duration?: number,  // Padrão é 1 hora
}

const urlZoom = 'https://api.zoom.us/v2';

class ZoomService {

    
    /**
     * Zoom Server-to-Server OAuth - Get a new access token
     * https://github.com/zoom/server-to-server-oauth-starter-api/tree/main
     */
    async autenticar(): Promise<IAutenticacao>{
        // Prepara a URL para requisição do token
        const urlParams = new URLSearchParams();
        urlParams.append('grant_type', 'account_credentials');
        urlParams.append('account_id', process.env.ZOOM_ACCOUNT_ID!);

        const urlZoomAutenticacao = 'https://zoom.us/oauth/token?'+urlParams.toString();

        // Prepara a string de autorização para realizar a requisição ao zoom
        const autorizacao = `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}` // Basic é o tipo de autenticação usado. Informa ao servidor como interpretar e autenticar as credenciais enviadas pelo client. Geralmente a autenticação do tipo authorization, Seu token é composto pelo usuário e senha criptografado em base64.

        try{
            // Realiza a requisição e retorna o token se tiver sido bem sucedido
            const resposta = await axios.post(urlZoomAutenticacao, null, {headers: {Authorization: autorizacao}});
            const dadosRetornados = resposta.data;
            
            const access_token = dadosRetornados.access_token;
            const expires_in = dadosRetornados.expires_in;
            return { access_token: access_token, expires_in: expires_in, error: null };
        }catch(erro: any){
            console.log("Erro ao tentar autenticar: "+erro);
            return { access_token: null, expires_in: null, error: erro };
        }
    }

    /**
     * Agenda uma reunião no Zoom
     * @param reuniao 
     * @returns 
     */
    async agendarReuniao(reuniao: IReuniao): Promise<IReuniao>{
        let dataAgendamento = new Date();
        dataAgendamento.setHours(48);
        reuniao.start_time = dataAgendamento.toISOString();

        // Faz a autenticação
        const autenticacao = await this.autenticar();

        if(autenticacao.error === null){
            const urlReuniaoZoom = urlZoom+"/users/me/meetings";

            try{
                // Prepara a string de autorização
                const autorizacao = `Bearer ${autenticacao.access_token}`;

                // Faz a requisição agendar reunião no zoom e retorna alguns dados da reunião se tiver sido bem sucedido
                const resposta = await axios.post(urlReuniaoZoom, reuniao, {headers: { Authorization: autorizacao }});
                const dadosRetornados = resposta.data;
                return { start_time: dadosRetornados.start_time, join_url: dadosRetornados.join_url };
            }catch(erro: any){
                console.log("Erro ao tentar agendar reunião: "+erro);
                return {error: erro};
            }
        }else{
            return { error: autenticacao.error };
        }
    }

}

export default ZoomService;