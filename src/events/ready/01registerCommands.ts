const getLocalCommands = require('../../utils/getLocalCommands')
const getApplicationCommands = require('../../utils/getApplicationCommands')
const areCommandsDifferent = require('../../utils/areCommandsDifferent')
const { serverId } = require('../../../config.json');

module.exports = async (client: object) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(
            client,
            serverId
        );

        for (const command of localCommands) {
            const { name, description, options } = command;

            const existingCommand = await applicationCommands.cache.find(
                (cmd: any) => cmd.name === name
            );

            if (existingCommand) {
                if (command.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`🧹 Deleted command: ${name}`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, command)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`✏️ Edited command: ${name}`);
                }
            } else {
                if (command.deleted) {
                    console.log(`⏭️ Skipping registering command "${name}" as it is set to delete.`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`✅ Registered command "${name}"`);
            }
        }
    } catch (error) {
        throw new Error(`Error registering commands: ${error}`);
    }
};