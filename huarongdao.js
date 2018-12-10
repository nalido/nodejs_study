var blockTypes = {
    "shu": {
        "w": 1,
        "h": 2
    },
    "heng":{
        "w": 2,
        "h": 1
    },
    "bing":{
        "w":1,
        "h":1
    },
    "cao":{
        "w": 2,
        "h": 2
    }
};

var map = [];
for(var i=0; i < 5; i ++) {
    map[i] = [0,0,0,0];
}

function Point(c, r){
    this.r = r;
    this.c = c;
}

function Block(blockType, p, target){
    this.w = blockType.w;
    this.h = blockType.h;
    this.position = p;
    this.target = target;

    // size of background
    this.bkW = 4;
    this.bkH = 5;

    this.init();
}

Block.prototype.init = function(){
    this.target.css("width", (this.w * 100) + "px");
    this.target.css("height", (this.h * 100) + "px");
    this.target.find("span").css("line-height", (this.h * 100) + "px");
    this.setPosition();
};

// set the position marks in map
Block.prototype.setPosition = function(){
    for(var i=0; i<this.h; i++){
        for(var j=0; j<this.w; j++){
            map[this.position.r-1+i][this.position.c-1+j] = 1;
        }
    }
    this.target.css("left", (this.position.c * 100 - 100) + "px");
    this.target.css("top", (this.position.r * 100 - 100) + "px");
};

// clear the position marks in map
Block.prototype.clearPosition = function() {
    for(var i=0; i<this.h; i++){
        for(var j=0; j<this.w; j++){
            map[this.position.r-1+i][this.position.c-1+j] = 0;
        }
    }
};

Block.prototype.move2NextPosition = function(r, c){
    // check possibility and next direction
    // direction: 0=>right, 1=>up, 2=>left, 3=>down
    // 1. should be neighbor block 
    dr = r - this.position.r;
    dc = c - this.position.c;
    dirct = -1;
    if(dc == -1){
        if(dr >= 0 && dr < this.h) dirct = 2;
    }
    else if(dc > -1 && dc < this.w){
        if(dr == -1) dirct = 1;
        else if(dr == this.h) dirct = 3;
    }
    else if(dc == this.w){
        if(dr > -1 && dr < this.h) dirct = 0;
    }
    if(dirct == -1) return;

    // 2. should have enough space
    var newR = 0;
    var newC = 0;
    switch(dirct){
        case 0:
            {
                c = this.position.c + this.w;
                for(var i=0; i<this.h; i++){
                    if(map[this.position.r+i-1][c-1] == 1) return;
                }
                newR = this.position.r;
                newC = this.position.c + 1;
            }
            break;
        case 1:
            {
                r = this.position.r - 1;
                for(var i=0; i<this.w; i++){
                    if(map[this.position.r-1][c+i-1] == 1) return;
                }
                newR = this.position.r - 1;
                newC = this.position.c;
            }
            break;
        case 2:
            {
                c = this.position.c - 1;
                for(var i=0; i<this.h; i++){
                    if(map[this.position.r+i-1][c-1] == 1) return;
                }
                newR = this.position.r;
                newC = this.position.c - 1;
            }
            break;
        case 3:
            {
                r = this.position.r + this.h;
                for(var i=0; i<this.w; i++){
                    if(map[this.position.r-1][c+i-1] == 1) return;
                }
                newR = this.position.r + 1;
                newC = this.position.c;
            }
            break;
    }

    // run to here, it is time to update the map
    this.clearPosition();
    this.position = new Point(newC, newR);
    this.setPosition();
};




//----------------------------data base--------------------------------------


var levelSettings = {
    "hengdaolima":
    {        
        "machao": 
        {
            "blockType": blockTypes.shu,
            "position": new Point(1, 1)
        },      
        "caocao": 
        {
            "blockType": blockTypes.cao,
            "position": new Point(2, 1)
        },      
        "huangzhon": 
        {
            "blockType": blockTypes.shu,
            "position": new Point(4, 1)
        },      
        "zhangfei": 
        {
            "blockType": blockTypes.shu,
            "position": new Point(1, 3)
        },      
        "guanyu": 
        {
            "blockType": blockTypes.heng,
            "position": new Point(2, 3)
        },      
        "zhaoyun": 
        {
            "blockType": blockTypes.shu,
            "position": new Point(4, 3)
        },      
        "bing1": 
        {
            "blockType": blockTypes.bing,
            "position": new Point(1, 5)
        },      
        "bing2": 
        {
            "blockType": blockTypes.bing,
            "position": new Point(2, 4)
        },      
        "bing3": 
        {
            "blockType": blockTypes.bing,
            "position": new Point(3, 4)
        },      
        "bing4": 
        {
            "blockType": blockTypes.bing,
            "position": new Point(4, 5)
        }
    }
}


//--------------------------begin game---------------------------------------

// get game level
var url = window.location.href;
var p = url.indexOf("level=");
var level = url.substr(p+6);
if(p == -1) level = "hengdaolima";
var levelSetting = levelSettings[level];

machao = new Block(levelSetting.machao.blockType, levelSetting.machao.position, $("#machao"));
caocao = new Block(levelSetting.caocao.blockType, levelSetting.caocao.position, $("#caocao"));
huangzhon = new Block(levelSetting.huangzhon.blockType, levelSetting.huangzhon.position, $("#huangzhon"));
zhangfei = new Block(levelSetting.zhangfei.blockType, levelSetting.zhangfei.position, $("#zhangfei"));
zhaoyun = new Block(levelSetting.zhaoyun.blockType, levelSetting.zhaoyun.position, $("#zhaoyun"));
guanyu = new Block(levelSetting.guanyu.blockType, levelSetting.guanyu.position, $("#guanyu"));
bing1 = new Block(levelSetting.bing1.blockType, levelSetting.bing1.position, $("#bing1"));
bing2 = new Block(levelSetting.bing2.blockType, levelSetting.bing2.position, $("#bing2"));
bing3 = new Block(levelSetting.bing3.blockType, levelSetting.bing3.position, $("#bing3"));
bing4 = new Block(levelSetting.bing4.blockType, levelSetting.bing4.position, $("#bing4"));

var activeBlock = null;

// init the background blocks
for(var i=0; i<5; i++){
    for(var j=0; j<4; j++){
        var block = $("<div class='unit-block-transparent' data-r='" 
                        + (i+1) + "' data-c='" + (j+1) + "'><div>");
        $(".background-block").append(block);
    }
}

$(".background-block").on("click", ".unit-block-transparent", function(){
    var posR = $(this).attr("data-r");
    var posC = $(this).attr("data-c");
    console.log("move to " + posR + ":" + posC);

    window[activeBlock].move2NextPosition(posR, posC);

    // check the game state
    if(activeBlock != "caocao") return;
    if(window["caocao"].position.r == 4 &&
        window["caocao"].position.c == 2){
        alert("congratulations!!\n game passed!!");
    }
});

$(".background-block").on("click", ".unit-block", function(){
    activeBlock = $(this).attr("id");
    console.log("select: " + activeBlock);
});






