require('dotenv').config({path:'./config/dev.env'})
const {Client}=require('discord.js')
const client= new Client()
const botToken=process.env.DISCORD_BOT_TOKEN
const PREFIX="$"

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`)
})

client.on('message',async (message)=>{
    try{
        // console.log(`${message.author.tag} sents : ${message.content}`)
        if(message.author.bot) return 
        if(message.content==='hello' || message.content==='hello'){
            message.channel.send(`Hello ${message.author.username}`)
        }
        if(message.content.startsWith(PREFIX)){
            const [CMD_NAME,...args]=message.content.trim().substring(PREFIX.length).split(/\s+/)
            if(CMD_NAME==='kick'){
                if(!message.member.hasPermission('KICK_MEMBERS')){
                    return message.reply('You do not have permissions to use that command')
                }
                if(args.length===0){
                    return message.reply('Provide id')
                }
                const member = message.guild.members.cache.get(args[0])
                if(member){
                    console.log('Kicking member')
                    member.kick().then((member)=>{
                        message.channel.send(`${member} was kicked`)
                    }).catch(err=>{
                        message.channel.send(`I am not able to kick ${member} out :()`)
                    })
                }else{
                    message.channel.send('Member not availabel or the member is offline')
                }
            }else if(CMD_NAME === 'ban'){
                if(!message.member.hasPermission('KICK_MEMBERS')){
                    return message.reply('You do not have permissions to use that command')
                }
                if(args.length===0){
                    return message.reply('Provide id')
                }
                try{
                    const user=await message.guild.members.ban(args[0])
                    message.channel.send(`${user} was banned successfully`)
                }catch(e){
                    message.channel.send(`I am not able to ban ${user}`)
                }
            }
        }
    }catch(e){
        console.log('Error : ',e)
    }
})

client.login(botToken)

