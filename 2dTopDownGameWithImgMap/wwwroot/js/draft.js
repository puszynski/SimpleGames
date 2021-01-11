var ETile;
(function (ETile) {
    ETile[ETile["Pavement"] = 100] = "Pavement";
    ETile[ETile["Footpath"] = 101] = "Footpath";
    ETile[ETile["Grass"] = 200] = "Grass";
    ETile[ETile["Sand"] = 201] = "Sand";
    ETile[ETile["HighGrass"] = 300] = "HighGrass";
    ETile[ETile["SandDune"] = 301] = "SandDune";
    ETile[ETile["SwampTrunk"] = 400] = "SwampTrunk";
    ETile[ETile["VerHighSnow"] = 401] = "VerHighSnow";
    ETile[ETile["SoftBushes"] = 402] = "SoftBushes";
    ETile[ETile["WaterSwimming"] = 403] = "WaterSwimming";
    ETile[ETile["Lava"] = 900] = "Lava";
    ETile[ETile["BushesSoftThorny"] = 901] = "BushesSoftThorny";
    ETile[ETile["Tree"] = 500] = "Tree";
    ETile[ETile["Mountain"] = 501] = "Mountain";
    ETile[ETile["BusjesDense"] = 502] = "BusjesDense";
    ETile[ETile["MainLand"] = 1000] = "MainLand";
    ETile[ETile["NoobLand"] = 1001] = "NoobLand";
})(ETile || (ETile = {}));
var EMapItems;
(function (EMapItems) {
})(EMapItems || (EMapItems = {}));
var Player_DRAFT = (function () {
    function Player_DRAFT() {
        this.SpriteSheetImage = new HTMLImageElement;
        this.FoodLevelMax = 100;
        this.BodyWarmthMax = 100;
        this.SpriteSheetImage.src = "/images/DemoRpgCharacter.png";
    }
    Player_DRAFT.prototype.CreatePlayer = function (firstname, lastname) {
        this.MapName = "Newbornland";
        this.MapPositionX = 100;
        this.MapPositionY = 200;
    };
    Player_DRAFT.prototype.LevelUp = function () {
    };
    Player_DRAFT.prototype.RecalculatePlayer = function () {
    };
    return Player_DRAFT;
}());
var Weapon = (function () {
    function Weapon() {
    }
    return Weapon;
}());
function CalculateDamge(attacker, deffender) {
    return 123;
}
//# sourceMappingURL=draft.js.map