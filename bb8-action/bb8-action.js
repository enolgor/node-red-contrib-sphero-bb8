'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Action = function BB8Action(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {
            const action = config.action;
            bb8.exec('action', action).then(() => this.send(msg)).catch(err => this.error(err));
        });
    }

    RED.nodes.registerType('bb8-action', BB8Action);
};

module.exports = node;