const ROLES = {
    DEFENDER: {
        value: 1,
        name: 'Defender'
    },
    BUILDER: {
        value: 2,
        name: 'Builder'
    },
    UPGRADER: {
        value: 3,
        name: 'Upgrader'
    },
    HARVESTER: {
        value: 4,
        name: 'Harvester'
    }
};

const BUILDINGS_MODE = {
    DEFENSE: 1,
    BUILDING: 2,
    UPGRADING: 3,
    HARVESTING: 4
};

const POPULATION_DISTRIBUTION = {
    DEFENSE: {
        DEFENDERS: 50,
        BUILDERS: 20,
        UPGRADERS: 10,
        HARVESTERS: 20,
    },
    BUILDING: {
        DEFENDERS: 10,
        BUILDERS: 60,
        UPGRADERS: 10,
        HARVESTERS: 20,
    },
    UPGRADING: {
        DEFENDERS: 10,
        BUILDERS: 10,
        UPGRADERS: 60,
        HARVESTERS: 20,
    },
    HARVESTING: {
        DEFENDERS: 10,
        BUILDERS: 10,
        UPGRADERS: 20,
        HARVESTERS: 60,
    }
};

module.exports = {ROLES,BUILDINGS_MODE,POPULATION_DISTRIBUTION};