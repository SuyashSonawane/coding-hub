<template>
    <div class="navbar">
      <div class="navbar-fixed">
      <nav class="deep-purple darken-1" id="nav-bar">
        <div class="container">
          <router-link :to="{name:'GMap'}" class="brandlogo left" id="logo"><img src="/static/images/logo.png" alt="">  CodingHub</router-link>
          <ul class="right">
            <li><router-link v-if="!user" :to="{name:'Signup'}">SignUp</router-link></li>
            <li><router-link v-if="!user" :to="{name:'Login'}">LogIn</router-link></li>
            <li><router-link v-if="user" :to="{name:'ViewProfile',params:{id:currentUser.id}}">{{currentUser.username}}</router-link></li>
            <li><a @click="logout" v-if="user">Logout</a></li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
</template>

<script>
import firebase, { firestore } from 'firebase'
import db from '@/firebase/init'
export default {
    name:'Navbar',
    data(){
      return{
        user:null,
        username:null,
        currentUser:null
      }

    },
    methods:{
        logout(){
          firebase.auth().signOut()
          .then(()=>{
            this.$router.push({name:'Login'})
          })

        }
    },
    created(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user)
        {
            this.user=user
            setTimeout(() => {
              console.log(user.uid)
              
            }, 2000);
            let ref = db.collection('users')
         // current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.currentUser = doc.data()
            this.currentUser.id = doc.id
          })
          console.log(this.currentUser)
        })
        
            
        }
        else
          this.user=null

    })
    }

}
</script>

<style>
*{
  user-select: none;
}
body{
  margin: 0;
  padding: 0
}
.navbar{
  transform: translateY(-8vh);
  z-index: 999999999999;
}
#logo{
  font-size: 2.2em
}
#logo img{
  height: 1em;
  transform: translateY(5px) 
}

</style>
