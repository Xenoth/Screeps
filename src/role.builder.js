const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                const target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: function (object) {
                        return object.hits < object.hitsMax;
                    }
                });
                if (target) {
                    if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function (object) {
                            return object.structureType === STRUCTURE_ROAD
                                && (object.hits < object.hitsMax);
                        }

                    });
                    if (target) {
                        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            }
        } else {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;