const RPC = require('discord-rpc')
const rpc = new RPC.Client({ transport: 'ipc' })
const { config } = require('dotenv')
config({ path: `${__dirname}/.env` })

rpc.on('ready', () => {
    console.clear()
    if (!process.env.ClientID) { return console.log(`Please Enter a ClientID. Without the ClientID then this Rich Presence won't work.`) }

    //State
    if (process.env.State) { if (process.env.State.length = 1) { state = process.env.State + ' ' } else { state = process.env.State } } else { state = '  ' }
    //Details
    if (process.env.Details) { if (process.env.Details.length = 1) { details = process.env.Details + ' ' } else { details = process.env.Details } } else { details = '  ' }
    //Start/End/Enable Timestamps
    if (process.env.StartTimeEnabled === 'true') { starttimestamp = new Date(); endtimestamp = undefined } else if (process.env.StartTimeEnabled === 'false') { if (process.env.StartTimestamp === '') { starttimestamp = undefined } else { starttimestamp = process.env.StartTimestamp } if (process.env.EndTimestamp === '') { endtimestamp = undefined } else { endtimestamp = process.env.EndTimestamp } }
    //Large Image
    if (process.env.LargeImage) { largeimage = process.env.LargeImage; if (process.env.LargeImageTooltip.length == 1) { largeimagetooltip = process.env.LargeImageTooltip + ' ' } else { if (process.env.LargeImageTooltip === '') { largeimagetooltip = '  ' } else largeimagetooltip = process.env.LargeImageTooltip } }
    //Small Image
    if (process.env.SmallImage) { smallimage = process.env.SmallImage; if (process.env.SmallImage.length == 1) { smallimagetooltip = process.env.SmallImageTooltip + ' ' } else { if (process.env.SmallImageTooltip === '') { smallimagetooltip = '  ' } else smallimagetooltip = process.env.SmallImageTooltip } }
    //Buttons
    //if (process.env.Button1) { if (button1 = '') { button1label = undefined; button1url = undefined } else button1label = process.env.Button1 }

    rpc.setActivity({
        details: details,
        state: state,
        startTimestamp: starttimestamp,
        endTimestamp: endtimestamp,
        largeImageKey: largeimage,
        largeImageText: largeimagetooltip,
        smallImageKey: smallimage,
        smallImageText: smallimagetooltip,
        // buttons: [{
        //     label: undefined,
        //     url: undefined
        // }, {
        //     label: undefined,
        //     url: undefined
        // }]
    })
    console.log(`Current Presence (${process.env.ClientID})
State: ${state}
Details: ${details}
Large Image: ${largeimage}
Small Image: ${smallimage}
Displaying Rich Presence For ${rpc.user.username}#${rpc.user.discriminator}`)
})

rpc.login({ clientId: process.env.ClientID })