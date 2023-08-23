// const requestSaisie = '';


import {ref} from "vue";

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
 * @param chaine La chaine de caractère à traiter.
 * @returns {*} La chaine de caractère sans les accents.
 */
function removeAccents(chaine) {
    return chaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Retire les caractères suivant : " ' ; dans une chaine de caractère.
 * @param chaine La chaine de caractère à traiter.
 * @returns {*} La chaine de caractère sans les caractères sélectionnés.
 */
function cleanString(chaine) {
    return chaine.replace(/"|'|;|/g, "");
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête SELECT.
 */
function executeSelectRequest(request) {
    const table = cleanString(getWord(request, 3));
    if (numberWordInRequest(request) > 5 ) {
        const champsCondition = removeAccents(getWord(request, 5));
        const valeur = cleanString(getWord(request, 7));
        if (champsCondition === 'idPersonne' || champsCondition === 'idMateriel' || champsCondition === 'idVoiture' || champsCondition === 'quantite') {
            select(table, champsCondition, parseInt(valeur));
        }
        else {
            select(table, champsCondition, valeur);
        }
        console.log('table : ' + table + ', champs de condition : ' + champsCondition + ', valeur : ' + valeur);
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
        const dataClean = getWord(request, i).replace(/'|"|,|;|\(|\)/g, "");

        dataArray.value.push(dataClean);
    }
    if (table === 'tb_voiture') {
        dataArray.value[2] = dataArray.value[2] + " " + dataArray.value[3];
        dataArray.value.splice(3, 1);
        console.log(table, ',', dataArray.value);
        insert(table, dataArray.value);
    }else {
        console.log(table, ',', dataArray.value);
        insert(table, dataArray.value);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête UPDATE.
 */
function executeUpdateRequest(request) {
    const table = getWord(request, 1);
    const champsModif = cleanString(getWord(request, 3));
    const nouvelleValeur = cleanString(getWord(request, 5));
    const valeurID = cleanString(getWord(request, 11));
    if (checkFields(table, champsModif) === true) {
        const nouvelleValeurProprio = cleanString(getWord(request, 5)) + ' ' + cleanString(getWord(request, 6));
        const valeurID = cleanString(getWord(request, 12));
        console.log('champs modifié : ' + champsModif + ', nouvelle valeur : ' + nouvelleValeurProprio);
        update(table, parseInt(valeurID), champsModif, nouvelleValeurProprio);
    }else {
        update(table, parseInt(valeurID), champsModif, nouvelleValeur);
        console.log(table + ', ' + champsModif + ', ' + nouvelleValeur + ', ' + valeurID);
    }
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
 * Vérifie si le champs à modifier correspond au champs 'propriétaire'.
 * @param table Table qui contient le champs.
 * @param champsConcerner Le champs à vérifier.
 * @returns {boolean} Vrai si le champs correspond au champs 'propriétaire', sinon faux.
 */
function checkFields(table, champsConcerner) {
    if (table === 'tb_voiture') {
        if (champsConcerner === 'proprietaire') {
            return true;
        }
    }else {
        return false;
    }
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