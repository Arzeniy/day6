<template>
<div>
    <h1>Счетчик студентов</h1>
    <br>
    Счетчик студентов - {{studentsCount}}   
    <br>
    Информация о студенте
    {{student.name}}
    <br>
    <img v-bind:src="student.photo">
</div>
</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
 
 export default {
     props: {
         id:'',
     },
     data: function(){
         return {
             name:"",
             group:"",
             student:{},
         };
     },
 mounted: function(){
     Vue.axios.get("http://46.101.212.195:3000/students/"+this.id)
     .then( (response)=>{
         console.log(response.data)
         this.student = response.data;
     })
 },
         computed: {
         studentsCount () {
         return this.$store.getters.getCount
    }
  }
 }

 </script>