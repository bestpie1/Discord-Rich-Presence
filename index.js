const RPC = require('discord-rpc')
const rpc = new RPC.Client({ transport: 'ipc' })
const { config } = require('dotenv')
config({ path: `${__dirname}/.env` })

rpc.on('ready', () => {
    console.clear()
    rpc.setActivity({
        details: process.env.Details,
        state: process.env.State,
        startTimestamp: new Date(),
        largeImageKey: process.env.LargeImage,
        largeImageText: process.env.LargeImageTooltip,
        smallImageKey: process.env.SmallImage,
        smallImageText: process.env.SmallImageTooltip,
        // buttons: [{
        //     label: process.env.Button1,
        //     url: process.env.Button1url
        // }, {
        //     label: process.env.Button2,
        //     url: process.env.Button2url
        // }]
    })
    console.log(`Current Presence (${process.env.ClientID})
State: ${process.env.State}
Details: ${process.env.Details}
Large Image: ${process.env.LargeImage}
Small Image: ${process.env.SmallImage}
Displaying Presence = True`)
})

rpc.login({ clientId: process.env.ClientID })