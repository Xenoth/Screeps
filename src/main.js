const constants = require('constants');

const garbageCollector = require('garbageCollector');

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleDefender = require('role.defender');

const queen = require('queen');

const roads = require('roads');

module.exports.loop = function () {

    //should be executed once
    if(!Game.spawns["Spawn1"].memory.roadsBuilded) {
        roads.generateRoadsLayout(Game.spawns["Spawn1"]);
        spawn.memory.roadsBuilded = true;
    }

    garbageCollector.clear();
    queen.spawnCreep(Game.spawns["Spawn1"], Game.spawns["Spawn1"].memory.mode);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case constants.ROLES.DEFENDER.value:
                roleDefender.run(creep);
                break;
            case constants.ROLES.UPGRADER.value:
                roleUpgrader.run(creep);
                break;
            case constants.ROLES.BUILDER.value:
                roleBuilder.run(creep);
                break;
            case constants.ROLES.HARVESTER.value:
                roleHarvester.run(creep);
                break;
            default:
                creep.suicide();
        }
    }
};