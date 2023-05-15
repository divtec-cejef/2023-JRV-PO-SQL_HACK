<script setup>
import { ref } from "vue";

const titre = ref('TRY SQL-HACK');

const txtSaisie = ref('');

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
function getDataFromSelect() {
    const table = getWord(txtSaisie.value, 3).replace(/"|'|;|/g, "");
    if (numberWordInRequest(txtSaisie.value) > 5 ) {
        const champsCondition = getWord(txtSaisie.value, 5);
        const valeur = getWord(txtSaisie.value, 7).replace(/"|'|;|/g, "");
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
function getDataFromInsert() {
    const table = getWord(txtSaisie.value, 2);
    const dataArray = ref([]);
    for (let i = 5; i <= numberWordInRequest(txtSaisie.value) - 1; i++) {
        const dataClean = getWord(txtSaisie.value, i).replace(/"|,|;|\(|\)/g, "");
        dataArray.value.push(dataClean);
    }
    console.log(table, ',', dataArray.value);
    insert(table,dataArray.value);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête UPDATE.
 */
function getDataFromUpdate() {
    const table = getWord(txtSaisie.value, 1);
    const champsModif = getWord(txtSaisie.value, 3);
    const nouvelleValeur = getWord(txtSaisie.value, 5).replace(/"|'|;|/g, "");
    const valeurID = getWord(txtSaisie.value, 9);
    console.log(table + ', ' + champsModif + ', ' + nouvelleValeur + ', ' + valeurID);
    update(table, parseInt(valeurID), champsModif, nouvelleValeur);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête DELETE.
 */
function getDataFromDelete() {
    const table = getWord(txtSaisie.value, 2);
    const champsID = getWord(txtSaisie.value, 4);
    const valeurID = getWord(txtSaisie.value, 6);
    console.log(table, champsID, valeurID);
    Delete(table, parseInt(valeurID));
}

/**
 * Choisit la bonne requête à exécuter en fonction du premier mot de la chaine de caractère.
 */
function sendRequest() {
    const nomRequete = getWord(txtSaisie.value, 0);
    if (nomRequete === 'select' || nomRequete === 'Select') {
        return getDataFromSelect();
    } else if (nomRequete === 'update' || nomRequete === 'Update') {
        return getDataFromUpdate();
    } else if (nomRequete === 'insert' || nomRequete === 'Insert') {
        return getDataFromInsert();
    }
    return getDataFromDelete();
}
</script>

<template>
    <h1>{{ titre }}</h1>
    <form method="get">
        <div class="formulaire">
            <p>Entrez la requête :</p>
            <textarea id="requete" placeholder="Votre requête ici" v-model="txtSaisie"></textarea>
        </div>
    </form>

<!--    <button @click="getDataFromInsert()">Insert</button>-->
<!--    <button @click="getDataFromSelect()">Select</button>-->
<!--    <button @click="getDataFromUpdate()">Update</button>-->
<!--    <button @click="getDataFromDelete()">Delete</button>-->
    <button @click="sendRequest()">Envoyer</button>

</template>

<style scoped>
.formulaire {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

button {
    margin-top: 0.5rem;
}

form p {
    margin-bottom: 0.5rem;
}
</style>