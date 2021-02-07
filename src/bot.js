require('dotenv').config({path:'./config/dev.env'})
const {Client}=require('discord.js')
const client= new Client()
const botToken=process.env.DISCORD_BOT_TOKEN

client.on('ready',()=>{
    console.log(`${client.user.tag} has loged in`)
})

client.on('message',(message)=>{
    console.log(`${message.author.tag} sents : ${message.content}`)
})

client.login(botToken)

