// Ouverture de la base de données "maBaseDeDonnees"
window.indexedDB.deleteDatabase("maBaseDeDonnees");
let request = window.indexedDB.open("maBaseDeDonnees");
request.onerror = function(event) {
    console.log("Erreur d'ouverture de la base de données");
};

let dupontPlace = Math.floor(Math.random() * 101) + 200;

// Création des tables dans la base de données
request.onupgradeneeded = function(event) {
    let db = event.target.result;

    // Création table tb_personnel
    let objectStore =  db.createObjectStore("tb_personne", { keyPath: "idPersonne", autoIncrement:true });
    objectStore.createIndex("nom", "nom", { unique: false });
    objectStore.createIndex("prenom", "prenom", { unique: false });
    objectStore.createIndex("date_de_naissance", "date_de_naissance", { unique: false });
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
    let db = event.target.result;

    // Générer 100 enregistrements avec des noms et prénoms existants
    let noms = ["Dupont", "Durand", "Lefevre", "Dubois", "Santin", "Pinto", "Zuber", "Glauser", "Renaud", "Beuchat", "Fresard", "Odiet", "Mertz", "Rondez", "Reist", "Broquet", "Demars", "Choulat", "Jubin", "Caillet", "Aubry", "Marti", "Yerly", "Gerber", "Crelier", "Piloti", "Hays", "Burkalthere", "Rion", "Marchand", "Constantin", "Willemin", "Giullieri", "Wuthrich", "Bandelier", "Raval", "Saner", "Clerc", "Theuvenat", "Morin", "Gagnon", "Roy", "Lévesque", "Johnson", "Smith", "Brown", "Tremblay", "Martin", "García", "Martínez", "Rodríguez", "Pérez", "López", "González", "Hernández", "Moreno", "Álvarez", "Romero", "Fernández", "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Wagner", "Becker", "Russo", "Bianchi", "Romano", "Ferrari", "Esposito", "Ricci", "Gallo"];
    let prenoms = ["Jean", "Pierre", "Marie", "Sophie", "Julie", "Liam", "Luca", "Evan", "Tobias", "Chloé", "Odin", "Alexis", "Mathilde", "Rayan", "Colin", "Ryan", "Michael", "Elliot", "Gauthier", "Noé", "Mael", "Thomas", "Simon", "Loic", "Line", "Zoé", "Basile", "Hugo", "Tom", "Melio", "Malo", "Rémy", "Tifan", "Noah", "Yanis", "Alois", "Nolan", "Jerome", "Kevin", "Jules", "Bernard", "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas", "Henry", "Alexander", "Alejandro", "Sofía", "Javier", "Valentina", "Diego", "Camila", "Carlos", "Élise", "Julien", "Lucie", "Mathieu", "Sophie", "Antoine", "Laure", "Hannah", "Leon", "Emma", "Maximilian", "Lena", "Paul", "Mia", "Alessia", "Luca", "Sofia", "Gabriele", "Giulia", "Marco", "Emma", "Yamamoto", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kobayashi", "Sato", "Kato", "Leong", "Chong", "Lau", "Tan", "Chen", "Wang", "Li", "Huang", "Wong", "Kim", "Lee", "Park", "Choi", "Nguyen", "Tran", "Nguyen", "Pham", "Huynh", "Truong", "Vo", "Hoang", "Nguyen", "Kim", "Bui", "Vu"];
    let marques = ["Toyota", "Ford", "Chevrolet", "Honda", "Volkswagen", "Nissan", "Mercedes-Benz", "BMW", "Audi", "Hyundai", "Kia", "Mazda", "Subaru", "Lexus", "Volvo", "Porsche", "Ferrari", "Lamborghini", "Maserati", "Jaguar", "Land Rover", "Tesla", "Buick", "Cadillac", "Chrysler", "Dodge", "Jeep", "GMC", "Lincoln", "Mitsubishi", "Ram", "Acura", "Alfa Romeo", "Genesis", "Infiniti", "MINI", "Smart", "Suzuki", "Aston Martin", "Bentley", "Bugatti", "Lotus", "McLaren", "Rolls-Royce"];
    let couleurs = ["Blanc", "Gris", "Argent", "Bleu foncé", "Bleu clair", "Rouge", "Rouge foncé", "Rouge métallique", "Vert foncé", "Vert clair", "Jaune", "Orange", "Brun", "Beige", "Marron", "Violet", "Rose", "Turquoise", "Bleu marine", "Gris anthracite", "Blanc perle", "Bleu électrique", "Vert pomme", "Rouge rubis", "Gris métallique", "Noir métallique", "Gris métal", "Brun métallique", "Gris perle", "Vert olive", "Bleu glacier", "Bleu ciel", "Rouge passion", "Rouge intense", "Jaune citron", "Orange vif", "Marron chocolat", "Violet profond", "Bleu saphir", "Gris étain", "Blanc glacier", "Rouge flamme", "Vert émeraude", "Vert forêt", "Bleu océan", "Rouge bordeaux", "Rouge carmin", "Bleu nuit", "Blanc ivoire", "Brun cuir", "Vert citron", "Bleu perle", "Gris acier", "Noir ébène"];
    // Ajouter 20 enregistrements fictifs dans la table tb_materiel
    let materiels = [
        {nom_materiel: "Clé à molette", quantite: 5},
        {nom_materiel: "Tournevis", quantite: 10},
        {nom_materiel: "Marteau", quantite: 3},
        {nom_materiel: "Pince", quantite: 7},
        {nom_materiel: "Lampe de poche", quantite: 2},
        {nom_materiel: "Cric", quantite: 1},
        {nom_materiel: "Scie", quantite: 4},
        {nom_materiel: "Niveau à bulle", quantite: 2},
        {nom_materiel: "Pistolet à colle", quantite: 3},
        {nom_materiel: "Ruban adhésif", quantite: 8},
        {nom_materiel: "Pinceau", quantite: 6},
        {nom_materiel: "Perceuse", quantite: 2},
        {nom_materiel: "Étau", quantite: 1},
        {nom_materiel: "Ciseaux", quantite: 5},
        {nom_materiel: "Clef à cliquet", quantite: 3},
        {nom_materiel: "Meuleuse d'angle", quantite: 2},
        {nom_materiel: "Batterie", quantite: 1},
        {nom_materiel: "Chalumeau", quantite: 2},
        {nom_materiel: "Pistolet de peinture", quantite: 4},
        {nom_materiel: "Rouleau à peinture", quantite: 6}
    ];

    let max = 500;

    for (let i = 0; i < max; i++) {
        if (i === dupontPlace) {
            console.log(dupontPlace);
            let Dupont = {
                nom: 'Dupont',
                prenom: 'Martin',
                date_de_naissance: new Date('1986-04-26'),
                numero_de_tel: '0762876754'
            };

            let PersonneViral = {
                nom: 'Viral',
                prenom: 'Rejome',
                date_de_naissance: new Date('1981.08.21'),
                numero_de_tel: '0413772504'
            };

            let VoitureViral = {
                couleur: "Noire",
                numero_plaque: "JU25916",
                proprietaire: 'Rejome Viral',
                marque: 'Tesla'
            }
            // Ajouter chaque enregistrement dans la table tb_voiture
            let transactionPersonne = db.transaction(["tb_voiture"], "readwrite");
            let objectStorePersonne = transactionPersonne.objectStore("tb_voiture");
            let requestPersonne = objectStorePersonne.add(VoitureViral);
            requestPersonne.onerror = function (event) {
                console.log("Erreur lors de l'ajout du VoiturePinto");
            };
            // Ajouter chaque enregistrement dans la table tb_personne
            let transactionDupont = db.transaction(["tb_personne"], "readwrite");
            let objectStoreDupont = transactionDupont.objectStore("tb_personne");
            let requestDupont = objectStoreDupont.add(Dupont);
            requestDupont.onerror = function (event) {
                console.log("Erreur lors de l'ajout du Dupont");
            };
            requestPersonne.onerror = function (event) {
                console.log("Erreur lors de l'ajout de du Dupont");
            };
            // Ajouter chaque enregistrement dans la table tb_personne
            let transactionViral = db.transaction(["tb_personne"], "readwrite");
            let objectStoreViral = transactionViral.objectStore("tb_personne");
            let requestViral = objectStoreViral.add(PersonneViral);
            requestViral.onerror = function (event) {
                console.log("Erreur lors de l'ajout du Dupont");
            };
            requestViral.onerror = function (event) {
                console.log("Erreur lors de l'ajout de la personne");
            };
        } else {


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
                numero_plaque: numeroPlaque,
                proprietaire: propri,
                marque: marques[Math.floor(Math.random() * marques.length)]
            }
            // Ajouter chaque enregistrement dans la table tb_personne
            let transactionVoiture = db.transaction(["tb_personne"], "readwrite");
            let objectStoreVoiture = transactionVoiture.objectStore("tb_personne");
            let requestVoiture = objectStoreVoiture.add(nouveauPersonne);
            requestVoiture.onerror = function (event) {
                console.log("Erreur ajout TB_personne " + i);
                i--;
            };

            // Ajouter chaque enregistrement dans la table tb_voiture
            let transactionPersonne = db.transaction(["tb_voiture"], "readwrite");
            let objectStorePersonne = transactionPersonne.objectStore("tb_voiture");
            let requestPersonne = objectStorePersonne.add(nouvelleVoiture);
            requestPersonne.onerror = function (event) {
                console.log("Erreur ajout tb_voiture " + i);
                i--;
            };

            if (i < 20) {
                let materiel = materiels[i];

                // Ajouter chaque enregistrement dans la table tb_materiel
                let transactionMat = db.transaction(["tb_materiel"], "readwrite");
                let objectStoreMat = transactionMat.objectStore("tb_materiel");
                let requestMat = objectStoreMat.add(materiel);
                requestMat.onerror = function (event) {
                    console.log("Erreur ajout tb_materiel" + 1);
                    i--;
                };
            }
        }
    }
    console.log("Donné ajouté!");
}

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
    return numPlaque;
}

// Fonction pour générer une date de naissance aléatoire
function generateRandomDateOfBirth() {
    let year = Math.floor(Math.random() * (2010 - 1950) + 1950); // Année entre 1950 et 2002
    let month = Math.floor(Math.random() * 12) + 1; // Mois entre 1 et 12
    let day = Math.floor(Math.random() * 28) + 1; // Jour entre 1 et 28

    return new Date(year, month - 1, day);
}

export { dupontPlace };