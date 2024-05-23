module.exports = {
    deleted: false,
    name: 'ping',
    description: 'Replies with the bot ping!',

    execute: async (client: any, interaction: any) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply(`🏓 Pong! Client \`${ping}ms\` || WebSocket \`${client.ws.ping}ms\``);
    },
}