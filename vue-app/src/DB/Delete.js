// Importez createApp depuis Vue
import { createApp } from 'vue';

// Créez une instance d'application Vue
const app = createApp({});

/**
 * Supprime une donnée grace au nom de la table et à l'id
 * @param tableName nom de la table pour supprimer
 * @param id numéro de l'id pour supprimer
 */
function Delete(tableName, id){
    //Ouverture de la base de donnée
    let request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };

    request.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction([tableName], "readwrite");
        let objectStore = transaction.objectStore(tableName);
        let deleteRequest = objectStore.delete(id);
        let oldTable = document.getElementById("tableHtml");
        if (oldTable) {
            oldTable.remove();
        }

        deleteRequest.onsuccess = function(event) {
            const updateEvent = new CustomEvent('updateTextareaEvent', { detail: 'Suppression réussie' });
            window.dispatchEvent(updateEvent);
            console.log("Suppression réussie");
        };

        deleteRequest.onerror = function(event) {
            const updateEvent = new CustomEvent('updateTextareaEvent', { detail: 'Erreur lors de la suppression de l\'enregistrement' });
            window.dispatchEvent(updateEvent);
            console.log("Erreur lors de la suppression de l'enregistrement");
        };

        transaction.oncomplete = function(event) {
            db.close();
        };

        transaction.onerror = function(event) {
            console.log("Erreur de transaction");
        };
    };

}
export { Delete };