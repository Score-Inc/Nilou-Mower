import { CommandInteraction, EmbedBuilder, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import segs from '../db/sexo.json';
import Logger from './Logger';
const c = new Logger(`verificationMessages`);

const sexoRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('sexo-button')
            .setLabel('???')
            .setStyle(ButtonStyle.Success)
    );

export default async function run(interaction: CommandInteraction, specify?: string) {
    segs.forEach((v, idx, arr) => {
        if (specify) return;

        const embed = new EmbedBuilder();
        embed
            .setTitle(v.title)
            .setURL(v.url)
            .setDescription(v.description)
            .setColor(v.color)
            .setAuthor(v.author)
            .setThumbnail(v.thumbnail.url)
            .setImage(v.image.url)
            .setFields(v.fields)
            .setFooter(v.footer)
            ;
        (interaction.client.channels.cache.get('1040988062789939262') as TextChannel).send({
            embeds: [embed],
            components: (idx == arr.length - 1) ? [sexoRow] : []
        });
    });
}