<script setup>

</script>

<template>
    <form method="get">
        <div class="formulaire">
            <p>Entrez la requête :</p>
            <textarea id="requete" placeholder="Votre requête ici"></textarea>
            <button @click="">Envoyer</button>
        </div>

    </form>
</template>

<style scoped>
.formulaire {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>