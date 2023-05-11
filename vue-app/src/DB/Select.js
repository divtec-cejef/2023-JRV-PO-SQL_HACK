function select(table, condition, valeurCondition){
    // Ouverture de la base de données "maBaseDeDonnees"
    var request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };

// Sélection des enregistrements dans la table "personne"
    request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction([table], "readonly");
        var objectStore = transaction.objectStore(table);
        var request = objectStore.getAll();

        request.onsuccess = function(event) {
            var data = event.target.result;
            if (table === "tb_personne"){
                afficherTablePersonne(data, condition, valeurCondition)
            }
            if (table ==="tb_materiel"){
                afficherTableMat(data, condition, valeurCondition)
            }
            if (table === "tb_voiture"){
                afficherTableVoiture(data, condition, valeurCondition)
            }
        };
    };
}


function afficherTablePersonne(data, condition, valeurCondition){
    var table = document.createElement("table");
    table.innerHTML = "<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th></tr>";
    for (var i = 0; i < (data.length); i++) {
        if (data[i].condition === valeurCondition || 0 === valeurCondition  ) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>" + data[i].idPersonne + "</td><td>" + data[i].nom_pers + "</td>" + data[i].prenom_pers + "<td>" + formatDate(data[i].dateNaiss_pers)  + "</td>"  + "<td>" + data[i].numTelephone_pers  + "</td>";
            table.appendChild(tr);
        }
    }
    document.body.appendChild(table);
}

function afficherTableMat(data,where){
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>ID</th><th>Nom matériel</th><th>Quantite</th></tr>";
    for (var i = 0; i < (data.length); i++) {
        if (data[i].idMateriel === where || data[i].nom_mat === where || data[i].quantite_mat === where || 0 === where) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>" + data[i].idMateriel + "</td><td>" + data[i].nom_mat + "</td>" + data[i].quantite_mat + "<td>";
            table.appendChild(tr);
        }
    }
    document.body.appendChild(table);
}

function afficherTableVoiture(data,where){
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>ID</th><th>Couleur</th><th>Numéro de plaque</th><th>Propriétaire</th><th>Marque</th></tr>";
    for (var i = 0; i < (data.length); i++) {
        if (data[i].idVoiture === where || data[i].couleur === where || data[i].numPlaque === where || data[i].proprietaire === where || data[i].marque === where || 0 === where) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>" + data[i].idVoiture + "</td><td>" + data[i].couleur + "</td>" + data[i].numPlaque + "<td>" + "</td>" + data[i].proprietaire + "<td>" + "</td>" + data[i].marque + "<td>";
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

