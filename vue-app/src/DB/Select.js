function Select(){
    // Ouverture de la base de données "maBaseDeDonnees"
    var request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };

// Sélection des enregistrements dans la table "personne"
    request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction(["tb_personne"], "readonly");
        var objectStore = transaction.objectStore("tb_personne");
        var request = objectStore.getAll();

        request.onsuccess = function(event) {
            var data = event.target.result;
            afficherTable(data,0);
        };
    };
}


function afficherTable(data,where){
    var table = document.createElement("table");
    table.innerHTML = "<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th></tr>";
    for (var i = 0; i < (data.length); i++) {
        if (data[i].idPersonne == where || data[i].nom_pers == where || data[i].prenom_pers == where || formatDate(data[i].dateNaiss_pers) == where || data[i].numTelephone_pers == where || 0 == where) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>" + data[i].idPersonne + "</td><td>" + data[i].nom_pers + "</td>" + data[i].prenom_pers + "<td>" + formatDate(data[i].dateNaiss_pers)  + "</td>"  + "<td>" + data[i].numTelephone_pers  + "</td>";
            table.appendChild(tr);
        }
    }
    document.body.appendChild(table);
}


// Fonction pour formater une date au format jj/mm/aaaa
function formatDate(date) {
    var d = new Date(date);
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    return year + "-" + day + "-" + month;
}

