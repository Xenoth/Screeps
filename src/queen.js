const constants = require('constants');

/**
 * Calculate the amount of cost for parts recipe.
 * @param parts
 * @returns {number}
 */
function totalCost(parts) {
    var result = 0;

    parts.forEach(part => result+= BODYPART_COST[part]);

    return result;
}

/**
 * Spawning a new creep
 * @param {StructuredSpawn} spawn
 * @param {ROLES} role
 * @param {array} parts
 * @returns {number}
 */
function spawnCreep(spawn, role, parts) {
    if(spawn.room.energyAvailable < totalCost(parts))
        return -1;

    let newName = role.name + Game.time;

    spawn.spawnCreep(parts, newName, {memory: {role: role.value}});

    console.log('Spawning new ' + newName + ': ' + newName + " - [" + parts + "]");

    return 0;

}

const queen = {
    
    /** 
     * Spawner will be executed
     * @param {StructuredSpawn} spawn 
     * @param {BUILDINGS_MODE} mode
     */
    spawnCreep:function(spawn, mode) {

        const BUILDER_PARTS = [WORK , CARRY, MOVE];
        const SUPER_BUILDER_PARTS = [WORK, CARRY, MOVE, MOVE, CARRY, WORK, MOVE, WORK];

        const HARVESTER_PARTS = [WORK, CARRY, MOVE];
        const SUPER_HARVESTER_PARTS = [WORK, CARRY, MOVE, MOVE, CARRY, WORK, MOVE, WORK];

        const UPGRADER_PARTS = [WORK, CARRY, MOVE];
        const SUPER_UPGRADER_PARTS = [WORK, CARRY, MOVE, MOVE, CARRY, WORK, MOVE, WORK];

        const DEFENDER_PARTS = [ATTACK, MOVE];

        let energyCapacityAvailable = spawn.room.energyCapacityAvailable;
        let energyAvailable = spawn.room.energyAvailable;

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === constants.ROLES.HARVESTER.value);
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === constants.ROLES.BUILDER.value);
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === constants.ROLES.UPGRADER.value);
        let defenders = _.filter(Game.creeps, (creep) => creep.memory.role === constants.ROLES.DEFENDER.value);

        let totalCreepsCount = Object.keys(Game.creeps).length;
        let harvestersCount = harvesters.length;
        let buildersCount = builders.length;
        let upgradersCount = upgraders.length;
        let defendersCount = defenders.length;


        var populationDistribution;
        switch (mode) {
            case constants.BUILDINGS_MODE.DEFENSE:
                populationDistribution = constants.POPULATION_DISTRIBUTION.DEFENSE;
                break;
            case constants.BUILDINGS_MODE.HARVESTING:
                populationDistribution = constants.POPULATION_DISTRIBUTION.HARVESTING;
                break;
            case constants.BUILDINGS_MODE.BUILDING:
                populationDistribution = constants.POPULATION_DISTRIBUTION.BUILDING;
                break;
            case constants.BUILDINGS_MODE.UPGRADING:
                populationDistribution = constants.POPULATION_DISTRIBUTION.UPGRADING;
                break;
        }

        if(spawn.spawning) {
            let spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
        else {
            if(spawn.room.find(FIND_HOSTILE_CREEPS).length > 0) {
                console.log("ALERT - ENNEMY DETECTED, HIGH PRIORITY TO DEFENDERS");
                spawnCreep(spawn, constants.ROLES.DEFENDER, DEFENDER_PARTS);
            }
            if((harvestersCount / totalCreepsCount) * 100 < populationDistribution.HARVESTERS) {
                if(energyCapacityAvailable >= totalCost(SUPER_HARVESTER_PARTS) && harvestersCount > 0) {
                    spawnCreep(spawn, constants.ROLES.HARVESTER, SUPER_HARVESTER_PARTS);
                } else if (energyAvailable >= totalCost(HARVESTER_PARTS)) {
                    spawnCreep(spawn, constants.ROLES.HARVESTER, HARVESTER_PARTS);
                }

            } else if((upgradersCount / totalCreepsCount) * 100 < populationDistribution.UPGRADERS) {
                if(energyCapacityAvailable >= totalCost(SUPER_UPGRADER_PARTS) && upgradersCount > 0) {
                    spawnCreep(spawn, constants.ROLES.UPGRADER, SUPER_UPGRADER_PARTS);
                } else if (energyAvailable >= totalCost(UPGRADER_PARTS)) {
                    spawnCreep(spawn, constants.ROLES.UPGRADER, UPGRADER_PARTS);
                }

            } else if ((buildersCount / totalCreepsCount) * 100 < populationDistribution.BUILDERS) {
                if(energyCapacityAvailable >= totalCost(SUPER_BUILDER_PARTS) > 0 && buildersCount > 0) {
                    spawnCreep(spawn, constants.ROLES.BUILDER, SUPER_BUILDER_PARTS);
                } else if (energyAvailable >= totalCost(BUILDER_PARTS)) {
                    spawnCreep(spawn, constants.ROLES.BUILDER, BUILDER_PARTS);
                }
            } else if ((defendersCount / totalCreepsCount) * 100 < populationDistribution.DEFENDERS) {
                if (energyAvailable >= totalCost(DEFENDER_PARTS)) {
                    spawnCreep(spawn, constants.ROLES.DEFENDER, DEFENDER_PARTS);
                }
            } else {
                switch (mode) {
                    case constants.BUILDINGS_MODE.UPGRADING:
                        if(energyCapacityAvailable >= totalCost(SUPER_UPGRADER_PARTS) && upgradersCount > 0) {
                            spawnCreep(spawn, constants.ROLES.UPGRADER, SUPER_UPGRADER_PARTS);
                        } else if (energyAvailable >= totalCost(UPGRADER_PARTS)) {
                            spawnCreep(spawn, constants.ROLES.UPGRADER, UPGRADER_PARTS);
                        }
                        break;
                    case constants.BUILDINGS_MODE.BUILDING:
                        if(energyCapacityAvailable >= totalCost(SUPER_BUILDER_PARTS) > 0 && buildersCount > 0) {
                            spawnCreep(spawn, constants.ROLES.BUILDER, SUPER_BUILDER_PARTS);
                        } else if (energyAvailable >= totalCost(BUILDER_PARTS)) {
                            spawnCreep(spawn, constants.ROLES.BUILDER, BUILDER_PARTS);
                        }
                        break;
                    case constants.BUILDINGS_MODE.DEFENSE:
                        if(energyCapacityAvailable >= totalCost(SUPER_BUILDER_PARTS) > 0 && buildersCount > 0) {
                            spawnCreep(spawn, constants.ROLES.DEFENDER, SUPER_BUILDER_PARTS);
                        } else if (energyAvailable >= totalCost(BUILDER_PARTS)) {
                            spawnCreep(spawn, constants.ROLES.DEFENDER, BUILDER_PARTS);
                        }
                        break;
                    default:
                        if(energyCapacityAvailable >= totalCost(SUPER_HARVESTER_PARTS) && harvestersCount > 0) {
                            spawnCreep(spawn, constants.ROLES.HARVESTER, SUPER_HARVESTER_PARTS);
                        } else if (energyAvailable >= totalCost(HARVESTER_PARTS)) {
                            spawnCreep(spawn, constants.ROLES.HARVESTER, HARVESTER_PARTS);
                        }
                        break;
                }
            }
        }
    }
};

module.exports = queen;


