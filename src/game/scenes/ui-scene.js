import EVENTS from "../events"

export default class UIScene extends Phaser.Scene {
  hpElement = null
  hpValue = 0

  constructor() {
    super({ key: "ui-scene", active: true })
  }

  create() {
    this.hpElement = this.add.text(this.cameras.main.width, 0, "HP: --", {
      color: "#00ff00",
      align: "right",
    })
    this.hpElement.setOrigin(1, 0)

    // Hiermit erstellen wir einen `Emitter`, der für die Kommunikation über
    // verschiedene Szenen verwendet werden kann.
    // Wir müssen einen Namen angeben, die Funktion die ausgeführt werden soll,
    // und der Kontext (also auf welchem Objekt der Emitter arbeitet).
    const emitter = EVENTS.on("update-hp", this.updateHp, this)

    // Wir rufen den Emitter hier einmal auf, damit die Lebenspunkte von Anfang
    // an richtig angezeigt werden.
    emitter.emit("update-hp")
  }

  updateHp(value) {
    this.hpValue = value
    this.hpElement.setText(`HP: ${this.hpValue}`)
  }
}
