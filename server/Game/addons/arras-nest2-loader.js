let EventEmitter = require('events');

tileClass.nest = new Tile({
    DATA: {
        allowMazeWallToBeSpawned: true,
        foodSpawnCooldown: 0, foodCount: 0
    },
    COLOR: "nest",
    NAME: "Nest Tile",
    INIT: (tile, room) => {
        if (!room.spawnable[TEAM_ENEMIES]) room.spawnable[TEAM_ENEMIES] = [];
        room.spawnable[TEAM_ENEMIES].push(tile);
        setTimeout(() => nestConvert(tile), 0);
    },
});

let ticker = {
    tickIndex : 0,
    tickEvents : new EventEmitter(),
    syncedDelaysLoop : () => tickEvents.emit(tickIndex++),
    setSyncedTimeout : (callback, ticks = 0, ...args) => tickEvents.once(tickIndex + Math.round(ticks), () => callback(...args))
}


Events.on('start', () => ticker.setSyncedTimeout(() => updateNestFoodType(Config.NEST_TYPE), 1));
Events.on('start', () => ticker.setSyncedTimeout(() => global.gameManager.gameHandler.foodloop = foodloop2, 2));
Events.on('quickloop', ({ }) => ticker.syncedDelaysLoop());

Config.NEST_TYPE_NAMES = ["pentagons", "hexagons", "heptagons"];
Config.NEST_CHANCES = [[5, 0], [ 4, 1], [ 3, 2]]

Config.NEST_TYPE = 2;

function changeNestFoodType() {
  let setting = 0;
  
  setting=pickFromChanceSet(Config.NEST_CHANCES);
  if(setting != Config.NEST_TYPE) {
    global.gameManager.socketManager.broadcast("The nest is being overtaken by " + Config.NEST_TYPE_NAMES[setting] + "!");
    setSyncedTimeout(()=> updateNestFoodType(setting), 150);
  } else {
    setSyncedTimeout(()=>changeNestFoodType(), (ran.irandom(360) + 240)*100); // 6000
  }
}


function updateNestFoodType(setting) {
  
    Config.NEST_TYPE = setting;
    Config.CURRENT_COLOR = Config.NEST_COLORS[setting];
    Config.ENEMY_CAP_NEST = Config.ENEMY_CAPS_NEST[setting];
    Config.ENEMY_TYPES_NEST = Config.ENEMY_TYPES_NESTS[setting];
    Config.FOOD_CAP_NEST = Config.FOOD_CAPS_NEST[setting];
    Config.FOOD_SPAWN_CHANCE_NEST = Config.FOOD_SPAWN_CHANCES_NEST[setting];
    Config.ENEMY_SPAWN_CHANCE_NEST = Config.ENEMY_SPAWN_CHANCES_NEST[setting];
    Config.FOOD_TYPES_NEST = Config.FOOD_TYPES_NESTS[setting];
    for (let i = 0; i < global.gameManager.room.setup.length; i++) {
        for (let j = 0; j < global.gameManager.room.setup[i].length; j++) {
            if (global.gameManager.room.setup[i][j].name === "Nest Tile") {
                global.gameManager.room.setup[i][j].color = Config.CURRENT_COLOR;
            }
        }
    }
    global.gameManager.socketManager.broadcastRoom();

    setSyncedTimeout(()=>changeNestFoodType(), (ran.irandom(360) + 240)*100); // 300000
}

Config.FOOD_TYPES_NEST = [
    [1, [
        [16, 'pentagon'], [ 4, 'betaPentagon'], [ 1, 'alphaPentagon']
    ]]
];
Config.FOOD_TYPES_NEST_2 = [
    [1, [
        [36, 'hexagon'], [ 6, 'betaHexagon'], [ 1, 'alphaHexagon']
    ]]
];

Config.FOOD_TYPES_NEST_3 = [
    [1, [
        [49, 'heptagon'], [ 7, 'betaHeptagon'], [ 1, 'alphaHeptagon']
    ]]
];

Config.ENEMY_TYPES_NEST = [
    [19, [
        [1, 'crasher']
    ]],
    [1, [
        [1, 'sentryGun'], [1, 'sentrySwarm'], [1, 'sentryTrap']
    ]]
];

Config.ENEMY_TYPES_NEST_2 = [
        [9, [
            [1, 'runner']
        ]],
        [1, [
            [1, 'patrollerRocket'], [1, 'patrollerTrap'], [1, 'patrollerGunner'], 
        ]]
    ];


Config.ENEMY_TYPES_NEST_3 = [
        [10, [
            [4, 'guard'], [2, 'splitterHexagon'], [1, 'disruptor']
        ]],
        [1, [
            [1, 'impedanceDestroyer'], [1, 'impedanceTriple'], [1, 'barracksTrapper'], [1, 'barracksAuto'], 
        ]]
    ];

Config.FOOD_TYPES_NESTS = [Config.FOOD_TYPES_NEST, Config.FOOD_TYPES_NEST_2, Config.FOOD_TYPES_NEST_3]
Config.ENEMY_TYPES_NESTS = [Config.ENEMY_TYPES_NEST, Config.ENEMY_TYPES_NEST_2, Config.ENEMY_TYPES_NEST_3];

function getFoodTypeNest() {
    return Config.FOOD_TYPES_NESTS[Config.NEST_TYPE];
}
function getEnemyTypeNest() {
    return Config.ENEMY_TYPES_NESTS[Config.NEST_TYPE];
}

function convert(converted, gameManager) {
    if(converted == undefined) {
        return;
    }
    convert2(converted, Config.NESTS_CONVERT[Config.NEST_TYPE]);
}


