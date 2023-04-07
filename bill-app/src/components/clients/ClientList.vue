<template>
  <table class="table my-5 table-hover">
    <thead class="text-secondary">
      <slot name="head">
        <tr>
          <th scope="col ">#</th>
          <th scope="col ">Nom</th>
          <th scope="col ">Entreprise</th>
          <th scope="col ">Date d'ajout</th>
          <th scope="col ">Actions</th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
