function insert(table, donnes){
    var request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };
    request.onsuccess = function(event) {
        var db = event.target.result;
        if (table === "tb_personne") {
            console.log(donnes[0],donnes[1],donnes[2],donnes[3])
            var Ajouts = {
                nom_pers: donnes[0],
                prenom_pers: donnes[1],
                dateNaiss_pers: donnes[2],
                numTelephone_pers: donnes[3]
            };
        } else if (table === "tb_voiture") {
            var Ajouts = {
                couleur: donnes[1],
                numPlaque: donnes[2],
                proprietaire: donnes[3],
                marque: donnes[4]
            }
        } else {
            var Ajouts = {
                nom_mat: donnes[1],
                quantite_mat: donnes[2]
            };
        }
        // Ajouter chaque enregistrement
        var transactionVoiture = db.transaction([table], "readwrite");
        var objectStoreVoiture = transactionVoiture.objectStore(table);
        var request = objectStoreVoiture.add(Ajouts);

        request.onerror = function (event) {
            console.log("Erreur lors de l'ajout du matériel");
        };
        console.log("Donné ajouté!");
    }
}
