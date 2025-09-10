const { basePolygonDamage, basePolygonHealth, base } = require('../constants.js');
const { combineStats, skillSet, menu, makeRare, weaponArray, makeTurret } = require('../facilitators.js')
const g = require('../gunvals.js');




Class.nest2 = menu("Nest 2.0")
Class.nest2.UPGRADES_TIER_0 = ['patrollerRocket','patrollerTrap', 'patrollerGunner', 'impedanceDestroyer', 'impedanceTriple', 'barracksTrapper', 'soldierTrapper', 'barracksAuto', 'soldierAuto'] ;
Class.addons.UPGRADES_TIER_0.push("nest2");


// BETA POLYGONS
Class.betaHexagon = {
    PARENT: "food",
    LABEL: "Beta Hexagon",
    VALUE: 3600,
    SHAPE: 6,
    SIZE: 50,
    COLOR: "hexagon",
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 150 * basePolygonHealth,
        RESIST: Math.pow(1.3, 2),
        SHIELD: 60 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.0025
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

Class.betaHeptagon = {
    PARENT: "food",
    LABEL: "Beta Heptagon",
    VALUE: 4900,
    SHAPE: 7,
    SIZE: 55,
    COLOR: "#f0ba77",
    BODY: {
        DAMAGE: 3.5 * basePolygonDamage,
        DENSITY: 35,
        HEALTH: 180 * basePolygonHealth,
        RESIST: Math.pow(1.35, 2),
        SHIELD: 60 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.00225
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
// ALPHA POLYGONS
Class.alphaHexagon = {
    PARENT: "food",
    LABEL: "Alpha Hexagon",
    VALUE: 30e3,
    SHAPE: 6,
    SIZE: 75,
    COLOR: "hexagon",
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 120,
        HEALTH: 720 * basePolygonHealth,
        RESIST: Math.pow(1.3, 3),
        PENETRATION: 1.1,
        SHIELD: 75 * basePolygonHealth,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

Class.alphaHeptagon = {
    PARENT: "food",
    LABEL: "Alpha Heptagon",
    VALUE: 50e3,
    SHAPE: 7,
    SIZE: 90,
    COLOR: "#f0ba77",
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 120,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.35, 3),
        PENETRATION: 1.1,
        SHIELD: 75 * basePolygonHealth,
        ACCELERATION: 0.00175
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

// POLYGONS

Class.heptagon = {
    PARENT: "food",
    LABEL: "Heptagon",
    VALUE: 700,
    SHAPE: 7,
    SIZE: 27.5,
    COLOR: "#f0ba77",
    BODY: {
        DAMAGE: 3.5 * basePolygonDamage,
        DENSITY: 10,
        HEALTH: 28 * basePolygonHealth,
        RESIST: 1.35,
        SHIELD: 50 * basePolygonHealth,
        PENETRATION: 1.1,
        ACCELERATION: 0.0025
    },
    DRAW_HEALTH: true,
};


Class.pentagon.BODY.SHIELD = 0;

// CRASHERS
Class.crasher.VALUE = 50;
Class.crasher.HEALTH_WITH_LEVEL = false;

Class.runner = {
    PARENT: "crasher",
    TYPE: "crasher",
    LABEL: "Runner",
    VALUE: 120,
    COLOR: "#50a465", //oklch(65% 0.125 150)
    SHAPE: [
      [-1,-1],
      [0.25,-1],
      [1,0],
      [0.25,1],
      [-1,1],
      [-0.25,0]
    ],
    SIZE: 7.5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        SPEED: 10,
        ACCELERATION: 0.75,
        HEALTH: 1,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothWithMotion",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
}



Class.guard = {
    PARENT: "crasher",
    TYPE: "crasher",
    LABEL: "Guard",
    COLOR: "orange",
    VALUE: 200,
    SHAPE: [
      [-0.25,1],
      [-0.25,-1],
      [Math.sqrt(3/4)-1/4,-0.5],
      [Math.sqrt(3/4)-1/4,0.5]
    ],
    SIZE: 25,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        SPEED: 3,
        ACCELERATION: 1.4,
        HEALTH: 5,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0.25,
        DENSITY: 15,
        RESIST: 2,
        SHIELD: 0,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothWithMotion",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    HEALTH_WITH_LEVEL: false,
}
Class.guardProp = {
    LABEL: "",
    COLOR: "orange",
    SHAPE: [
      [-0.25,1],
      [-0.25,-1],
      [Math.sqrt(3/4)-1/4,-0.5],
      [Math.sqrt(3/4)-1/4,0.5]
    ],
    SIZE: 25,
    INDEPENDENT: true
}


Class.splitterHexagon = {
    PARENT: "crasher",
    TYPE: "crasher",
    LABEL: "Splitter Hexagon",
    VALUE: 200,
    SHAPE: [
      [1,0]
    ],
    COLOR: "orange",
    SIZE: 25,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        SPEED: 1,
        ACCELERATION: 1.4,
        HEALTH: 10,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0.25,
        DENSITY: 15,
        RESIST: 3,
        SHIELD: 0,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothWithMotion",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    PROPS: [
        {
            POSITION: [25, 3.125, 0, 270, 2],
            TYPE: "guardProp",
        },
        {
            POSITION: [25, 3.125, 0, 90, 2],
            TYPE: "guardProp",
        }
    ],
    GUNS: [
        {
            POSITION: [1, 0, 1, 5, 0, 90, Infinity],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 2}]),
                TYPE: ["guard", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
                INDEPENDENT_CHILDREN: true,
                DRAW_HEALTH: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
            }
        },
        {
            POSITION: [1, 0, 1, 5, 0, -90, Infinity],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 2}]),
                TYPE: ["guard", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
                INDEPENDENT_CHILDREN: true,
                DRAW_HEALTH: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
            }
        }
    ],
}


