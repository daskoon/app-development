require('dotenv').config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { exec } = require('child_process');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = process.env.DISCORD_TOKEN;
const ALLOWED_USER_ID = process.env.ALLOWED_USER_ID;
const GUILD_ID = process.env.GUILD_ID;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Skoonbot is ready to bridge.');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (!ALLOWED_USER_ID || !GUILD_ID) {
        console.log('--- CONFIGURATION ASSISTANT ---');
        console.log(`User ID: ${message.author.id}`);
        console.log(`Guild ID: ${message.guildId}`);
        console.log('-------------------------------');
        
        if (!ALLOWED_USER_ID) {
            return message.reply(`Hey! I need to be locked down. Your User ID is \`${message.author.id}\`. Add it to \`.env\` as \`ALLOWED_USER_ID\`.`);
        }
    }

    if (message.author.id !== ALLOWED_USER_ID) return;
    if (GUILD_ID && message.guildId !== GUILD_ID) return;

    const content = message.content.trim();

    if (content === '!ping') {
        return message.reply('Pong! Skoonbot is alive and vibing.');
    }

    if (content === '!status') {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        return message.reply(`Skoonbot Status:\n- Uptime: ${hours}h ${minutes}m\n- Platform: ${process.platform}\n- Directory: ${process.cwd()}\n- Vibe: Immaculate`);
    }

    if (content === '!snap') {
        try {
            const imgPath = path.join(__dirname, 'screenshot.png');
            await screenshot({ filename: imgPath });
            const attachment = new AttachmentBuilder(imgPath);
            await message.reply({ files: [attachment] });
            fs.unlinkSync(imgPath);
        } catch (err) {
            console.error(err);
            message.reply(`Failed to take screenshot: ${err.message}`);
        }
    }

    if (content.startsWith('!cmd ')) {
        const cmd = content.slice(5);
        message.channel.sendTyping();
        
        exec(cmd, (error, stdout, stderr) => {
            let output = '';
            if (error) output += `Error: ${error.message}\n`;
            if (stderr) output += `Stderr: ${stderr}\n`;
            if (stdout) output += stdout;

            if (!output.trim()) output = 'Command executed with no output.';

            if (output.length > 1900) {
                const truncated = output.slice(0, 1900) + '\n... (truncated)';
                message.reply(`\`\`\`\n${truncated}\n\`\`\``);
            } else {
                message.reply(`\`\`\`\n${output}\n\`\`\``);
            }
        });
        return;
    }

    // --- GEMINI BRIDGE ---
    if (!content.startsWith('!')) {
        message.channel.sendTyping();
        console.log(`[Discord -> Gemini]: ${content}`);

        // We wrap the content in quotes to handle spaces/special chars
        const safeContent = content.replace(/"/g, '\\"');
        exec(`gemini "${safeContent}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Gemini Error: ${error.message}`);
                return message.reply(`Gemini Error: ${error.message}`);
            }
            
            const response = stdout || stderr || "Gemini returned no output.";
            console.log(`[Gemini -> Discord]: ${response.substring(0, 50)}...`);

            if (response.length > 1900) {
                message.reply(response.slice(0, 1900) + "...");
            } else {
                message.reply(response);
            }
        });
    }
});

client.login(TOKEN).catch(err => {
    console.error('Failed to login:', err);
});
