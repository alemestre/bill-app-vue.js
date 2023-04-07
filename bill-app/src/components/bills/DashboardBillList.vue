<template>
  <table class="table mb-4 table-hover">
    <thead class="text-secondary">
      <slot name="head">
        <tr>
          <th scope="col" class="fw-light text-start">N°</th>
          <th scope="col" class="fw-light text-start">Client</th>
          <th scope="col" class="text-end fw-light">Montant HT</th>
          <th scope="col" class="text-end fw-light">Montant TTC</th>
          <th scope="col" class="text-end fw-light"></th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
