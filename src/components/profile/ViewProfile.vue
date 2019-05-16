<template>
    <div class="view-profile container">
        <div v-if="profile" class="card" id="profile">
            <h2 class="deep-purple-text center">{{profile.username}}'s  Wall</h2>
            <ul class="comments collection">
                <li v-for="(comment,index) in comments" :key="index">
                  <div class="item from ">{{comment.from}}</div> <br>
                  <div class="item content">{{comment.content}}</div> <br>
                  <div class="item time ">{{comment.time}}</div>
                </li>
            </ul>
            <form @submit.prevent="addComment" class="hoverable form-1 card-action">
                <label for="comment" class="left">Add a new comment</label>
                <input type="text" name="comment" v-model="newComment" required>
                <p v-if="feedback" class="red-text center">{{feedback}}</p>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase';
import moment from 'moment'
export default {
    name:'ViewProfile',
    data(){
      return{
          profile:null,
          feedback:null,
          newComment:null,
          currentUser:null,
          comments:[]
        
      }

    },
    methods:{
        addComment(){
      if(this.newComment){
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.currentUser.id,
          content: this.newComment,
          time: Date.now()
        }).then(doc => {
          this.newComment = null
        })
      } else {
        this.feedback = 'You must enter a comment to add it'
      }
    }
  },
        
    created(){
    let ref = db.collection('users')
    // current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.currentUser = doc.data()
        this.currentUser.id = doc.id
      })
      // console.log(this.currentUser)
    })
    // profile data
    ref.doc(this.$route.params.id).get()
    .then(user => {
      this.profile = user.data()
    })

    // getting messages from the firestore
   db.collection('comments').where('to', '==', this.$route.params.id).orderBy('time')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content,
            time:moment(change.doc.data().time).format('lll'),
          })
        }
      })
    })
  },
  
  }
</script>

<style>
.view-profile .card{
  padding: 20px;  
}
.comments{
  max-height: 400px;
  overflow: auto;
  position: relative;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.view-profile h2{
  font-size: 2em;
  margin-top: 0
}
.view-profile li {
  padding: 10px;
  border-bottom:  1px solid #fff
}
 .comments .from{
  font-size: 1.9em;
  margin-right:20px;
  color: #5e35b1
}
.comments .content{
  font-size: 1.5em;
  line-height: 2
}

.comments .time{
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.442)
}
.item{
  position: relative;
  left: 0
}
.view-profile li{
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left
}
</style>
