const getLocalCommands = require('../../utils/getLocalCommands')
const getApplicationCommands = require('../../utils/getApplicationCommands')
const { serverId } = require('../../../config.json');

module.exports = async (client: object) => {

    try {
        const localCommands = getLocalCommands();
        const applicationCommands = getApplicationCommands(client, serverId);

        for (const command of localCommands) {
            const { name, description, options } = command;

            const existingCommand = await applicationCommands.cache.find(
                (cmd: any) => cmd.name === name
            );

            if (existingCommand) {
                if (command.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command: ${name}`);
                    break;
                }

                
            }
        }
    } catch (error) {
        throw new Error(`Error registering commands: ${error}`);
    }
};