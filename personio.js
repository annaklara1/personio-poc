'use strict';

// load AWS SDK module, which is always included in the runtime environment
const AWS = require('aws-sdk'); 

module.exports = {

    api: new AWS.Service({
 
        // the API base URL
        endpoint: 'https://api.personio.de/v1',
    
        convertResponseTypes: false,
    
        apiConfig: {
            metadata: {
                protocol: 'rest-json' 
            },

            operations: {
                // API authentication endpoint
                Authenticate: {
                    http: {
                        method: 'POST',
                        requestUri: '/auth'
                    },
                    input: {
                        type: 'structure',
                        required: [ 'client_id', 'client_secret' ],
                        members: {
                            'client_id': {
                                location: 'querystring',
                                locationName: 'client_id',
                                sensitive: true
                            },
                            'client_secret': {
                                location: 'querystring',
                                locationName: 'client_secret',
                                sensitive: true
                            }
                        }
                    }
                },
     
                 // get a record by id
                GetEmployee: {
                    http: {
                        method: 'GET',
                        requestUri: '/company/employees/{employee_id}'
                    },
                    input: {
                        type: 'structure',
                        required: [ 'auth', 'employeeId' ],
                        members: {
                            'auth': {
                                location: 'header',
                                locationName: 'Authorization',
                                sensitive: true
                            },
                            'employeeId': {
                                type: 'integer',
                                location: 'uri',
                                locationName: 'employee_id'
                            }
                        }
                    }
                }
            }
        }
    })
    
};
