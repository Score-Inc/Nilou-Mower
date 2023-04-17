/**
 * @file starboard.ts
 * @description Send a starboard message to #starboard
*/

import { Message, EmbedBuilder, TextChannel, Colors } from "discord.js";
import Logger from "./Logger";
const c = new Logger("Starboard");

export const PINNED_MESSAGES = new Map<string, Message>();

export default async function starboard(message: Message) {
    c.log(`Sending star to #starboard`);
    if (PINNED_MESSAGES.has(message.id)) {
        c.trail(`Message already pinned`);
        return;
    }
    c.trail(`${message.content} (${message.id})`);
    c.trail(`By ${message.author.tag || "???"}`);

    PINNED_MESSAGES.set(message.id, message);

    const channel = message.client.channels.cache.get("1039176854478790776") as TextChannel;
    if (!channel) return;

    const embed = new EmbedBuilder();
    embed.setTitle(`🌟 Message starred in #${await (message.channel as TextChannel).name}`)
        .setDescription(message.content)
        .setColor(Colors.Yellow)
        .setFooter({
            text: message.author?.tag || "Unknown",
            iconURL: `https://cdn.discordapp.com/avatars/${message.author?.id || 0}/${message.author?.avatar || 0}.png`
        })
        .setTimestamp(Date.now())
        .setURL(message.url);

    if (message.attachments.first()?.url) embed.setImage(message.attachments.first()!.url!)
    await channel.send({
        embeds: [embed],
        content: "** **"
    });
}