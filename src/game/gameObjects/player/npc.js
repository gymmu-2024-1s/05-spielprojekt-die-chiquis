import Phaser from "phaser"

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  hp = 10
  maxHp = 100
  #speed = 100
  stepsLeft = 60
  move = "left"

  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)
  }

  /**
   * Setze die Geschwindigkeit des Spielers. Kann nicht grösser als 960 sein, da
   * der Spieler sonst durch die Spielobjekte geht. Kann auch nicht kleiner als
   * 0 sein.
   *
   * @param {integer} value Die Geschwindigkeit der Spielers.
   */
  set speed(value) {
    this.#speed = Math.min(value, 960)
    this.#speed = Math.max(0, this.#speed)
  }

  /** Geschwindigkeit des Spielers. */
  get speed() {
    return this.#speed
  }

  update() {
    const { body } = this
    let isIdle = true

    this.stepsLeft--
    if (this.stepsLeft <= 0) {
      this.move = getRandomDirection()
      this.stepsLeft = 60 + Math.floor(Math.random() * 60)
    }

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (this.move === "left") {
      body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (this.move === "right") {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    if (this.move === "up") {
      body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true)
      isIdle = false
    }
    if (this.move === "down") {
      body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true)
      isIdle = false
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }
  }

  heal(value) {
    if (value == null) value = 0
    this.hp = this.hp + value
    if (this.hp > this.maxHp) {
      this.hp = this.mapHp
    }
  }
}

function getRandomDirection() {
  const r = Math.floor(4 * Math.random())
  switch (r) {
    case 0:
      return "left"
    case 1:
      return "right"
    case 2:
      return "up"
    case 3:
      return "down"
    default:
      return "idle"
  }
}
