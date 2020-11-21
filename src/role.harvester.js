const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.refuelling && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.refuelling = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.refuelling && creep.store.getFreeCapacity() === 0) {
            creep.memory.refuelling = true;
            creep.say('🔋 refuel');
        }

        if(creep.memory.refuelling) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleHarvester;