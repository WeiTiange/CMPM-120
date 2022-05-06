// Jim Whitehead, based on Movement Studies by Nathan Altice
// Updated: 5/1/2022
// Phaser 3 Texture Atlas plus movement dust cloud particle system
// Concepts: Arcade physics, texture atlas animation, particle systems
// The example atlas is commercial and should not be used for your own projects 
// Source: https://www.pinterest.com/pin/700802392005070604/ (but this is likely ripped from a game)

// Interpret JavaScript strictly (see: https://www.w3schools.com/js/js_strict.asp)
// Helps with not using undeclared variables
'use strict';

// global variables
let cursors;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    scene: [ Load, Movement ]
};

let game = new Phaser.Game(config);