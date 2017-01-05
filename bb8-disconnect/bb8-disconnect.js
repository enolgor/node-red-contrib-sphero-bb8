'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Disconnect = function BB8Disconnect(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {
            //bb8.disconnect().then(()=>this.send(msg));
            bb8.device.sleep(0, 0, 0).then(()=>this.send(msg));
        });

    }

    RED.nodes.registerType('bb8-disconnect', BB8Disconnect);
};

module.exports = node;