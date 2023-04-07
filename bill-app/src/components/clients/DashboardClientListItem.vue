<template>
  <tr>
    <td><i class="fa-regular fa-user me-2"></i>{{ getFullName }}</td>
    <td>{{ client.companyName }}</td>
    <td class="">{{ client.createdDate }}</td>
    <td class="d-flex gap-1 justify-content-end">
      <a class="text-decoration-none" :href="`/client/${client._id}`">
        <p class="fw-bold text-black">Editer</p>
      </a>
    </td>
  </tr>
</template>
<script>
export default {
  props: ['client'],
  computed: {
    getFullName() {
      return this.client.firstName + ' ' + this.client.lastName
    }
  }
}
</script>
