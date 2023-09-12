
function select(table, condition = 0, valeurCondition = 0){
    // Ouverture de la base de données "maBaseDeDonnees"
    let request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };

// Sélection des enregistrements dans la table "personne"
    request.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction([table], "readonly");
        let objectStore = transaction.objectStore(table);
        let request = objectStore.getAll();

        request.onsuccess = function(event) {
            let data = event.target.result;
            return afficherTablePersonne(data,table,condition,valeurCondition)
        };
    };
}


function afficherTablePersonne(data,nomTable,conditionl,valeurCondition) {

// Créer un nouvel élément <table>
    let table = document.createElement("table");
    table.id = "table_result";
    table.classList.add("table_result");
    if (nomTable === "tb_personne"){
        table.innerHTML = "<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th><th>Numéro de téléphone</th></tr>";
    }
    else if (nomTable === "tb_materiel"){
        table.innerHTML = "<tr><th>ID</th><th>Nom matériel</th><th>Quantite</th></tr>";
    }
    else if (nomTable === "tb_voiture"){
        table.innerHTML = "<tr><th>ID</th><th>Couleur</th><th>Plaque</th><th>Propriétaire</th><th>Marque</th></tr>";
    }


    for(let i = 0; i < data.length; i++) {
        if (data[i][conditionl] === valeurCondition || valeurCondition === 0 || formatDate(data[i].date_de_naissance) === valeurCondition) {
            let tr = document.createElement("tr");
            tr.classList.add("tr_result");
            if (nomTable === "tb_personne"){
                tr.innerHTML = "<td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].idPersonne + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].nom + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].prenom + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + formatDate(data[i].date_de_naissance) + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].numero_de_tel + "</td>";
            }
            else if (nomTable === "tb_materiel"){
                tr.innerHTML = "<td class='copie-overlay' onclick=\"afficherEncadre(this)\" >" + data[i].idMateriel + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\" >" + data[i].nom_materiel + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\" >" + data[i].quantite + "</td>";
            }
            else if (nomTable === "tb_voiture"){
                tr.innerHTML = "<td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].idVoiture + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].couleur + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].numero_plaque + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].proprietaire + "</td><td class='copie-overlay' onclick=\"afficherEncadre(this)\">" + data[i].marque + "</td>";
            }
            table.appendChild(tr);
        }
    }
    let Affichage = document.getElementById("resultat_requete");
    Affichage.appendChild(table)
}

// Fonction pour formater une date au format jj/mm/aaaa
function formatDate(date) {
    let d = new Date(date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    return year + "-" + month + "-" + day ;
}

function copierContenu(cellule) {
    console.log("Copierrr")
    // Sélectionnez le contenu de la cellule
    let texte = cellule.innerText;
    navigator.clipboard.writeText(texte)
}

let encadreActuel = null;
// Fonction pour afficher l'encadré et le bouton "Copier"
function afficherEncadre(cellule) {
    console.log("ENTRE");
    if (encadreActuel) {
        // Supprimez l'encadré actuellement affiché
        encadreActuel.parentNode.removeChild(encadreActuel);
    }

    // Créez un encadré
    let encadre = document.createElement("div");
    encadre.className = "encadrer";
    const parentTable = cellule.closest("table"); // Trouver le tableau parent
    const parentContainer = parentTable.parentElement; // Trouver le conteneur du tableau avec défilement

    const scrollTop = parentContainer.scrollTop; // Obtenez la valeur de défilement verticale
    // Positionnez l'encadrement au-dessus de la cellule
    encadre.style.position = "absolute";
    encadre.style.top = cellule.offsetTop - scrollTop +256 + "px";
    encadre.style.left = cellule.offsetLeft+ 105 + "px";
    console.log(cellule.offsetTop + "px");
    console.log(encadre.offsetHeight);
    console.log(scrollTop);

    // Créez un bouton avec un gestionnaire d'événement pour copier le contenu
    let copierBouton = document.createElement("button");
    copierBouton.innerText = "Copier";
    copierBouton.onclick = function() {
        copierContenu(cellule);
    };

    encadre.appendChild(copierBouton);

    // Ajoutez l'encadré au-dessus de la cellule
    let Affichage = document.getElementById("resultat_requete");
    Affichage.appendChild(encadre);

    // Mettez à jour la variable encadreActuel avec le nouvel encadré
    encadreActuel = encadre;
}