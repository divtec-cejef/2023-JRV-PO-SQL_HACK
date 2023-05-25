function Delete(tableName, id){
    var request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = function(event) {
        console.log("Erreur d'ouverture de la base de données");
    };

    request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction([tableName], "readwrite");
        var objectStore = transaction.objectStore(tableName);
        var deleteRequest = objectStore.delete(id);
        var oldTable = document.getElementById("tableHtml");
        if (oldTable) {
            oldTable.remove();
        }

        deleteRequest.onsuccess = function(event) {
            console.log("Suppression réussie");
        };

        deleteRequest.onerror = function(event) {
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
