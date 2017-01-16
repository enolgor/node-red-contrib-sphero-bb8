'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Roll = function BB8Roll(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {
            const speed = msg.speed || config.speed;
            const heading = msg.heading || config.heading;
            bb8.exec('roll', speed, heading).then(() => this.send(msg)).catch(err => this.error(err));;
        });

    }

    RED.nodes.registerType('bb8-roll', BB8Roll);
};

module.exports = node;