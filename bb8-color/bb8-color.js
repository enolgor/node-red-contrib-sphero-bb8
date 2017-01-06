'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Color = function BB8Color(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {
            const color = msg.color || config.color;
            bb8.exec('color', color).then(() => this.send(msg));
        });

    }

    RED.nodes.registerType('bb8-color', BB8Color);
};

module.exports = node;