Class.disruptor = {
    PARENT: "crasher",
    TYPE: "crasher",
    LABEL: "Disruptor",
    COLOR: "gold",
    VALUE: 500,
    SHAPE: [[0,-0.5],[-0.75,-1.25],[0.75,-1],[1,0],[0.75,1],[-0.75,1.25],[0,0.5]],
    SIZE: 25,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        SPEED: 2,
        ACCELERATION: 1.4,
        HEALTH: 20,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0.25,
        DENSITY: 15,
        RESIST: 2,
        SHIELD: 5,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothWithMotion",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
}

//SENTRIES

// shared stats

Class.nest2_genericPatroller = {
    PARENT: "genericTank",
    TYPE: "crasher",
    LABEL: "Patroller",
    DANGER: 3,
    COLOR: "#50a465", //oklch(65% 0.125 150)
    UPGRADE_COLOR: "#50a465",
    SHAPE: [
      [-1,-1],
      [0.25,-1],
      [1,0],
      [0.25,1],
      [-1,1],
      [-0.25,0]
    ],
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 2000,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        ACCELERATION: 1,
        DAMAGE: base.DAMAGE,
        SPEED: 2.0 * base.SPEED,
        HEALTH: 0.1 * base.HEALTH,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}

Class.patrollerRocket = {
    PARENT: "nest2_genericPatroller",
    UPGRADE_LABEL: "Rocket Patroller",
    UPGRADE_COLOR: "#50a465",
    BODY: {
        ACCELERATION: 0.5,
    },
    GUNS: [
        {
            POSITION: [16.5, 8, 1.5, 0, 0, 180, 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.missileTrail, g.rocketeerMissileTrail, { recoil: 0.5 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: "thruster",
            },
        },
    ],
}


Class.patrollerTrap = {
    PARENT: "nest2_genericPatroller",
    UPGRADE_LABEL: "Trap Patroller",
    UPGRADE_COLOR: "#50a465",
    GUNS: [
        {
            POSITION: [13, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, { shudder: 0.4, speed: 0.25, reload: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}


Class.patrollerGunner = {
    PARENT: "nest2_genericPatroller",
    UPGRADE_LABEL: "Gunner Patroller",
    UPGRADE_COLOR: "#50a465",
    GUNS: [
        {
            POSITION: [12, 4, 1, 0, -4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 4, 1, 0, 4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.twin, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
    ],
}

Class.nest2_genericImpedance = {
    PARENT: "genericTank",
    TYPE: "crasher",
    LABEL: "Impedance",
    DANGER: 3,
    COLOR: "gold", //oklch(65% 0.125 150)
    UPGRADE_COLOR: "gold",
    SHAPE: [[0,-0.5],[-0.75,-1.25],[0.75,-1],[1,0],[0.75,1],[-0.75,1.25],[0,0.5]],
    SIZE: 30,
    SKILL: skillSet({
        rld: 0.5,
        dam: 1,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 5000,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        SPEED: 0.1 * base.SPEED,
        ACCELERATION: 1.4,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: 2,
        PUSHABILITY: 0.25,
        SHIELD: 10,
        DENSITY: 15,
        RESIST: 2,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}

Class.impedanceDestroyer = {
    PARENT: "nest2_genericImpedance",
    UPGRADE_LABEL: "Destroyer Impedance",
    UPGRADE_COLOR: "gold",
    GUNS: [
        {
            POSITION: [8, 14, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {reload: 3}]),
                TYPE: "bullet",
            },
        },
    ],
}

Class.impedanceTriple = {
    PARENT: "nest2_genericImpedance",
    UPGRADE_LABEL: "Triple Impedance",
    UPGRADE_COLOR: "gold",
    GUNS: [
        {
            POSITION: {
                LENGTH: 9.5,
                WIDTH: 4,
                X: 5,
                Y: -1,
                ANGLE: -17.5,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 9.5,
                WIDTH: 4,
                X: 5,
                Y: 1,
                ANGLE: 17.5,
                DELAY: 0.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 11,
                X: 5,
                WIDTH: 4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        }
    ],
}


Class.nest2_genericBarracks = {
    PARENT: "genericTank",
    TYPE: "crasher",
    LABEL: "Barracks",
    SHAPE: [
      [1,0]
    ],
    DANGER: 3,
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    SIZE: 25,
    SKILL: skillSet({
        rld: 0.5,
        dam: 1,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 5000,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        SPEED: 0.1 * base.SPEED,
        ACCELERATION: 1.4,
        HEALTH: 2 * base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: 2,
        PUSHABILITY: 0.25,
        DENSITY: 15,
        RESIST: 3,
        SHIELD: 5,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: ['spin', {speed: 0.02}],
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    PROPS: [
        {
            POSITION: [25, 3.125, 0, 270, 2],
            TYPE: "guardProp",
        },
        {
            POSITION: [25, 3.125, 0, 90, 2],
            TYPE: "guardProp",
        }
    ]
}


Class.nest2_genericSoldier = {
    PARENT: "genericTank",
    TYPE: "crasher",
    LABEL: "Soldier",
    SHAPE: [
      [-0.25,1],
      [-0.25,-1],
      [Math.sqrt(3/4)-1/4,-0.5],
      [Math.sqrt(3/4)-1/4,0.5]
    ],
    DANGER: 3,
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    SIZE: 25,
    SKILL: skillSet({
        rld: 0.5,
        dam: 1,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 2500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        SPEED: 0.1 * base.SPEED,
        ACCELERATION: 1.4,
        HEALTH: 1.25 * base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: 2,
        PUSHABILITY: 0.25,
        DENSITY: 15,
        RESIST: 3,
        SHIELD: 5,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true
}

Class.barracksTrapper = {
    PARENT: "nest2_genericBarracks",
    UPGRADE_LABEL: "Trapper Barracks",
    UPGRADE_COLOR: "orange",
    GUNS: [
        ...weaponArray([
            {
                POSITION: [15, 7, 1, 0, 0, 30, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 30, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, {reload: 3, speed: 0.5}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: "trap",
                },
            },
        ], 6, 0.5),
        {
            POSITION: [1, 0, 1, 5, 0, 90, Infinity],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 2}]),
                TYPE: ["soldierTrapper", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
                INDEPENDENT_CHILDREN: true,
                DRAW_HEALTH: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
            }
        },
        {
            POSITION: [1, 0, 1, 5, 0, -90, Infinity],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 2}]),
                TYPE: ["soldierTrapper", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
                INDEPENDENT_CHILDREN: true,
                DRAW_HEALTH: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
            }
        }
    ],
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 3],
            TYPE: [ "builderTurret", { INDEPENDENT: true}],
        },
    ],
}


Class.builderTurret = makeTurret({
    GUNS: [
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, {reload: 3}]),
                TYPE: ["setTrap"],
                STAT_CALCULATOR: "block"
            }
        }
    ]
}, {fov: 0.5})


