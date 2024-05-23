const getAllfiles = require('../utils/getAllFiles');

module.exports = (client: any) => {
    const path = require('path');

    const eventFolders = getAllfiles(path.join(__dirname, '..', 'events'), true);

    for (const folder of eventFolders) {
        const eventFiles = getAllfiles(folder);
        const eventName = folder.replace(/\\/g, '/').split('/').pop();

        eventFiles.sort((a: string, b: string) => a > b);

        client.on(eventName, async (arg: string) => {
            for (const file of eventFiles) {
                const event = require(file);
                await event(client, arg);
            }
        });
    }
};