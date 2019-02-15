const AWS = require('aws-sdk');
const moment = require('moment');
const mqtt = require('mqtt');

moment.locale('pt-br');

const getParameter = (param) => {
    return new Promise((resolve,reject) => {
        ssm.getParameter(param, function(err,data){
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

var paramsSSM = {
    Name: 'DATABASE_IRON',
    WithDecryption: false
};


const ssmDATABASE_URI = await getParameter(paramsSSM);

var DATABASE_IRON = config.DATABASE_IRON || process.env.DATABASE_IRON ;

if(ssmDATABASE_URI.hasOwnProperty('Parameter') && ssmDATABASE_URI['Parameter'].hasOwnProperty('Value')) {
    DATABASE_IRON = DATABASE_IRON.Parameter.Value;
}

exports.handler = async function(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    let tableName = 'gateway-ideaah-2019-02-06';
    let bodyJson = event.hasOwnProperty('body-json') ? event['body-json'] : event;
    
    const client = mqtt.connect('mqtt://ec2-34-226-107-129.compute-1.amazonaws.com:1883');

    let toawait = await new Promise((resolve,reject) => {
        client.on('connect', function () {
            //client.subscribe('/gw/ac233fc02421/faas/start', function (err) {
                //if (!err) {
                    client.publish('/gw/handleStorage/', JSON.stringify({'action':'save','refCode':'ac233fc02421'}));
                    resolve('Deu certo');
                //// } else {
                    //  reject(err);
                // }
            //})
        });
    });

    toawait = await new Promise((resolve,reject) => {
        
        try{
        client.publish('/gw/ac233fc02421/', JSON.stringify('Hello mqtt2'));
        } catch(e){cosole.log(e)}
        resolve('Deu certow');  
    
    });

    console.log(toawait)
}



/**
 * 
 * var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
 * 
 */
