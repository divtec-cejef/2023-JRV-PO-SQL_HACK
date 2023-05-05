// Ouverture de la base de données "maBaseDeDonnees"
var request = window.indexedDB.open("maBaseDeDonnees");

request.onerror = function(event) {
    console.log("Erreur d'ouverture de la base de données");
};

// Sélection des enregistrements dans la table "personne"
request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(["personne"], "readonly");
    var objectStore = transaction.objectStore("personne");
    var request = objectStore.getAll();

    request.onsuccess = function(event) {
        var data = event.target.result;
        afficherTable(data);
    };
};

// Affichage des enregistrements dans un tableau HTML
function afficherTable(data) {
    var table = document.getElementById("table_personnes");
    var tbody = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < data.length; i++) {
        var row = tbody.insertRow(i);
        row.insertCell(0).textContent = data[i].id;
        row.insertCell(1).textContent = data[i].nom;
        row.insertCell(2).textContent = data[i].prenom;
        row.insertCell(3).textContent = formatDate(data[i].date);
    }
}

// Fonction pour formater une date au format jj/mm/aaaa
function formatDate(date) {
    var d = new Date(date);
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    return day + "/" + month + "/" + year;
}
