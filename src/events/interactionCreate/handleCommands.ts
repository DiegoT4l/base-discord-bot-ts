module.exports = async (client: any, interaction: any) => {
    const getLocalCommands = require('../../utils/getLocalCommands');

    const { devs, serverId } = require('../../../config.json');

    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const command = localCommands.find((cmd: any) => cmd.name === interaction.commandName);

        if (!command) return;

        if (command.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                return interaction.reply({
                    content: 'Only developers can use this command.',
                    ephemeral: true
                });
            }
        }

        if (command.testOnly) {
            if (!(interaction.guild.id === serverId)) {
                return interaction.reply({
                    content: 'This command cannot be ran here.',
                    ephemeral: true
                });
            }
        }

        if (command.permissionsRequired?.length) {
            for (const permission of command.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    return interaction.reply({
                        content: `You need the \`${permission}\` permission to use this command.`,
                        ephemeral: true
                    });
                }
            }
        }

        if (command.botPermissions?.length) {
            for (const permission of command.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    return interaction.reply({
                        content: `I need the \`${permission}\` permission to use this command.`,
                        ephemeral: true
                    });
                }
            }
        }

        await command.execute(client, interaction);
    } catch (error) {
        throw new Error(`There was an error executing the command ${interaction.commandName}: ${error}`);
    }
};