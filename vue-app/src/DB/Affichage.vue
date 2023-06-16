<template>
  <div>
    <button @click="afficherTablePersonne">Afficher la table</button>

    <table v-if="tableData.length > 0" :id="tableId">
      <template v-if="nomTable === 'tb_personne'">
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Date de naissance</th>
          <th>Numéro de téléphone</th>
        </tr>
        <tr v-for="item in tableData" :key="item.idPersonne">
          <td>{{ item.idPersonne }}</td>
          <td>{{ item.nom }}</td>
          <td>{{ item.prenom }}</td>
          <td>{{ formatDate(item.date_de_naissance) }}</td>
          <td>{{ item.numero_de_tel }}</td>
        </tr>
      </template>
      <template v-else-if="nomTable === 'tb_materiel'">
        <tr>
          <th>ID</th>
          <th>Nom matériel</th>
          <th>Quantité</th>
        </tr>
        <tr v-for="item in tableData" :key="item.idMateriel">
          <td>{{ item.idMateriel }}</td>
          <td>{{ item.nom_materiel }}</td>
          <td>{{ item.quantite }}</td>
        </tr>
      </template>
      <template v-else-if="nomTable === 'tb_voiture'">
        <tr>
          <th>ID</th>
          <th>Couleur</th>
          <th>Plaque</th>
          <th>Propriétaire</th>
          <th>Marque</th>
        </tr>
        <tr v-for="item in tableData" :key="item.idVoiture">
          <td>{{ item.idVoiture }}</td>
          <td>{{ item.couleur }}</td>
          <td>{{ item.numero_plaque }}</td>
          <td>{{ item.proprietaire }}</td>
          <td>{{ item.marque }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      tableData: ref([]),
      tableId: '',
      nomTable: '',
      conditionl: '',
      valeurCondition: '',
    };
  },
  methods: {
    afficherTablePersonne(data,nomTable,conditionl,valeurCondition) {
      // Supprimer l'ancienne table s'il en existe une
      if (this.tableId) {
        const oldTable = document.getElementById(this.tableId);
        if (oldTable) {
          oldTable.remove();
        }
      }

      // Créer un nouvel élément <table>
      const table = document.createElement('table');
      this.tableId = 'tableHtml';
      if (nomTable === 'tb_personne') {
        table.innerHTML =
            '<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th><th>Numéro de téléphone</th></tr>';
      } else if (nomTable === 'tb_materiel') {
        table.innerHTML = '<tr><th>ID</th><th>Nom matériel</th><th>Quantite</th></tr>';
      } else if (nomTable === 'tb_voiture') {
        table.innerHTML =
            '<tr><th>ID</th><th>Couleur</th><th>plaque</th><th>Propriétaire</th><th>Marque</th></tr>';
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i][conditionl] === valeurCondition || valeurCondition === 0) {
          const tr = document.createElement('tr');
          if (nomTable === 'tb_personne') {
            tr.innerHTML =
                '<td>' +
                data[i].idPersonne +
                '</td><td>' +
                data[i].nom +
                '</td><td>' +
                data[i].prenom +
                '</td><td>' +
                formatDate(data[i].date_de_naissance) +
                '</td><td>' +
                data[i].numero_de_tel +
                '</td>';
          } else if (nomTable === 'tb_materiel') {
            tr.innerHTML =
                '<td>' + data[i].idMateriel + '</td><td>' + data[i].nom_materiel + '</td>' + data[i].quantite + '<td>';
          } else if (nomTable === 'tb_voiture') {
            tr.innerHTML =
                '<td>' +
                data[i].idVoiture +
                '</td><td>' +
                data[i].couleur +
                '</td><td>' +
                data[i].numero_plaque +
                '</td><td>' +
                data[i].proprietaire +
                '</td><td>' +
                data[i].marque +
                '</td>';
          }
          table.appendChild(tr);
        }
      }

      // Ajouter la nouvelle table au document body
      document.body.appendChild(table);
    },
  },
};
</script>
<style>
</style>