export default class DebugScene extends Phaser.Scene {
  fpsElement = null

  constructor() {
    super({ key: "debug-scene", active: true })
  }

  create() {
    this.fpsElement = this.add.text(0, 0, "FPS: --", 0xffff00)
  }

  update() {
    const fps = this.physics.world.fps
    this.fpsElement.setText(`FPS: ${fps}`)
  }
}
