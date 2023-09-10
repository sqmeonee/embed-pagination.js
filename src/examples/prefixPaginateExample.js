const { EmbedBuilder } = require('discord.js');
const { prefixPaginate } = require('embed-pagination.js')

module.exports = {
    name: 'test',

    async execute (message) {
       const embed1 = new EmbedBuilder()
       .setDescription('1')

       const embed2 = new EmbedBuilder()
       .setDescription('2')

        prefixPaginate({
            message: message,
            pages: [embed1, embed2],
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