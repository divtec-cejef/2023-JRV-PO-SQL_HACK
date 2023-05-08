<script setup>
import { ref } from "vue";

const titre = ref('TRY SQL-HACK');

const txtSaisie = ref('');

function getWord(chaine, index) {
    const mots = chaine.split(' ');
    return mots[index];
}

function getDataSelect() {
    const table = getWord(txtSaisie.value, 3);
    const nom = getWord(txtSaisie.value, 7);
    console.log(table, ',', nom);
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

    <button @click="getDataSelect()">Envoyer</button>
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