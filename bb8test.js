const BB8 = require('./sphero-bb8')(null).BB8;

const bb8 = new BB8('F6:C3:41:05:FB:75');

bb8.connect()
.then(()=>{
  console.log("connected");
}).catch(console.log);
