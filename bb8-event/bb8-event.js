'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Event = function BB8Event(config){
        RED.nodes.createNode(this, config);
       
        const bb8 = spheroBB8.getBB8(this, config);

        bb8.on(config.event, (data) => {
            const msg = { event: {type: config.event, datA: data }};
            this.send(msg);
        });
    }

    RED.nodes.registerType('bb8-event', BB8Event);
};

module.exports = node;