// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const {
    combineStats,
    makeMenu,
    makeAuto,
    makeOver,
    makeBattle,
    makeDeco,
    makeGuard,
    makeBird,
    makeRadialAuto,
    weaponArray,
    weaponMirror,
    makeAura,
} = require("../facilitators.js");
const { base, statnames, dfltskl, smshskl } = require("../constants.js");
const g = require("../gunvals.js");

let g2 = {
    torrent: {
        reload: 0.75,
        recoil: 0.8,
        shudder: 1.2,
        size: 10 / 12,
        health: 0.9,
        damage: 0.9,
        maxSpeed: 0.9,
        spray: 1.5,
    },
    cascade: {
        reload: 0.5,
        recoil: 0.9,
        shudder: 1.5,
        health: 0.95,
        damage: 0.95,
        spray: 2,
    },
    soaker: {
        reload: 0.5,
        recoil: 0.6,
        shudder: 1.6,
        health: 0.8,
        damage: 0.8,
        maxSpeed: 0.8,
        spray: 2.5,
    },
    minisassin: {
        reload: 1.35,
        shudder: 0.85,
        health: 1.15,
        damage: 1.1,
        pen: 1.1,
        speed: 1.25,
        maxSpeed: 1.1,
        resist: 1.3,
    },
    hex: { recoil: 0.75, health: 0.95, damage: 0.85, pen: 0.95 },
    assault: {
        reload: 0.7,
        recoil: 0.7,
        shudder: 1.3,
        damage: 0.9,
        health: 0.9,
    },
    machineRifle: {
        reload: 0.8,
        recoil: 0.8,
        shudder: 1.5,
        health: 0.9,
        damage: 0.9,
        pen: 0.9,
        spray: 1.5,
    },
    battery: { reload: 1.1, recoil: 1.1, health: 0.9, damage: 0.9, pen: 0.9 },
    silo: { speed: 0.5, max: 0.5, health: 0.9, damage: 0.9, pen: 0.9 },

    desmos: { reload: 1.1, range: 1.2, shudder: 0, spray: 0 },
};

// This addon is enabled by default.
// You can also disable addons by not making them end with '.js'
// If you want to disable, simply make the line below just run.
//return console.log('[arras-justenoughtanks.js] Addon disabled by default');

Class.justEnoughTanks = makeMenu("Just Enough Tanks");
Class.justEnoughTanks.UPGRADES_TIER_0 = [
    "jetAbomination",
    "jetFlak",
    "jetEmitter",
    "jetGodhead",
    ["machineGun", "overseer"],
];
Class.menu_addons.UPGRADES_TIER_0.push("justEnoughTanks");

Class.jetCombination = makeOver("pounder", "Combination", {
    count: 1,
    independent: true,
    cycle: false,
});
Class.jetFusion = makeOver("pounder", "Fusion", {
    count: 3,
    maxDrones: 2,
    angle: 90,
});
Class.jetChimera = makeOver("pounder", "Chimera", {
    spawnerType: "swarm",
    count: 1,
    independent: true,
});

