import { ButtonInteraction, GuildMemberRoleManager } from "discord.js";
import sexoModal from '../util/sexoModal';
import Logger from '../util/Logger';
const c = new Logger('verification');

export default async function run(interaction: ButtonInteraction) { 
    const hasSexo = (interaction.member!.roles as GuildMemberRoleManager).cache.some(r => r.name === "sexo");

    c.log(`User ${interaction.member?.user.username || "???"}#${interaction.member?.user.discriminator || "0000"} is verifying`);
    if (hasSexo) {
        c.trail(`Already verified`);
        interaction.reply({
            content: `You're already sexo`,
            ephemeral: true,
        });
        return;
    }
    interaction.showModal(sexoModal);
}