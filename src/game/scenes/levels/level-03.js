import Base2DScene from "../base-2d-scene"

/**
 * Spiellogik für das Level03.
 */
export default class Level03 extends Base2DScene {
  constructor() {
    super({ key: "level-03" })
  }

  preload() {
    // Load the assets here
    this.load.tilemapTiledJSON(
      "map-level-03",
      "./assets/maps/map-level-03.json",
    )
  }

  create() {
    super.create("map-level-03")
  }
}
