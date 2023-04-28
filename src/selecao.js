
var Firebird = require('node-firebird');
const fs = require('fs');
console.log("oi")

var options = {

    host: '127.0.0.1',
    port: 3050,
    database: 'C:\\Users\\User\\Sinsoft\\Bancos\\UNICO2023.GDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,        // default when creating database
    pageSize: 4096,        // default when creating database
    retryConnectionInterval: 1000, // reconnect interval in case of connection drop

};


let data = "";
Firebird.attach(options, function (err, db) {

    if (err)
        throw err;


    let ajuda;

    db.query(`   select   id, codigo||lpad(cadas,5,'0')||digito||lpad(nparcela,3,'0')||'2023' as txt, nossonumero from retorno_boleto_digital
    where codigo = '0000'  order by id asc`, function (err, result) {
        result.forEach((item) => {
            //console.log(item);
            item.NOSSONUMERO = item.NOSSONUMERO.toString();
            ajuda = result;
        })

        db.detach();

        for (let index = 0; index < ajuda.length; index++) {
            const element = ajuda[index];

            data = data + `update tb_aux_boleto_registrado set nosso_numero =${element.NOSSONUMERO} where txt like '%${element.TXT}%';\n`;



        }
        console.log("Aqui: " + data)
        fs.writeFile("./test.txt", data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
       
    });

    

});