Class.soldierTrapper = {
    PARENT: "nest2_genericSoldier",
    UPGRADE_LABEL: "Trapper Soldier",
    UPGRADE_COLOR: "orange",
    GUNS: [
        {
            POSITION: [4.5, 7, 1, 8-3.125, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 12.5-3.125, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, {reload: 3, speed: 0.5}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [4.5, 7, 1, 8-3.125/2, 3.125*Math.sqrt(3)/2, 60, 0],
        },
        {
            POSITION: [3, 7, 1.7, 12.5-3.125/2, 3.125*Math.sqrt(3)/2, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, {reload: 3, speed: 0.5}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [4.5, 7, 1, 8-3.125/2, -3.125*Math.sqrt(3)/2, -60, 0],
        },
        {
            POSITION: [3, 7, 1.7, 12.5-3.125/2, -3.125*Math.sqrt(3)/2, -60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, {reload: 3, speed: 0.5}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        }
    ]
}


Class.barracksAuto = {
    PARENT: "nest2_genericBarracks",
    UPGRADE_LABEL: "Auto Barracks",
    UPGRADE_COLOR: "orange",
    GUNS: [
        {
            POSITION: [1, 0, 1, 5, 0, 90, Infinity],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 2}]),
                TYPE: ["soldierAuto", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
                INDEPENDENT_CHILDREN: true,
                DRAW_HEALTH: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
            }
        },
        {
            POSITION: [1, 0, 1, 5, 0, -90, Infinity],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 2}]),
                TYPE: ["soldierAuto", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
                INDEPENDENT_CHILDREN: true,
                DRAW_HEALTH: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
            }
        }
    ],
    TURRETS: [
        ...weaponArray([
            {
                POSITION: [5, 12, 0, 30, 190, 0],
                TYPE: ["autoTankGun", {BODY: { FOV: 0.5}}],
            },
        ], 6, 0.5),
        {
            POSITION: [11, 0, 0, 0, 360, 3],
            TYPE: [ "autoSmasherTurret", { INDEPENDENT: true, BODY: { FOV: 0.5}}],
        },
    ],
}


