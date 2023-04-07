<template>
  <table class="table mb-4 table-hover">
    <thead class="text-secondary">
      <slot name="head">
        <tr>
          <th scope="col" class="fw-light text-start">Nom du contact</th>
          <th scope="col" class="fw-light text-start">Entreprise</th>
          <th scope="col" class="text-start fw-light">Date d'ajout</th>
          <th scope="col" class="text-end fw-light"></th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
