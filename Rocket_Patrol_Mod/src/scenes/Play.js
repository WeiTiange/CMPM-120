class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("Net_P1", "assets/Fishing Net_P1.png");
        this.load.image("Net_P2", "assets/Fishing Net_P2.png");
        this.load.image("normalFish", "assets/Fish_Red.png");
        this.load.image("fastFish","assets/Fish_Green.png");
        this.load.image("background", "assets/Background.jpg");
        this.load.spritesheet("explosion", "assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image("bubble", "assets/bubble.png");
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "background").setOrigin(0, 0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        // Define Keys
        keyFireP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyFireP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFTP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHTP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFTP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHTP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // Add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2 + 75, game.config.height - borderUISize - borderPadding, keyLEFTP1, keyRIGHTP1, keyFireP1, "Net_P1").setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width / 2 - 75, game.config.height - borderUISize - borderPadding, keyLEFTP2, keyRIGHTP2, keyFireP2, "Net_P2").setOrigin(0.5, 0);
        
        // Add spaceships (x3)
        
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 3, game.settings.spaceshipSpeed, "normalFish", 0, 30).setOrigin(0, 0);
        
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, game.settings.spaceshipSpeed + 2, "fastFish", 0, 40).setOrigin(0, 0);
        
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, game.settings.spaceshipSpeed, "normalFish", 0, 10).setOrigin(0, 0);
        
        this.ship04 = new Spaceship(this, game.config.width, borderUISize * 1 + borderPadding * 1, game.settings.spaceshipSpeed, "normalFish", 0, 5).setOrigin(0, 0);
        
        
        // Animatin config
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        
        // Initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        
        
        // Display score
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "35px",
            // backgroundColor: "#F3B141",
            color: "Pink",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.bubbleL = this.add.image(borderUISize + borderPadding + 50, borderUISize + borderPadding * 2 + 20, "bubble");
        this.bubbleL.setScale(0.2);
        this.bubbleR = this.add.image(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth + 50, borderUISize + borderPadding * 2 + 20, "bubble"); 
        this.bubbleR.setScale(0.2);

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        scoreConfig.color = "Cyan";
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, borderUISize + borderPadding * 2, this.p2Score, scoreConfig);
        // Game over Flag
        this.gameOver = false;

        // 60-second timer
        scoreConfig.fixedWidth = 0;
        scoreConfig.color = "White";
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2 - 20, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 44, "Press (R) to Restart\nor ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (!this.gameOver) {
            // this.starfield.tilePositionX -= 4;
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

// --------------------------------------------------------------------------
        // check player1 collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship04);
        }

        if (this.checkCollision(this.p1Rocket, this. ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }

        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
        }

        // check player2 collisions
        if (this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship04);
        }

        if (this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship03);
        }

        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship02);
        }

        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship01);
        }
// ---------------------------------------------------------------------------

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFTP1)) {
            this.scene.start("menuScene");
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(rocket, ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");             // play explode animation
        boom.on("animationcomplete", () => {    // callback after anmi completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // Score add and repaint
        if (rocket == this.p1Rocket) {
            this.p1Score += ship.points;
        } 
        if (rocket == this.p2Rocket) {
            this.p2Score += ship.points;
        }

        this.scoreLeft.text = this.p1Score;
        this.scoreRight.text = this.p2Score;
        this.sound.play("sfx_explosion");

    }
}
