'use strict'

const sphero = require('sphero');

module.exports = (RED) => ({
    getBB8: (node, config) => {
        const context = node.context().flow;
        const context_bb8 = context.get('bb8') || {};
        const bb8_config = RED.nodes.getNode(config.bb8);
        context_bb8[bb8_config.uuid] = context_bb8[bb8_config.uuid] || sphero(bb8_config.uuid);
        context.set('bb8', context_bb8);
        return context_bb8[bb8_config.uuid];
    }
});