// aLert("Hello world");  Kommentare hier ausschalten mit Edit Toggle Line Comment

// let message = " Hello World ";
// alert(message);
// message = "Hallo Welt";
// alert(message);

const LINK_COLOR = "#ff000";
console.log("Link bitte in der Farbe", LINK_COLOR);
// f12 im Firefox drücken --> Konsole ist Developer Tools

let highscore = 520233
console.log(highscore / 10);
// numerische Variable

let firstname = "John";
let lastname = 'Smith';
console.log("Name: ", firstname, lastname);
//Zeichenketten mit Anführungszeichen einfach oder doppelt - egal

let fullname = 'Jeffrey "The Dude" Lebowski';
console.log(fullname);
// zur Anschauung, dass beide Anführungszeichenarten verwendet werden können

let template = `Dein Highscore sind ${highscore} Punkte`;
console.log(template);
// wenns einen Fehler gibt, zeigt die Konsole an, in welcher Zeile
//nur mit backticks wird $ als Variable interpretiert

let isOver18 = true;
console.log(isOver18);
//minus nicht verwenden in der Programmiersprache, deswegen Unterstrich oder Großbuchstanben verwenden

let age = 17;
console.log("über 18?", age > 18);
//Inhalt der Variable wird überprüft

let participants = ["John", "Jane", "Max"];
console.log(participants);
console.log("Einträge im Array: ", participants.length);
console.log(participants[1]);
//bei Arrays fängt die Zählung bei 0 an, deshalb wird in Konsole Jane angezeigt

let gameHighscores = [2099, 3010, 3333, 5000];
console.log(gameHighscores);

//Objekte mit geschwungener Klammer, unterschiedliche Properties/Eigenschaften zusammenfassen
let user = {
    firstname: "John",
    lastname: "Smith",
    age: 25
};

console.log(user);
console.log(user.firstname);
user.highscore = 200;
console.log(user);
user["highscore ever"] = 400;
console.log(user);

// Rechnen
let a = 2;
let b = 4;
console.log(a + b);
console.log(b / (a - 1));
a++;
console.log(a);

//if-Abfrage
// let myAge = prompt("Wie alt bist du?");
// console.log(`Du bist ${myAge} Jahre alt.`);
// console.log(`über 18? ${myAge > 18}`);

// if (myAge > 18) {
//     console.log("Glückwunsch über 18");
// } else {
//     console.log("Leider unter 18");
// }

//Schleifen: for Schleife / i=Variable, 10 Durchläufe
for (let i = 0; i < 10; i++) {
    console.log(`Schleife ${i}`);
}

//Schleife über Array drüberlaufen lassen, Zählervariable auf 0 gesetzt
for (let j = 0; j < participants.length; j++) {
    const participant = participants[j];
    console.log(`Teilnehmer*in ${j} ${participant}`);
}

participants.forEach(participant => {
    console.log(`Teilnehmer*in ${participant}`);
});


//Funktionen

function showAge(birthYear) {
    console.log(`Du bist ca. ${2020 - birthYear} Jahre alt.`);
}

showAge(1995);
showAge(1927);

function calcAge(birthYear) {
    return 2020 - birthYear;
}

console.log(`Max ist ${calcAge (1977)} Jahre alt (ca.)`);
console.log(`Jackie ist ${calcAge (1995)} Jahre alt (ca.)`);

let birthYears = [1927, 1964, 1980, 1995, 2004];
console.log(birthYears);

birthYears.forEach(year => {
    console.log(`Geboren ${year}, heute ca. ${calcAge(year)} Jahre alt.`);
});

let users = [{
        firstname: "John",
        lastname: "Smith",
        birthYear: 1960
    },
    {
        firstname: "Jackie",
        lastname: "Kowalski",
        birthYear: 1995
    },
    {
        firstname: "Max",
        lastname: "Mustermann",
        birthYear: 2001
    },
];

console.log(users);

users.forEach(users => {
    console.log(`${user.firstname} ist oder wird heuer ${calcAge(user.birthYear)} Jahre alt.`);
});
//letztes nochmal anschauen!!!



//html mit Konsole verlinken, danach Auswahl der Absätze möglich
let firstParagraph = document.querySelector("#pFirst");
console.log(firstParagraph);
// firstParagraph.remove();
firstParagraph.innerHTML = "Test";
firstParagraph.style.color = "red";


let indetedParas = document.querySelectorAll(".indent");
console.log(indetedParas);

indetedParas.forEach((para, index) => {
    console.log(`Data attribut LAT ${para.dataset.lat}`)
        para.innerHTML = `Absatz ${index}`;
        if ( index % 2 == 0) {
            para.style.color = "red";
        } else {
            para.style.color = "blue";
        }
        // beim if: jedes zweite wird rot angezeigt
});




