
class GameHelper {
  getUserPlayer (game) {
    // The user's player will be the only player that has a user ID on the player object.
    return game.galaxy.players.find(p => p.userId)
  }

  getPlayerById (game, playerId) {
    return game.galaxy.players.find(x => x._id === playerId)
  }

  getPlayerColour (game, playerId) {
    let player = this.getPlayerById(game, playerId)

    return this.getFriendlyColour(player.colour.value)
  }

  getFriendlyColour (colour) {
    return colour.replace('0x', '#')
  }

  getStarById (game, starId) {
    return game.galaxy.stars.find(x => x._id === starId)
  }

  getStarOwningPlayer (game, star) {
    return game.galaxy.players.find(x => x._id === star.ownedByPlayerId)
  }

  getCarrierOwningPlayer (game, carrier) {
    return game.galaxy.players.find(x => x._id === carrier.ownedByPlayerId)
  }

  getCarrierOrbitingStar (game, carrier) {
    return game.galaxy.stars.find(x => x._id === carrier.orbiting)
  }

  isCarrierInTransit (carrier) {
    return carrier.orbiting == null
  }

  isCarrierInTransitToWaypoint (carrier, waypoint) {
    return this.isCarrierInTransit(carrier) 
        && carrier.inTransitFrom === waypoint.source
        && carrier.inTransitTo === waypoint.destination
  }
}

export default new GameHelper()
