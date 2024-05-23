const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {

    name: 'ban',
    description: 'ban a user from the server',
    options: [
        {
            name: 'user',
            description: 'The user to ban',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    permissionsRequired: [
        PermissionFlagsBits.BanMembers,
    ],

    async execute(client: any, interaction: any) {
        await interaction.reply({
            content: 'Banning user...',
            ephemeral: true,
        });
    },
}