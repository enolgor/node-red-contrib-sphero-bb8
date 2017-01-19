# node-red-contrib-sphero-bb8

This library has a collection of nodes for [Node-RED](https://nodered.org/) to control your [sphero bb8 robot](http://www.sphero.com/starwars/bb8).

## Installation

Run the following command in the root directory of your Node-RED installation or in your homde directory (usually ~/.node-red)

`npm install node-red-contrib-sphero-bb8`

*NOTE: This library uses the [orbotix sphero.js library](https://github.com/orbotix/sphero.js) and [noble bluetooth library](https://github.com/sandeepmistry/noble). Refer to their pages for installation details.*
*The noble libary installation might fail if the distribution is not supported or if it throws compilation errors.*
*This library has been tested under ubuntu-16.04 and node v6.9.4*

## Usage

First of all, you need to find out your BB8 bluetooth UUID. After installing this library execute the following command to discover near BLE devices:

`node ~/.node-red/node_modules/node-red-contrib-sphero-bb8/node_modules/noble/examples/peripheral-explorer.js`

Place the any node from the *bb8* palette section and configure your BB8 robot using its BLE UUID, all nodes can use the BB8 configuration.

## License

Copyright (c) 2017 Eneko Olivares Gorriti [<enolgor@teleco.upv.es>](enolgor@teleco.upv.es).

Licensed under the MIT license. For more details, see the LICENSE file.