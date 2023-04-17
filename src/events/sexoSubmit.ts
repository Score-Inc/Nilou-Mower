import { ModalSubmitInteraction, RoleManager, GuildMemberRoleManager } from "discord.js";
import crypto from 'crypto';
import config from '../config.json';
import Logger from '../util/Logger';
const c = new Logger('modalSubmit');

export default async function verify(interaction: ModalSubmitInteraction) {
    const password = config.password_segs; // You're hopeless if you checked here for the password.
    const hash = crypto.createHash('md5');
    const sexoRole = (interaction.guild?.roles as RoleManager).cache.get('1033770469410742331');
    const input = interaction.fields.getTextInputValue('sexo-input');
    const hashedInput = hash.update(input).digest('hex');

    if (hashedInput === password) {
        c.trail(`Verified successfully`);
        if (sexoRole) {
            (interaction.member?.roles as GuildMemberRoleManager).add(sexoRole);
            interaction.reply({
                content: `Welcome to segs`,
                ephemeral: true,
            });
        }
    } else {
        c.trail(`Incorrect password: ${input} | ${hashedInput} != ${password}`);
        interaction.reply({
            content: `Incorrect password.`,
            ephemeral: true,
        });
        return;
    }
}