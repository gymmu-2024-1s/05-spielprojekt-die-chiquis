import Flower from "../../gameObjects/pickups/flower"
import Mushroom from "../../gameObjects/pickups/mushroom"
import Base2DScene from "../base-2d-scene"

/**
 * Spiellogik für das Level01.
 */
export default class Level01 extends Base2DScene {
  /**
   * Der Konstuktor wird von Phaser verwendet um die Szene zu erstellen.
   */
  constructor() {
    // Damit rufen wir den Konstruktor von `Base2DScene` auf, und können
    // Optionen an die Szene übergeben. Das brauchen wir damit Phaser einen
    // Namen/Schlüssel für die Szene hat. Damit können wir später die Szene
    // wechseln, wenn wir das brauchen.
    super({ key: "level-01" })
  }

  /**
   * Hier werden alle Resourcen geladen, die spezifisch für dieses Level / diese
   * Szene benötigt werden.
   */
  preload() {
    // Lade die Karte für das aktuelle Level. Der erste Parameter ist der Name
    // unter dem die Karte gespeichert wird. Der zweite Parameter ist die
    // Kartendatei mit allen Daten drin.
    this.load.tilemapTiledJSON(
      "map-level-01",
      "./assets/maps/map-level-01.json",
    )
  }

  /**
   * Mit der Methode werden alle Spielobjekte für eine Szene erstellt.
   */
  create() {
    // Wir müssen hier die `create`-Methode der Klasse `Base2DScene` aufrufen,
    // denn dort ist bereits beschrieben wie die Spielwelt nach der Kartendatei
    // erstellt werden muss.
    super.create("map-level-01")

    // TODO: Möchten wir zusätzliche Layers von der Karte ertellen lassen, oder
    // spezifische Spielobjekte erstellen, dann können wir das hier machen.
    // Besser wäre aber die jeweiligen Methoden zu überschreiben.
  }

  /**
   * @override Hier wird die Funktionalität der Base2DScene-Klasse überschrieben.
   *
   * Diese Methode wird immer dann aufgerufen, wenn der Spieler eine
   * überscheidung mit einem Spielobjekt hat, das aufgenommen werden kann. Wir
   * können hier bestimmen was in einem solchen fall passieren sollte. Die
   * Parameter werden von Phaser in die Methode eingefügt, da haben wir keine
   * direkte kontrolle darüber.
   *
   * @param {*} actor Der Spieler der mit dem Objekt überschneidet.
   * @param {*} item Das Objekt mit dem der Spieler eine überschneitung hat.
   */
  pickUp(actor, item) {
    super.pickUp(actor, item)

    // TODO: Hier wird die Logik für Kollisionen von Spielobjekten geändert. Das
    // ist pro Level anders. Wenn eine Logik für alle Levels gelten soll, dann
    // muss dies in `Base2DScene` angepasst werden.
    if (item instanceof Flower) {
      // Das Objekt ist von der Klasse `Flower`
      this.player.addKey("level-02")
      this.player.increaseSpeed(100)
      this.player.heal(item.props.restoreHp || 0)
    } else if (item instanceof Mushroom) {
      // Das Objekt ist von der Klasse `Mushroom`
      this.player.decreaseSpeed(100)
      this.player.damage(item.props.damageHp || 0)

      // TODO: Aktivieren Sie das hier, wenn ein Effekt über eine gewisse Zeit
      // passieren soll.
      // Hier wird der Spieler halb so gross, und mit jedem Frame wird er wieder
      // normaler. Nach 3 Sekunden erreicht er seine normale Grösse.
      // this.tweens.addCounter({
      //   from: 0.5,
      //   to: 1,
      //   ease: "Linear",
      //   duration: 3000,
      //   repeat: 0,
      //   onUpdate: (tween) => {
      //     const val = tween.getValue()
      //     this.player.setScale(val)
      //   },
      // })
    }
  }
}
