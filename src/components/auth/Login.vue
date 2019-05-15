<template>
    <div class="login container">
       <form  @submit.prevent="login" class="card-panel">
           <h2 class="center deep-purple-text">LOGIN</h2>
            <div class="field container">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email" required>
            </div>
            <div class="field container">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password" required>
            </div>
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <div class="field container btn-cont">
                <button class="btn deep-purple">LogIn</button>
            </div>
        </form> 
    </div> 
</template>

<script>
import firebase from 'firebase'
export default {
    name:'Login',
    data(){
      return{
        email:null,
        password:null,
        username:null,
        feedback:null,
        slug:null
      }

    },
    methods:{
        login(){
            if(this.email && this.password){
               firebase.auth().signInWithEmailAndPassword(this.email,this.password)
               .then(cred=>{
                   console.log(cred.user.username)
                   this.$router.push({name:'GMap'})
               })
               .catch(err=>{
                   this.feedback=err.message
               })
            }
            else{
                this.feedback="Enter the required fields"
            }
        }
    }

}
</script>

<style>
.login{
    max-width: 400px
}
.field{
  max-width: 80%
}
.login .btn-cont{
  margin-top: 20px
}
</style>
