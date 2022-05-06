class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene');
    }

    create() {
        // variables and settings
        this.VELOCITY = 500;
        this.DRAG = 800;    // DRAG < ACCELERATION = icy slide
        this.GROUND_HEIGHT = 35;
        this.AVATAR_SCALE = 0.5;

        // set bg color
        this.cameras.main.setBackgroundColor('#666');

        // Set up animations
        // Idle left


        // Idle right


        // Run left


        // Run right



        // make ground 🏞
        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(0, game.config.height - this.GROUND_HEIGHT, 'ground').setScale(2);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);


        // make player avatar 🧍
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'link_atlas', 'idle_down_0001').setScale(this.AVATAR_SCALE);
        
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        // Add physics collider to make player stay on top of the ground
        this.physics.add.collider(this.player, this.ground);
    }

    update() {
        // check keyboard input
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-this.VELOCITY);
            //this.player.anims.play('run_left', true);

        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.VELOCITY);
            //this.player.anims.play('run_right', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown) {
            this.player.body.setVelocityX(0);
            // add code for idle animation play here:


            
        }

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.player, 0);
    }
}