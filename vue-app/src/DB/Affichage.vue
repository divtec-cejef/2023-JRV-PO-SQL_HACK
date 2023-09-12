<template>
  <div>
    <table class="table_result" id="table_result">
      <thead>
      <tr>
        <th v-for="header in tableHeaders">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in filteredData" :key="index">
        <td
            class="copie-overlay"
            v-for="(column, colIndex) in tableColumns"
            :key="colIndex"
            @click="afficherEncadre(item, colIndex)"
        >
          {{ item[column] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    nomTable: String,
    conditionl: String,
    valeurCondition: String,
  },
  computed: {
    tableColumns() {
      if (this.nomTable === "tb_personne") {
        return ["idPersonne", "nom", "prenom", "date_de_naissance", "numero_de_tel"];
      } else if (this.nomTable === "tb_materiel") {
        return ["idMateriel", "nom_materiel", "quantite"];
      } else if (this.nomTable === "tb_voiture") {
        return ["idVoiture", "couleur", "numero_plaque", "proprietaire", "marque"];
      }
      return [];
    },
    tableHeaders() {
      if (this.nomTable === "tb_personne") {
        return ["ID", "Nom", "Prénom", "Date de naissance", "Numéro de téléphone"];
      } else if (this.nomTable === "tb_materiel") {
        return ["ID", "Nom matériel", "Quantité"];
      } else if (this.nomTable === "tb_voiture") {
        return ["ID", "Couleur", "Plaque", "Propriétaire", "Marque"];
      }
      return [];
    },
    filteredData() {
      return this.data.filter((item) =>
          item[this.conditionl] === this.valeurCondition ||
          this.valeurCondition === "0" ||
          this.formatDate(item.date_de_naissance) === this.valeurCondition
      );
    },
  },
  methods: {
    formatDate(date) {
      let d = new Date(date);
      let day = ("0" + d.getDate()).slice(-2);
      let month = ("0" + (d.getMonth() + 1)).slice(-2);
      let year = d.getFullYear();
      return year + "-" + month + "-" + day;
    },
    afficherEncadre(item, colIndex) {
      // Mettez ici votre logique pour afficher l'encadré en fonction de l'élément "item" et "colIndex"
      console.log("Cliqué sur la colonne #" + colIndex + " de l'élément ID #" + item.id);
    },
  },
};
</script>
