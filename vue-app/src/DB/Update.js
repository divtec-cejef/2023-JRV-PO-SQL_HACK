/**
 * Modifie une ligne de la base de donnees
 * @param tableName nom de la table
 * @param id numéro de l'id
 * @param propriete nom de la propriété
 * @param updatedData Modification voulue par l'utilisateur
 */
function update(tableName, id, propriete, updatedData) {
    //Ouverture de la base de données
    let request = window.indexedDB.open("maBaseDeDonnees");
    request.onsuccess = function (event) {
        console.log("Ouverture de la base de données");
        let db = event.target.result;
        let transaction = db.transaction([tableName], "readwrite");
        let objectStore = transaction.objectStore(tableName);
        let getRequest = objectStore.get(id);

        getRequest.onsuccess = function (event) {
            let record = event.target.result;
            if (record) {
                if (propriete === "date_de_naissance") {
                    let dateNaiss = new Date(updatedData);
                    record[propriete] = formatDate(dateNaiss);
                } else {
                    record[propriete] = updatedData;
                }

                // Mettre à jour l'enregistrement dans le magasin d'objets
                let updateRequest = objectStore.put(record);

                updateRequest.onsuccess = function (event) {
                    const updateEvent = new CustomEvent('updateTextareaEvent', {detail: 'Mise à jour effectuée avec succès'});
                    window.dispatchEvent(updateEvent);
                    console.log("Mise à jour effectuée avec succès");
                };

                updateRequest.onerror = function (event) {
                    const updateEvent = new CustomEvent('updateTextareaEvent', {detail: 'Erreur lors de la mise à jour de l\'enregistrement'});
                    window.dispatchEvent(updateEvent);
                    console.log("Erreur lors de la mise à jour de l'enregistrement");
                };
            } else {
                const updateEvent = new CustomEvent('updateTextareaEvent', {detail: 'Enregistrement non trouvé'});
                window.dispatchEvent(updateEvent);
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

    //Enlevez l'ancienne table
    let oldTable = document.getElementById("tableHtml");
    if (oldTable) {
        oldTable.remove();
    }
}

export { update };
