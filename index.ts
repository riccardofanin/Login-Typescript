import { arch } from "os";
import { question } from "readline-sync";
const fs = require('fs');

class Utente{ // oggetto che rapprenta un utente

    private username: string;
    private password: string;

    constructor(user, pass){
        this.username = user;
        this.password = pass;
    }

    addUtente() // funzione che aggiunge l'utente al file
    {
        const filename = "file.txt";
        const csvFormat = "\n" + this.username + ";" + this.password // formatta i dati nel formato csv
           
        fs.open(filename, "a", (err, fd)=>{ // apre il  file
            if(err){
                console.log(err.message);
            }else{
                fs.write(fd, csvFormat, (err, bytes)=>{ // scrive nel file i dati
                    if(err){
                        console.log(err.message);
                    }
                })        
            }
        })
    }
}


function readFile(username, password) // funzione che esegue il controllo della password
{
    var arr;
    fs.readFile('file.txt', function(err, data) {
        if(err) throw err;
    
        arr = data.toString().replace(/\r\n/g,'\n').split('\n'); // array che contiene le righe del file

        for(var i of arr)
        {            
            var splitted = i.split(';') // divide il singolo elemento dell'array in username e password
            if(splitted[0] == username)
            {
                if(splitted[1] == password) // controllo password
                {
                    console.log("Login Eseguito");
                }
                else if(splitted[1] != password)
                {
                    console.log("Password errata");
                }
            }
        }
   
    });
}

function login() // funzione di login che richiede i dati
{
    var username = question('Inserisci username: ');
    var password = question('Inserisci password: ');

    readFile(username, password);
}

function register() // funzione di register che aggiunge i dati al file
{
    var username = question('Inserisci username: ');
    var password = question('Inserisci password: ')
    var utente = new Utente(username, password);

    utente.addUtente();
    console.log("Registrazione Eseguita!");
}

function askAction() { // funzione che chide all'utente quale azione vuole compiere
    var action = question('Register(R) or Login(L)');

    if(action == 'R') {
        register();
    }
    else if(action == 'L'){
        login();
    }
    else{
        askAction();
    }

}

askAction();