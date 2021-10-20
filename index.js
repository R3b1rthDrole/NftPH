const Discord = require('discord.js');
const client = new Discord.Client();

const webhook = new Discord.WebhookClient('900396560444174426', 'aLTfjsupznHsu6y5OkBRlqVQ3Fbw2I3oNX7q5V2XgbrB-Fbj-187IUb_fpfeLta7DYHR');

require('dotenv').config()

var number = process.env.NUMBER/*195*/;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(() => {
    let chan = client.channels.get('900342444510543932')
    chan.send(`.nft ph ${number}`);

    const filter = m => (m.author.id != client.user.id);
    const collector = chan.createMessageCollector(filter, { time: 5000 });

    console.log(" ")

    collector.on('collect', collect => {
        

        let text = collect.embeds[0].description.split('\n')
        if (text[0] === '```Looks like the NFT ID is not minted yet.``` ') return console.log(`#${number} non minté.`);
        let imageUrl = collect.embeds[0].image.url
        let attributes = parseInt(text[2].replace(/\D+/g, ''))
        let rarityText = text[25].replace(/^\D+/g, '')
        rarityText = rarityText.replace('```', '')
        rarityText = rarityText.replace(':', '')
        rarityText = rarityText.replace('%', '')
        let rarity = parseFloat(rarityText)
        let priceText = text[26]
        let price;
        let link;
        if (priceText !== '**Not listed for sale on PaintSwap.**') {
            link = priceText.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
            link = link.toString().replace(')', '')
            priceText = priceText.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi, '')
            priceText = priceText.replace(/\D+/g, '')
            price = parseFloat(priceText)
        } else {
            price = null
        }
        console.log(`PortalHead: #${number}\nAttributes: ${attributes}\nRarity: ${rarity}\nPrice: ${price}\nLink: ${link}`)
    
        if (rarity <= process.env.RARITY /*2*/ && price <= process.env.PRICE /*250*/ && price !== null) {
            let embed = new Discord.RichEmbed()
                .setTitle(`PortalHead #${number}`)
                .setURL(link)
                .setColor('#00ff00')
                .setImage(imageUrl)
                .setDescription(`\`\`\`PortalHead: #${number}\nRareté: ${rarity}\nPrix: ${price}\`\`\``)
            
            if (price <= 150 || rarity <= 1) {
                embed.setColor('#ff0000')
            }
            webhook.send('PortalHead trouvé ! @everyone', embed)
            .catch(console.error);
        } else return
    });

    collector.on('end', collected => {
        number++
    });

    }, 7500);

});

/*client.on('message', msg => {
    
});*/

client.login(process.env.TOKEN);