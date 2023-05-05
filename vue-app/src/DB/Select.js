function Select(){
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
}

function afficherTable(data){
    var table = document.createElement("table");
    table.innerHTML = "<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th></tr>";
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + data[i].id + "</td><td>" + data[i].nom + "</td>" + data[i].prenom + "<td>" + formatDate(data[i].dateNaissance)  + "</td>";
        table.appendChild(tr);
    };
    document.body.appendChild(table);
}


// Fonction pour formater une date au format jj/mm/aaaa
function formatDate(date) {
    var d = new Date(date);
    console.log(d)
    var day = ("0" + d.getDate()).slice(-2);
    console.log(day)
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    console.log(month)
    var year = d.getFullYear();
    console.log(year)
    return year + "-" + day + "-" + month;
}

