const { EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require('discord.js');
const prefixPaginate = require('./prefixPaginate')
const slashPaginate = require('./slashPaginate')
module.exports = { 
    slashPaginate, 
    prefixPaginate
}