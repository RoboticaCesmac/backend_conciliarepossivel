# Projeto Conciliar é Possível
O intuito do projeto é facilitar a realização de conciliações. O solicitante cadastra uma solicitação informando os dados da parte contrária, a parte contrária recebe um e-mail com a solicitação da conciliação. A parte contrária pode aceitar ou recusar. A partir dai, a conciliação aparece na lista de conciliações para um mediador poder aceitar fazer parte. Com as partes aceitas, a conciliação é agendade e um link para a reunião pelo zoom é criado.

## Tecnologia usada no back-end
O Front-end foi desenvolvido com a biblioteca [React.js](https://pt-br.legacy.reactjs.org/), já o back-end responsável por enviar e-mail e agendar reunião no Zoom foi feito com [Node.js] junto com o framework Express. Ambos utilizam a linguagem TypeScript. O banco de dados utilizado foi o Cloud Firestore. A foto do usuário e os documentos da conciliação são salvos no serviço de armazenamento Firebase Storage.

## Configuração do back-end

É necessário instalar o nodemon e o ts-node para que os comandos do nodemon funcionem corretamente
`npm install -g ts-node nodemon` <br />

É necessário configurar as variáveis de ambiente utilizadas no projeto. Para isso, copie o arquivo `.env.example` e cole na pasta raíz do projeto apenas com o nome `.env`. Em `PORTA` você define a porta que deseja utilizar ao executar o servidor. A padrão utilizada é a 8000. Em `URL_FRONT_END` coloque a URL onde está hospedado o front-end do projeto, para que não dê erro de CORS. Os dados para acessar a API do Zoom `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID` e `ZOOM_CLIENT_SECRET` podem ser conseguidos entrando na conta pelo site https://marketplace.zoom.us/user/build , indo em Manage e clicando no app do tipo `Server-to-Server OAuth`. O servidor SMTP padrão utilizado para enviar e-mail é o do gmail. Em `EMAIL_USER` e `EMAIL_PASSWORD` insira a conta de onde será enviado os e-mails. <br />

Para que possa ser utilizada a plataforma Firebase, é necessário fazer download da chave privada, fazendo login em https://console.firebase.google.com/ , abrindo o o projeto, indo em configurações do projeto e na aba contas de serviço clicando no botão gerar nova chave privada. Salve a chave com o nome "credencial-firebase.json" na pasta raíz do projeto.

## Scripts disponíveis no back-end

No diretório do projeto, você pode rodar:

### `npm install`

Ao baixar o repositório, é importante executar esse comando para que as dependências como express, nodemailer e axios sejam instaladas no projeto.

### `npm run dev` ou `nodemon src/server.ts`

Roda o aplicativo no modo desenvolvimento.\
Use [http://localhost:8000](http://localhost:8000) para acessá-lo.

O aplicativo vai recarregar se você fizer mudanças.\
Você também poderá ver possíveis erros impressos no console.

### `npm run build`

Se estiver em um ambiente windows, é recomendado usar o comando no terminal git bash devido ao comando linux "cp" utilizado durante sua execução. Para converter os arquivos typescript para javascript na pasta dist e poder usar o comando `npm start` para deixá-lo rodando no servidor. O comando também chama após ele o `npm run postbuild` para copiar a pasta node_modules junto com os arquivos convertidos.

## Learn More

You can learn more in the [Express - Getting started](https://expressjs.com/pt-br/starter/installing.html).

Tutorial utilizado na criação: [Como criar uma API completa com NodeJS e Express | Backend - Projeto Full Stack #api #nodejs de Manual do Dev](https://youtu.be/Cdu0WJhI-d8).