const { ShardingManager, Shard } = require('discord.js'); 
const ShardingOptions = require('./src/shardingOptions.json');
const flaxoosManager = new ShardingManager('./src/client.js', { 
    token: ShardingOptions.TOKEN,
    totalShards: ShardingOptions.TOTALSHARDS
});

flaxoosManager.on('shardCreate', (s) => {
    console.log(`[Sheepy | ShardingManager]: Iniciando Shard[${s.id}].`);
});

flaxoosManager.spawn();