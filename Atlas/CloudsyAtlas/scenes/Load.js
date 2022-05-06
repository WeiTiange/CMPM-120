class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // Load all assets here.
        // Since the asset keys can be used in any scene, can load here
        // and use in any other scene

        // Load atlas here

        this.load.image('talltrees', 'talltrees.png');
        this.load.image('ground', 'ground.png');
        this.load.image('cloud', 'white-cloud.png');

        

    }

    create() {
        // ...and pass to the next Scene
        this.scene.start('movementScene');
    }
}