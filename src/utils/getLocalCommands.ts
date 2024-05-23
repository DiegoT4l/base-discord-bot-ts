const path = require('path');
const getAllFiles = require('./getAllFiles');

interface Command {
    name: string;
}

module.exports = (exceptions: string[] = []): Command[] => {
    let localCommands: Command[] = [];

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    );

    for (const category of commandCategories) {
        const commandFiles = getAllFiles(category);

        for (const file of commandFiles) {
            const command = require(file);

            if (exceptions.includes(command.name)) {
                continue;
            }
            localCommands.push(command);
        }
    }

    return localCommands;
};