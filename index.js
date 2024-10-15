const { Telegraf, Markup } = require('telegraf');
const express = require('express');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// @SudoR2spr By WOODcraft
app.use(bot.webhookCallback('/webhook'));

// @SudoR2spr By WOODcraft
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// @SudoR2spr By WOODcraft
const WEBHOOK_PATH = '/webhook';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://your-domain.com';  // @SudoR2spr By WOODcraft

bot.telegram.setWebhook(`${URL}${WEBHOOK_PATH}`);

// @SudoR2spr By WOODcraft
bot.start(async (ctx) => {
    const from = ctx.from;  // Get the user info from the context
    const welcomeMessage = `👋 Welcome to our channel, [${from.first_name}](tg://user?id=${from.id})! We're glad to have you here.`;
    
    try {
        // Send a welcome image with buttons
        await ctx.telegram.sendPhoto(ctx.chat.id, {
            source: 'angelLogo/welcome.jpg'  // @SudoR2spr By WOODcraft 
        }, {
            caption: welcomeMessage,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✨ Join Our Update Channel ✨', url: 'https://t.me/Opleech_WD' }, // Replace with your channel link
                    ],
                    [
                        { text: '✉️ টপিক গ্রুপ জয়েন করুন ✉️', url: 'https://t.me/+XfmrBSzTyRFlZTI9' } // Replace with your second channel link
                    ]
                ]
            }
        });
    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
});

// @SudoR2spr By WOODcraft
bot.on('chat_join_request', async (ctx) => {
    const { from, chat } = ctx.update.chat_join_request;

    try {
        // @SudoR2spr By WOODcraft
        await ctx.telegram.approveChatJoinRequest(chat.id, from.id);

        // @SudoR2spr By WOODcraft
        const messageText = `🎉 Congratulations [${from.first_name}](tg://user?id=${from.id}),\n\ 🥰 Your request to join the channel \n\✨ "${chat.title}" \n\✅ Has been accepted!`;

        // @SudoR2spr By WOODcraft
        await ctx.telegram.sendPhoto(from.id, {
            source: 'angelLogo/join-acceptd.jpg'  // Ensure this path is correct
        }, {
            caption: messageText,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🍁 Join our Update Channel 🍁', url: 'https://t.me/Opleech_WD' }]
                ]
            }
        });

        console.log(`Approved join request for user: ${from.username || from.id} in channel: ${chat.title}`);
    } catch (error) {
        console.error(`Failed to accept join request for ${from.id}:`, error);
    }
});

// @SudoR2spr By WOODcraft
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
