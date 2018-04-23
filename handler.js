'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  // region: 'localhost',
  // endpoint: 'http://localhost:8000'
}); // TODO remove when deploying!!

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body)
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      content: data.content
    }
  }
  // console.log(`Item: ${JSON.stringify(params.Item)}`)

  dynamodb.put(params, (error) => {
    if (error) {
      console.log('error');
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/palin' },
        body: 'Could not create note'
      });
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
  
    callback(null, response);
  });

};

module.exports.getOne = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.log('error');
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/palin' },
        body: 'Could not get note'
      });
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(response.Item)
    };

    callback(null, response);
  });
};

module.exports.getAll = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  dynamodb.scan(params, (error, result) => {
    if (error) {
      console.log('error');
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/palin' },
        body: 'Could not get all notes'
      });
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };

    callback(null, response);
  });
};

module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ':content': data.content
    },
    UpdateExpression: 'SET content = :content',
    ReturnValues: 'ALL_NEW'
  };
  
  dynamodb.update(params, (error, result) => {
    if (error) {
      console.log('error');
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/palin' },
        body: 'Could not update the note'
      });
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };

    callback(null, response);
  });
};

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamodb.delete(params, (error, result) => {
    if (error) {
      console.log('error');
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/palin' },
        body: 'Could not get delete the note'
      });
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(`Removed the note with id: ${event.pathParameters.id}`)
    };

    callback(null, response);
  });
};

