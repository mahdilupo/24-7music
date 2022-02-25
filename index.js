const { TOKEN, CHANNEL_ID, SERVER_ID, YT_LINK } = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const keepAlive = require("./server");
const status = require("./status");


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity('on pcGamers' , { type: 'PLAYING' });
  const voiceChannel = client.channels.cache.get(CHANNEL_ID)
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            const stream = ytdl(YT_LINK[Math.floor(Math.random() * YT_LINK.length)], { filter: "audioonly" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                
            })
        }

        play(connection)
    })
})

setInterval(async function() {
  if(!client.voice.connections.get(SERVER_ID)) {
    const voiceChannel = client.channels.cache.get(CHANNEL_ID)
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            const stream = ytdl(YT_LINK[Math.floor(Math.random() * YT_LINK.length)], { filter: "audioonly" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                
            })
        }

        play(connection)
    })
  }
}, 2000)

keepAlive();

client.login(process.env.TOKEN)
