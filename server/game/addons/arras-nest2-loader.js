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


Events.on('start', () => ticker.setSyncedTimeout(() => updateNestFoodType(Config.nest_type), 1));
Events.on('start', () => ticker.setSyncedTimeout(() => global.gameManager.gameHandler.foodloop = foodloop2, 2));
Events.on('quickloop', ({ }) => ticker.syncedDelaysLoop());

Config.nest_type_names = ["pentagons", "hexagons", "heptagons"];
Config.nest_chances = [[5, 0], [ 4, 1], [ 3, 2]]

Config.nest_type = 2;

function changeNestFoodType() {
  let setting = 0;
  
  setting=pickFromChanceSet(Config.nest_chances);
  if(setting != Config.nest_type) {
    global.gameManager.socketManager.broadcast("The nest is being overtaken by " + Config.nest_type_names[setting] + "!");
    setSyncedTimeout(()=> updateNestFoodType(setting), 150);
  } else {
    setSyncedTimeout(()=>changeNestFoodType(), (ran.irandom(360) + 240)*100); // 6000
  }
}


function updateNestFoodType(setting) {
  
    Config.nest_type = setting;
    Config.current_color = Config.nest_colors[setting];
    Config.enemy_cap_nest = Config.enemy_caps_nest[setting];
    Config.enemy_types_nest = Config.enemy_types_nests[setting];
    Config.food_cap_nest = Config.food_caps_nest[setting];
    Config.food_spawn_chance_nest = Config.food_spawn_chances_nest[setting];
    Config.enemy_spawn_chance_nest = Config.enemy_spawn_chances_nest[setting];
    Config.food_types_nest = Config.food_types_nests[setting];
    for (let i = 0; i < global.gameManager.room.setup.length; i++) {
        for (let j = 0; j < global.gameManager.room.setup[i].length; j++) {
            if (global.gameManager.room.setup[i][j].name === "Nest Tile") {
                global.gameManager.room.setup[i][j].color = Config.current_color;
            }
        }
    }
    global.gameManager.socketManager.broadcastRoom();

    setSyncedTimeout(()=>changeNestFoodType(), (ran.irandom(360) + 240)*100); // 300000
}

Config.food_types_nest = [
    [1, [
        [16, 'pentagon'], [ 4, 'betaPentagon'], [ 1, 'alphaPentagon']
    ]]
];
Config.food_types_nest_2 = [
    [1, [
        [36, 'hexagon'], [ 6, 'betaHexagon'], [ 1, 'alphaHexagon']
    ]]
];

Config.food_types_nest_3 = [
    [1, [
        [49, 'heptagon'], [ 7, 'betaHeptagon'], [ 1, 'alphaHeptagon']
    ]]
];

Config.enemy_types_nest = [
    [19, [
        [1, 'crasher']
    ]],
    [1, [
        [1, 'sentryGun'], [1, 'sentrySwarm'], [1, 'sentryTrap']
    ]]
];

Config.enemy_types_nest_2 = [
        [9, [
            [1, 'runner']
        ]],
        [1, [
            [1, 'patrollerRocket'], [1, 'patrollerTrap'], [1, 'patrollerGunner'], 
        ]]
    ];


Config.enemy_types_nest_3 = [
        [10, [
            [4, 'guard'], [2, 'splitterHexagon'], [1, 'disruptor']
        ]],
        [1, [
            [1, 'impedanceDestroyer'], [1, 'impedanceTriple'], [1, 'barracksTrapper'], [1, 'barracksAuto'], 
        ]]
    ];

Config.food_types_nests = [Config.food_types_nest, Config.food_types_nest_2, Config.food_types_nest_3]
Config.enemy_types_nests = [Config.enemy_types_nest, Config.enemy_types_nest_2, Config.enemy_types_nest_3];

function getFoodTypeNest() {
    return Config.food_types_nests[Config.nest_type];
}
function getEnemyTypeNest() {
    return Config.enemy_types_nests[Config.nest_type];
}

function convert(converted, gameManager) {
    if(converted == undefined) {
        return;
    }
    convert2(converted, Config.nests_convert[Config.nest_type]);
}


Config.nest_convert = {
    hexagon: 'pentagon',
    betaHexagon: 'betaPentagon',
    alphaHexagon: 'alphaPentagon',
    heptagon: 'pentagon',
    betaHeptagon: 'betaPentagon',
    alphaHeptagon: 'alphaPentagon'
};
Config.nest_convert_2 = {
    pentagon: 'hexagon',
    betaPentagon: 'betaHexagon',
    alphaPentagon: 'alphaHexagon',
    heptagon: 'hexagon',
    betaHeptagon: 'betaHexagon',
    alphaHeptagon: 'alphaHexagon'
};
Config.nest_convert_3 = {
    pentagon: 'heptagon',
    betaPentagon: 'betaHeptagon',
    alphaPentagon: 'alphaHeptagon',
    hexagon: 'heptagon',
    betaHexagon: 'betaHeptagon',
    alphaHexagon: 'alphaHeptagon'
};
Config.nests_convert = [Config.nest_convert, Config.nest_convert_2, Config.nest_convert_3]

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

Config.nest_colors = ["purple", "hexagon", "#f0ba77"];

function nestConvert(tile) {
    let entity = ran.choose(tile.entities);
    convert(entity, tile.gameManager);
    setTimeout(() => nestConvert(tile), ran.irandom(1000));
}


Config.food_caps_nest = [15, 14, 12]; // Max nest food per nest.
Config.food_spawn_chances_nest = [1, 0.9, 0.7]; // Likeliness of nest food spawn attempts succeeding.
//Config.FOOD_SPAWN_COOLDOWN_NEST = [45, 45, 45]; // Cooldown (in game ticks) of nest food spawn attempts being made.

Config.enemy_caps_nest = [10, 10, 5]; // Max nest enemies per nest.
Config.enemy_spawn_chances_nest = [1/3,1/3,1/6], // Likeliness of nest enemies spawn attempts succeeding.
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
        if (Math.random() < Config.enemy_spawn_chance_nest && this.enemyFoods.length < Config.enemy_cap_nest) {
            const tile = ran.choose(global.gameManager.room.spawnable[TEAM_ENEMIES]).randomInside();
            const o = spawnFoodEntity(tile, Config.enemy_types_nest);
            this.enemyFoods.push(o);
            setupCleanup(this.enemyFoods, o);
        }
        // Nest food spawn
        if (Math.random() < Config.food_spawn_chance_nest && this.nestFoods.length < Config.food_cap_nest) {
            const tile = ran.choose(global.gameManager.room.spawnable[TEAM_ENEMIES]).randomInside();
            for (let i = 0; i < totalFoods; i++) {
                const o = spawnFoodEntity(tile, Config.food_types_nest);
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