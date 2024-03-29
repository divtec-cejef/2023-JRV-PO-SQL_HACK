// const requestSaisie = '';


import {ref} from "vue";
import { update } from '../DB/Update.js';
import { Delete } from '../DB/Delete.js';
import { insert } from '../DB/Insert.js';

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
 * Ajoute une majuscule à la 1ère lettre de la saisie de l'utilisateur.
 * @param saisie Le texte saisi par l'utilisateur.
 * @returns {string} La saisie de l'utilisateur avec la 1ère lettre en majuscule.
 */
function firstLetterToUppercase(saisie) {
    saisie = saisie.toLowerCase();
    if (saisie.length === 1) {
        return saisie.toUpperCase();
    }else if (saisie.length > 1) {
        return saisie.charAt(0).toUpperCase() +  saisie.slice(1);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête SELECT.
 */
function executeSelectRequest(request) {
    let table = cleanString(getWord(request, 3));
    if (numberWordInRequest(request) > 5 ) {
        let valeur = cleanString(getWord(request, 7));
        valeur = firstLetterToUppercase(valeur);

        let champsCondition = removeAccents(getWord(request, 5));
        if (checkFieldsProprio(table, champsCondition) === true) {
            valeur = firstLetterToUppercase(cleanString(getWord(request, 7))) + ' ' + firstLetterToUppercase(cleanString(getWord(request, 8)));
        }

        if (champsCondition === 'idPersonne' || champsCondition === 'idMateriel' || champsCondition === 'idVoiture' || champsCondition === 'quantite') {
            select(table, champsCondition, parseInt(valeur));
        }else {
            select(table, champsCondition, checkValue(valeur));
        }

        console.log('table : ' + table + ', champs de condition : ' + champsCondition + ', valeur : ' + valeur);
    }else {
        console.log('table : ' + table);
        select(table);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête INSERT.
 */
function executeInsertRequest(request) {
    let table = getWord(request, 2);
    let dataArray = ref([]);
    for (let i = 5; i <= numberWordInRequest(request) - 1; i++) {
        let dataClean = getWord(request, i).replace(/'|"|,|;|\(|\)/g, "");
        dataClean = firstLetterToUppercase(dataClean);

        dataArray.value.push(dataClean);
    }

    if (table === 'tb_voiture') {
        dataArray.value[2] = dataArray.value[2] + " " + dataArray.value[3];
        dataArray.value.splice(3, 1);

        console.log(table, ',', dataArray.value);
        insert(table, dataArray.value);
        select(table);
    }else {
        console.log(table, ',', dataArray.value);
        insert(table, dataArray.value);
        select(table);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête UPDATE.
 */
function executeUpdateRequest(request) {
    let table = getWord(request, 1);
    let champsModif = cleanString(removeAccents(getWord(request, 3)));
    let nouvelleValeur = cleanString(getWord(request, 5));
    nouvelleValeur = firstLetterToUppercase(nouvelleValeur);
    let valeurID = cleanString(getWord(request, 9));

    if (checkFieldsProprio(table, champsModif) === true) {
        let nouvelleValeurProprio = firstLetterToUppercase(cleanString(getWord(request, 5))) + ' ' +
                                           firstLetterToUppercase(cleanString(getWord(request, 6)));
        let valeurID = cleanString(getWord(request, 10));

        console.log('champs modifié : ' + champsModif + ', nouvelle valeur : ' + nouvelleValeurProprio);
        update(table, parseInt(valeurID), champsModif, nouvelleValeurProprio);

        displaydata(table, valeurID);
    }else {
        update(table, parseInt(valeurID), champsModif, nouvelleValeur);
        displaydata(table, valeurID);
        console.log(table + ', ' + champsModif + ', ' + nouvelleValeur + ', ' + valeurID);
    }
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête DELETE.
 */
function executeDeleteRequest(request) {
    let table = getWord(request, 2);
    let champsID = getWord(request, 4);
    let valeurID = getWord(request, 6);

    console.log(table, champsID, valeurID);
    Delete(table, parseInt(valeurID));
    select(table);
}

/**
 * Vérifie si le champs à modifier correspond au champs 'propriétaire'.
 * @param table Table qui contient le champs.
 * @param champsConcerner Le champs à vérifier.
 * @returns {boolean} Vrai si le champs correspond au champs 'propriétaire', sinon faux.
 */
function checkFieldsProprio(table, champsConcerner) {
    if (table === 'tb_voiture') {
        if (champsConcerner === 'proprietaire') {
            return true;
        }
    }else {
        return false;
    }
}

/**
 * Vérifie si la valeur saisie par l'utilisateur correspond à la couleur 'noire'.
 * @param valeurSaisie La valeur saisie par l'utilisateur.
 * @returns {string} 'Noire' si la couleur saisie correspond à la couleur 'noire', sinon une chaine vide.
 */
function checkValue(valeurSaisie) {
    let valeurRetourne = '';
    if (valeurSaisie === 'Noir') {
        valeurRetourne = 'Noire';
    } else {
        valeurRetourne = valeurSaisie;
    }

    return valeurRetourne;
}

/**
 * Affiche uniquement le champ qui a été mofifié après une requête UPDATE.
 * @param table La table sur lequel on fait la modification.
 * @param valeurID L'id du champ sur lequel on fait la modification.
 */
function displaydata(table, valeurID) {
    switch (table) {
        case 'tb_voiture':
            select(table, 'idVoiture', parseInt(valeurID));
            break;
        case 'tb_personne':
            select(table, 'idPersonne', parseInt(valeurID));
            break;
        case 'tb_materiel':
            select(table, 'idMateriel', parseInt(valeurID));
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