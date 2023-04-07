<template>
  <tr>
    <td><i class="fa-regular fa-file me-2"></i>Facture {{ bill.billnum }}</td>
    <td>{{ bill.client.companyName }}</td>
    <td class="text-end">{{ bill.totalHT.toFixed(2) }} € HT</td>
    <td class="text-end">{{ bill.totalTTC.toFixed(2) }} € TTC</td>
    <td class="d-flex gap-1 justify-content-end">
      <a class="text-decoration-none" :href="`/bill/${bill._id}`">
        <p class="fw-bold text-black">Editer</p>
      </a>
    </td>
  </tr>
</template>
<script>
export default {
  props: ['bill']
}
</script>
