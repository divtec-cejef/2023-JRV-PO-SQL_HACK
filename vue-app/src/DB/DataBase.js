// Ouverture de la base de données "maBaseDeDonnees"
window.indexedDB.deleteDatabase("maBaseDeDonnees");
var request = window.indexedDB.open("maBaseDeDonnees");
request.onerror = function(event) {
    console.log("Erreur d'ouverture de la base de données");
};

// Création de la table "personne" dans la base de données
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("personne", { keyPath: "id" });
    objectStore.createIndex("nom", "nom", { unique: false });
    objectStore.createIndex("prenom", "prenom", { unique: false });
    objectStore.createIndex("dateNaissance", ["annee", "mois", "jour"], { unique: false });
};

// Ajout d'un enregistrement dans la table "personne"
request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(["personne"], "readwrite");
    var objectStore = transaction.objectStore("personne");
    for(var i=0; i<30; i++){
        objectStore.add({
            id: i+1,
            nom: "Nom" + (i+1),
            prenom: "Prenom" + (i+1),
            dateNaissance: {
                annee: Math.floor(Math.random() * 50) + 1970,
                mois: Math.floor(Math.random() * 12) + 1,
                jour: Math.floor(Math.random() * 28) + 1
            }
        });
    }

    transaction.oncomplete = function(event) {
        console.log("Enregistrement ajouté avec succès");
    };

    transaction.onerror = function(event) {
        console.log("Erreur d'ajout de l'enregistrement");
    };
    db.close();
};
