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
    const table = getWord(txtSaisie.value, 3);
    const champsCondition = getWord(txtSaisie.value, 5);
    const valeur = getWord(txtSaisie.value, 7);
    console.log('table : ' + table + ', champs de condition : ' + champsCondition + ', valeur : ' + valeur);
    select(table, champsCondition, valeur);
}

/**
 * Récupère toutes les informations nécessaires pour exécuter une requête INSERT.
 */
function getDataFromInsert() {
    const table = getWord(txtSaisie.value, 2);
    const dataArray = ref([]);
    for (let i = 5; i <= numberWordInRequest(txtSaisie.value) - 1; i++) {
        const dataClean = getWord(txtSaisie.value, i).replace(/"|,|\(|\)/g, "");
        dataArray.value.push(dataClean);
    }
    console.log(table, ',', dataArray.value);
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

    <button @click="getDataFromInsert()">Envoyer</button>

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