Class.jetNimrod = {
    PARENT: "genericTank",
    LABEL: "Nimrod",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [18, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [24, 6.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunterSecondary,
                    g.rifle,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 10.5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.rifle,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetFlakBullet = {
    PARENT: "bullet",
    INDEPENDENT: true,
    BODY: {
        RANGE: 60,
    },
    GUNS: [
        {
            POSITION: [8, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { damage: 0.5 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            },
        },
        {
            POSITION: [8, 8, 1, 0, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { damage: 0.5 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            },
        },
        {
            POSITION: [8, 8, 1, 0, 0, -30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { damage: 0.5 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            },
        },
    ],
};

Class.jetFlak = {
    PARENT: "genericTank",
    LABEL: "Flak",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 14, 1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pounder,
                    { reload: 1.6, damage: 0.2 },
                ]),
                TYPE: "jetFlakBullet",
            },
        },
    ],
};

Class.jetTorrent = {
    PARENT: "genericTank",
    LABEL: "Torrent",
    DANGER: 6,
    GUNS: [
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 12,
                ASPECT: 1.4,
                X: 8,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.machineGun,
                    g2.torrent,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetCascade = {
    PARENT: "genericTank",
    LABEL: "Cascade",
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 16,
                WIDTH: 12,
                ASPECT: 1.6,
                X: 8,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.machineGun,
                    g2.torrent,
                    g2.cascade,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetSplasher = {
    PARENT: "genericTank",
    LABEL: "Splasher",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.machineGun,
                    g2.torrent,
                    g.lowPower,
                    g.pelleter,
                    { recoil: 1.15, size: 12 / 10, shudder: 0.9 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 14,
                WIDTH: 12,
                ASPECT: 1.4,
                X: 8,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.machineGun,
                    g2.torrent,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetQuickDraw = {
    PARENT: "genericTank",
    LABEL: "Quick Draw",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4,
    },
    GUNS: [
        {
            POSITION: [20, 10.5, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [27, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g.assassin,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 7, -1.6, 8, 0, 0, 0],
        },
    ],
};

Class.jetMinisassin = {
    PARENT: "genericTank",
    LABEL: "Minisassin",
    DANGER: 7,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.85,
    },
    GUNS: [
        {
            POSITION: [25, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g2.minisassin,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g2.minisassin,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g2.minisassin,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8, -1.4, 8, 0, 0, 0],
        },
    ],
};

Class.jetHex = {
    PARENT: "genericTank",
    LABEL: "Hex",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [8, 3.5, 1, 0, 8, 0, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g2.hex,
                    { speed: 1.2 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [8, 3.5, 1, 0, -8, 0, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g2.hex,
                    { speed: 1.2 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, 6.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g2.hex,
                    { speed: 1.2 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -6.5, 0, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g2.hex,
                    { speed: 1.2 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g2.hex,
                    { speed: 1.2 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g2.hex,
                    { speed: 1.2 },
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetAssaultRifle = {
    PARENT: "genericTank",
    LABEL: "Assault Rifle",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            POSITION: [18, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [20, 10.5, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.rifle,
                    g2.assault,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetTwinFlank = {
    PARENT: "genericTank",
    LABEL: "Twin Flank",
    DANGER: 7,
    GUNS: weaponArray(
        [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.doubleTwin,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.doubleTwin,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                    TYPE: "bullet",
                },
            },
        ],
        2,
    ),
};

Class.jetDoubleGunner = {
    PARENT: "genericTank",
    LABEL: "Double Gunner",
    DANGER: 7,
    GUNS: weaponArray(
        [
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.gunner,
                        g.doubleTwin,
                        { speed: 1.2 },
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.gunner,
                        g.doubleTwin,
                        { speed: 1.2 },
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.gunner,
                        g.doubleTwin,
                        { speed: 1.2 },
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.gunner,
                        g.doubleTwin,
                        { speed: 1.2 },
                    ]),
                    TYPE: "bullet",
                },
            },
        ],
        2,
    ),
};

Class.jetLongshot = {
    PARENT: "genericTank",
    LABEL: "Longshot",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetLongGunner = {
    PARENT: "genericTank",
    LABEL: "Long Gunner",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [15, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.focal,
                    { maxSpeed: 1.2, speed: 1.5, spray: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.focal,
                    { maxSpeed: 1.2, speed: 1.5, spray: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.focal,
                    { maxSpeed: 1.2, speed: 1.5, spray: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.focal,
                    { maxSpeed: 1.2, speed: 1.5, spray: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetMachineRifle = {
    PARENT: "genericTank",
    LABEL: "Machine Rifle",
    DANGER: 7,
    BODY: {
        FOV: 1.15,
    },
    GUNS: [
        {
            POSITION: [14, 14, 1.3, 4, 0, 0, 0],
        },
        {
            POSITION: [14, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.machineGun,
                    g.focal,
                    g2.machineRifle,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetMultiShot = {
    PARENT: "genericTank",
    LABEL: "Multi-Shot",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, -2, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 4, 1, 0, -3, -10, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.tripleShot,
                    g.pelleter,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 4, 1, 0, 3, 10, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.tripleShot,
                    g.pelleter,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetHexaMachineGun = {
    PARENT: "genericTank",
    LABEL: "Hexa Machine Gun",
    DANGER: 7,
    GUNS: weaponArray(
        [
            {
                POSITION: [12, 10, 1.4, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.flankGuard,
                        g.flankGuard,
                        g.machineGun,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 10, 1.4, 8, 0, 60, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.flankGuard,
                        g.flankGuard,
                        g.machineGun,
                    ]),
                    TYPE: "bullet",
                },
            },
        ],
        3,
    ),
};

Class.jetBurst = {
    PARENT: "genericTank",
    LABEL: "Burst",
    DANGER: 7,
    GUNS: weaponArray(
        [
            {
                POSITION: [20, 12, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.flankGuard,
                        g.flankGuard,
                        g.pounder,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 12, 1, 0, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.flankGuard,
                        g.flankGuard,
                        g.pounder,
                    ]),
                    TYPE: "bullet",
                },
            },
        ],
        3,
    ),
};

Class.jetBentMinigun = {
    PARENT: "genericTank",
    LABEL: "Bent Minigun",
    DANGER: 7,
    BODY: {
        FOV: 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ POSITION:
                [18, 8, 1, 0, -2, -17.5, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, -2, -17.5, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 2, 17.5, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 2, 17.5, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minigun,
                    g.tripleShot,
                    { recoil: 0.5 },
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetSoaker = {
    PARENT: "genericTank",
    LABEL: "Soaker",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            POSITION: [16, 8, 1.4, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g2.soaker]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 8, 1.4, 6, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g2.soaker]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 8, 1.4, 6, 0, 0, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g2.soaker]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetBattery = {
    PARENT: "genericTank",
    LABEL: "Battery",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [17, 12, 1, 0, -4, -7, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pounder,
                    g.artillery,
                    g.tripleShot,
                    g2.battery,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 12, 1, 0, 4, 7, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pounder,
                    g.artillery,
                    g.tripleShot,
                    g2.battery,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pounder,
                    g.artillery,
                    g.tripleShot,
                    g2.battery,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.jetSilo = {
    PARENT: "genericTank",
    LABEL: "Silo",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "mendersymbol",
        },
    ],
    GUNS: weaponArray(
        {
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer, g2.silo]),
                TYPE: "rocketDrone",
                AUTOFIRE: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        2,
    ),
};

Class.rocketDrone = {
    PARENT: "drone",
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    { recoil: 0.5 },
                    g.lowPower,
                ]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: "thruster",
            },
        },
    ],
};

Class.jetTwinSpawner = {
    PARENT: "genericTank",
    LABEL: "Twin Spawner",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "twinMinion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [12, 4, 1, 0, 4, 0, 0],
        },
        {
            POSITION: [12, 4, 1, 0, -4, 0, 0],
        },
    ],
};

Class.twinMinion = {
    PARENT: "genericTank",
    LABEL: "Minion",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 1.8,
        ACCELERATION: 1,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
        {
            POSITION: [19, 8.5, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.twin]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8.5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.twin]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
};


class io_orbit2 extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.rotationSpeed = opts.rotationSpeed ?? 0;
        let master = this.body.master.useOwnMaster ? this.body.master : this.body.master.master;
        this.invert = master.control.alt ?? false;
        this.justSpawned = true;
    }
  
    think(input) {
        let invertFactor = this.invert ? -1 : 1,
            master = this.body.master.useOwnMaster ? this.body.master : this.body.master.master,
            distance = Math.sqrt((this.body.x - master.x) ** 2 + (this.body.y - master.y) ** 2) / this.body.topSpeed,
            speed = (this.rotationSpeed) * Math.PI / 180 * invertFactor / (distance);
        if (this.justSpawned) {
            speed = -speed/2;
        }
        let bodyx = master.x + Math.cos(speed) * (this.body.x - master.x) - Math.sin(speed) * (this.body.y - master.y);
        let bodyy = master.y + Math.sin(speed) * (this.body.x - master.x) + Math.cos(speed) * (this.body.y - master.y);
        let vx = Math.cos(speed) * (this.body.velocity.x) - Math.sin(speed) * (this.body.velocity.y);
        let vy = Math.sin(speed) * (this.body.velocity.x) + Math.cos(speed) * (this.body.velocity.y);
        this.body.x = bodyx;
        this.body.y = bodyy;
        this.body.velocity.x = vx;
        this.body.velocity.y = vy;
        this.body.facing = this.body.facing + speed;
        
        if (this.justSpawned) {
            this.justSpawned = false;
        }
    }
}
ioTypes.orbit2 = io_orbit2


Class.jetEddy = {
    PARENT: "genericTank",
    LABEL: "Eddy",
    BODY: {
        SPEED: 1.1 * base.SPEED
    },
    DANGER: 6,
    GUNS: [
        ...weaponArray([{
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.desmos]),
                TYPE: ["bullet", { CONTROLLERS: [["orbit2", { rotationSpeed: 60 }]] }],
            },
        }], 3),
        ...weaponArray(weaponMirror({
            POSITION: [11, 5, 3, -2, 4, 170, 0]
        }), 3)
    ]
};



Class.auraTurret = makeAura(1, 2);
Class.godheadAuraTurret = makeAura(0.5, 3);
Class.jetEmitter = makeAuto("flankGuard", "Emitter", {type: "auraTurret"});
Class.jetEmitter.DANGER = 6;
Class.auraDrone = makeAuto('drone', "Aura-Drone", {type: 'godheadAuraTurret'})

Class.jetGodhead = {
    PARENT: "genericTank",
    LABEL: "Godhead",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "auraSymbol",
        },
    ],
    GUNS: weaponArray(
        {
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "auraDrone",
                AUTOFIRE: true,
                NO_LIMITATIONS: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        2,
    ),
};
// Class.basic.UPGRADES_TIER_1.splice(Class.basic.UPGRADES_TIER_1.indexOf("desmos"),1);
// Class.twin.UPGRADES_TIER_2.splice(Class.twin.UPGRADES_TIER_2.indexOf("helix"),1);
// Class.flankGuard.UPGRADES_TIER_3.splice(Class.flankGuard.UPGRADES_TIER_3.indexOf("quadruplex"),1);
// Class.tripleShot.UPGRADES_TIER_3.splice(Class.tripleShot.UPGRADES_TIER_3.indexOf("triplex"),1);
Class.sniper.UPGRADES_TIER_2.splice(
    Class.sniper.UPGRADES_TIER_2.indexOf("marksman"),
    1,
);
Class.sniper.UPGRADES_TIER_3.splice(
    Class.sniper.UPGRADES_TIER_3.indexOf("railgun"),
    1,
);
Class.rifle.UPGRADES_TIER_3.splice(
    Class.sniper.UPGRADES_TIER_3.indexOf("revolver"),
    1,
);
Class.hunter.UPGRADES_TIER_3.splice(
    Class.hunter.UPGRADES_TIER_3.indexOf("nimrod"),
    1,
);
Class.assassin.UPGRADES_TIER_3.splice(
    Class.assassin.UPGRADES_TIER_3.indexOf("deadeye"),
    1,
);
Class.assassin.UPGRADES_TIER_3.splice(
    Class.assassin.UPGRADES_TIER_3.indexOf("single"),
    1,
);
Class.spawner.UPGRADES_TIER_3.splice(
    Class.spawner.UPGRADES_TIER_3.indexOf("ranch"),
    1,
);
Class.auto3.UPGRADES_TIER_3.splice(
    Class.auto3.UPGRADES_TIER_3.indexOf("whirl3"),
    1,
);
Class.trapGuard.UPGRADES_TIER_3.splice(
    Class.trapGuard.UPGRADES_TIER_3.indexOf("whirlGuard"),
    1,
);
Class.hexaTank.UPGRADES_TIER_3.splice(
    Class.hexaTank.UPGRADES_TIER_3.indexOf("hexaWhirl"),
    1,
);
Class.artillery.UPGRADES_TIER_3.splice(
    Class.artillery.UPGRADES_TIER_3.indexOf("munition"),
    1,
);
Class.launcher.UPGRADES_TIER_3.splice(
    Class.launcher.UPGRADES_TIER_3.indexOf("vortex"),
    1,
);
Class.underseer.UPGRADES_TIER_3.splice(
    Class.underseer.UPGRADES_TIER_3.indexOf("prophet"),
    1,
);
if (!Class.basic.UPGRADES_TIER_3) Class.basic.UPGRADES_TIER_3 = [];
Class.basic.UPGRADES_TIER_3.push("single");
Class.smasher.UPGRADES_TIER_3.splice(
    Class.smasher.UPGRADES_TIER_3.indexOf("cocci"),
    1,
);

Class.machineGun.UPGRADES_TIER_2.push("jetLongshot", "jetTorrent");
if (!Class.machineGun.UPGRADES_TIER_3) Class.machineGun.UPGRADES_TIER_3 = [];
Class.machineGun.UPGRADES_TIER_3.push("jetHexaMachineGun");

Class.doubleTwin.UPGRADES_TIER_3.push("jetTwinFlank", "jetDoubleGunner");
Class.tripleShot.UPGRADES_TIER_3.push(
    "jetMultiShot",
    "jetBentMinigun",
    "jetBattery",
);
Class.rifle.UPGRADES_TIER_3.push(
    "jetNimrod",
    "jetQuickDraw",
    "jetAssaultRifle",
    "jetMachineRifle",
);
Class.hunter.UPGRADES_TIER_3.push("jetNimrod");
Class.assassin.UPGRADES_TIER_3.push("jetMinisassin", "jetQuickDraw");
Class.minigun.UPGRADES_TIER_3.push(
    "jetMinisassin",
    "jetBentMinigun",
    "jetSoaker",
);
Class.pounder.UPGRADES_TIER_2.push("jetCombination", "jetBurst");
Class.artillery.UPGRADES_TIER_3.push("jetBattery");
Class.gunner.UPGRADES_TIER_3.push("jetHex", "jetDoubleGunner", "jetLongGunner");
Class.jetCombination.UPGRADES_TIER_3 = ["jetFusion", "hybrid", "jetChimera"];
Class.jetLongshot.UPGRADES_TIER_3 = [
    "jetMinisassin",
    "focal",
    "jetLongGunner",
    "jetMachineRifle",
];
Class.hexaTank.UPGRADES_TIER_3.push("jetHexaMachineGun", "jetBurst");
Class.jetTorrent.UPGRADES_TIER_3 = ["jetCascade", "jetSplasher", "jetSoaker"];
Class.sprayer.UPGRADES_TIER_3.push("jetSplasher");
Class.overseer.UPGRADES_TIER_3.push("jetSilo");
Class.spawner.UPGRADES_TIER_3.push("jetTwinSpawner");
Class.desmos.UPGRADES_TIER_2.push("jetEddy");

let MAX_CHILDREN = 0,
    GUNS = [],
    TURRETS = [],
    alreadySeen = [],
    next = ["basic"],
    // We don't loop infinitely, because that's a bad idea if someone makes a circular upgrade path.
    // Also, RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD.
    limit = 1000;
while (next.length && limit--) {
    let current = next;
    next = [];
    for (let i = 0; i < current.length; i++) {
        // Handle string definition references.
        let now = ensureIsClass(current[i]);

        // Handles tanks with multiple ways to upgrade to them, like diep.io's Streamliner.
        if (alreadySeen.includes(now.LABEL)) continue;
        alreadySeen.push(now.LABEL);

        // Add guns, turrets and additional max child count to our current list of stuff for our abomination to have.
        if (now.MAX_CHILDREN) MAX_CHILDREN += now.MAX_CHILDREN;
        if (now.GUNS) GUNS.push(...now.GUNS);
        if (now.TURRETS) TURRETS.push(...now.TURRETS);

        // Add upgrades of current tank to next iteration
        for (let key of Object.keys(now))
            if (key.startsWith("UPGRADES_TIER_")) next.push(...now[key]);
    }
}

// This adds the tank to the definitions and to the fun menu
Class.jetAbomination = {
    PARENT: "genericTank",
    LABEL: "The Abomination",
    SKILL_CAP: Array(10).fill(15),
    SIZE: 15,
    BODY: {
        ACCELERATION: base.ACCEL * 0.2,
        SPEED: base.SPEED * 0.5,
        HEALTH: base.HEALTH * 5,
        DAMAGE: base.DAMAGE * 5,
        PENETRATION: base.PENETRATION * 5,
        SHIELD: base.SHIELD * 5,
        REGEN: base.REGEN * 5,
        FOV: base.FOV * 2,
        DENSITY: base.DENSITY * 5,
        PUSHABILITY: 0.1,
        HETERO: 3,
        RECOIL_MULTIPLIER: 0.1,
    },
    EXTRA_SKILL: 28,
    MAX_CHILDREN,
    GUNS,
    TURRETS,
};

Class.missile = {
    PARENT: "bullet",
    LABEL: "Missile",
    INDEPENDENT: true,
    BODY: { RANGE: 120 },
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, -2, 130, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.lowPower,
                    { speed: 1.1, maxSpeed: 1.1, reload: 0.75 },
                ]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: "thruster",
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 230, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.lowPower,
                    { speed: 1.1, maxSpeed: 1.1, reload: 0.75 },
                ]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: "thruster",
                WAIT_TO_CYCLE: true,
            },
        },
    ],
};

for (let i = 0; i < 10; i++) {
    Class.spreadshot.GUNS[i].PROPERTIES.SHOOT_SETTINGS.reload =
        Class.spreadshot.GUNS[10].PROPERTIES.SHOOT_SETTINGS.reload;
    Class.spreadshot.GUNS[i].PROPERTIES.SHOOT_SETTINGS.speed =
        Class.spreadshot.GUNS[10].PROPERTIES.SHOOT_SETTINGS.speed;
    Class.spreadshot.GUNS[i].PROPERTIES.SHOOT_SETTINGS.maxSpeed =
        Class.spreadshot.GUNS[10].PROPERTIES.SHOOT_SETTINGS.maxSpeed;
}



// Tier 1
Class.desmos = {
    PARENT: "genericTank",
    LABEL: "Desmos",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 8, -4 / 3, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g2.desmos]),
                TYPE: ["bullet", { CONTROLLERS: ['snake'] }]
            }
        },
        ...weaponMirror({
            POSITION: [3.75, 10, 2.125, 1.5, -6.25, 90, 0]
        })
    ]
};

