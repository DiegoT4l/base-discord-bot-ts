const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {

    deleted: false,
    name: 'ban',
    description: 'ban a user!!!',
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
        PermissionFlagsBits.BanMembers
    ],
    botPermissions: [
        PermissionFlagsBits.BanMembers
    ],

    execute: async (client: any, interaction: any) => {
        await interaction.reply({
            content: 'Banning user...',
            ephemeral: true,
        });
    },
}