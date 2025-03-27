import Phaser from "phaser"
import Mushroom from "../gameObjects/pickups/mushroom"
import Flower from "../gameObjects/pickups/flower"
import Cave from "../gameObjects/doors/cave"
import Player from "../gameObjects/player/player"
import NPC from "../gameObjects/player/npc"

/**
 * Erweiterung einer Phaser.Scene mit praktischen Funktionen um Spielobjekte
 * automatisch zu erstellen.
 */
export default class Base2DScene extends Phaser.Scene {
  map = null
  tiles = null
  obstacles = null
  items = null
  doors = null
  npcs = null
  player = null
  text = null

  /**
   * Erstellt eine Instanz einer Phaser.Szene.
   *
   * @param {*} options Optionen die an eine Szene übergeben werden können.
   */
  constructor(options) {
    super(options)
  }

  /**
   * Hier werden alle Spiel-Objekte erstellt.
   *
   * Diese Methode lädt alle Elemente von der Karte und platziert die Elemente
   * korrekt im Spielfeld. Es wird hier auch festgelegt was passiert wenn eine
   * Kollision von 2 Elementen passiert. Also das einige Elemente blockieren und
   * andere können aufgesammelt werden.
   *
   * Auch die Kamera wird eingestellt.
   *
   * @param {*} mapKey Welche Karte soll für diese Szene verwendet werden. Die
   * Karte muss zuerst in der preload-Methode geladen werden, der Name der dort
   * verwendet wurde, muss auch hier verwendet werden.
   */
  create(mapKey) {
    this.items = this.add.group()
    this.doors = this.add.group()
    this.npcs = this.add.group()
    this.loadMap(mapKey)
    this.createCamera()
    this.setupDefaultCollisions()

    // In dieser Scene werden Lebenspunkte und andere Dinge angezeigt.
    this.scene.bringToTop("ui-scene")

    // Wird verwendet um weitere Spielinformationen an den Entwickler zu geben.
    this.scene.bringToTop("debug-scene")
  }

  /**
   * Diese Methode lädt die Spielkarte für eine Szene.
   *
   * Die Methode wird direkt aus der `create`-Methode aufgerufen, da ist bereits
   * beschrieben was alles erstellt wird.
   *
   * @param {*} mapKey Name der Karte die erstellt werden soll. Siehe auch hier
   * die `create`-Methode.
   */
  loadMap(mapKey) {
    // Erstellt die Karte so wie sie in `mapKey` definiert ist.
    this.map = this.make.tilemap({ key: mapKey })

    // Verwendet die Kacheln von "tileset" so wie es in **Tiled** verwendet wird.
    this.tiles = this.map.addTilesetImage("tileset")

    // Erstellt den "Background" Layer
    this.map.createLayer("Background", this.tiles, 0, 0)

    // Erstellt den "Obstacles" Layer. Hier kann der Spieler nicht durchlaufen.
    this.obstacles = this.map.createLayer("Obstacles", this.tiles, 0, 0)

    // Erstelle die einzelnen Objekte auf der Karte
    this.createMapObjects()

    // Erstelle die Türen
    this.createObjects(this.map, "Doors", "Cave", Cave, this.doors)

    // Erstelle die Gegner
    this.createObjects(this.map, "SpawnPoints", "NPC", NPC, this.npcs)

    // Erstelle den Spieler
    this.player = this.createSingleObject(
      this.map,
      "SpawnPoints",
      "SpawnPlayer",
      Player,
    )
  }

  createMapObjects() {
    this.createObjects(this.map, "Items", "Mushroom", Mushroom, this.items)
    this.createObjects(this.map, "Items", "Flower", Flower, this.items)
  }

  createCamera() {
    this.cameras.main.setSize(640, 480)
    this.cameras.main.startFollow(this.player)
  }

  setupDefaultCollisions() {
    this.obstacles.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player, this.obstacles)
    this.physics.add.collider(
      this.npcs,
      this.obstacles,
      this.npcCollideObstacles,
      () => true,
      this,
    )
    this.physics.add.collider(this.npcs, this.doors)
    this.physics.add.overlap(
      this.player,
      this.items,
      this.pickUp,
      () => true,
      this,
    )

