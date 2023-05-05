var request = window.indexedDB.open("maBaseDeDonnees");
request.onerror = function(event) {
    console.log("Erreur d'ouverture de la base de données");
};
request.onsuccess = function(event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains("personne")) {
        console.log("L'objet de stockage d'objets 'personne' n'existe pas.");
        return;
    }
    var transaction = db.transaction(["personne"]);
    var objectStore = transaction.objectStore("personne");
    var request = objectStore.getAll();
    request.onerror = function(event) {
        console.log("Erreur lors de la récupération des enregistrements");
    };
    request.onsuccess = function(event) {
        console.log(event.target.result);
    };
};
