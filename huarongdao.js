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
}

function Point(x, y){
    this.x = x;
    this.y = y;
}

function Block(blockType, p){
    this.w = blockType.w;
    this.h = blockType.h;
    this.center = p;
}

machao = new Block(blockTypes.shu, new Point(50, 50));
huangzhon = new Block(blockTypes.shu, new Point(50, 50));
zhangfei = new Block(blockTypes.shu, new Point(50, 50));
zhaoyun = new Block(blockTypes.shu, new Point(50, 50));
guanyu = new Block(blockTypes.heng, new Point(50, 50));
caocao = new Block(blockTypes.cao, new Point(50, 50));
bing1 = new Block(blockTypes.bing, new Point(50, 50));
bing2 = new Block(blockTypes.bing, new Point(50, 50));
bing3 = new Block(blockTypes.bing, new Point(50, 50));
bing4 = new Block(blockTypes.bing, new Point(50, 50));

console.log(machao);