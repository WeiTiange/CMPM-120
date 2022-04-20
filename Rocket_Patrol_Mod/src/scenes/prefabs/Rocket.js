// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, keyLEFT, keyRIGHT, keyFire, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add("sfx_rocket");
        this.keyLEFT = keyLEFT;
        this.keyRIGHT = keyRIGHT;
        this.keyFire = keyFire;
    }

    update() {
        // Left/right movement
        if(!this.isFiring) {
            if(this.keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(this.keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // Fire button
        if(Phaser.Input.Keyboard.JustDown(this.keyFire) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // If fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}