<template>
  <div class="container bg-primary"
    :class="{'left-message': !isFromUserPlayer, 'right-message': isFromUserPlayer}">
    <div class="row mt-0" :style="{'background-color': getFriendlyColour(fromPlayer.colour.value)}" style="height:6px;"></div>
    <div class="row mt-0 bg-secondary" v-if="message">
      <div class="col mt-1">
        <span class="pointer" @click="onOpenPlayerDetailRequested(fromPlayer)">
          <player-icon :playerId="fromPlayer._id"/>
          <strong class="ml-2">{{fromPlayer.alias}}</strong>
        </span>
      </div>
      <div class="col-auto">
        <p class="mt-0 mb-0">
          <i class="fas fa-envelope mr-2" v-if="!userPlayerHasReadMessage"></i>
          <small><em>{{getDateString(message.sentDate)}}</em></small>
        </p>
      </div>
    </div>
    <div class="row bg-secondary mt-0">
        <div class="col">
            <p class="mt-2 mb-2">{{message.message}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import GameHelper from '../../../../services/gameHelper'
import ConversationApiService from '../../../../services/api/conversation'
import PlayerIconVue from '../../player/PlayerIcon'

export default {
  components: {
    'player-icon': PlayerIconVue
  },
  props: {
    message: Object
  },
  methods: {
    getUserPlayer () {
      return GameHelper.getUserPlayer(this.$store.state.game)
    },
    getDateString (date) {
      return GameHelper.getDateString(date)
    },
    getFriendlyColour (colour) {
      return GameHelper.getFriendlyColour(colour)
    },
    onOpenPlayerDetailRequested (player) {
      this.$emit('onOpenPlayerDetailRequested', player._id)
    }
  },
  computed: {
    isFromUserPlayer: function () {
      return this.message.fromPlayerId === this.getUserPlayer()._id
    },
    fromPlayer: function () {
      return GameHelper.getPlayerById(this.$store.state.game, this.message.fromPlayerId)
    },
    userPlayerHasReadMessage: function () {
      return this.message.readBy.find(x => this.getUserPlayer()._id === x) != null
    }
  }
}
</script>

<style scoped>
.left-message {
  width: 85%;
  margin-left:0;
}

.right-message {
  width: 85%;
  margin-right:0;
}

.pointer {
  cursor: pointer;
}
</style>
