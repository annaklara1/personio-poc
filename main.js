'use strict';

// define our target API as a "service"
const personio = require('./personio');
const { Pool} = require('pg');

// Establisch database connection pool
const pool = new Pool()

// disable AWS region related login in the SDK
personio.api.isGlobalEndpoint = true;

// and now we can call our target API!
exports.handler = function(event, context, callback) {
    // Fetch personio token
    personio.api.authenticate({
        client_id: process.env.PERSONIO_CLIENT_ID,
        client_secret: process.env.PERSONIO_CLIENT_SECRET
    }, (err, data) => {
 
        if (err) {
            console.error('>>> login error:', err.message);
            return callback(err);
        }
        
        // get employee with ID
        personio.api.getEmployee({
            auth: `Bearer ${data.data.token}`,
            employeeId: 817057
        }, (err, data) => {
            if (err) {
                console.error('>>> operation error:', err.message);
                return callback(err);
            }
 

            // process response

            var person = data.data.attributes;
            pool.query('INSERT INTO person (employee_id, vorname, nachname, email) VALUES ($1, $2, $3, $4);', 
                [person.id.value, person.first_name.value, person.last_name.value, person.email.value])

            .then(res => {
                callback();
            })

            .catch(e => setImmediate(() => { throw e }))

            var probationEnd = new Date(person.probation_period_end.value);
            var now = new Date();
            var probation =  (now > probationEnd ? false : true);

            pool.query('INSERT INTO arbeitsvertrag (ist_probezeit) VALUES ($1);', [probation])

            .then(res => {
                callback();
            })
            
            .catch(e => setImmediate(() => { throw e }))

        });
    });
};