// Rocekt Patrol Mod create by Tiange Wei, 4/19/2022.
// It took me about 12 house to complete the project.

// Points breakdown:
// I created a new spaceship type (with new artwork) that's smaller, moves faster and is worth more points(the green fish)(20).
// I implemented a simultaneous two player mode. Two players can play at the same time using different key controls, Left Arrow and Right Arrow to move and Up Arrow to fire for player1, A and D to move and Spacebar to fire for player2(30).
// I redesigned the game's art work, UI, and sound to change theme of the game to a ocean fishing game(60).
// I also added a loop background music that plays both in Menu and in Play scene.

// Work Cited:
// https://www.freepik.com/free-vector/ocean-sea-underwater-background-empty-bottom_7058927.htm#query=underwater%20cartoon&position=0&from_view=search
// https://wenrexa.itch.io/cartoon-fishes
// https://www.subpng.com/png-tscq0s/download.html
// https://www.subpng.com/png-q3qcnb/
// https://mixkit.co


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
