<template>
  <div class="iphone-11">
    <div class="camera"></div>
    <div class="chat">
    <vue-advanced-chat
        height="500px"
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :rooms-loaded="true"
        :messages="JSON.stringify(messages)"
        :messages-loaded="messagesLoaded"
        :single-room="true"
        :show-files="false"
        :show-audio="false"
        :show-emojis="false"
        @send-message="sendMessage($event.detail[0])"
        @fetch-messages="fetchMessages($event.detail[0])"
    />
  </div>
  </div>
</template>

<script>
import { dupontPlace } from "@/DB/DataBase";
import { register } from 'vue-advanced-chat';
import avatarImage from '@/img/MicrosoftTeams-image.png';
register()

export default {
  data() {
    return {
      currentUserId: '1234',
      rooms: [
        {
          roomId: '1',
          roomName: 'John Doe',
          avatar: avatarImage,
          users: [
            { _id: '1234', username: 'John Doe' },
            { _id: '4321', username: 'John Snow' }
          ]
        }
      ],
      messages: [],
      messagesVoleur: [
        "Envoie-moi le mot de passe de l'alarme. Il me semble que c'est la date de naissance de Martin Dupont.",
        "Exact, c'était bien ça.",
        "Sérieux, qu'est-ce que tu as fait ? Tu veux vraiment que je finisse par me faire arrêter ? Donne-moi le bon code maintenant, sinon je vais me faire arrêter par la police.",
        "Commence par identifier le propriétaire d'une Tesla noire et donne-moi son nom et son prénom.",
        "Parfait, c'est bien la bonne personne.",
        "Absolument pas, je le connais.",
        "Mémorise son ID et modifie le propriétaire en mettant John Doe à sa place. Une fois terminé, envoie-moi un 'OK'.",
        "Excellent, tu as bien réussi. Maintenant je peux m'en aller avec.",
        "Si j'essaie de partir avec ça va mal finir. Alors, ne joue pas au malin et change de propriétaire."
      ],
      messagesLoaded: false,
      etape: 1,
      DupontPlace: 0
    }
  },

  methods: {
    fetchMessages() {
      setTimeout(() => {
        this.messages = [...this.addMessages(), ...this.messages]
        this.messagesLoaded = true
      })
    },

    addMessages() {
      const messages = []
      messages.push({
        _id: this.messages.length,
        content: this.messagesVoleur[0],
        senderId: '4321',
        username: 'John Doe',
        date: new Date().toDateString(),
        timestamp: new Date().toString().substring(16, 21)
      })
      return messages
    },

    sendMessage(message) {
      const newMessage = {
        _id: this.messages.length,
        content: message.content,
        senderId: this.currentUserId,
        timestamp: new Date().toString().substring(16, 21),
        date: new Date().toDateString()
      }
      if (this.etape === 1){
        if (message.content === '1986-04-26' || message.content === '26-04-1986') {
          this.addNewMessage(1)
          this.etape = this.etape+1;
          setTimeout(() =>{
            this.addNewMessage(3)
          }, 2000)
        } else {
          this.addNewMessage(2)
        }
      } else if (this.etape === 2){
        if (message.content === 'Rejome Viral') {
          this.addNewMessage(4)
          this.etape = this.etape+1;

          setTimeout(() =>{
            this.addNewMessage(6)
          }, 2000)
        } else {
          this.addNewMessage(5)
        }
      } else if (this.etape === 3) {
        if (message.content === 'OK') {
          this.DupontPlace = dupontPlace;
          console.log(this.DupontPlace + "compar")
          // Ouverture de la base de données "maBaseDeDonnees"
          let request = window.indexedDB.open("maBaseDeDonnees");

          request.onerror = (event) => {
            console.log("Erreur d'ouverture de la base de données");
          };

          request.onsuccess = (event) => {
            let db = event.target.result;
            let transaction = db.transaction(["tb_voiture"], "readonly");
            let objectStore = transaction.objectStore("tb_voiture");
            let request = objectStore.getAll();

            request.onsuccess = (event) => {
              let data = event.target.result;
              console.log(data[this.DupontPlace].proprietaire);
              if (data[this.DupontPlace].proprietaire === "John Doe") {
                this.addNewMessage(7);
                this.etape = this.etape + 1;
              } else {
                this.addNewMessage(8);
              }
            };
          };
        } else {
          this.addNewMessage(8);
        }
      }

      this.messages = [...this.messages, newMessage]

      console.log(message.content)
    },

    addNewMessage(index, timeout) {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: index,
            content: this.messagesVoleur[index],
            senderId: '4321',
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ]
      }, timeout)
    },
  }
}


</script>


<style>
.chat{
  margin-top: 50px;
}
/* Styles pour l'iPhone 11 */
.iphone-11 {
  position: relative;
  width: 300px;
  height: 600px;
  background-color: #fff;
  border: 7px solid #000;
  border-radius: 30px;
  overflow: hidden;
}

/* Barre supérieure */
.iphone-11::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 42px;
  background-color: #000;
}

.iphone-11::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 42px;
  background-color: #000;
}

/* Caméra */
.iphone-11 .camera {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
}
</style>
