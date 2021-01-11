enum ETile {
    //100-199 fast
    Pavement = 100,
    Footpath = 101,
    
    //200-299 normal
    Grass = 200,
    Sand = 201,

    //300-399 slow
    HighGrass = 300,
    SandDune = 301,

    //400-449 very slow
    SwampTrunk = 400,
    VerHighSnow = 401,
    SoftBushes = 402,
    WaterSwimming = 403,

    //450-499 with dmg + very slow
    Lava = 900,
    BushesSoftThorny = 901,

    //500 - 899 blockade
    Tree = 500,
    Mountain = 501,
    BusjesDense = 502,

    //EnterToOtherMap (string == Map.Name)
    MainLand = 1000,
    NoobLand = 1001,
}

enum EMapItems {
    //EQUIMPENT(ITEMS) ??
    //DEAD BODIES ??

    //100-199 - movable by players - can go throught

    //200-299 - movable by players - cant`t go throught

    //300-399 - resources: cut/empty/refill

    //400-499 - untouchable

    //500-599 - with dmg
}





class Player_DRAFT {
    ID: string; //todo lastname+firstname
    FirstName: string;
    LastName: string;
    
    SpriteSheetImage: HTMLImageElement = new HTMLImageElement;//use const dimenstions for all sprites
    
    MapName: string;
    MapPositionX: number;
    MapPositionY: number; 
    Moving: boolean;
    Facing: EKeysDirections;

    //SKILLS
    Class: ECharacterClasses;
    Level: number; // on it depends basics lifeMax, mana etc..
    ExperiencePoints: number;

    UnallocatedSkillPoints: number; // np 300 - te pkt rozdają się na poszczególne gałęzie: 
    //poszczególne gałęzie nie mają max ale liczba pkt do zdobycia rośnie tak że rekordy dochodzą do 120-130 - poszczególne profesje dostają bonusy dodatnie do konkretnych skilli
    //skille rozdają się w miare używania - jak w tibi, bez klikania
    MagicLevel: number;
    OneHandedWeapons: number;
    TwoHandedWeapons: number;
    DistanceWeapons: number;
    AgilityDefence: number;
    Shelding: number;

    Speed: number;
    
    Life: number;
    LifeMax: number;
    LifeRegeneration: number;

    Mana: number;
    ManaMax: number;
    ManaRegeneration: number;

    Stamina: number;
    StaminaMax: number;
    StaminaRegeneration: number;

    FoodLevel: number;
    FoodLevelMax: number = 100;    

    BodyWarmth: number;
    BodyWarmthMax: number = 100;
 

    constructor() { //chcesz aby obiekt utworzył sie jak drugi gracz w zasięgu - musi przesłać pełny model z db;      
        this.SpriteSheetImage.src = "/images/DemoRpgCharacter.png";        
    }

    CreatePlayer(firstname: string, lastname: string) {
        this.MapName = "Newbornland";
        this.MapPositionX = 100;
        this.MapPositionY = 200;
    }

    LevelUp() {
        //todo update relations
    }

    RecalculatePlayer() { //np. gdy zmieni ekwipunek

    }
}

class Weapon {
    //WeaponGeneralType: todo enum;
    //WeaponEliteType: todo enum; normal, magic, unique, set;

    MinLvlRequired: number;

    MinBasicDamagae: number;
    MaxBasicDamage: number;

    Distance: number;

    //Accuracy: number; ?? pomyśl nad systemem trafień/odbić/uników/blokowań tarczą    
}

function CalculateDamge(attacker: Player, deffender: Player): number {

    //todo lower def from back of char - 50%
    return 123;
}