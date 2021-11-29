<template>
<section>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand">ITS4U</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Recherche CA</router-link>
          </li>
          <li class="nav-item" v-show="user && hasRole('ROLE1')">
            <router-link to="/Item2" class="nav-link">Item2</router-link>
          </li>
        </ul>
      </div>
      <div>
          <o-icon pack="fas" icon="user"> </o-icon>
            {{user ? user.name : ''}}
          <button type="button" class="btn btn-secondary ms-2" @click="handleLogout()">
            <o-icon pack="fas" icon="power-off" />
            <span class="ms-1" >Logout</span>
          </button>

      </div>
    </div>
  </nav>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  methods :{
    ...mapActions( ['useSlice/logout']),
    handleLogout(){
      this.$store.dispatch('useSlice/logout')
    }
  },
  computed: {
    ...mapGetters( 'useSlice', ['hasRole']),
    ...mapState( 'useSlice',  ['user'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar .navbar-nav .nav-link {
  position: relative;
}
.navbar .navbar-nav .nav-link::after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  color: transparent;
  width: 0%;
  content: '.';
  height: 3px;
}
.navbar .navbar-nav .nav-link:hover::after {
  width: 100%;
}
.navbar .navbar-nav .nav-link {
  transition: all 0.5s;
}
</style>
