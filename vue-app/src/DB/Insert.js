/**
 * Insérer une donnes que l'utilisateur à écrit.
 * @param table Nom de la table pour insérer
 * @param donnes Donnes que l'utilisateur à écrit
 */
function insert(table, donnes){
    //Ouverture de la base de Donnée
    let request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };
    request.onsuccess = function(event) {
        let db = event.target.result;
        let Ajouts;

        //Test pour voirs ce que l'utilisateur a choisis comme table
        if (table === "tb_personne") {
            let dateNaiss = new Date(donnes[2]);
            Ajouts = {
                nom: donnes[0],
                prenom: donnes[1],
                date_de_naissance: dateNaiss,
                numero_de_tel: donnes[3]
            };
        } else if (table === "tb_voiture") {
            Ajouts = {
                couleur: donnes[0],
                marque: donnes[1],
                proprietaire: donnes[2],
                numero_plaque: donnes[3]
            }
        } else {
            Ajouts = {
                nom_materiel: donnes[0],
                quantite: donnes[1]
            };
        }
        // Ajouter chaque enregistrement
        let transaction = db.transaction([table], "readwrite");
        let objectStore = transaction.objectStore(table);
        let request = objectStore.add(Ajouts);

        request.onerror = function (event) {
            const updateEvent = new CustomEvent('updateTextareaEvent', { detail: 'Erreur lors de l\'ajout' });
            window.dispatchEvent(updateEvent);
            console.log("Erreur lors de l'ajout");
        };
        request.onsuccess = function (event){
            const updateEvent = new CustomEvent('updateTextareaEvent', { detail: 'Donnée ajoutée!' });
            window.dispatchEvent(updateEvent);
            console.log("Donné ajouté!");
        };
    }
    //Enlevez l'ancienne table
    let oldTable = document.getElementById("tableHtml");
    if (oldTable) {
        oldTable.remove();
    }
}
export { insert };