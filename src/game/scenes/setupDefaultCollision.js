setupDefaultCollisions() {
  // Definiert Kollisionen für Hindernisse (z.B. Steine, Bäume, Wände)
  this.obstacles.setCollisionByProperty({ collides: true });

  // Kollision mit dem Spieler und den Hindernissen (Stein, Baum etc.)
  this.physics.add.collider(this.player, this.obstacles, this.checkCollision, null, this);

  // Überprüft, ob der Spieler gefallen ist (z.B. über eine bestimmte Höhe)
  this.physics.world.on('worldstep', () => {
    if (this.player.body.y > 600) { // Beispielhöhe, du kannst dies anpassen
      this.gameOver(this.player);  // Wenn der Spieler zu tief gefallen ist, Game Over
    }
  });

  // Optionale Überprüfung, wenn du mehrere Feinde (NPCs) oder andere Objekte hast
  this.physics.add.collider(this.player, this.npcs, this.attackEnemy, null, this);
}