import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
async function run(interaction: CommandInteraction) {
    interaction.reply({
        content: `** **`,
        ephemeral: true,
        embeds: [
            {
                type: "rich",
                title: `Score Inc.`,
                description: `An official community server for the Score Inc server\n\n**Permanent Invite Link**: https://discord.gg/2TTSUZZ\n**GitHub Repository**: https://github.com/Score-Inc\n\n- Powered by [Grasscutters](https://github.com/Grasscutters)`,
                color: 0x03fc41
            }
        ]
    });
}

const cmd = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help command')

let _;
export default _ = {
    process: run,
    command: cmd
}