module.exports = {
    name: 'ping',
    description: 'Ping!',

    async execute(client: any, interaction: any) {
        await interaction.reply(`Pong! ${client.ws.ping}ms`);
    },
}