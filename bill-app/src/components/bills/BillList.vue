<template>
  <table class="table my-5 table-hover">
    <thead class="text-secondary">
      <slot name="head">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Client</th>
          <th scope="col" class="text-end">Montant HT</th>
          <th scope="col" class="text-end">Montant TTC</th>
          <th scope="col " class="text-end">Actions</th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
