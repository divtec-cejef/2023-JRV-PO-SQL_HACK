// const requestSaisie = '';


/**
 * Récupère les mots de la chaine de caractère.
 * @param request La chaine de caractère à traiter.
 * @param index Nombre qui définit le mot sélectionné en fonction de son emplacement dans la chaine.
 * @returns {*} le mot sélectionné de la chaine.
 */
function getWord(request, index) {
    console.info(request);
    const mots = request.split(' ');
    return mots[index];
}

/**
 * Compte le nombre de mots qu'il y a dans la chaine de caractère.
 * @param request La chaine de caractère à traiter.
 * @returns {*} le nombre de mots.
 */
function numberWordInRequest(request) {
    const mots = request.split(' ');
    const nbreMots = mots.length;
    console.log(nbreMots);
    return nbreMots;
}

/**
 * Retire tout les accents d'une chaine de caractère.
 * @param str Chaine de caractère à traiter.
 * @returns {*} La chaine de caractère sans les accents.
 */
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête SELECT.
 */
function executeSelectRequest(request) {
    const table = getWord(request, 3).replace(/"|'|;|/g, "");
    if (numberWordInRequest(request) > 5 ) {
        const champsCondition = removeAccents(getWord(request, 5));
        const valeur = getWord(request, 7).replace(/"|'|;|/g, "");
        if (champsCondition === 'idPersonne' || champsCondition === 'idMateriel' || champsCondition === 'idVoiture' || champsCondition === 'quantite') {
            select(table, champsCondition,parseInt(valeur));
        } else {
            console.log('table : ' + table + ', champs de condition : ' + champsCondition + ', valeur : ' + valeur);
            select(table, champsCondition, valeur);
        }
    } else {
        console.log('table : ' + table);
        select(table);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête INSERT.
 */
function executeInsertRequest(request) {
    const table = getWord(request, 2);
    const dataArray = ref([]);
    for (let i = 5; i <= numberWordInRequest(request) - 1; i++) {
        const dataClean = getWord(request, i).replace(/"|,|;|\(|\)/g, "");
        dataArray.value.push(dataClean);
    }
    console.log(table, ',', dataArray.value);
    insert(table,dataArray.value);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête UPDATE.
 */
function executeUpdateRequest(request) {
    const table = getWord(request, 1);
    const champsModif = getWord(request, 3);
    const nouvelleValeur = getWord(request, 5).replace(/"|'|;|/g, "");
    const valeurID = getWord(request, 9);
    console.log(table + ', ' + champsModif + ', ' + nouvelleValeur + ', ' + valeurID);
    update(table, parseInt(valeurID), champsModif, nouvelleValeur);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête DELETE.
 */
function executeDeleteRequest(request) {
    const table = getWord(request, 2);
    const champsID = getWord(request, 4);
    const valeurID = getWord(request, 6);
    console.log(table, champsID, valeurID);
    Delete(table, parseInt(valeurID));
}

/**
 * Choisit la bonne requête à exécuter en fonction du premier mot de la chaine de caractère.
 */
export function sendRequest(request) {
    console.log(request)
    const nomRequete = getWord(request, 0).toUpperCase();
    switch (nomRequete) {
        case 'SELECT':
            return executeSelectRequest(request);
        case 'UPDATE':
            return executeUpdateRequest(request);
        case 'INSERT':
            return executeInsertRequest(request);
        case 'DELETE':
            return executeDeleteRequest(request);
    }
}