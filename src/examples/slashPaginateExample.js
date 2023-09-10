// SLASH COMMAND PAGINATION
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { slashPaginate } = require('embed-pagination.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test command'),

    async execute (interaction) {
       const embed1 = new EmbedBuilder()
       .setDescription('1')

       const embed2 = new EmbedBuilder()
       .setDescription('2')

        slashPaginate({
            interaction: interaction, // required
            // ephemeral: true/false
            pages: [embed1, embed2], // required
            buttonstyles: { 

                beginning: "Danger",
                left: "Danger",
                none: "Secondary",
                right: "Danger",
                end: "Danger"
            },
            emojis: {
                beginning: "😎",
                start: "🆒",
                none: "🎲",
                right: "🎉",
                end: "💉"
            }
        })
    }
}