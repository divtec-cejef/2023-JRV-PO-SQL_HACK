function updateRecord(tableName, id, propriete,updatedData) {
    var request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };

    request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction([tableName], "readwrite");
        var objectStore = transaction.objectStore(tableName);

        var getRequest = objectStore.get(id);

        getRequest.onsuccess = function(event) {
            var record = event.target.result;
            if (record) {
                // Effectuer les modifications sur l'enregistrement récupéré
                // en utilisant les propriétés de l'objet updatedData
                record[propriete] = updatedData;

                // Mettre à jour l'enregistrement dans le magasin d'objets
                var updateRequest = objectStore.put(record);

                updateRequest.onsuccess = function(event) {
                    console.log("Mise à jour effectuée avec succès");
                };

                updateRequest.onerror = function(event) {
                    console.log("Erreur lors de la mise à jour de l'enregistrement");
                };
            } else {
                console.log("Enregistrement non trouvé");
            }
        };

        getRequest.onerror = function(event) {
            console.log("Erreur lors de la récupération de l'enregistrement");
        };

        transaction.oncomplete = function(event) {
            db.close();
        };

        transaction.onerror = function(event) {
            console.log("Erreur de transaction");
        };
    };
}