Config.NEST_CONVERT = {
    hexagon: 'pentagon',
    betaHexagon: 'betaPentagon',
    alphaHexagon: 'alphaPentagon',
    heptagon: 'pentagon',
    betaHeptagon: 'betaPentagon',
    alphaHeptagon: 'alphaPentagon'
};
Config.NEST_CONVERT_2 = {
    pentagon: 'hexagon',
    betaPentagon: 'betaHexagon',
    alphaPentagon: 'alphaHexagon',
    heptagon: 'hexagon',
    betaHeptagon: 'betaHexagon',
    alphaHeptagon: 'alphaHexagon'
};
Config.NEST_CONVERT_3 = {
    pentagon: 'heptagon',
    betaPentagon: 'betaHeptagon',
    alphaPentagon: 'alphaHeptagon',
    hexagon: 'heptagon',
    betaHexagon: 'betaHeptagon',
    alphaHexagon: 'alphaHeptagon'
};
Config.NESTS_CONVERT = [Config.NEST_CONVERT, Config.NEST_CONVERT_2, Config.NEST_CONVERT_3]

function convert2(converted, conversion) {
    if(conversion.hasOwnProperty(converted.defs[0])) {
        converted.upgrades = [];
        converted.define(conversion[converted.defs[0]]);
        converted.destroyAllChildren();
        converted.skill.update();
        converted.syncTurrets();
        converted.refreshBodyAttributes();
        converted.color.interpret(converted.color.compiled);
    }
}

let pickFromChanceSet = set => {
    while (Array.isArray(set)) {
        set = set[ran.chooseChance(...set.map(e => e[0]))][1];
    }
    return set;
}

Config.NEST_COLORS = ["purple", "hexagon", "#f0ba77"];

function nestConvert(tile) {
    let entity = ran.choose(tile.entities);
    convert(entity, tile.gameManager);
    setTimeout(() => nestConvert(tile), ran.irandom(1000));
}


Config.FOOD_CAPS_NEST = [15, 14, 12]; // Max nest food per nest.
Config.FOOD_SPAWN_CHANCES_NEST = [1, 0.9, 0.7]; // Likeliness of nest food spawn attempts succeeding.
//Config.FOOD_SPAWN_COOLDOWN_NEST = [45, 45, 45]; // Cooldown (in game ticks) of nest food spawn attempts being made.

Config.ENEMY_CAPS_NEST = [20, 20, 8]; // Max nest enemies per nest.
Config.ENEMY_SPAWN_CHANCES_NEST = [1/3,1/3,1/6], // Likeliness of nest enemies spawn attempts succeeding.
//Config.ENEMY_SPAWN_COOLDOWN_NEST = [60,60,60], // Cooldown (in game ticks) of nest enemies spawn attempts being made.


foodloop2 = function() {
    if (global.gameManager.arenaClosed) return;

    // Helper to pick a type from a weighted set
    const pickFromChanceSet = (set) => {
        while (Array.isArray(set)) {
            set = set[ran.chooseChance(...set.map(e => e[0]))][1];
        }
        return set;
    };

    // Helper to spawn a food entity
    const spawnFoodEntity = (tile, layeredSet) => {
        const o = new Entity(tile);
        const type = pickFromChanceSet(layeredSet);
        o.define(type);
        o.facing = ran.randomAngle();
        o.team = TEAM_ENEMIES;
        o.isFood = true;
        return o;
    };

    if (Math.random() >= 0.1) return; // 1/10 chance to spawn food

    let totalFoods = 1;
    if (Math.random() < 0.2) { // 1/5 chance to spawn a group
        totalFoods = 1 + Math.floor(Math.random() * Config.FOOD_MAX_GROUP_TOTAL);
    }

    // Helper for cleanup interval
    const setupCleanup = (arr, o) => {
        const loop = setInterval(() => {
            if (o.isDead()) {
                util.remove(arr, arr.indexOf(o));
                clearInterval(loop);
            }
        }, 1500);
    };

    // Nest food/enemy spawn
    if (Math.random() < 1 / 3 && global.gameManager.room.spawnable[TEAM_ENEMIES]) {
        // Enemy spawn
        if (Math.random() < Config.ENEMY_SPAWN_CHANCE_NEST && this.enemyFoods.length < Config.ENEMY_CAP_NEST) {
            const tile = ran.choose(global.gameManager.room.spawnable[TEAM_ENEMIES]).randomInside();
            const o = spawnFoodEntity(tile, Config.ENEMY_TYPES_NEST);
            this.enemyFoods.push(o);
            setupCleanup(this.enemyFoods, o);
        }
        // Nest food spawn
        if (Math.random() < Config.FOOD_SPAWN_CHANCE_NEST && this.nestFoods.length < Config.FOOD_CAP_NEST) {
            const tile = ran.choose(global.gameManager.room.spawnable[TEAM_ENEMIES]).randomInside();
            for (let i = 0; i < totalFoods; i++) {
                const o = spawnFoodEntity(tile, Config.FOOD_TYPES_NEST);
                this.nestFoods.push(o);
                setupCleanup(this.nestFoods, o);
            }
        }
    } else if (this.foods.length < Config.FOOD_CAP) {
        // Regular food spawn
        const tile = ran.choose(global.gameManager.room.spawnableDefault).randomInside();
        for (let i = 0; i < totalFoods; i++) {
            const o = spawnFoodEntity(tile, Config.FOOD_TYPES);
            this.foods.push(o);
            setupCleanup(this.foods, o);
        }
    }
}