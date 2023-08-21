// Ouverture de la base de données "maBaseDeDonnees"
window.indexedDB.deleteDatabase("maBaseDeDonnees");
let request = window.indexedDB.open("maBaseDeDonnees");
request.onerror = function(event) {
    console.log("Erreur d'ouverture de la base de données");
};

// Création des tables dans la base de données
request.onupgradeneeded = function(event) {
    let db = event.target.result;

    // Création table tb_personnel
    let objectStore =  db.createObjectStore("tb_personne", { keyPath: "idPersonne", autoIncrement:true });
    objectStore.createIndex("nom", "nom", { unique: false });
    objectStore.createIndex("prénom", "prénom", { unique: false });
    objectStore.createIndex("date_de_naissance", "date_de_naissance", { unique: false });
    objectStore.createIndex("numéro_de_tel", "numéro_de_tel", { unique: true });

    // Création table tb_materiel
    objectStore = db.createObjectStore("tb_materiel", { keyPath: "idMateriel", autoIncrement:true });
    objectStore.createIndex("nom_matériel", "nom_matériel", { unique: false });
    objectStore.createIndex("quantité", "quantité", { unique: false });

    // Création table tb_voiture
    objectStore = db.createObjectStore("tb_voiture", { keyPath: "idVoiture", autoIncrement:true });
    objectStore.createIndex("couleur", "couleur", { unique: false });
    objectStore.createIndex("numéro_plaque", "numéro_plaque", { unique: true });
    objectStore.createIndex("propriétaire", "propriétaire", { unique: false });
    objectStore.createIndex("marque", "marque", { unique: false });
};


request.onsuccess = function(event) {
    let db = event.target.result;

    // Générer 100 enregistrements avec des noms et prénoms existants
    let noms = ["Dupont", "Durand", "Lefevre", "Dubois","Santin", "Pinto", "Zuber", "Glauser", "Renaud","Beuchat", "Fresard", "Odiet", "Mertz", "Rondez","Reist", "Broquet", "Demars", "Choulat", "Jubin","Caillet", "Aubry", "Marti", "Yerly", "Gerber","Crelier", "Piloti", "Hays", "Burkalthere", "Rion","Marchand", "Constantin", "Willemin", "Giullieri", "Wuthrich","Bandelier", "Raval", "Saner", "Clerc", "Theuvenat"];
    let prenoms = ["Jean", "Pierre", "Marie", "Sophie", "Julie","Liam", "Luca", "Evan", "Tobias", "Chloé","Odin", "Alexis", "Mathilde", "Rayan", "Colin","Ryan", "Michael Elliot", "Gauthier", "Noé", "Mael","Thomas", "Simon", "Loic", "Line", "Zoé","Basile", "Hugo", "Tom", "Melio", "Malo","Rémy", "Tifan", "Noah", "Yanis", "Alois","Nolan", "Jerome", "Kevin", "Jules", "Bernard"];
    let marques = ["Tesla", "Ferrari", "Lamborghini", "Volvo", "BMW", "Mercedes", "Ferrari", "Touc-touc"];
    let couleurs = ["Bleu", "Rouge", "Vert", "Noir", "Blanc", "Gris", "Blouge", "Marron"];
    // Ajouter 20 enregistrements fictifs dans la table tb_materiel
    let materiels = [
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

    let dupontPlace = Math.floor(Math.random() * 100) + 1;

    for (let i = 0; i < 100; i++) {
        let nom = noms[Math.floor(Math.random() * noms.length)];
        let prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
        let dateNaissance = new Date(generateRandomDateOfBirth());
        let numTelephone = generateRandomPhoneNumber();

        let nouveauPersonne = {
            nom: nom,
            prenom: prenom,
            date_de_naissance: dateNaissance,
            numero_de_tel: numTelephone
        };



        let numeroPlaque = generatePlaqueNumber();
        let propri = nom + " " + prenom;

        let nouvelleVoiture = {
            couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
            numero_de_plaque: numeroPlaque,
            proprietaire: propri,
            marque: marques[Math.floor(Math.random() * marques.length)]
        }
        // Ajouter chaque enregistrement dans la table tb_personne
        let transactionVoiture = db.transaction(["tb_personne"], "readwrite");
        let objectStoreVoiture = transactionVoiture.objectStore("tb_personne");
        let requestVoiture = objectStoreVoiture.add(nouveauPersonne);

        // Ajouter chaque enregistrement dans la table tb_personne
        let transactionPersonne = db.transaction(["tb_voiture"], "readwrite");
        let objectStorePersonne = transactionPersonne.objectStore("tb_voiture");
        let requestPersonne = objectStorePersonne.add(nouvelleVoiture);

        if (i<20){
            let materiel = materiels[i];

            // Ajouter chaque enregistrement dans la table tb_materiel
            let transactionMat = db.transaction(["tb_materiel"], "readwrite");
            let objectStoreMat = transactionMat.objectStore("tb_materiel");
            let requestMat = objectStoreMat.add(materiel);
            requestMat.onerror = function(event) {
                console.log("Erreur lors de l'ajout du matériel");
            };
        }
        if (i === dupontPlace){
            let Dupont = {
                nom: 'Dupont',
                prenom: 'Martin',
                date_de_naissance: new  Date('1986-04-26'),
                numero_de_tel: '0763772504'
            };

            // Ajouter chaque enregistrement dans la table tb_personne
            let transactionDupont = db.transaction(["tb_personne"], "readwrite");
            let objectStoreDupont = transactionDupont.objectStore("tb_personne");
            let requestDupont = objectStoreDupont.add(Dupont);
            requestDupont.onerror = function(event) {
                console.log("Erreur lors de l'ajout du Dupont");
            };
        }
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
    let numTelephone = "041";
    for (let i = 0; i < 7; i++) {
        numTelephone += Math.floor(Math.random() * 10);
    }
    return numTelephone;
}

function generatePlaqueNumber() {
    let numPlaque = "JU";
    for (let i = 0; i < 5; i++) {
        numPlaque += Math.floor(Math.random() * 10);
    }
    console.log(numPlaque)
    return numPlaque;
}

// Fonction pour générer une date de naissance aléatoire
function generateRandomDateOfBirth() {
    let year = Math.floor(Math.random() * (2003 - 1950) + 1950); // Année entre 1950 et 2002
    let month = Math.floor(Math.random() * 12) + 1; // Mois entre 1 et 12
    let day = Math.floor(Math.random() * 28) + 1; // Jour entre 1 et 28

    return new Date(year, month - 1, day);
}

