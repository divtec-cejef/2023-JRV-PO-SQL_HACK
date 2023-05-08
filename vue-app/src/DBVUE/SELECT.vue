<template>
    <div>
        <table v-if="tableData.length">
            <thead>
            <tr>
                <th>ID</th>
                <th v-if="tableType==='tb_personne'">Nom</th>
                <th v-if="tableType==='tb_personne'">Prénom</th>
                <th v-if="tableType==='tb_personne'">Date de naissance</th>
                <th v-if="tableType==='tb_materiel'">Nom matériel</th>
                <th v-if="tableType==='tb_materiel'">Quantité</th>
                <th v-if="tableType==='tb_voiture'">Couleur</th>
                <th v-if="tableType==='tb_voiture'">Numéro de plaque</th>
                <th v-if="tableType==='tb_voiture'">Propriétaire</th>
                <th v-if="tableType==='tb_voiture'">Marque</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableData" :key="item.id">
                <td>{{ item.id }}</td>
                <td v-if="tableType==='tb_personne'">{{ item.nom_pers }}</td>
                <td v-if="tableType==='tb_personne'">{{ item.prenom_pers }}</td>
                <td v-if="tableType==='tb_personne'">{{ formatDate(item.dateNaiss_pers) }}</td>
                <td v-if="tableType==='tb_materiel'">{{ item.nom_mat }}</td>
                <td v-if="tableType==='tb_materiel'">{{ item.quantite_mat }}</td>
                <td v-if="tableType==='tb_voiture'">{{ item.couleur }}</td>
                <td v-if="tableType==='tb_voiture'">{{ item.numPlaque }}</td>
                <td v-if="tableType==='tb_voiture'">{{ item.proprietaire }}</td>
                <td v-if="tableType==='tb_voiture'">{{ item.marque }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const Select = (NomTable, where) => {
    const request = window.indexedDB.open("maBaseDeDonnees");

    request.onerror = (event) => {
        console.log("Erreur d'ouverture de la base de données");
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([NomTable], "readonly");
        const objectStore = transaction.objectStore(NomTable);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const data = event.target.result;

            if (NomTable === "tb_personne") {
                this.tableData = data.filter((item) =>
                    item.idPersonne == where ||
                    item.nom_pers == where ||
                    item.prenom_pers == where ||
                    formatDate(item.dateNaiss_pers) == where ||
                    item.numTelephone_pers == where ||
                    where === "0"
                );
            }

            if (NomTable === "tb_materiel") {
                this.tableData = data.filter((item) =>
                    item.idMateriel == where ||
                    item.nom_mat == where ||
                    item.quantite_mat == where ||
                    where === "0"
                );
            }

            if (NomTable === "tb_voiture") {
                this.tableData = data.filter((item) =>
                    item.idVoiture == where ||
                    item.couleur == where ||
                    item.numPlaque == where ||
                    item.proprietaire == where ||
                    item.marque == where ||
                    where === "0"
                );
            }
        };
    };
};
</script>