function insert(table, donnes){
    var request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };
    request.onsuccess = function(event) {
        var db = event.target.result;
        if (table === "tb_personne") {
            console.log(donnes[0],donnes[1],donnes[2],donnes[3])
            var dateNaiss = new Date(donnes[2]);
            console.log(dateNaiss);
            console.log(formatDate(dateNaiss));
            var Ajouts = {
                nom: donnes[0],
                prenom: donnes[1],
                date_de_naissance: dateNaiss,
                numero_de_tel: donnes[3]
            };
        } else if (table === "tb_voiture") {
            var Ajouts = {
                couleur: donnes[1],
                numero_plaque: donnes[2],
                proprietaire: donnes[3],
                marque: donnes[4]
            }
        } else {
            var Ajouts = {
                nom_materiel: donnes[1],
                quantite: donnes[2]
            };
        }
        // Ajouter chaque enregistrement
        var transaction = db.transaction([table], "readwrite");
        var objectStore = transaction.objectStore(table);
        var request = objectStore.add(Ajouts);

        request.onerror = function (event) {
            console.log("Erreur lors de l'ajout");
        };
        request.onsuccess = function (event){
            console.log("Donné ajouté!");
        };
    }
}
