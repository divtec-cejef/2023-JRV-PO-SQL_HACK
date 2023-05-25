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
    objectStore.createIndex("nom", "nom", { unique: false });
    objectStore.createIndex("prenom", "prenom", { unique: false });
    objectStore.createIndex("date_de_naissance", "Date_de_naissance", { unique: false });
    objectStore.createIndex("numero_de_tel", "numero_de_tel", { unique: true });

    // Création table tb_materiel
    objectStore = db.createObjectStore("tb_materiel", { keyPath: "idMateriel", autoIncrement:true });
    objectStore.createIndex("nom_materiel", "nom_materiel", { unique: false });
    objectStore.createIndex("quantite", "quantite", { unique: false });

    // Création table tb_voiture
    objectStore = db.createObjectStore("tb_voiture", { keyPath: "idVoiture", autoIncrement:true });
    objectStore.createIndex("couleur", "couleur", { unique: false });
    objectStore.createIndex("numero_plaque", "numero_plaque", { unique: true });
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
        { nom_materiel: "Clé à molette", quantite: 5 },
        { nom_materiel: "Tournevis", quantite: 10 },
        { nom_materiel: "Marteau", quantite: 3 },
        { nom_materiel: "Pince", quantite: 7 },
        { nom_materiel: "Lampe de poche", quantite: 2 },
        { nom_materiel: "Cric", quantite: 1 },
        { nom_materiel: "Scie", quantite: 4 },
        { nom_materiel: "Niveau à bulle", quantite: 2 },
        { nom_materiel: "Pistolet à colle", quantite: 3 },
        { nom_materiel: "Ruban adhésif", quantite: 8 },
        { nom_materiel: "Pinceau", quantite: 6 },
        { nom_materiel: "Perceuse", quantite: 2 },
        { nom_materiel: "Étau", quantite: 1 },
        { nom_materiel: "Ciseaux", quantite: 5 },
        { nom_materiel: "Clef à cliquet", quantite: 3 },
        { nom_materiel: "Meuleuse d'angle", quantite: 2 },
        { nom_materiel: "Compresseur d'air", quantite: 1 },
        { nom_materiel: "Chalumeau", quantite: 2 },
        { nom_materiel: "Pistolet de peinture", quantite: 4 },
        { nom_materiel: "Rouleau à peinture", quantite: 6 }
    ];

    for (var i = 0; i < 100; i++) {
        var nom = noms[Math.floor(Math.random() * noms.length)];
        var prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
        var dateNaissance = new Date(generateRandomDateOfBirth());
        var numTelephone = generateRandomPhoneNumber();

        var nouveauPersonne = {
            nom: nom,
            prenom: prenom,
            date_de_naissance: dateNaissance,
            numero_de_tel: numTelephone
        };

        var numeroPlaque = generatePlaqueNumber();
        var propri = nom + " " + prenom;

        var nouvelleVoiture = {
            couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
            numerp_de_plaque: numeroPlaque,
            proprietaire: propri,
            marque: marques[Math.floor(Math.random() * marques.length)]
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
    for (var i = 0; i < 5; i++) {
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

