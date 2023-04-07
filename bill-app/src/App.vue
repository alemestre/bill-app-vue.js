<template>
  <div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-between py-3 px-4 mb-4 border-bottom">
      <RouterLink
        :to="{ name: 'home' }"
        class="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-primary"
      >
        <i class="fa-solid fa-wallet fa-2x" />
        <span class="fs-3">Factures</span>
      </RouterLink>
      <ul class="nav nav-pills gap-2">
        <li class="nav-item">
          <!-- on modifie la classe active sur chaque lien pour utiliser les classes de bootstrap "active" -->
          <RouterLink
            :to="{ name: 'home' }"
            class="nav-link"
            active-class="active"
            exact-active-class="active"
          >
            <i class="fa-solid fa-house" /> Accueil
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/bills" class="nav-link" active-class="active" exact-active-class="active"
            ><i class="fa-solid fa-file-invoice"></i>
            Factures
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/clients"
            class="nav-link"
            active-class="active"
            exact-active-class="active"
            ><i class="fa-solid fa-users"></i>
            Clients
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/about"
            class="nav-link"
            active-class="active"
            exact-active-class="active"
          >
            A propos
          </RouterLink>
        </li>
      </ul>
    </header>
    <main class="container main-router-container">
      <RouterView />
    </main>
    <footer class="py-3 my-4 border-top text-center">
      <span class="mb-3 mb-md-0 text-body-secondary">© {{ currentYear }} Factures.app</span>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // currentYear:2023
    }
  },
  computed: {
    currentYear() {
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style scoped></style>
