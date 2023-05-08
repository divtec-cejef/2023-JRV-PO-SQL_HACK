// Ouverture de la base de données "maBaseDeDonnees"
window.indexedDB.deleteDatabase("maBaseDeDonnees");
var request = window.indexedDB.open("maBaseDeDonnees");
request.onerror = function(event) {
    console.log("Erreur d'ouverture de la base de données");
};

// Création des tables dans la base de données
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Création table tb_personnel
    var objectStore =  db.createObjectStore("tb_personne", { keyPath: "idPersonne", autoIncrement:true });
    objectStore.createIndex("nom_pers", "nom_pers", { unique: false });
    objectStore.createIndex("prenom_pers", "prenom_pers", { unique: false });
    objectStore.createIndex("dateNaiss_pers", "dateNaiss_pers", { unique: false });
    objectStore.createIndex("numTelephone_pers", "numTelephone_pers", { unique: true });

    // Création table tb_materiel
    objectStore = db.createObjectStore("tb_materiel", { keyPath: "idMateriel", autoIncrement:true });
    objectStore.createIndex("nom_mat", "nom_mat", { unique: false });
    objectStore.createIndex("quantite_mat", "quantite_mat", { unique: false });

    // Création table tb_voiture
    objectStore = db.createObjectStore("tb_voiture", { keyPath: "idVoiture", autoIncrement:true });
    objectStore.createIndex("couleur", "couleur", { unique: false });
    objectStore.createIndex("numPlaque", "numPlaque", { unique: true });
    objectStore.createIndex("proprietaire", "proprietaire", { unique: false });
    objectStore.createIndex("marque", "marque", { unique: false });
};


request.onsuccess = function(event) {
    var db = event.target.result;

    // Générer 100 enregistrements avec des noms et prénoms existants
    var noms = ["Dupont", "Durand", "Martin", "Lefevre", "Dubois","Santin", "Pinto", "Zuber", "Glauser", "Renaud","Beuchat", "Fresard", "Odiet", "Mertz", "Rondez","Reist", "Broquet", "Demars", "Choulat", "Jubin","Caillet", "Aubry", "Marti", "Yerly", "Gerber","Crelier", "Piloti", "Hays", "Burkalthere", "Rion","Marchand", "Constantin", "Willemin", "Giullieri", "Wuthrich","Bandelier", "Raval", "Saner", "Clerc", "Theuvenat"];
    var prenoms = ["Jean", "Pierre", "Marie", "Sophie", "Julie","Liam", "Luca", "Evan", "Tobias", "Chloé","Odin", "Alexis", "Mathilde", "Rayan", "Colin","Ryan", "Michael Elliot", "Gauthier", "Noé", "Mael","Thomas", "Simon", "Loic", "Line", "Zoé","Basile", "Hugo", "Tom", "Melio", "Malo","Rémy", "Tifan", "Noah", "Yanis", "Alois","Nolan", "Jerome", "Kevin", "Jules", "Bernard"];
    var marques = ["Tesla", "Ferrari", "Lamborghini", "Volvo", "BMW", "Mercedes", "Ferrari", "Touc-touc"];
    var couleurs = ["Bleu", "Rouge", "Vert", "Noir", "Blanc", "Gris", "Blouge", "Marron"];
    // Ajouter 20 enregistrements fictifs dans la table tb_materiel
    var materiels = [
        { nom_mat: "Clé à molette", quantite_mat: 5 },
        { nom_mat: "Tournevis", quantite_mat: 10 },
        { nom_mat: "Marteau", quantite_mat: 3 },
        { nom_mat: "Pince", quantite_mat: 7 },
        { nom_mat: "Lampe de poche", quantite_mat: 2 },
        { nom_mat: "Cric", quantite_mat: 1 },
        { nom_mat: "Scie", quantite_mat: 4 },
        { nom_mat: "Niveau à bulle", quantite_mat: 2 },
        { nom_mat: "Pistolet à colle", quantite_mat: 3 },
        { nom_mat: "Ruban adhésif", quantite_mat: 8 },
        { nom_mat: "Pinceau", quantite_mat: 6 },
        { nom_mat: "Perceuse", quantite_mat: 2 },
        { nom_mat: "Étau", quantite_mat: 1 },
        { nom_mat: "Ciseaux", quantite_mat: 5 },
        { nom_mat: "Clef à cliquet", quantite_mat: 3 },
        { nom_mat: "Meuleuse d'angle", quantite_mat: 2 },
        { nom_mat: "Compresseur d'air", quantite_mat: 1 },
        { nom_mat: "Chalumeau", quantite_mat: 2 },
        { nom_mat: "Pistolet de peinture", quantite_mat: 4 },
        { nom_mat: "Rouleau à peinture", quantite_mat: 6 }
    ];

    for (var i = 0; i < 100; i++) {
        var nom = noms[Math.floor(Math.random() * noms.length)];
        var prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
        var dateNaissance = new Date(generateRandomDateOfBirth());
        var numTelephone = generateRandomPhoneNumber();

        var nouveauPersonne = {
            nom_pers: nom,
            prenom_pers: prenom,
            dateNaiss_pers: dateNaissance,
            numTelephone_pers: numTelephone
        };

        var numeroPlaque = generatePlaqueNumber();
        var propri = nom + prenom;

        var nouvelleVoiture = {
            couleur: couleurs,
            numPlaque: numeroPlaque,
            proprietaire: propri,
            marque: marques
        }

        // Ajouter chaque enregistrement dans la table tb_personne
        var transactionVoiture = db.transaction(["tb_personne"], "readwrite");
        var objectStoreVoiture = transactionVoiture.objectStore("tb_personne");
        var requestVoiture = objectStoreVoiture.add(nouveauPersonne);

        // Ajouter chaque enregistrement dans la table tb_personne
        var transactionPersonne = db.transaction(["tb_voiture"], "readwrite");
        var objectStorePersonne = transactionPersonne.objectStore("tb_voiture");
        var requestPersonne = objectStorePersonne.add(nouvelleVoiture);

        if (i<20){
            var materiel = materiels[i];

            // Ajouter chaque enregistrement dans la table tb_materiel
            var transactionMat = db.transaction(["tb_materiel"], "readwrite");
            var objectStoreMat = transactionMat.objectStore("tb_materiel");
            var requestMat = objectStoreMat.add(materiel);

        }

        requestMat.onerror = function(event) {
            console.log("Erreur lors de l'ajout du matériel");
        };

        requestPersonne.onerror = function(event) {
            console.log("Erreur lors de l'ajout de la personne");
        };
        requestVoiture.onerror = function(event) {
            console.log("Erreur lors de l'ajout de la personne");
        };
    }

    console.log("Donné ajouté!");
};

function generateRandomPhoneNumber() {
    var numTelephone = "041";
    for (var i = 0; i < 7; i++) {
        numTelephone += Math.floor(Math.random() * 10);
    }
    return numTelephone;
}

function generatePlaqueNumber() {
    var numTelephone = "JU";
    for (var i = 0; i < 7; i++) {
        numTelephone += Math.floor(Math.random() * 10);
    }
    return numTelephone;
}

// Fonction pour générer une date de naissance aléatoire
function generateRandomDateOfBirth() {
    var year = Math.floor(Math.random() * (2003 - 1950) + 1950); // Année entre 1950 et 2002
    var month = Math.floor(Math.random() * 12) + 1; // Mois entre 1 et 12
    var day = Math.floor(Math.random() * 28) + 1; // Jour entre 1 et 28

    return new Date(year, month - 1, day);
}

