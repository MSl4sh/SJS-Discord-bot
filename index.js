const Discord = require("discord.js");
const { fstat } = require("fs");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

Client.on("guildMemberAdd", member => {

    Client.channels.cache.get("777197804393070593").send("<@" + member.id + "> est arrivé(e).");

});

function permission(message) {
    return message.member.roles.cache.some(role => role.name === 'Administrateur') ||
        message.member.roles.cache.some(role => role.name === 'Modérateurs') ||
        message.member.roles.cache.some(role => role.name === 'Supers Modérateurs (sous-admin)') ||
        message.member.roles.cache.some(role => role.name === 'Modérateurs en test')

}

function supression(message) {
    message.delete()

}


const prefix = "!"
Client.on('messageCreate', message => {

    if (message.author.bot) return;

    else if (message.content === prefix + "ping") {

        message.reply("Pong !\nQu'est-ce qu'on s'amuse...:expressionless:")

    }

    else if (message.content === prefix + "noping") {

        message.reply("https://i.imgur.com/3cFx1kH.gif")

    }

    else if (message.content === prefix + "salut" || message.content === prefix + "bonjour") {

        var random = Math.floor(Math.random() * 10) + 1;

        switch (random) {
            case 1: message.reply("Yo!"); break;
            case 2: message.reply("Bien le bonjour !"); break;
            case 3: message.reply("Hey!"); break;
            case 4: message.reply("Salut!"); break;
            case 5: message.reply("Ça boum ?"); break;
            case 6: message.reply("Salut toi !"); break;
            case 7: message.reply("Bonjour toi !"); break;
            case 8: message.reply("Hello !"); break;
            case 9: message.reply('Wesh! Bien ou bien ?'); break;
            case 10: message.reply('Hello toi!'); break;

        };

    }

    else if (message.content === prefix + "help") {

        if (permission(message)) {
            const embed = new Discord.MessageEmbed()

                .setColor('#03c0ff')
                .setTitle("Liste des commandes:")
                .setDescription("Vous y trouverez la liste des commandes de SJS.")
                .setThumbnail("https://zupimages.net/up/22/21/22or.png")
                .addField(prefix + "help", "\n\nAffiche la liste des commandes.")
                .addField(`${prefix}salut ou ${prefix}bonjour`, "SJS vous saluera en retour.")
                .addField(prefix + "kick + user: raison", "Kick la personne ciblée du server.\nExemple: !kick @user : raison")
                .addField(prefix + "ban + user: raison", "Banni la personne ciblée du server.\nExemple : !ban @user : raison")
                .addField(prefix + "clear + nombre", "Supprime les derniers messages postés dans le channel concerné.\nExemple : !clear 3 (supprimera les 3 derniers message du channel).")
                .addField(prefix + "rules.accept", 'Permet aux nouveaux venus de valider les règles et leur attribue le rôle "membre". ')
                .addField(prefix + "ping", 'SJS vous répondra "Pong !".')
                .addField(prefix + "noping", 'SJS poste le GIF de désactivation des @ping')
                
                
                


            message.channel.send({ embeds: [embed] });
        }
    }

    else if (message.content === prefix + "rules.accept") {

        if (!message.member.roles.cache.some(role => role.name === 'Membre')) {
            message.reply("Règles validées ! \nTu as reçu le rôle Membre, tu peux maintenant accèder aux salons.")
                .then(msg => {
                    msg.delete({ timeout: 6000 })
                })

            message.member.roles.add("777193714077794335");




        }
        else {
            message.reply("Tu as déjà validé les règles !")
                .then(msg => {
                    setTimeout(() => supression(msg), 6000)
                })




        }
        setTimeout(() => supression(message), 6000)



    }

    else if (message.content.startsWith(`${prefix}kick`)) {


        var member = message.mentions.members.first();
        var raison = message.content.split(":")

        if (permission(message)) {

            if (!message.mentions.members.first()) return message.reply("vous n'avez pas mentionné d'utilisateur à kick!").then(msg => {
                setTimeout(() => supression(msg), 5000)
            })


            member.kick();

            message.channel.send(`${member.displayName} a été kick!\nDu balai ! :broom:`)
                .then(msg => {
                    setTimeout(() => supression(msg), 6000)
                })
            const modlog = new Discord.MessageEmbed()

                .setColor('#03c0ff')
                .setTitle("___Kick___")
                .setDescription("Un membre a été kick:")
                .addField("Par:", message.member.displayName + " ")
                .addField("Membre:", member.displayName + " ")
                .addField("Raison:", raison[1] + " ")
                .setTimestamp();





            Client.channels.cache.get("777200441825689640").send({ embeds: [modlog] });
        }

        else {
            message.reply("Vous ne pouvez pas executer cette commande !")
                .then(msg => {
                    setTimeout(() => supression(msg), 6000)
                })
        }
        setTimeout(() => supression(message), 6000)
    }

    else if (message.content.startsWith(`${prefix}ban`)) {


        var raison = message.content.split(":")
        var member = message.mentions.members.first();


        if (permission(message)) {
            if (!message.mentions.members.first()) return message.reply("vous n'avez pas mentionné d'utilisateur à banir !").then(msg => {
                setTimeout(() => supression(msg), 5000)
            })


            member.ban()
            message.channel.send(`${member.displayName} a été banni!\nSalut mon pote ! :poop: :toilet:`);
            const modlog = new Discord.MessageEmbed()

                .setColor('#03c0ff')
                .setTitle("___Ban___")
                .setDescription("Un membre à été Banni:")
                .addField("Par:", message.member.displayName + " ")
                .addField("Membre:", member.displayName + " ")
                .addField("Raison:", raison[1] + " ")
                .setTimestamp();



            Client.channels.cache.get("777200441825689640").send({ embeds: [modlog] });
        }

        else {
            message.reply("Vous ne pouvez pas executer cette commande !")
                .then(msg => {
                    setTimeout(() => supression(msg), 5000)
                })
        }
        setTimeout(() => supression(message), 5000)
    }

    else if (message.content.startsWith(`${prefix}clear`)) {
        
        


        if (permission(message)) {
            var args = message.content.split(" ")

                if (args[1]) {
                    if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

                        message.delete()
                        message.channel.bulkDelete(args[1])
                        
                        
                        

                        message.channel.send(`${args[1]} messages ont été supprimés!`)
                        

                            


                    }
                    else if (isNaN(args[1])) {
                        message.channel.send("Veuillez renseigner un nombre entre 1 et 99.")
                    
                        
                    }

                }
                else {
                    message.channel.send("Veuillez renseigner les nombre de messages à supprimer!")
                }





        }


    }



});


// Messages embed





// Message de connection SJS
Client.on('ready', () => {
    console.log("SJS est fonctionnel")
});

Client.login("LOGIN TOKEN")