<template>
  <tr>
    <td></td>
    <td><i class="fa-regular fa-user me-3"></i>{{ getFullName }}</td>
    <td class="col-6">{{ client.companyName }}</td>
    <td>
      {{ client.createdDate }}
    </td>
    <td class="d-flex gap-1 justify-content-start">
      <BButton
        size="sm"
        variant="outline-danger"
        iconLeft="trash"
        @click="$emit('delete', this.client._id)"
        >Supprimer</BButton
      >
      <BButton
        size="sm"
        variant="outline-primary"
        iconLeft="pen"
        @click="$emit('edit', this.client._id)"
        >Editer</BButton
      >
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
