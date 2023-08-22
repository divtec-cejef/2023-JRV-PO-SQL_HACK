function update(tableName,  id, propriete, updatedData) {
    console.log("id" + id)
    let request = window.indexedDB.open("maBaseDeDonnees");
    request.onsuccess = function (event) {
        console.log("Ouverture de la base de donné");
    };

    request.onerror = function (event) {
        console.log("Erreur d'ouverture de la base de données");
    };

    request.onsuccess = function (event) {
        console.log(id)
        console.log(tableName)
        let db = event.target.result;
        let transaction = db.transaction([tableName], "readwrite");
        let objectStore = transaction.objectStore(tableName);
        let getRequest = objectStore.get(id);
        console.log(getRequest);
        console.log(tableName, id, propriete, updatedData);
        getRequest.onsuccess = function (event) {
            let record = event.target.result;
            console.log(record)
            if (record) {
                if (propriete === "date_de_naissance"){
                    let dateNaiss = new Date(updatedData);
                    record[propriete] = formatDate(dateNaiss);
                }else{
                    // Effectuer les modifications sur l'enregistrement récupéré
                    // en utilisant les propriétés de l'objet updatedData
                    record[propriete] = updatedData;
                }
                // Mettre à jour l'enregistrement dans le magasin d'objets
                let updateRequest = objectStore.put(record);

                updateRequest.onsuccess = function (event) {
                    console.log("Mise à jour effectuée avec succès");
                };

                updateRequest.onerror = function (event) {
                    console.log("Erreur lors de la mise à jour de l'enregistrement");
                };
            } else {
                   console.log("Enregistrement non trouvé");
            }
        };

        getRequest.onerror = function (event) {
            console.log("Erreur lors de la récupération de l'enregistrement");
        };
        transaction.oncomplete = function (event) {
            db.close();
        };
        transaction.onerror = function (event) {
            console.log("Erreur de transaction");
        };
    };
    let oldTable = document.getElementById("tableHtml");
    if (oldTable) {
        oldTable.remove();
    }
}
