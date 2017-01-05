'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8connect = function BB8connect(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {

            bb8.connect()
            .then(()=>bb8.device.stopOnDisconnect(true))
            .then(()=>{
                bb8.connected = true;
                this.send(msg);
            });

        });

    }

    RED.nodes.registerType('bb8-connect', BB8connect);
};

module.exports = node;