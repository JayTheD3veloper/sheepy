module.exports = (client, message) => {

    if (message.author.bot) return;
  
    if(message.channel.type == 'dm') return;
    if (message.webhookID) return;
  
  
      const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
    
      const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    
      if (message.content.indexOf(client.config.prefix) !== 0) return;
      if (!cmd) return;
      cmd.run(client, message, args);
    };