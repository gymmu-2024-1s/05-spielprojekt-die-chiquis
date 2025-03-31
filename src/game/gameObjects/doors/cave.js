import StaticObject from "../staticObject"

export default class Cave extends StaticObject {
  constructor(scene, x, y, properties) {
    super(scene, x, y, "doors", "cave", properties)

    this.setOrigin(0, 0)
    this.setSize(32, 4)
  }
}
