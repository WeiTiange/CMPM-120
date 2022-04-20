class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio("sfx_select","assets/MenuSelect.wav");
        this.load.audio("sfx_explosion","assets/Hit.wav");
        this.load.audio("sfx_rocket","assets/Shot.wav");
        this.load.audio("sfx_ocean", "assets/Ocean.wav");
        this.load.image("background", "assets/Background.jpg");
    }

    create() {
        var bgm = this.sound.add("sfx_ocean", {volume: 0.1});
        bgm.loop = true;
        bgm.play();
        this.background = this.add.tileSprite(0 ,0 ,640 ,480 ,"background").setOrigin(0,0);

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "35px",
            // backgroundColor: "Blue",
            color: "White",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding - 50, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, "P1:Use (←)(→) arrows to move\n(↑) to fire\nP2: Use (A)(D) to move\n(Space) to fire", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 50, "Press (←) for Novice\nor (→) for Expert", menuConfig).setOrigin(0.5);

        // define keys
        keyLEFTMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHTMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(keyLEFTMenu)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHTMenu)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
    }
}