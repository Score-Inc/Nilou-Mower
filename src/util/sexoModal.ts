import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from 'discord.js';

const modal = new ModalBuilder()
    .setCustomId('sexo-modal')
    .setTitle('???')

const passwordInput = new TextInputBuilder()
    .setCustomId('sexo-input')
    .setLabel('???')
    .setPlaceholder('Enter ???')
    .setStyle(TextInputStyle.Short)

const row = new ActionRowBuilder<TextInputBuilder>().addComponents(passwordInput)
modal.addComponents(row)

export default modal;