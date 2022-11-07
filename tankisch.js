var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#1a1a2d',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', 'assets/tilemaps/tiles/drawtiles-spaced.png');
    this.load.image('car', 'assets/sprites/car90.png');
    this.load.tilemapCSV('map', 'assets/tilemaps/csv/grid.csv');
}

function isColiding 
    (r1x,r1y,r1w,r1h,
    r2x,r2y,r2w,r2h) {
    
    if (r1x + r1w >= r2x &&     // r1 right edge past r2 left
  r1x <= r2x + r2w &&       // r1 left edge past r2 right
  r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
  r1y <= r2y + r2h) {       // r1 bottom edge past r2 top
    return true;
}
return false;

}

function update () {
    let coliding = isColiding(this.player.x, this.player.y, 32, 32,
            112, 48, 32, 32)

    console.log(coliding);
    //console.log("x: "+ this.player.x + " y: " + this.player.y)
}

function create ()
{
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    var layer = map.createLayer(0, tileset, 0, 0);

    this.player = this.add.image(32+16, 32+16, 'car');
    let player = this.player;

    let speed = 4;

    //  Left
    this.input.keyboard.on('keydown-A', function (event) {


        var tile = layer.getTileAtWorldXY(player.x - 16 - speed, player.y, true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x -= speed;
            player.angle = 180;
        }

    });

    //  Right
    this.input.keyboard.on('keydown-D', function (event) {

        var tile = layer.getTileAtWorldXY(player.x + 16 , player.y, true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x += speed;
            player.angle = 0;
        }

    });

    //  Up
    this.input.keyboard.on('keydown-W', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y - 16 - speed , true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y -= speed;
            player.angle = -90;
        }

    });

    //  Down
    this.input.keyboard.on('keydown-S', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y + 16 , true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y += speed;
            player.angle = 90;
        }

    });

}
