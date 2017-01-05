'use strict'

const sphero = require('sphero');
const Promise = require('bluebird');
const Adaptor = require('./ble-adaptor');

const bb8 = function bb8(uuid){
    this.uuid = uuid;
    this.device = null;
    this.connected = false;
    this.connect = () => {
        if(this.device){
            return new Promise((accept,reject)=>{
                this.device.connection._connectBLE(accept);
            });
        }
        this.device = sphero(this.uuid, {adaptor: new Adaptor(this.uuid)});
        return this.device.connect();
    }
    this.disconnect = () => {
        return new Promise((accept, reject)=>{
            this.device.connection.peripheral.disconnect((err)=>{
                if(err){
                    reject();
                    return;
                }
                this.connected = false;
                accept();
            });
        });
    }
}

module.exports = (RED) => ({
    getBB8: (node, config) => {
        const context = node.context().flow;
        const context_bb8 = context.get('bb8') || {};
        const bb8_config = RED.nodes.getNode(config.bb8);
        context_bb8[bb8_config.uuid] = context_bb8[bb8_config.uuid] || new bb8(bb8_config.uuid);
        context.set('bb8', context_bb8);
        return context_bb8[bb8_config.uuid];
    }
});