Class.soldierAuto = {
    PARENT: "nest2_genericSoldier",
    UPGRADE_LABEL: "Auto Soldier",
    UPGRADE_COLOR: "orange",
    TURRETS: [
        {
            POSITION: [5, 10-3.125, 0, 0, 190, 0],
            TYPE: ["autoTankGun", {BODY: { FOV: 0.5}}],
        },
        {
            POSITION: [5, 10-3.125/2, 3.125*Math.sqrt(3)/2, 60, 190, 0],
            TYPE: ["autoTankGun", {BODY: { FOV: 0.5}}],
        },
        {
            POSITION: [5, 10-3.125/2, -3.125*Math.sqrt(3)/2, -60, 190, 0],
            TYPE: ["autoTankGun", {BODY: { FOV: 0.5}}],
        }
    ],
}


Class.shinyHeptagon = makeRare("heptagon", 0);
Class.legendaryHeptagon = makeRare("heptagon", 1);
Class.shadowHeptagon = makeRare("heptagon", 2);
Class.rainbowHeptagon = makeRare("heptagon", 3);
Class.transHeptagon = makeRare("heptagon", 4);

Config.FOOD_TYPES = [
        [2000, [
            [1024, 'egg'], [256, 'square'], [64, 'triangle'], [16, 'pentagon'], [4, 'betaPentagon'], [1, 'alphaPentagon'], [4, 'hexagon'], [1, 'heptagon']
        ]],
        [1, [
            [3125, 'gem'], [625, 'shinySquare'], [125, 'shinyTriangle'], [25, 'shinyPentagon'], [5, 'shinyBetaPentagon'], [1, 'shinyAlphaPentagon'], [5, 'shinyHexagon'], [1, 'shinyHeptagon']
        ]],
        [0.1, [
            [6836, 'jewel'], [1296, 'legendarySquare'], [216, 'legendaryTriangle'], [36, 'legendaryPentagon'], [6, 'legendaryBetaPentagon'], [1, 'legendaryAlphaPentagon'], [6, 'legendaryHexagon'], [1, 'shadowHeptagon']
        ]],
        [0.005, [
            /*[16807, 'egg'], */[2401, 'shadowSquare'], [343, 'shadowTriangle'], [49, 'shadowPentagon'], [7, 'shadowBetaPentagon'], [1, 'shadowAlphaPentagon'], [7, 'shadowHexagon'], [1, 'shadowHeptagon']
        ]],
        [0.001, [
            /*[65536, 'egg'], */[8192, 'rainbowSquare'], [1024, 'rainbowTriangle'], [64, 'rainbowPentagon'], [8, 'rainbowBetaPentagon'], [1, 'rainbowAlphaPentagon'], [8, 'rainbowHexagon'], [1, 'rainbowHeptagon']
        ]],
        [0.0005, [
            [59549, 'egg'], [6561, 'transSquare'], [729, 'transTriangle'], [81, 'transPentagon'], [9, 'transBetaPentagon'], [1, 'transAlphaPentagon'], [9, 'transHexagon'], [1, 'transHeptagon']
        ]],
        [0.0001, [
            [100000, 'sphere'], [10000, 'cube'], [1000, 'tetrahedron'], [100, 'octahedron'], [10, 'dodecahedron'], [1, 'icosahedron']
        ]]
];