
function select(table, condition = 0, valeurCondition = 0){
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
            afficherTablePersonne(data,table,condition,valeurCondition)
        };
    };
}


function afficherTablePersonne(data,nomTable,conditionl,valeurCondition) {
    // Supprimer l'ancienne table s'il en existe une
    var oldTable = document.getElementById("tableHtml");
    if (oldTable) {
        oldTable.remove();
    }

    // Créer un nouvel élément <table>
    var table = document.createElement("table");
    table.id = "tableHtml";
    if (nomTable === "tb_personne"){
        table.innerHTML = "<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th><th>Numéro de téléphone</th></tr>";
    }
    else if (nomTable === "tb_materiel"){
        table.innerHTML = "<tr><th>ID</th><th>Nom matériel</th><th>Quantite</th></tr>";
    }
    else if (nomTable === "tb_voiture"){
        table.innerHTML = "<tr><th>ID</th><th>Couleur</th><th>plaque</th><th>Propriétaire</th><th>Marque</th></tr>";
    }


    for (var i = 0; i < data.length; i++) {
        if (data[i][conditionl] === valeurCondition || valeurCondition === 0) {
            var tr = document.createElement("tr");
            if (nomTable === "tb_personne"){
                tr.innerHTML = "<td>" + data[i].idPersonne + "</td><td>" + data[i].nom + "</td><td>" + data[i].prenom + "</td><td>" + formatDate(data[i].date_de_naissance) + "</td><td>" + data[i].numero_de_tel + "</td>";
            }
            else if (nomTable === "tb_materiel"){
                tr.innerHTML = "<td>" + data[i].idMateriel + "</td><td>" + data[i].nom_materiel + "</td>" + data[i].quantite + "<td>";
            }
            else if (nomTable === "tb_voiture"){
                tr.innerHTML = "<td>" + data[i].idVoiture + "</td><td>" + data[i].couleur + "</td><td>" + data[i].numero_plaque + "</td><td>" + data[i].proprietaire + "</td><td>" + data[i].marque + "</td>";
            }
            table.appendChild(tr);
        }
    }

    // Ajouter la nouvelle table au document body
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




