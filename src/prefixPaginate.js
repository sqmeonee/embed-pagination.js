const { EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require('discord.js');

//prefix
async function prefixPaginate(options) {
    if(!options.message) throw new TypeError('Provide a message argument')
    if(!options.pages) throw new TypeError('Provide a page argument')
    if(!options.emojis) options.emojis = {};
    
    if(!options.emojis.beginning) options.emojis.beginning = "⏪";
    if(!options.emojis.left) options.emojis.left = "◀️";
    if(!options.emojis.none) options.emojis.none = "⏹️";
    if(!options.emojis.right) options.emojis.right = "▶️";
    if(!options.emojis.end) options.emojis.end = "⏩";

    if(!Array.isArray(options.pages)) throw new TypeError('Pages must be an array')

    if(!options.buttonstyles) options.buttonstyles = {};
    if(!options.buttonstyles.beginning) options.buttonstyles.beginning = "Primary";
    if(!options.buttonstyles.left) options.buttonstyles.left = "Primary";
    if(!options.buttonstyles.none) options.buttonstyles.none = "Secondary";
    if(!options.buttonstyles.right) options.buttonstyles.right = "Primary";
    if(!options.buttonstyles.end) options.buttonstyles.end = "Primary";

    if(typeof options.emojis.beginning !== 'string') throw new TypeError('Emojis need to be in a string format');
    if(typeof options.emojis.left !== 'string') throw new TypeError('Emojis need to be in a string format');
    if(typeof options.emojis.none !== 'string') throw new TypeError('Emojis need to be in a string format');
    if(typeof options.emojis.right !== 'string') throw new TypeError('Emojis need to be in a string format');
    if(typeof options.emojis.end !== 'string') throw new TypeError('Emojis need to be in a string format');

    if(options.buttonstyles.left === 'Primary') options.buttonstyles.beginning = ButtonStyle.Primary
        else if(options.buttonstyles.left === 'Secondary') options.buttonstyles.beginning = ButtonStyle.Secondary
        else if(options.buttonstyles.left === 'Danger') options.buttonstyles.beginning = ButtonStyle.Danger
        else if(options.buttonstyles.left === 'Success') options.buttonstyles.beginning = ButtonStyle.Success
        else if(options.buttonstyles.left === 'Link') throw new TypeError('Button style cannot be "Link"')
        else throw new TypeError('Give a valid ButtonStyle')

    if(options.buttonstyles.none === 'Primary') options.buttonstyles.none = ButtonStyle.Primary
        else if(options.buttonstyles.none === 'Secondary') options.buttonstyles.beginning = ButtonStyle.Secondary
        else if(options.buttonstyles.none === 'Danger') options.buttonstyles.beginning = ButtonStyle.Danger
        else if(options.buttonstyles.none === 'Success') options.buttonstyles.beginning = ButtonStyle.Success
        else if(options.buttonstyles.none === 'Link') throw new TypeError('Button style cannot be "Link"')
        else throw new TypeError('Give a valid ButtonStyle')

    if(options.buttonstyles.right === 'Primary') options.buttonstyles.beginning = ButtonStyle.Primary
        else if(options.buttonstyles.right === 'Secondary') options.buttonstyles.beginning = ButtonStyle.Secondary
        else if(options.buttonstyles.right === 'Danger') options.buttonstyles.beginning = ButtonStyle.Danger
        else if(options.buttonstyles.right === 'Success') options.buttonstyles.beginning = ButtonStyle.Success
        else if(options.buttonstyles.right === 'Link') throw new TypeError('Button style cannot be "Link"')
        else throw new TypeError('Give a valid ButtonStyle')

    if(options.buttonstyles.end === 'Primary') options.buttonstyles.beginning = ButtonStyle.Primary
        else if(options.buttonstyles.end === 'Secondary') options.buttonstyles.beginning = ButtonStyle.Secondary
        else if(options.buttonstyles.end === 'Danger') options.buttonstyles.beginning = ButtonStyle.Danger
        else if(options.buttonstyles.end === 'Success') options.buttonstyles.beginning = ButtonStyle.Success
        else if(options.buttonstyles.end === 'Link') throw new TypeError('Button style cannot be "Link"')
        else throw new TypeError('Give a valid ButtonStyle')

    if (options.pages.length === 1) {
       const page = await options.message.reply({
        embeds: options.pages,
        components: [],
        fetchReply: true
       })

       return page
    }
    const beginning = new ButtonBuilder()
    .setCustomId('beginning')
    .setEmoji(options.emojis.beginning)
    .setStyle(options.buttonstyles.beginning)
    .setDisabled(true)

    const prev = new ButtonBuilder()
    .setCustomId('prev')
    .setEmoji(options.emojis.left)
    .setStyle(options.buttonstyles.left)
    .setDisabled(true)

    const none = new ButtonBuilder()
    .setCustomId('none')
    .setEmoji('⏹️')
    .setStyle(options.buttonstyles.none)
    .setDisabled(true)

    const next = new ButtonBuilder()
    .setCustomId('next')
    .setEmoji(options.emojis.right)
    .setStyle(options.buttonstyles.right)

    const end = new ButtonBuilder()
    .setCustomId('end')
    .setEmoji(options.emojis.end)
    .setStyle(options.buttonstyles.end)

    const buttonRow = new ActionRowBuilder().addComponents(beginning, prev, none, next, end)
    let index = 0;

    const currentPage = await options.message.reply({
        embeds: [options.pages[index]],
        components: [buttonRow],
        fetchReply: true
    })

    const collector = await currentPage.createMessageComponentCollector({
        componentType: ComponentType.Button,
    })

    collector.on('collect', async (i) => {
        if (i.user.id !== options.message.author.id) return await i.reply({ content: 'You can\'t use these buttons', ephemeral: true})

        await i.deferUpdate()

        if(i.customId == 'prev') {
            if(index > 0) index--;
        } else if(i.customId == 'next') {
            if (index < options.pages.length - 1) index++;
        } else if(i.customId == 'beginning') {
            index = 0;
        } else if(i.customId == 'end') {
            index = options.pages.length - 1;
        }

        if (index == 0) prev.setDisabled(true)
        else prev.setDisabled(false)

        if (index == 0) beginning.setDisabled(true)
        else beginning.setDisabled(false)

        if (index == options.pages.length - 1) next.setDisabled(true)
        else next.setDisabled(false)

        if (index == options.pages.length - 1) end.setDisabled(true)
        else end.setDisabled(false)

        await currentPage.edit({
            embeds: [options.pages[index]],
            components: [buttonRow],
        })

    })

    collector.on('end', async (i) => {
        prev.setDisabled(true)
        none.setDisabled(true)
        next.setDisabled(true)
        await currentPage.edit({
            embeds: [options.pages[index]],
            components: [buttonRow]
        })
    })
}
module.exports = prefixPaginate