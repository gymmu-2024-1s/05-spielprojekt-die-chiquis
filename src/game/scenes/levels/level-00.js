import Base2DScene from "../base-2d-scene"

/**
 * Spiellogik für das Level00.
 */
export default class Level00 extends Base2DScene {
  constructor() {
    super({ key: "level-00" })
  }

  preload() {
    // Load the assets here
    this.load.tilemapTiledJSON(
      "map-level-00",
      "./assets/maps/map-level-00.json",
    )
  }

  create() {
    super.create("map-level-00")
  }
}
