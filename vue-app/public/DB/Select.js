/**
 * Select les donnes que l'utilisateur a choisis
 * @param table Nom de la table que l'utilisateur à choisis
 * @param condition Si l'utilisateur utilise un filtre sur quelle propriété
 * @param valeurCondition Si l'utilisateur utilise un filtre quelle valeur à-t-il choisit
 */
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


/**
 * Affiche les données que l'utilisateur à choisis et fais le filtre
 * @param data Toute les donnnées qui ont été sélétionné de la table
 * @param nomTable Le nom de la table
 * @param propriete La propriété choisis
 * @param valeurPropriete La valeur du filtre pour la propriété
 */
function afficherTablePersonne(data,nomTable,propriete,valeurPropriete) {

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


    //Fais le filtre et montre que ce que l'utilisateur à choisis et qu'elle table à-t-il choisit
    for(let i = 0; i < data.length; i++) {
        if (data[i][propriete] === valeurPropriete || valeurPropriete === 0 || formatDate(data[i].date_de_naissance) === valeurPropriete) {
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


/**
 * Fonction pour formater une date au format aaaa-mm-jj
 * @param date Date
 * @returns une date au format aaaa-mm-jj
 */
function formatDate(date) {
    let d = new Date(date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    return year + "-" + month + "-" + day ;
}
let encadreActuel = null;

/**
 * Copie et colle dans la messagerie du telephone
 * @param cellule Cellule du tableau
 * @param bouton bouton Copier
 */
function copierContenu(cellule, bouton) {
    // Sélectionnez le contenu de la cellule
    let texte = cellule.innerText;
    const textarea = document.getElementById("message-text");
    textarea.value = "";
    textarea.value += texte;
    textarea.focus();
    navigator.clipboard.writeText(texte);
    bouton.innerText = "✓";
    setTimeout(() => {
        encadreActuel.parentNode.removeChild(encadreActuel);
        encadreActuel = null;
    }, 1000);
}


/**
 * Fonction pour afficher l'encadré et le bouton "Copier"
 * @param cellule Cellule du tableau
 */
function afficherEncadre(cellule) {
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
    encadre.style.position = "absolute";
    encadre.style.top = cellule.offsetTop - scrollTop +256 + "px";
    encadre.style.left = cellule.offsetLeft+ 105 + "px";


    // Créez un bouton avec un gestionnaire d'événement pour copier le contenu
    let copierBouton = document.createElement("button");
    copierBouton.className = "BtnCopier";
    copierBouton.innerText = "Copier";
    copierBouton.onclick = function() {
        copierContenu(cellule, this);
    }

    encadre.appendChild(copierBouton);

    // Ajoutez l'encadré au-dessus de la cellule
    let Affichage = document.getElementById("resultat_requete");
    Affichage.appendChild(encadre);

    // Mettez à jour la variable encadreActuel avec le nouvel encadré
    encadreActuel = encadre;
    setTimeout(() => {
        encadreActuel.parentNode.removeChild(encadreActuel);
        encadreActuel = null;
    }, 5000);
}