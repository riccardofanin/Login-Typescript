"use strict";
exports.__esModule = true;
var readline_sync_1 = require("readline-sync");
var fs = require('fs');
var Utente = /** @class */ (function () {
    function Utente(user, pass) {
        this.username = user;
        this.password = pass;
    }
    Utente.prototype.addUtente = function () {
        var filename = "file.txt";
        var csvFormat = "\n" + this.username + ";" + this.password; // formatta i dati nel formato csv
        fs.open(filename, "a", function (err, fd) {
            if (err) {
                console.log(err.message);
            }
            else {
                fs.write(fd, csvFormat, function (err, bytes) {
                    if (err) {
                        console.log(err.message);
                    }
                });
            }
        });
    };
    return Utente;
}());
function readFile(username, password) {
    var arr;
    fs.readFile('file.txt', function (err, data) {
        if (err)
            throw err;
        arr = data.toString().replace(/\r\n/g, '\n').split('\n'); // array che contiene le righe del file
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            var splitted = i.split(';'); // divide il singolo elemento dell'array in username e password
            if (splitted[0] == username) {
                if (splitted[1] == password) // controllo password
                 {
                    console.log("Login Eseguito");
                }
                else if (splitted[1] != password) {
                    console.log("Password errata");
                }
            }
        }
    });
}
function login() {
    var username = (0, readline_sync_1.question)('Inserisci username: ');
    var password = (0, readline_sync_1.question)('Inserisci password: ');
    readFile(username, password);
}
function register() {
    var username = (0, readline_sync_1.question)('Inserisci username: ');
    var password = (0, readline_sync_1.question)('Inserisci password: ');
    var utente = new Utente(username, password);
    utente.addUtente();
    console.log("Registrazione Eseguita!");
}
function askAction() {
    var action = (0, readline_sync_1.question)('Register(R) or Login(L)');
    if (action == 'R') {
        register();
    }
    else if (action == 'L') {
        login();
    }
    else {
        askAction();
    }
}
askAction();
