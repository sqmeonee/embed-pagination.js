# embed-pagination.js
Paginate embeds with ease!

Remember, these docs are for the latest versions, some of the code in older versions may not be used here, refer to the examples in older versions
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
- NO FOREVER PAGINATION

## How To Disable Buttons
```js
slashPaginate({
    interaction: interaction,
    pages: pages,

    disable: {
        first_last: true, // Will disable the buttons that allow u to skip to the 1st and last page
        placeholder: true // Will disable the button in the middle (It's just there for aesthetic)
        //You cannot disable the previous pg and next pg buttons because its not pagination without them lol
    }
})
```

## How to use forever pagination
```js
const { foreverPagination } = require('embed-pagination.js');

const pages = [yourEmbed, yourEmbed2, yourEmbed3]
foreverPagination.slash(interaction, { // Prefix commands unsupported
    pages: pages,
    /*
        disable: {
            placeholder: true,
        },
        ephemeral: true,

        etc.
    */
})

//This function will refer to the first page whenever it reaches the last page
```