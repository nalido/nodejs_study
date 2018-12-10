//1:right -2:down -1:left 2:up
var keycom = {"38":"go(2)", "40":"go(3)", "37":"go(4)", "39":"go(1)"};
var dct = {'1':'right', '3':'down', '4':'left', '2':'up'};
var direction = 1; // right for initial
var run;
//init
var map = '00000000000000000000';
var map_r = '00000000000000000000';
for(var i = 0 ; i< 19; i++)
	map += ',' + map_r;

var snake = [];
snake.push({r:10, c:1, d:0});
snake.push({r:10, c:2, d:0});
snake.push({r:10, c:3, d:0});

var np = {};
function newPoint(){
	np.r = Math.floor(Math.random()*20);
	np.c = Math.floor(Math.random()*20);
}


function is(r, c){
	if(r<0 || c<0 || r>19 || c>19)
		return false;
	else 
		return true;
}


function over(){
	document.onkeydown = null;
	clearInterval(run);
	alert("GAME OVER");
}

function update(flag){
	if(flag){
		var cur = map.split(',');

		for(var i in snake){
			var r = snake[i].r;
			var c = snake[i].c;
			var row = cur[r];
			
			var newr = row.substr(0, c) + '1' + row.substr(c+1);
			cur[r] = newr;
			
			if(row[c]=='1') over();
		}

		//np
		{
			var r = np.r;
			var c = np.c;
			var row = cur[r];
			
			var newr = row.substr(0, c) + '1' + row.substr(c+1);
			cur[r] = newr;
		}
			

		cur = cur.join('<br/>');
		cur = cur.replace(/0/g, '<back>\u2752</back>');
		cur = cur.replace(/1/g, '\u2752');
		$('#box').html(cur);
	}
	else{
		over();
	}
}

function move(){
	var l = snake.length - 1;
	var r = snake[l].r;
	var c = snake[l].c;
	switch(direction){
		case 1: //right
			c ++;
			break;
		case 4: //left
			c --;
			break;
		case 2: //up
			r --;
			break;
		case 3: //down
			r ++;
			break;
	}
	snake.push({'r':r, 'c':c, 'd':direction});
	if(r==np.r && c==np.c){
		//eat np
		newPoint();
	}
	else
		snake.shift();

	update(is(r,c));

	var info = r + ',' + c;
	$('#next').html(info);
}

function go(drct){
	if(direction + drct == 5) return;
	else
		direction = drct;

	//$('#drct').text(dct[direction.toString()]);
}


document.onkeydown = function(e){
	eval(keycom[(e?e:event).keyCode]);
};


//start
newPoint(); //creat a np
update(1);
run = setInterval("move()", 500);



var ispause = 0;
function pause(){
	ispause = 1 - ispause;
	if(ispause) {
		clearInterval(run);
		$("#pause").text("恢复");
	}
	else {
		run = setInterval("move()", 500);
		$("#pause").text("暂停");
	}
}