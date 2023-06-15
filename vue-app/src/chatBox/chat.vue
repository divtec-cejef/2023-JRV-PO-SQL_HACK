<template>
  <div>
    <vue-advanced-chat
        height="1000px"
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
</template>

<script>
import { register } from 'vue-advanced-chat'
// import { register } from '../../vue-advanced-chat/dist/vue-advanced-chat.es.js'
register()

export default {
  data() {
    return {
      currentUserId: '1234',
      rooms: [
        {
          roomId: '1',
          roomName: 'Room 1',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            { _id: '1234', username: 'John Doe' },
            { _id: '4321', username: 'John Snow' }
          ]
        }
      ],
      messages: [],
      messagesVoleur: [
          "Salut hackeur, envoie moi le code pour déverrouiller la porte",
          "Parfait, c'était ça",
          "Qu'est-ce t'a fait t'es sérieux. Tu veux que je me fasse arrêter ou quoi. Donne moi le bon code maintenant sinon j'appelle la carine."


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
          content: this.messagesVoleur.at(),
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
      };

      if (message.content === '26-04-1986') {
        this.addNewMessage(1);
      } else {
        this.addNewMessage(2);
      }

      this.messages = [
        ...this.messages,
        newMessage
      ];

      console.log(message.content);
    },


    addNewMessage(index) {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: index,
            content: this.messagesVoleur.at(index),
            senderId: '4321',
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ]
      }, 2000)
    }
  }
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}
</style>
