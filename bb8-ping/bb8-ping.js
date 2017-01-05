'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Ping = function BB8Ping(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {
            bb8.connect(()=>this.send(msg));
        });

    }

    RED.nodes.registerType('bb8-ping', BB8Ping);
};

module.exports = node;