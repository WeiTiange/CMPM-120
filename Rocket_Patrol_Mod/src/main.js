let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyFireP1, keyFireP2, keyR, keyLEFTMenu, keyRIGHTMenu, keyLEFTP1, keyRIGHTP1, keyLEFTP2, keyRIGHTP2;