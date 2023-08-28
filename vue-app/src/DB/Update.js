// Importez createApp depuis Vue
import { createApp } from 'vue';

// Créez une instance d'application Vue
const app = createApp({});
// Définissez la fonction de mise à jour
    function update(tableName, id, propriete, updatedData) {
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
                        // Effectuer les modifications sur l'enregistrement récupéré
                        // en utilisant les propriétés de l'objet updatedData
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

        let oldTable = document.getElementById("tableHtml");
        if (oldTable) {
            oldTable.remove();
        }
    }
// Exportez la fonction de mise à jour
export { update };
