
function create2DArray(cols, rows){
    var arr = new Array(cols);
    for(var i=0;i<arr.length;i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var totalMines = 10;

function setup(){
    canvas = createCanvas(201,201);
    windowResized();
    cols = floor(width/w);
    rows = floor(height/w);
    grid = create2DArray(cols,rows);
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j] = new Cell(i,j,w);
        }
    }

    //Pick totalMines spots
    var options = [];
    for(var n=0;n<cols;n++){
        for(var h=0;h<cols;h++){
            options.push([n,h]);
        }
    }
    for(var m=0;m<totalMines;m++){
        var index = floor(random(options.length));
        var choice = options[index];
        var k = choice[0];
        var t = choice[1];

        //Delete spot so it is no longer a option
        options.splice(index,1);
        grid[k][t].mine = true;
    }

    for(var p=0;p<cols;p++){
        for(var q=0;q<rows;q++){
            grid[p][q].countNeighbors();
        }
    }
}

function windowResized(){
    canvasX = ((windowWidth/2)-(width/2));
    canvasY = ((windowHeight/2)-(height/2));
    canvas.position(canvasX,canvasY);
    canvas.class('change');
}

function gameOver(){
  for(var p=0;p<cols;p++){
        for(var q=0;q<rows;q++){
            grid[p][q].revealed = true;
        }
    }
}

function mousePressed(){
    background(255);
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j].contains(mouseX,mouseY)){
                grid[i][j].reveal();

                if(grid[i][j].mine){
                    gameOver();
                }
            }
        }
    }
}

function draw(){
    background(255);
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].show();
        }
    }
}
