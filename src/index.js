const { EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require('discord.js');


async function slashPaginate(interaction, options = {}) {
    try {
        if (!options.ephemeral) options.ephemeral = false;
        if(!interaction) throw new TypeError('Provide an interaction argument')
        if(!options.pages) throw new TypeError('Provide a page argument')
        if(!Array.isArray(options.pages)) throw new TypeError('Pages must be an array')
        if(!options.emojis) options.emojis = {};
        
        if(!options.emojis.beginning) options.emojis.beginning = "⏪";
        if(!options.emojis.left) options.emojis.left = "◀️";
        if(!options.emojis.none) options.emojis.none = "⏹️";
        if(!options.emojis.right) options.emojis.right = "▶️";
        if(!options.emojis.end) options.emojis.end = "⏩";
    
        if(!Array.isArray(options.pages)) throw new TypeError('Pages must be an array')

        if (!options.disable) options.disable = {};
        if (!options.disable.first_last) options.disable.first_last = false;
        if (!options.disable.placeholder) options.disable.placeholder = false;
    
        if(!options.buttonstyles) options.buttonstyles = {};
        if(!options.buttonstyles.beginning) options.buttonstyles.beginning = "Primary";
        if(!options.buttonstyles.left) options.buttonstyles.left = "Primary";
        if(!options.buttonstyles.none) options.buttonstyles.none = "Secondary";
        if(!options.buttonstyles.right) options.buttonstyles.right = "Primary";
        if(!options.buttonstyles.end) options.buttonstyles.end = "Primary";
    
        if (typeof options.ephemeral !== "boolean") throw new TypeError("Ephemeral needs to be in a boolean format")
    
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
           const page = await interaction.reply({
            embeds: options.pages,
            components: [],
            fetchReply: true,
            ephemeral: options.ephemeral
           })
    
           return page;
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
        .setEmoji(options.emojis.none)
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
    
        let buttonRow = new ActionRowBuilder().setComponents(beginning, prev, none, next, end)
        if (options.disable.placeholder == true) {
            if (options.disable.first_last == true) {
                buttonRow = buttonRow.setComponents(prev, next)
            }
            else buttonRow = buttonRow.setComponents(beginning, prev, next, end)
        }
        if (options.disable.first_last == true) {
            if (options.disable.placeholder == true) {
                buttonRow = buttonRow.setComponents(prev, next)
            }
            else buttonRow = buttonRow.setComponents(prev, none, next)
        }
        let index = 0;
    
        if (typeof options.pages[0] == 'object') {
            const obj = options.pages[index]
            if (!obj.data) {
            const embed = new EmbedBuilder()
            if (obj.color) embed.setColor(obj.color)
            if (obj.title) embed.setTitle(obj.title)
            if (obj.description) embed.setDescription(obj.description)
            if (obj.author)
            if (obj.fields) {
                if (obj.fields.length > 25) throw new Error("Embed cannot have more fields than 25")
                for (let field of obj.fields) {
                    if (field.value && !field.name || field.name && !field.value) throw new Error("Embed needs to have both field params filled out")
                    embed.addFields(
                        { name: field.name, value: field.value }
                    )}}
            if (obj.footer) {
                if (!obj.footer.text) throw new Error("Embed footer requires text param")
                if (obj.footer.icon_url) embed.setFooter({ text: obj.footer.text, icon_url: obj.footer.icon_url });
                else embed.setFooter({ text: obj.footer.text })
            }
            if (obj.author) {
                if (!obj.author.name) throw new Error("Embed author requires name param")
                if (obj.footer.icon_url) embed.setAuthor({ name: obj.author.name, iconURL: obj.author.icon_url})
                else embed.setAuthor({ name: obj.author.name })
            }
            if (obj.thumbnail) {
                    embed.setThumbnail(obj.thumbnail)
            }
            if (obj.image) {
                embed.setImage(obj.image)
            }
            if (obj.timestamp) {
                if (obj.timestamp == true) embed.setTimestamp();
            }
            options.pages[index] = embed;
            }
        }
    
        const currentPage = await interaction.reply({
            embeds: [options.pages[index]],
            components: [buttonRow],
            fetchReply: true,
            ephemeral: options.ephemeral
        })
    
        const collector = await currentPage.createMessageComponentCollector({
            componentType: ComponentType.Button,
        })
    
        collector.on('collect', async (i) => {
            if (i.user.id !== interaction.user.id) return await i.reply({ content: 'You can\'t use these buttons', ephemeral: true})
    
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
    
            if (typeof options.pages[index] == 'object') {
                const obj = options.pages[index]
                    if (!obj.data){
                        const embed = new EmbedBuilder()
                        if (obj.color) embed.setColor(obj.color)
                        if (obj.title) embed.setTitle(obj.title)
                        if (obj.description) embed.setDescription(obj.description)
                        if (obj.fields) {
                            if (obj.fields.length > 25) throw new Error("Embed cannot have more fields than 25")
                            for (let field of obj.fields) {
                                if (field.value && !field.name || field.name && !field.value) throw new Error("Embed needs to have both field params filled out")
                                embed.addFields(
                                    { name: field.name, value: field.value }
                                )}}
                        if (obj.footer) {
                            if (!obj.footer.text) throw new Error("Embed footer requires text param")
                            if (obj.footer.icon_url) embed.setFooter({ text: obj.footer.text, icon_url: obj.footer.icon_url });
                            else embed.setFooter({ text: obj.footer.text })
                        }
                        if (obj.author) {
                            if (!obj.author.name) throw new Error("Embed author requires name param")
                            if (obj.footer.icon_url) embed.setAuthor({ name: obj.author.name, iconURL: obj.author.icon_url})
                            else embed.setAuthor({ name: obj.author.name })
                        }
                        if (obj.thumbnail) {
                                embed.setThumbnail(obj.thumbnail)
                        }
                        if (obj.image) {
                            embed.setImage(obj.image)
                        }
                        if (obj.timestamp) {
                            if (obj.timestamp == true) embed.setTimestamp();
                        }
                        options.pages[index] = embed;
                    }   
            }
    
            await i.update({
                embeds: [options.pages[index]],
                components: [buttonRow],
            })
    
        })
    } catch (err) {
        console.log(err)
        return interaction.reply({ content: "There was an error executing this command", ephemeral: true })
    }
}


module.exports = { 
    slashPaginate, //regular slash command pagination

    // F O R E V E R  P A G I N A T I O N
    // F O R E V E R  P A G I N A T I O N
    // F O R E V E R  P A G I N A T I O N
    // F O R E V E R  P A G I N A T I O N

    slashPaginateForever: async function (interaction, options = {}) {
        try {
            if (!options.ephemeral) options.ephemeral = false;
            if(!interaction) throw new TypeError('Provide an interaction argument')
            if(!options.pages) throw new TypeError('Provide a page argument')
            if(!Array.isArray(options.pages)) throw new TypeError('Pages must be an array')
            if(!options.emojis) options.emojis = {};
            
            if(!options.emojis.left) options.emojis.left = "◀️";
            if(!options.emojis.none) options.emojis.none = "⏹️";
            if(!options.emojis.right) options.emojis.right = "▶️";
        
            if(!Array.isArray(options.pages)) throw new TypeError('Pages must be an array')
    
            if (!options.disable) options.disable = {};
            if (!options.disable.placeholder) options.disable.placeholder = false;
        
            if(!options.buttonstyles) options.buttonstyles = {};
            if(!options.buttonstyles.left) options.buttonstyles.left = "Primary";
            if(!options.buttonstyles.none) options.buttonstyles.none = "Secondary";
            if(!options.buttonstyles.right) options.buttonstyles.right = "Primary";
        
            if (typeof options.ephemeral !== "boolean") throw new TypeError("Ephemeral needs to be in a boolean format")
        
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
        
            if (options.pages.length === 1) {
               const page = await interaction.reply({
                embeds: options.pages,
                components: [],
                fetchReply: true,
                ephemeral: options.ephemeral
               })
        
               return page;
            }
        
            const prev = new ButtonBuilder()
            .setCustomId('prev')
            .setEmoji(options.emojis.left)
            .setStyle(options.buttonstyles.left)
        
            const none = new ButtonBuilder()
            .setCustomId('none')
            .setEmoji(options.emojis.none)
            .setStyle(options.buttonstyles.none)
            .setDisabled(true)
        
            const next = new ButtonBuilder()
            .setCustomId('next')
            .setEmoji(options.emojis.right)
            .setStyle(options.buttonstyles.right)
        
            let buttonRow = new ActionRowBuilder().setComponents(prev, none, next)
            if (options.disable.placeholder == true) buttonRow = buttonRow.setComponents(prev, next);

            const pages = options.pages
            let index = 0;
        
            if (typeof options.pages[0] == 'object') {
                const obj = options.pages[0]
                if (!obj.data) {
                const embed = new EmbedBuilder()
                if (obj.color) embed.setColor(obj.color)
                if (obj.title) embed.setTitle(obj.title)
                if (obj.description) embed.setDescription(obj.description)
                if (obj.author)
                if (obj.fields) {
                    if (obj.fields.length > 25) throw new Error("Embed cannot have more fields than 25")
                    for (let field of obj.fields) {
                        if (field.value && !field.name || field.name && !field.value) throw new Error("Embed needs to have both field params filled out")
                        embed.addFields(
                            { name: field.name, value: field.value }
                        )}}
                if (obj.footer) {
                    if (!obj.footer.text) throw new Error("Embed footer requires text param")
                    if (obj.footer.icon_url) embed.setFooter({ text: obj.footer.text, icon_url: obj.footer.icon_url });
                    else embed.setFooter({ text: obj.footer.text })
                }
                if (obj.author) {
                    if (!obj.author.name) throw new Error("Embed author requires name param")
                    if (obj.footer.icon_url) embed.setAuthor({ name: obj.author.name, iconURL: obj.author.icon_url})
                    else embed.setAuthor({ name: obj.author.name })
                }
                if (obj.thumbnail) {
                        embed.setThumbnail(obj.thumbnail)
                }
                if (obj.image) {
                    embed.setImage(obj.image)
                }
                if (obj.timestamp) {
                    if (obj.timestamp == true) embed.setTimestamp();
                }
                options.pages[index] = embed;
                }
            }
        
            const currentPage = await interaction.reply({
                embeds: [options.pages[index]],
                components: [buttonRow],
                fetchReply: true,
                ephemeral: options.ephemeral
            })
        
            const collector = await currentPage.createMessageComponentCollector({
                componentType: ComponentType.Button,
            })
        
            collector.on('collect', async (i) => {
                if (i.user.id !== interaction.user.id) return await i.reply({ content: 'You can\'t use these buttons', ephemeral: true})
                
                if(i.customId == 'prev') {
                    index--;
                } else if(i.customId == 'next') {
                    index++;
                }

                if (index > pages.length - 1) index = 0;
                if (index < 0) index = pages.length - 1;

                if (typeof options.pages[0] == 'object') {
                    const obj = options.pages[0]
                        if (!obj.data){
                            const embed = new EmbedBuilder()
                            if (obj.color) embed.setColor(obj.color)
                            if (obj.title) embed.setTitle(obj.title)
                            if (obj.description) embed.setDescription(obj.description)
                            if (obj.fields) {
                                if (obj.fields.length > 25) throw new Error("Embed cannot have more fields than 25")
                                for (let field of obj.fields) {
                                    if (field.value && !field.name || field.name && !field.value) throw new Error("Embed needs to have both field params filled out")
                                    embed.addFields(
                                        { name: field.name, value: field.value }
                                    )}}
                            if (obj.footer) {
                                if (!obj.footer.text) throw new Error("Embed footer requires text param")
                                if (obj.footer.icon_url) embed.setFooter({ text: obj.footer.text, icon_url: obj.footer.icon_url });
                                else embed.setFooter({ text: obj.footer.text })
                            }
                            if (obj.author) {
                                if (!obj.author.name) throw new Error("Embed author requires name param")
                                if (obj.footer.icon_url) embed.setAuthor({ name: obj.author.name, iconURL: obj.author.icon_url})
                                else embed.setAuthor({ name: obj.author.name })
                            }
                            if (obj.thumbnail) {
                                    embed.setThumbnail(obj.thumbnail)
                            }
                            if (obj.image) {
                                embed.setImage(obj.image)
                            }
                            if (obj.timestamp) {
                                if (obj.timestamp == true) embed.setTimestamp();
                            }
                            options.pages[index] = embed;
                        }   
                }
        
                await i.update({
                    embeds: [options.pages[index]],
                    components: [buttonRow],
                })
            })
        } catch (err) {
            console.log(err)
            return interaction.reply({ content: "There was an error executing this command!", ephemeral: true })
        }
    },

// I N T E R V A L  P A G I N A T I O N
// I N T E R V A L  P A G I N A T I O N
// I N T E R V A L  P A G I N A T I O N
// I N T E R V A L  P A G I N A T I O N

intervalPagination: async function(interaction, channelToSend, options = {}) {
    try {
        if (!options.ephemeral) options.ephemeral = false;
       
        if (!options.time) options.time = 3500;
        if (typeof options.time !== "number") throw new TypeError("Option 'time' is not of type number")
        if (options.time < 1000) throw new Error("Option 'time' needs to be above 1000 milliseconds")

        if(!interaction) throw new TypeError('Provide an interaction argument')
        if (!channelToSend) channelToSend = interaction.channel;

        if(!options.pages) throw new TypeError('Provide a page argument')
        if(!Array.isArray(options.pages)) throw new TypeError('Pages must be an array')

        //convert to embed from JSON
        for (let page of options.pages) {
            if (typeof options.pages[options.pages.indexOf(page)] == 'object') {
                const obj = options.pages[options.pages.indexOf(page)]
                if (!obj.data) {
                const embed = new EmbedBuilder()
                if (obj.color) embed.setColor(obj.color)
                if (obj.title) embed.setTitle(obj.title)
                if (obj.description) embed.setDescription(obj.description)
                if (obj.author)
                if (obj.fields) {
                    if (obj.fields.length > 25) throw new Error("Embed cannot have more fields than 25")
                    for (let field of obj.fields) {
                        if (field.value && !field.name || field.name && !field.value) throw new Error("Embed needs to have both field params filled out")
                        embed.addFields(
                            { name: field.name, value: field.value }
                        )}}
                if (obj.footer) {
                    if (!obj.footer.text) throw new Error("Embed footer requires text param")
                    if (obj.footer.icon_url) embed.setFooter({ text: obj.footer.text, icon_url: obj.footer.icon_url });
                    else embed.setFooter({ text: obj.footer.text })
                }
                if (obj.author) {
                    if (!obj.author.name) throw new Error("Embed author requires name param")
                    if (obj.footer.icon_url) embed.setAuthor({ name: obj.author.name, iconURL: obj.author.icon_url})
                    else embed.setAuthor({ name: obj.author.name })
                }
                if (obj.thumbnail) {
                        embed.setThumbnail(obj.thumbnail)
                }
                if (obj.image) {
                    embed.setImage(obj.image)
                }
                if (obj.timestamp) {
                    if (obj.timestamp == true) embed.setTimestamp();
                }
                options.pages[index] = embed;
                }
            }
        }
        /////////////////////////////////////////////

        if (options.pages.length == 1) {
            if (channelToSend == "reply") {
                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply({
                        embeds: [options.pages[0]]
                    })
                } else await interaction.reply({
                    embeds: [options.pages[0]],
                    ephemeral: options.ephemeral
                })
            } else {
                await channelToSend.send({
                    embeds: [options.pages[0]]
                })
            }
            return;
        }
        let msg;
        if (channelToSend == "reply") {
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({
                    embeds: [options.pages[0]]
                })
            } else {
                await interaction.reply({
                    embeds: [options.pages[0]],
                    ephemeral: options.ephemeral
                })
            }
        } else {
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({
                    content: "..."
                })
            } else {
                await interaction.reply({ content: "...", ephemeral: true })
            }
            msg = await channelToSend.send({ 
                embeds: [options.pages[0]],
                ephemeral: options.ephemeral,
            })
        }
        setInterval( async () => {

            //looping tools
            const oldPage = options.pages.shift() //remove the page the user is on
            options.pages.push(oldPage) // put that page in the back 

            const newPage = options.pages[0];
            if (channelToSend == "reply") {
                await interaction.editReply({
                    embeds: [newPage],
                })
            } else {
                if (msg) {
                    await msg.edit({
                        embeds: [newPage]
                    })
                } else return;
            }
        }, options.time)
    } catch (err) {
        console.log(err)
        return await interaction.reply({ content: "There was an error executing this command!", ephemeral: true })
    }
}
}