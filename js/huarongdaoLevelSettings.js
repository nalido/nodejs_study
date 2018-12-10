//----------------------------data base--------------------------------------
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


function Point(c, r){
    this.r = r;
    this.c = c;
}

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
};