'use strict'

const Promise = require('bluebird');
const cp = require('child_process');
const util = require('util');
const EventEmitter = require('events').EventEmitter;
const path = require('path');

const bb8 = function bb8(uuid){
    this.uuid = uuid;
    this.connected = false;   

    this._child = null;
    this._callbacks = {};
    this._id = 0;
    this._onReady = null;
    this._onDisconnect = null;

    this._handler = data => {
        console.log(JSON.stringify(data, null ,4));
        switch(data.cmd){
            case 'ready': this._onReady(); break;
            case 'resp': this._callbacks[data.id](data); break;
            case 'event': this.emit(data.type, data.payload); break;
        }
    };

    this._sendCommand = (cmd, payload)=>{
        this._id++;
        payload = payload || null;
        return new Promise((accept, reject)=>{
            if(!this._child) reject("BB8 is not connected");
            this._child.send({cmd: cmd, payload: payload, id: this._id});
            this._callbacks[this._id] = data => {
                if(data.status === 'ok') accept(data.payload);
                else reject(data.payload);
            }
        });
    };

    this._create_child = uuid => {
        this._child = cp.fork(path.join(__dirname, './bb8-controller'), [uuid]);
        this._child.on('message', this._handler);
        this._child.on('exit', ()=>{
            if(this._onDisconnect) this._onDisconnect();
            this.emit('disconnect');
            this._child = null;
            this._callbacks = {};
            this._id = 0;
            this.onReady = null;
            this._onDisconnect = null;
        });
    }

    this.connect = () => {
        if(this._child) return new Promise((accept,reject)=>accept());
        return new Promise((accept, reject)=>{
            this._onReady = () => {
                this._sendCommand('connect').then(()=>{
                    this.connected = true;
                    this.emit('connect');
                    accept();
                }).catch(reject);
            };
            this._create_child(this.uuid);
        });
    }

    this.disconnect = () => {
        if(!this._child) return new Promise((accept,reject)=>accept());
        return new Promise((accept, reject)=>{
            this._onDisconnect = () => {
                this.connected = false;
                accept();
            };
            this._child.disconnect();
        });
    }
    
    this.exec = (cmd, ...args) => this._sendCommand(cmd, args);
}

util.inherits(bb8, EventEmitter);

module.exports = (RED) => ({
    getBB8: (node, config) => {
        const context = node.context().flow;
        const context_bb8 = context.get('bb8') || {};
        const bb8_config = RED.nodes.getNode(config.bb8);
        context_bb8[bb8_config.uuid] = context_bb8[bb8_config.uuid] || new bb8(bb8_config.uuid);
        context.set('bb8', context_bb8);
        return context_bb8[bb8_config.uuid];
    },
    BB8: bb8
});