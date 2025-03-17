import Phaser from "phaser"
import EVENTS from "../../events"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  keys = {}
  hp = 10
  maxHp = 100
  speed = 100

  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.setControls()

    // Hier schicken wir ein Ereignis los. Phaser schnappt das auf, und führt
    // die Funktion aus, die beim Emitter von "update-hp" definiert wurde. So
    // können wir bequem über verschiedene Objekte kommunizieren.
    EVENTS.emit("update-hp", this.hp)
  }

  /**
   * Erhöhe die Geschwindigkeit des Spielers.
   *
   * Die Geschwindigkeit kann den Wert von 960 nicht übersteigen.
   *
   * @param {integer} value Die Geschwindigkeit der Spielers.
   */
  increaseSpeed(value) {
    this.speed = Math.min(this.speed + value, 960)
  }

  /**
   * Vermindere die Geschwindigkeit des Spielers.
   *
   * Die Geschwindigkeit kann den Wert 100 nicht unterschreiten.
   *
   * @param {integer} value Um welchen Wert die Geschwindigkeit vermindert
   * werden soll.
   */
  decreaseSpeed(value) {
    this.speed = Math.max(100, this.speed - value)
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update() {
    const { left, right, up, down } = this.cursor
    let isIdle = true

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (left.isDown) {
      this.body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (right.isDown) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    if (up.isDown) {
      this.body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true)
      isIdle = false
    }
    if (down.isDown) {
      this.body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true)
      isIdle = false
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }
  }

  /**
   * Heile den Spieler.
   *
   * Der Spieler wird um die angegebene Menge an HP geheilt. Das Maximum der
   * Lebenspunkte kann nicht überstiegen werden.
   *
   * @param {integer} value Die Menge an Lebenspunkten um die der Spieler
   * geheilt wird.
   */
  heal(value) {
    if (value == null) value = 0
    this.hp = this.hp + value
    if (this.hp > this.maxHp) {
      this.hp = this.mapHp
    }

    // Die Lebenspunkte des Spielers wurden verändert, also schicken wir das
    // Ereignis "update-hp" los. Das wird von einer anderen Szene aufgeschnappt,
    // und die Lebenspunkte werden angepasst. So können wir einfach mit einer
    // anderen Szene kommunizieren, ohne das wir diese kennen müssen.
    EVENTS.emit("update-hp", this.hp)
  }

  /**
   * Füge dem Spielobjekt Schaden hinzu.
   *
   * Die Lebenspunkte des Spielers werden verringert. Wenn die Lebenspunkte
   * unter 0 fallen, dann soll der Spieler sterben.
   *
   * @param {integer} value Der Schaden der dem Spieler zugefügt werden soll.
   */
  damage(value) {
    if (value == null) value = 0
    this.hp = this.hp - value
    if (this.hp <= 0) {
      // TODO: Game-Over Mechanik implementieren.
      this.hp = 0
    }

    // Gleich wie bei `heal()`
    EVENTS.emit("update-hp", this.hp)
  }

  /**
   * Fügt dem Spieler einen Schlüssel hinzu.
   *
   * Der Spieler kann verschiedene Items haben. Eine spezielle Variante von
   * Items sind Schlüssel. Der Spieler hat eine Liste von Schlüsseln. Diese
   * haben alle einen Namen. Der Name des Schlüssels wird in den
   * `customProperties` in `tiled` gesetzt. Jedesmal wenn wir einen Schlüssel
   * hinzufügen, wird die Anzahl der Schlüssel mit dem Namen ums 1 erhöht. Wenn
   * der Schlüssel noch nicht im Inventar ist, wird er auf 1 gesetzt.
   *
   * @param {string} keyName Name des Schlüssels der hinzugefügt wird.
   */
  addKey(keyName) {
    if (this.keys[keyName] == null) {
      this.keys[keyName] = 1
    } else {
      this.keys[keyName] += 1
    }

    // Kommentiere diese Zeil ein, um die Schlüssel nach einer VEränderung
    // anzuzeigen.
    // console.log(this.keys)
  }

  /**
   * Entferne einen Schlüssel mit speziellem Namen aus dem Inventar der Spielers.
   *
   * Für mehr Informationen zu Schlüssel und Spieler, schaue in der Methode
   * `addKey()` nach.
   *
   * Ein Schlüssel wird entfernt. Wenn der Schlüssel nicht im Inventar ist,
   * passiert nichts. Wenn die Menge an Schlüssel mit dem Namen kleiner oder
   * gleich 0 ist, wird der Eintrag entfernt.
   *
   * @param {string} keyName Name des Schlüssels.
   *
   */
  removeKey(keyName) {
    if (this.keys[keyName] == null) return
    this.keys[keyName] -= 1
    if (this.keys[keyName] <= 0) {
      this.keys[keyName] = null
    }
  }
}
