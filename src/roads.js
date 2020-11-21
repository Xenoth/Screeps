const roads = {

    /**
     *
     * @param {StructureSpawn} spawn
     */
    generateRoadsLayout: function (spawn) {

        let sources = spawn.room.find(FIND_SOURCES);

        let controllerPos = spawn.room.controller.pos;

        // ROADS BETWEEN SPAWN AND SOURCES
        for (var i = 0; i < sources.length; i++) {
            let path = spawn.pos.findPathTo(sources[i].pos);
            for (var j = 0; j < path.length - 1; j++) {
                spawn.room.createConstructionSite(path[j].x, path[j].y, STRUCTURE_ROAD);
            }
        }

        // ROADS BETWEEN CONTROLLER AND SOURCES
        for (var i = 0; i < sources.length; i++) {
            let path = controllerPos.findPathTo(sources[i].pos);
            for (var j = 0; j < path.length - 1; j++) {
                spawn.room.createConstructionSite(path[j].x, path[j].y, STRUCTURE_ROAD);
            }
        }

    }
};

module.exports = roads;