import { Client, Guild, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import Logger from "../util/Logger";
import config from '../config.json';
import starboard from "../util/starboard";
const c = new Logger("messageReactionAdd");

// #general, #general-zh, #general-other, #development, #development-zh, #plugin-dev
const WHITELISTED_CHANNELS = [1017485959694127166, 1017468534156165161, 1092859333118804018, 1092856508938731610, 1092857963057782824]

export default async function run(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, client: Client) {
    const guild: Guild | undefined = client.guilds.cache.get(`626046539134926878`);
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Fetching message failed: ', error);
            return;
        }
    }

    c.trail(`${user.tag || "???"} reacted with ${reaction.emoji}`)

    if (!user.bot && !reaction.message.author?.bot) {
        if (!reaction.count) return;

        if (reaction.emoji.name == '🔨' && reaction.count < 2 && WHITELISTED_CHANNELS.includes(Number(reaction.message.channelId)) && !reaction.message.member?.roles.cache.some(r => r.id == '978201137972912198')) {
            const msg = await reaction.message.reply({
                content: `Please read <#1028679012341534740>.`,
                allowedMentions: {
                    repliedUser: false
                },
            });
            c.log(`User ${user.tag || "???"} reacted with hammer`);
            reaction.message.react('🔨');
            setTimeout(() => {
                msg.delete();
            }, 30000);
        }
        if (reaction.emoji.name == "⭐" && reaction.message.channelId !== "1039176854478790776") {
            let reactionCount = reaction.count;
            if(reaction.message.reactions.cache.get('⭐')!.users.cache.has(reaction.message.author!.id)) reactionCount--;
            if (reactionCount !== config.starboard_threshold) return;
            starboard(reaction.message as Message);
        }
    }
}
