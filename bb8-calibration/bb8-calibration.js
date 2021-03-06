'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const spheroBB8 = require('../sphero-bb8')(RED);

    const BB8Calibration = function BB8Calibration(config){
        RED.nodes.createNode(this, config);

        const bb8 = spheroBB8.getBB8(this, config);

        this.on('input', msg => {
            bb8.exec(config.calibration+'Calibration').then(() => this.send(msg)).catch(err => this.error(err));
        });
    }

    RED.nodes.registerType('bb8-calibration', BB8Calibration);
};

module.exports = node;