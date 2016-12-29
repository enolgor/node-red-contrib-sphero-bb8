'use strict'
//F6:C3:41:05:FB:75

const node = (RED) => {

    const util = require('../util')(RED);

    const BB8Init = function BB8Init(config){
        RED.nodes.createNode(this, config);

        //const bb8 = util.getBB8(this, config);

        this.on('input', msg => {

            const bb8 = util.getBB8(this, config);

            bb8.connect(()=>{
                msg.bb8 = {connected: true};
                this.send(msg);
            });

        });

    }

    RED.nodes.registerType('bb8-init', BB8Init);
};

module.exports = node;