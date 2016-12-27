'use strict'

const node = (RED) => {

    const BB8Init = function BB8Init(config){
        RED.nodes.createNode(this, config);
        

        
    }

    RED.nodes.registerType('bb8-init', BB8Init);
};

module.exports = node;