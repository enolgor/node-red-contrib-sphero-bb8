'use strict'

const node = (RED) => {

    const BB8Config = function BB8Config(config){
        RED.nodes.createNode(this, config);
        this.uuid = config.uuid;
        this.name = config.name;
    }

    RED.nodes.registerType('bb8-config', BB8Config);
};

module.exports = node;