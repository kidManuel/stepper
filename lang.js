var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 10;

var totalCharacters = 100;
var characterSize = 100;
var currentRow = 0;
var itemsPerRow = 25;
var totalRows = 6;
var lineHeight = 40; //not really chaaracter size?
var dashSize = 10;
var margins = 150;

var overlapChance = 0.3;
var dashChance = 0.4;
var linebreakChance = 0.06;

var pos = {
    x: 0,
    y: 0
}

function setWidth(w) {
    canvas.width = w
}

function setHeight(h) {
    canvas.height = h
}

function stepper(times) {
    pos.x += margins;
    pos.y = (characterSize / 2) + margins;
    //setting size
    setWidth(margins * 2 + itemsPerRow * characterSize + lineHeight * itemsPerRow);
    setHeight(4000); //BUGGYYYY ((margins * 2 + totalRows * characterSize + lineHeight * totalRows));

    for (var i = 0; i < times; i++) {
        ctx.lineWidth = 2;
        if (i % itemsPerRow === 0 && i > 0) {
            linebreak();
        }
        //at least one step
        getStep();
        //allow superposition
        if (Math.random() <= overlapChance) {
            pos.x -= characterSize;
            getStep();
            pos.x -= characterSize;
            getStep();
        }
        //letter separation line
        if (Math.random() <= dashChance) {
            pos.x+=dashSize
        } else {
            line(pos.x, pos.y, pos.x + dashSize, pos.y);
        }
        //multiple characterSize thing
        if (Math.random() >= 0.85 && currentRow!== 0) {
            ctx.beginPath()
            ctx.moveTo(pos.x-lineHeight/2, botY()-characterSize/2);
            ctx.lineTo(pos.x-lineHeight/2, topY()-margins);
            ctx.stroke();
        }

        //random linebreak
        if (Math.random() <= linebreakChance) {
            linebreak();
        }  
    }
}

function linebreak() {
    pos.y += characterSize / 2 + margins;
    pos.x = margins;
    currentRow++
}

function line(ax, ay, bx, by) {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    pos.x = bx;
    pos.y = by;
}

function getStep() {
    elements[Math.floor(Math.random() * elements.length)]();
}

function topY() {
    return pos.y - characterSize / 2;
}

function botY() {
    return pos.y + characterSize / 2
}

var elements = [
    function() {
        //SQUARE
        ctx.strokeRect(pos.x, topY(), characterSize, characterSize);
        pos.x += characterSize;
    },
    function() {
        //CIRCLE
        ctx.beginPath();
        ctx.arc(pos.x + characterSize / 2, pos.y, characterSize / 2, 0, 2 * Math.PI);
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        //TRIANGLE RIGHT
        ctx.beginPath();
        ctx.moveTo(pos.x, topY());
        ctx.lineTo(pos.x, botY());
        ctx.lineTo(pos.x + characterSize, pos.y);
        ctx.closePath();
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        //TRIANGLE LEFT
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + characterSize, topY());
        ctx.lineTo(pos.x + characterSize, botY());
        ctx.closePath();
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        //BROKEN DIAMOND
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + characterSize / 2, topY());
        ctx.moveTo(pos.x + characterSize, pos.y);
        ctx.lineTo(pos.x + characterSize / 2, botY());
        ctx.closePath();
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        // DIAMOND
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + characterSize / 2, topY());
        ctx.lineTo(pos.x + characterSize, pos.y);
        ctx.lineTo(pos.x + characterSize / 2, botY());
        ctx.closePath();
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        // |
        ctx.beginPath()
        ctx.moveTo(pos.x + characterSize / 2, topY());
        ctx.lineTo(pos.x + characterSize / 2, botY());
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        //FAKE FUNCTION (??)
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x, topY());
        ctx.lineTo(pos.x + characterSize, botY());
        ctx.lineTo(pos.x + characterSize, pos.y);
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        //SMALL CIRCLE
        ctx.beginPath();
        ctx.arc(pos.x + characterSize / 2, pos.y, characterSize / 5, 0, 2 * Math.PI);
        ctx.stroke();
        pos.x += characterSize;
    },
    function(){
    	//SUPERCIRCLE CIRCLE
    	ctx.beginPath();
    	ctx.arc(pos.x+characterSize/2,pos.y,characterSize/1.2,0,2*Math.PI);
    	ctx.stroke();
    	pos.x += characterSize;
    },
    function() {
        //DOT
        ctx.beginPath();
        ctx.arc(pos.x + characterSize / 2, pos.y, characterSize / 9, 0, 2 * Math.PI);
        ctx.fill();
        pos.x += characterSize;
    },
    function() {
        // = 
        ctx.beginPath();
        ctx.moveTo(pos.x, topY() + characterSize / 3);
        ctx.lineTo(pos.x + characterSize, topY() + characterSize / 3),
            ctx.moveTo(pos.x, botY() - characterSize / 3);
        ctx.lineTo(pos.x + characterSize, botY() - characterSize / 3);
        ctx.stroke();
        pos.x += characterSize;
    },
    function() {
        //ACCENT CIRCLE
        ctx.beginPath();
        ctx.arc(pos.x + characterSize / 2, topY(), characterSize / 9, 0, 2 * Math.PI);
        ctx.stroke();
        pos.x += characterSize;
    }

]


stepper(totalCharacters);
