import dotenv from 'dotenv';

// Para as variáveis de ambiente estarem disponíveis para o uso
dotenv.config();

const corsOptions = {
    origin: process.env.URL_FRONT_END || 'http://localhost:3000',
    optionSuccessStatus: 200
}

export default corsOptions;