    this.physics.add.collider(
      this.player,
      this.doors,
      this.enterDoor,
      () => true,
      this,
    )
  }

  npcCollideObstacles(npc, obstacle) {
    if (npc == null) return
    npc.move = "idle"
  }

  /**
   * Diese Methode wird immer dann aufgerufen, wenn der Spieler eine
   * überscheidung mit einem Spielobjekt hat, das aufgenommen werden kann. Wir
   * können hier bestimmen was in einem solchen fall passieren sollte. Die
   * Parameter werden von Phaser in die Methode eingefügt, da haben wir keine
   * direkte kontrolle darüber.
   *
   * Um die Funktionalität dieser Methode zu ändern, muss Sie in der
   * abgeleiteten Klasse überschrieben werden. Standartmässig wird einfach das
   * Objekt zerstörrt, mit dem eine kollision stattfindet.
   *
   * @param {*} actor Der Spieler der mit dem Objekt überschneidet.
   * @param {*} item Das Objekt mit dem der Spieler eine überschneitung hat.
   */
  pickUp(actor, item) {
    item.destroy()
  }

  /**
   * Diese Methode wird immer dann aufgerufen, wenn ein Spieler mit einer Türe
   * kollidiert. Die Methode funktioniert sehr ähnlich wie `pickUp`.
   *
   * Standartmässig sollte eine Türe den Spieler in eine andere Szene bringen.
   * Die Szene zu der ein Spieler gebracht wird, ist auf der Türe selber
   * definiert und wird in **Tiled** gesetzt.
   */
  enterDoor(actor, door) {
    const { goToWorld, needKey } = door.props
    if (goToWorld == null) return
    if (needKey == null) {
      this.scene.start(goToWorld)
      return
    }

    if (actor.keys[needKey] > 0) {
      this.scene.start(goToWorld)
      return
    }
  }

  update() {
    // Updates for the game loop
    if (this.player) this.player.update()
    if (this.npcs) {
      this.npcs.children.entries.forEach((npc) => {
        npc.update()
      })
    }
  }

  /**
   * Erstelle ein Spielobjekt an der Stelle des SpawnPoints auf der Karte.
   *
   * Diese Funktion wird verwendet um einzelne Objekte zu erstellen, wie zum
   * Beispiel den Spieler, oder einen Endgegner, sowie Spielobjekte die nur
   * einmal vorkommen.
   *
   * @param {*} map Die Karte in der das Spielobjekt definiert wurde.
   * @param {String} objectLayer Der Name des Layers in dem das Spielobjekt definiert wurde.
   * @param {String} objectName Der Name des Objekts, so wie es in der Karte
   * erstellt wurde (z.B. "SpawnPlayer").
   * @param {*} objectClass Die Klasse mit dem das neue Objekt erstellt werden
   * soll (z.B. Player).
   */
  createSingleObject(map, objectLayer, objectName, objectClass) {
    const spawnPoint = map.findObject(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    return new objectClass(this, spawnPoint.x, spawnPoint.y)
  }

  /**
   * Erstelle alle Objekte aus einem Layer der Karte, mit einem bestimmten Typ.
   * Diese Funktion wird benötigt um Spielobjekte zu erstellen, mit denen ein
   * Spieler interagieren kann. Also Gegenstände die man aufsammeln kann, oder
   * auch Türen durch die man läuft.
   *
   * Diese Objekte bekommen noch die `Custom Properties` aus Tiled übergeben. So
   * können verschiedene Eigenschaften auf den Objekten gestezt werden. So
   * können zum Beispiel die Pilze verschieden viel Schaden anrichten. Man kann
   * auf Türen auch einstellen in welche Welt man gehen möchte.
   *
   * @param {*} map Die Karte in der das Spielobjekt definiert wurde.
   * @param {String} objectLayer Der Name des Layers in dem das Spielobjekt definiert wurde.
   * @param {String} objectName Der Name des Objekts, so wie es in der Karte
   * erstellt wurde (z.B. "Mushroom").
   * @param {*} objectClass Die Klasse mit dem das neue Objekt erstellt werden
   * soll (z.B. Mushroom).
   * @param {*} targetGroup Die Gruppe zu der ein Objekt hinzugefügt wird. Die
   * Gruppe wird gebraucht um auf kollision mit einem weiteren Objekt zu prüfen.
   */
  createObjects(map, objectLayer, objectName, objectClass, targetGroup) {
    const objects = map.filterObjects(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    if (objects != null) {
      objects.forEach((obj) => {
        targetGroup.add(new objectClass(this, obj.x, obj.y, obj.properties))
      })
    }
  }
}
