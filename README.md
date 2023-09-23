# embed-pagination.js
Paginate embeds with ease!
## Setup
- Install the latest version of <strong>embed-pagination.js</strong>
```
npm i embed-pagination.js@latest
```
### That's pretty much it for the setup! See how easy it is?

## Making the commands
### You can easily paginate with this easy to use, yet advanced, npm package!

- <strong>Slash Commands</strong>
```js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { slashPaginate } = require('embed-pagination.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('example')
    .setDescription('example command'),

    async execute (interaction) {
       const embed1 = new EmbedBuilder()
       .setDescription('Page 1')

       const embed2 = new EmbedBuilder()
       .setDescription('Page 2')

        slashPaginate({
            interaction: interaction,
            //ephemeral: true/false (only works for slashPaginate())
            pages: [embed1, embed2], // Pagination will only work with embeds
            buttonstyles: { 

                beginning: "Danger", // Any button style is fine except for "Link"
                left: "Danger",    // Button styles include: Danger, Success, Secondary, and Primary
                none: "Secondary", // (There's also Link but Don't use that!)
                right: "Danger",
                end: "Danger"
            },
            emojis: {
                beginning: "😎", // Any emoji works! Even custom server emojis!
                start: "🆒",
                none: "🎲",
                right: "🎉",
                end: "💉"
            }
        })
    }
}
```

- <strong>Prefix Commands</strong>
⚠️ DEPRECATED IN RECENT VERSIONS, FOR WORKING VERSION REFER TO VERSION 3.2.8 ⚠️
- NO JSON SUPPORT
- NO DISABLING BUTTONS
```js
const { EmbedBuilder } = require('discord.js');
const { prefixPaginate } = require('embed-pagination.js')

module.exports = {
    name: 'example',

    async execute (message) {
       const embed1 = new EmbedBuilder()
       .setDescription('Page 1')

       const embed2 = new EmbedBuilder()
       .setDescription('Page 2')

        prefixPaginate({
            message: message,
            pages: [embed1, embed2], // Pagination will only work with embeds [PAGES GO IN ORDER FROM FIRST TO LAST]
            buttonstyles: { 
                beginning: "Danger", // Any button style is fine except for "Link"
                left: "Danger",    // Button styles include: Danger, Success, Secondary, and Primary
                none: "Secondary", // (There's also Link but Don't use that!)
                right: "Danger",
                end: "Danger"
            },
            emojis: {
                beginning: "😎", // Any emoji works! Even custom server emojis!
                start: "🆒",
                none: "🎲",
                right: "🎉",
                end: "💉"
            }
        })
    }
}
```