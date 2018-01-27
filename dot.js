//Not in use?

var xw = 200;
var yw = 500;
var cellSize = 10;
var minMargin = 3;
var base = 3;
var variation = 4
var lineW = 0.5;
var mx = [];
var mx2 = [];

function prep() {
    setWidth(xw * cellSize);
    setHeight(yw * cellSize);

    for (var i = 0; i < xw; i++) {
        mx[i] = [];
        mx2[i] = [];
        for (var e = 0; e < yw; e++) {
            mx[i][e] = base;
            mx2[i][e] = base;
            circle(i, e);
        }
    }
}

function circle(x, y, mx2) {
    ctx.lineWidth = lineW;
    // try {
        var here = mx2 ? mx2[x][y] : mx[x][y];
    // } catch (e) { console.log('mx2?: ' + mx2 + ' x: '+ x + ' y: ' +y) }
    var centX = (x * cellSize) + cellSize / 2;
    var centY = (y * cellSize) + cellSize / 2;
    ctx.beginPath();
    ctx.arc(centX, centY, here / 2, 0, 2 * Math.PI);
    ctx.fill();
}

function seed() {
    ctx.clearRect(0, 0, xw, yw);
    for (var i = 0; i < xw; i++) {
        for (var e = 0; e < yw; e++) {
            //averaging
            var val = 0;
            var divisors = 0;
            if (i < xw) {
                val += mx[i + 1][e];
                divisors++;
            }
            if (i > 0) {
                val += mx[i - 1][e];
                divisors++;
            }
            if (e < yw) {
                val += mx[i][e + 1];
                divisors++;
            }
            if (e > 0) {
                val += mx[i][e - 1];
                divisors++;
            }

            val /= divisors;
            val += (Math.floor(Math.random() * variation)) * (Math.random() >= 0.5 ? +1 : -1)
            mx2[i][e] = val;
            circle(i, e, true);
        }
    }
}

// prep();
