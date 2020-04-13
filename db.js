const aws = require('aws-sdk');

 module.exports.makeConnection = () => {
    if(IS_OFFLINE === 'true'){
      return   new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      }) ;
    }
    return new AWS.DynamoDB.DocumentClient();   
 }