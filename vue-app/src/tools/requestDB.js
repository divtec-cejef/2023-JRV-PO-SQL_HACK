// const requestSaisie = '';

/**
 * Récupère les mots de la chaine de caractère.
 * @param chaine La chaine de caractère à traiter.
 * @param index Nombre qui définit le mot sélectionné en fonction de son emplacement dans la chaine.
 * @returns {*} le mot sélectionné de la chaine.
 */
function getWord(chaine, index) {
    const mots = chaine.split(' ');
    return mots[index];
}

/**
 * Compte le nombre de mots qu'il y a dans la chaine de caractère.
 * @param chaine La chaine de caractère à traiter.
 * @returns {*} le nombre de mots.
 */
function numberWordInRequest(chaine) {
    const mots = chaine.split(' ');
    const nbreMots = mots.length;
    console.log(nbreMots);
    return nbreMots;
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête SELECT.
 */
function executeSelectRequest(requestSaisie) {
    const table = getWord(requestSaisie.value, 3).replace(/"|'|;|/g, "");
    if (numberWordInRequest(requestSaisie.value) > 5 ) {
        const champsCondition = getWord(requestSaisie.value, 5);
        const valeur = getWord(requestSaisie.value, 7).replace(/"|'|;|/g, "");
        console.log('table : ' + table + ', champs de condition : ' + champsCondition + ', valeur : ' + valeur);
        select(table, champsCondition, valeur);
    } else {
        console.log('table : ' + table);
        select(table);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête INSERT.
 */
function executeInsertRequest(requestSaisie) {
    const table = getWord(requestSaisie.value, 2);
    const dataArray = ref([]);
    for (let i = 5; i <= numberWordInRequest(requestSaisie.value) - 1; i++) {
        const dataClean = getWord(requestSaisie.value, i).replace(/"|,|;|\(|\)/g, "");
        dataArray.value.push(dataClean);
    }
    console.log(table, ',', dataArray.value);
    insert(table,dataArray.value);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête UPDATE.
 */
function executeUpdateRequest(requestSaisie) {
    const table = getWord(requestSaisie.value, 1);
    const champsModif = getWord(requestSaisie.value, 3);
    const nouvelleValeur = getWord(requestSaisie.value, 5).replace(/"|'|;|/g, "");
    const valeurID = getWord(requestSaisie.value, 9);
    console.log(table + ', ' + champsModif + ', ' + nouvelleValeur + ', ' + valeurID);
    update(table, parseInt(valeurID), champsModif, nouvelleValeur);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête DELETE.
 */
function executeDeleteRequest(requestSaisie) {
    const table = getWord(requestSaisie.value, 2);
    const champsID = getWord(requestSaisie.value, 4);
    const valeurID = getWord(requestSaisie.value, 6);
    console.log(table, champsID, valeurID);
    Delete(table, parseInt(valeurID));
}

/**
 * Choisit la bonne requête à exécuter en fonction du premier mot de la chaine de caractère.
 */
function sendRequest(requestSaisie) {
    const nomRequete = getWord(requestSaisie.value, 0).toUpperCase();
    switch (nomRequete) {
        case 'SELECT':
            return executeSelectRequest(requestSaisie);
        case 'UPDATE':
            return executeUpdateRequest(requestSaisie);
        case 'INSERT':
            return executeInsertRequest(requestSaisie);
        case 'DELETE':
            return executeDeleteRequest(requestSaisie);
    }
}