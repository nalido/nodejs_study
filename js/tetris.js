var map = eval("[" + Array(23).join("0x801,") + "0xfff]");

var tatris = [[0x6600], 
[0x2222, 0xf00], [0xc600, 0x2640],	[0x6c00, 0x4620], 
[0x4460, 0x2e0, 0x6220, 0x740], [0x2260, 0x0e20, 0x6440, 0x4700], [0x2620, 0x720, 0x2320, 0x2700]];

var keycom = {"38":"rotate(1)", "40":"down()", "37":"move(2,1)", "39":"move(0.5, -1)"};

var dia, pos, bak, run, next;


var score = 0;
var scoreNO1 = 0;
var his = alasql("SELECT * FROM history;");
if(his.length>0) scoreNO1 = parseInt(his[0]['NNo1']);
$('#score').html("最高分：" + scoreNO1 + "<br/>本局得分：" + score);

next = tatris[~~(Math.random()*7)];
nexts = 0;
function start(){
	dia = next;
	var ss = nexts;

	next = tatris[~~(Math.random()*7)];
	nexts = ~~(Math.random()*next.length);
	var a = next[nexts].toString(2);
	var b = "0000000000000000";
	var len = 16 - a.length;
	a = b.substr(0, len) + a; //make up 16 bits;

	a = a.substr(0,4) + "<br/>" + a.substr(4, 4) + "<br/>" + a.substr(8, 4) + "<br/>" + a.substr(12, 4);
	a = a.replace(/1/g, "\u2752").replace(/0/g, "<back>\u2752</back>");
	$('#next').html(a);

	bak = pos = {fk:[], y:0, x:4, s:ss};
	rotate(0);
}

function over(){
	document.onkeydown = null;
	clearInterval(run);
	alert("GAME OVER");
}

function update(t){
	bak = {fk:pos.fk.slice(0), y:pos.y, x:pos.x, s:pos.s};

	if(t) return;
	for(var i=0, a2=''; i<22; i++){
		a2 += map[i].toString(2).slice(1, -1) + "<br/>";
	}
	//$('#info').html(a2);

	for(var i=0, n; i<4; i++){
		if(/([^0]+)/.test(bak.fk[i].toString(2).replace(/1/g, "\u2752")))
			a2 = a2.substr(0, n=(bak.y+i+1)*15-RegExp.$_.length-4) + RegExp.$1 + a2.slice(n+RegExp.$1.length);
		//document.getElementById("box").innerHTML = a2.replace(/1/g, "\u25a0").replace(/0/g, "\u3000");
		var content = a2.replace(/1/g, "\u2752").replace(/0/g, "<back>\u2752</back>");
		$('#box').html(content);
	}
}

function is(){
	for(var i=0; i<4; i++){
		if((pos.fk[i]&map[pos.y+i]) != 0) return pos=bak;
	}
}

function rotate(r){
	var f = dia[pos.s=(pos.s+r)%dia.length];
	for(var i=0; i<4; i++){
		pos.fk[i] = (f>>(12-i*4)&15) << pos.x;
	}
	update(is());
}

function down(){
	++pos.y;
	if(is()){
		var gets = 0;
		var g = 0;
		for(var i=0; i<4 && pos.y+i<22; i++){
			if((map[pos.y+i] |= pos.fk[i]) == 0xfff){
				map.splice(pos.y+i, 1);
				map.unshift(0x801);
				gets += 10*(g++) + 10;
			}
		}
		score += gets;
		if(score>scoreNO1) {
			scoreNO1 = score;
			alasql("UPDATE history SET NNo1=" + scoreNO1 + ";");
		}
		$('#score').html("最高分：" + scoreNO1 + "<br/>本局得分：" + score);

		if(map[1] != 0x801){
			return over();
		} 
		start();
	}
	update();
}

function move(t, k){
	pos.x += k;
	for(var i=0; i<4; i++){
		pos.fk[i] *= t;
	}
	update(is());
}

document.onkeydown = function(e){
	eval(keycom[(e?e:event).keyCode]);
};

start();
run = setInterval("down()", 500);

var ispause = 0;
function pause(){
	ispause = 1 - ispause;
	if(ispause) {
		clearInterval(run);
		$("#pause").text("恢复");
	}
	else {
		run = setInterval("down()", 500);
		$("#pause").text("暂停");
	}
}