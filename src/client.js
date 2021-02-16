const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const colors = require('colors');
const flaxoosConfig = require('./clientOptions.json');
client.config = flaxoosConfig;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./src/events', (error, files) => { 
    console.log(colors.green(`[Sheepy | Eventos]:`)+ ` Carregando ao total de ${files.length} eventos.`)
    if(error) return console.error(colors.green(`[Sheepy | Eventos] : `)+ `Erro ao ler diretorio ./events `+error) && process.exit();
    files.forEach(file => { 
        const eventFile = require(`./events/${file}`);
        const eventFileName = file.split(".")[0];
        console.log(colors.green(`[Sheepy | Eventos] : `)+ `Carregando evento ${eventFileName}`);
        client.on(eventFileName, eventFile.bind(null, client));
    });
});

fs.readdir('./src/commands', (error, files) => { 
    console.log(colors.green(`[Sheepy | Comandos]:`)+ ` Carregando ao total de ${files.length} commandos`);
    if(error) return console.error(colors.green(`[Sheepy | Comandos] : `)+ `Erro ao ler diretorio ./commands: `+error) && process.exit();
    let commandFile = files.filter(file => file.split(".").pop() === 'js');
    if(!commandFile || commandFile.length <= 0) return console.error(colors.green(`[Sheepy | Commands]: `)+ `Não está sendo carregado nenhum comando.`);
    commandFile.forEach((file, i) => { 
        let props = require(`./commands/${file}`)
        client.commands.set(props.help.name, props)
        if(props.help.aliases && Array.isArray(props.help.aliases)) {
            props.help.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name)
            })
        }
    })
});
client.login(client.config.TOKEN)