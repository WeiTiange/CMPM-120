class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spaceshipSpeed,texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue; 
        this.moveSpeed = spaceshipSpeed;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // warp around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}