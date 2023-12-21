import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const token = process.env.TG_BOT_TOKEN;

let bot;

if (process.env.NODE_ENV === "production") {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  bot = new TelegramBot(token, {
    autoStart: true,
    onlyFirstMatch: true,
    cancellation: true,
  });
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
  let server = app.listen(process.env.PORT, "0.0.0.0", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Web server started at http://%s:%s", host, port);
  });
  app.post("/" + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
  console.log("Bot server started in the " + process.env.NODE_ENV + " mode");
} else {
  bot = new TelegramBot(token, {
    polling: true,
    autoStart: true,
    onlyFirstMatch: true,
    cancellation: true,
  });
  console.log("Bot server started in the " + process.env.NODE_ENV + " mode");
}

bot.on("polling_error", (error) => {
  console.log(error);
});

async function sendMessage(msg, text, params) {
  await bot.sendMessage(msg.chat.id, text, params);
}

bot.on("message", async (ctx) => {
  if (ctx.text && ctx.text.length) {
    await sendMessage(ctx, ctx.text);
  }
});

//CHECK  OTHER COMMANDS AND FUNCTIONS:
//https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md