Class.helix = {
    PARENT: "genericTank",
    LABEL: "Helix",
    DANGER: 6,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 6, -4 / 3, 0, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g2.desmos]),
                TYPE: ["bullet", { CONTROLLERS: ['snake'] }]
            },
        },
        {
            POSITION: [20, 6, -4 / 3, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g2.desmos]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { invert: true }]] }]
            },
        },
        ...weaponMirror({
            POSITION: [3.625, 7.5, 2.75, 5.75, -6.75, 90, 0],
        }),
        {
            POSITION: [6, 8, 0.25, 10.5, 0, 0, 0],
        },
    ],
};

Class.quadruplex = {
    PARENT: "genericTank",
    LABEL: "Quadruplex",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 8, -4 / 3, 0, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g2.desmos, g.twin, { reload: 1.5 }]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { invert: true, amplitude: 180, yOffset: -200 }]] }]
            }
        },
        {
            POSITION: [20, 8, -4 / 3, 0, 0, -135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g2.desmos, g.twin, { reload: 1.5 }]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { invert: true, amplitude: 180, yOffset: 100 }]] }]
            }
        },
        {
            POSITION: [20, 8, -4 / 3, 0, 0, -45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g2.desmos, g.twin, { reload: 1.5 }]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { invert: false, amplitude: 180, yOffset: 200 }]] }]
            }
        },
        {
            POSITION: [20, 8, -4 / 3, 0, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g2.desmos, g.twin, { reload: 1.5 }]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { invert: false, amplitude: 180, yOffset: -100 }]] }]
            }
        },
        ...weaponArray(weaponMirror({
            POSITION: [3.75, 10, 2.125, 1.5, 6.25, 45, 0]
        }), 4)
    ]
};


Class.triplex = {
    PARENT: "genericTank",
    LABEL: "Triplex",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [18, 7, -4 / 3, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 7, -4 / 3, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g2.desmos]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { invert: true, amplitude: 180, yOffset: -200 }]] }]
            },
        },
        {
            POSITION: [18, 7, -4 / 3, 0, 0, -45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g2.desmos]),
                TYPE: ["bullet", { CONTROLLERS: [['snake', { amplitude: 180, yOffset: 200 }]] }]
            },
        },
        ...weaponMirror([{
            POSITION: [3.75, 10, 2.125, 1, 4.25, -10, 0]
        },
        {
            POSITION: [5, 6, 0.5, 10.5, 0, 22.5, 0]
        }]),
    ]
};