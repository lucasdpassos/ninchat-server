const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const client = new twilio(
  process.env.TWILLIO_KEY_ONE,
  process.env.TWILLIO_KEY_TWO
);

app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("Dados recebidos:", data);

  client.messages
    .create({
      from: "whatsapp:+13254130669", // Número do WhatsApp da Twilio
      to: "whatsapp:+5521979478857", // Seu número de WhatsApp
      body: `Novo atendimento finalizado:\nNome: ${data.nome}\nEmpresa: ${data.empresa}\nResumo: ${data.resumo}\nTelefone: ${data.telefone}\Quantidade_Atendimentos: ${data.qntAtendimentos}`,
    })
    .then((message) => {
      console.log("Mensagem enviada:", message.sid);
      res.send("Webhook recebido e mensagem enviada via WhatsApp!");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem:", error);
      res.status(500).send("Erro ao enviar mensagem.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
