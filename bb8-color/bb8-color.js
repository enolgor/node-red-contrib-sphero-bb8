'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const util = require('../util')(RED);

    const BB8Color = function BB8Color(config){
        RED.nodes.createNode(this, config);

        const default_color = config.color;
        
        this.on('input', msg => {

            const bb8 = util.getBB8(this, config);

            bb8.color(msg.color || default_color, () => this.send(msg));

        });

    }

    RED.nodes.registerType('bb8-color', BB8Color);
};

module.exports = node;