/**
 * @file sendToLog.ts
 * @description Send an embed to #message-logs
*/

import { Client, ColorResolvable, Attachment, TextChannel, User, Colors, EmbedBuilder } from "discord.js";
import Logger from "./Logger";
const c = new Logger("sendToLog");

export default async function sendToLog(title: string, description: string, color: ColorResolvable, user: User | null, client: Client, attachments?: Attachment[]) {
    c.log(`Sending embed to #logs`);
    c.trail(title);
    c.trail(description);
    const channel = client.channels.cache.get("1021345885977853972") as TextChannel;
    if (!channel) return;
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp()
        .setFooter({ text: user?.tag || "Unknown", iconURL: user?.displayAvatarURL() })
    await channel.send({
        embeds: [embed],
        // attachments: attachments || undefined
    });
}