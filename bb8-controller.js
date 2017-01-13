'use strict'

const sphero = require('sphero');
const Promise = require('bluebird');

const uuid = process.argv[2];

const bb8 = sphero(uuid);

const resp = {
    ok: (id, payload) => {
        payload = payload || null;
        process.send({
            cmd: 'resp',
            id: id,
            payload: payload,
            status: 'ok'
        });
    },
    err: (id, payload) => {
        payload = payload || null;
        process.send({
            cmd: 'resp',
            id: id,
            payload: payload,
            status: 'err'
        });
    }
};

const event = (type, data) => {
    process.send({
        cmd: 'event',
        type: type,
        payload: data
    });
}
const delay = ms => new Promise((accept, reject) => setTimeout(accept, ms));

const handler = {};

handler.connect = () => bb8.connect().then(()=>bb8.stopOnDisconnect(true)).then(()=>bb8.detectCollisions({device: 'bb8'}));
handler.disconnect = () => bb8.sleep(0,0,0).then(process.exit).catch(process.exit);

handler.action = {};
handler.action.yes = () =>
    bb8.setRawMotors({lmode: 1, lpower: 80, rmode: 1, rpower: 80}).then(()=>delay(100))
    .then(()=>bb8.setRawMotors({lmode: 2, lpower: 80, rmode: 2, rpower: 80})).then(()=>delay(100))
    .then(()=>bb8.setRawMotors({lmode: 1, lpower: 80, rmode: 1, rpower: 80})).then(()=>delay(100))
    .then(()=>bb8.setRawMotors({lmode: 0, lpower:  0, rmode: 0, rpower:  0}))
    .then(()=>bb8.setStabilization(1));
handler.action.no = () =>
    bb8.roll(0,45).then(()=>delay(200))
    .then(()=>bb8.roll(0,315)).then(()=>delay(200))
    .then(()=>bb8.roll(0,45)).then(()=>delay(200))
    .then(()=>bb8.roll(0,315)).then(()=>delay(200))
    .then(()=>bb8.roll(0,45)).then(()=>delay(200))
    .then(()=>bb8.roll(0,315)).then(()=>delay(200))
    .then(()=>bb8.roll(0,0));


process.on('message', data => {
    console.log(JSON.stringify(data, null, 4));
    switch(data.cmd){
        case 'connect': handler.connect().then(()=>resp.ok(data.id)).catch(()=>resp.err(data.id)); break;
        case 'disconnect': handler.disconnect(); break;
        case 'action': handler.action[data.payload]().then(payload => resp.ok(data.id, payload)).catch(payload => resp.err(data.id, payload)); break;
        default: bb8[data.cmd](...data.payload).then(payload => resp.ok(data.id, payload)).catch(payload => resp.err(data.id, payload)); break;
    }
});

bb8.on('collision', data => event('collision', data));

bb8.on('freefall', data => {
    console.log("freefall");
    console.log(JSON.stringify(data));
});

bb8.on('landed', data => {
    console.log("landed");
    console.log(JSON.stringify(data));
});

bb8.on('battery', ()=>{

});

bb8.on('preSleepWarning', ()=>{

});

bb8.on('gyroAxisExceeded', ()=>{

});

process.on('disconnect', handler.disconnect);

process.send({cmd: 'ready'});