
var Firebird = require('node-firebird');



var options = {

    host: '127.0.0.1',
    port: 3050,
    database: 'C:\\Users\\User\\Desktop\\Firebirs_Exemplos\\node_firebird\\PESSOAS.FDB',
    user: 'SYSDBA',
    password: 'teste',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,        // default when creating database
    pageSize: 4096,        // default when creating database
    retryConnectionInterval: 1000, // reconnect interval in case of connection drop

};



const id = 4;
const nome = "Isabela";
const cpf = "11122233380"

Firebird.attach(options, function (err, db) {

    if (err)
        throw err;

    // db = DATABASE




    db.query(`insert into pessoa(id, cpf,nome) values(${id}, '${cpf}','${nome}') RETURNING nome`, function (err, result) {
        console.log(err);
        console.log(result);
        
        db.detach();
    });




});
