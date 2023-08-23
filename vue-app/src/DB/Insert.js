function insert(table, donnes){
    let request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };
    request.onsuccess = function(event) {
        let db = event.target.result;
        let Ajouts;
        if (table === "tb_personne") {
            console.log(donnes[0],donnes[1],donnes[2],donnes[3])
            let dateNaiss = new Date(donnes[2]);
            console.log(dateNaiss);
            console.log(formatDate(dateNaiss));
            Ajouts = {
                nom: donnes[0],
                prenom: donnes[1],
                date_de_naissance: dateNaiss,
                numero_de_tel: donnes[3]
            };
        } else if (table === "tb_voiture") {
            Ajouts = {
                couleur: donnes[0],
                numero_plaque: donnes[1],
                proprietaire: donnes[2],
                marque: donnes[3]
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
            console.log("Erreur lors de l'ajout");
        };
        request.onsuccess = function (event){
            console.log("Donné ajouté!");
        };
    }
    let oldTable = document.getElementById("tableHtml");
    if (oldTable) {
        oldTable.remove();
    }
}
