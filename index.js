const { Telegraf } = require('telegraf');
const bot = new Telegraf('8344247461:AAFZNL6EQmhIf8C5KqjfykNrnHzK7PG3QVU');

// Жарнама жіберілетін топтардың ID-лері (немесе @username)
const groups = ['@freefirekzchat', '-100123456789', '@басқа_группа']; 

const messageText = `🚨 FREE FIRE ОЙЫНШЫЛАРЫНА! 🚨
🎯 БЕТА ТУТОР — ТЕГІН!
🆓 Айди + регистрация — 0₸
💣 Басқалар ақша сұрап жатыр,
⚡️ бізде — БАРЛЫҒЫ ТЕГІН!
👉 Қазір кір 👉 @freefirekzchat
⏳ Кейін кеш болуы мүмкін…
🌍Біздің группамыз whatsapp та : https://chat.whatsapp.com/GzXbrcJDZAlFaqOAsavHM6`;

// Таймерді сақтайтын айнымалы
let timerId = null;

bot.on('web_app_data', (ctx) => {
    const data = ctx.webAppData.data();

    if (data === 'start_spam') {
        ctx.reply('Авто-жіберу іске қосылды! Әр 10 минут сайын жіберіліп тұрады.');

        // Егер таймер бұрын қосылған болса, оны өшіреміз (дубликат болмау үшін)
        if (timerId) clearInterval(timerId);

        // 10 минут сайын жіберу (10 * 60 * 1000 миллисекунд)
        timerId = setInterval(() => {
            groups.forEach(groupId => {
                bot.telegram.sendMessage(groupId, messageText)
                    .then(() => console.log(`Жіберілді: ${groupId}`))
                    .catch(err => console.error(`Қате: ${groupId}`, err));
            });
        }, 10 * 60 * 1000); 
    }
});

bot.launch();
