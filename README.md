# BOT-TEMPLATE

Starter pack for running telegram bot on the Heroku using Node.js

## Requirements 
  - node ^18

# Step-by-step

### Try bot locally

1. Create your own bot using Telegram's [BotFather](https://core.telegram.org/bots#3-how-do-i-create-a-bot) and grab your TOKEN.
2. Clone or download and unpack this repo.
3. Go to the app's folder using `cd ~/heroku-node-telegram-bot`
4. Run `npm install` (in some cases you will need to run this with sudo, you know, just the permissions).
5. Rename .env_example file into .env and set TG_BOT_TOKEN to the value, you've got from the BotFather.
6. Run `npm run dev` and send smth to your bot.
7. After it says "hello" to you, we can go to the next step 😎

### Deploy your bot to the heroku

1. Create the [Heroku account](https://heroku.com) and install the [Heroku Toolbelt](https://toolbelt.heroku.com/).
2. Login to your Heroku account using `heroku login`.
3. Go to the app's folder using `cd ~/bot-template`
4. Run `heroku create` to prepare the Heroku environment.
5. Run `heroku config:set TG_BOT_TOKEN=SET HERE THE TOKEN YOU'VE GOT FROM THE BOTFATHER` and `heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)` to configure environment variables on the server.
6. Run `git add -A && git commit -m "Ready to run on heroku" && git push heroku main` to deploy your bot to the Heroku server.
7. Send smth to the bot to check out if it works ok.

------------------------------

Possible issues:
After installing modules (npm i) check that package.json (only) has this stroke: ```"type": "module"```