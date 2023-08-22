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
import { register } from 'vue-advanced-chat'
import * as timers from "timers";
register()

export default {
  data() {
    return {
      currentUserId: '1234',
      rooms: [
        {
          roomId: '1',
          roomName: 'Le Voleur',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            { _id: '1234', username: 'John Doe' },
            { _id: '4321', username: 'John Snow' }
          ]
        }
      ],
      messages: [],
      messagesVoleur: [
        "Salut hackeur, envoie-moi le code pour déverrouiller la porte. Le nom du patron est Martin Dupont.",
        "Parfait, c'était ça",
        "Qu'est-ce que tu as fait, sérieux ? Tu veux que je me fasse arrêter ou quoi ? Donne-moi le bon code maintenant, sinon j'appelle la police.",
        "Maintenant, il faut que tu modifies le propriétaire de la tesla noire et tu la mets à mon nom."
      ],
      messagesLoaded: false
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

      if (message.content === '1986-04-26' || message.content === '26-04-1986') {
        this.addNewMessage(1, 2000)

        this.addNewMessage(3, 3000)
      } else {
        this.addNewMessage(2, 2000)

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
    }
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
