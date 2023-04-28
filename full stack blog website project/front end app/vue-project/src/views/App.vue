
<template>
  <div>
  <div>
    <b-navbar px=2 class= "navbar navbar-expand-lg navbar-light bg-danger" >
      <router-link class="navbar-brand" to="/">Home</router-link>
      <router-link class="navbar-brand" to="/login">Login</router-link>
      <router-link class="navbar-brand" to="Dashboard">Dashboard</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</div>
</template>

<style>
.navbar-brand{
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Roboto",sans-serif;
  
}

</style>



