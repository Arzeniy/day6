<template>
   <div style align="center">
       <h1><img src="components/Logo.jpg" alt="НоваПошта" width="50" height="50">
       <span style="color: red; font-size: 2em">Н</span>ова <span style="color: red; font-size: 2em">П</span>ошта</h1> 
       <select v-model="dep">
           <option  v-for="city in cities" v-bind:key="city.Ref" v-bind:value="city.Description">{{ city.Description}}</option>
       </select>
       <br><button v-on:click="checkDeps">Вибрать отделение</button>
       <br><select>
           <option  v-for="dep in departments" v-bind:key="dep.CityRef" v-bind:value="dep.Description">{{ dep.Description}}</option>
       </select>
   </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
 
   export default {
        data: function() {
           return {
           cities:[],
           departments:[],
           dep:"Запоріжжя",
        }},
        mounted: function(){
            
                axios.post("https://api.novaposhta.ua/v2.0/json/Address/getCities", {
                        apiKey: "0555c556f433266e962e4ded47a8b3e9",
                        modelName: "Address",
                        calledMethod: "getCities",
                        methodProperties: {}
                })
                .then((response)=>{
                    console.log(response.data);
                    this.cities = response.data.data;
                })     
        },
        methods:{
            checkDeps: function() {
                
                 axios.post("https://api.novaposhta.ua/v2.0/json/Address/getWarehouses", {
                        apiKey: "0555c556f433266e962e4ded47a8b3e9",
                        modelName: "Address",
                        calledMethod: "getWarehouses",
                        methodProperties: {
                            CityName: this.dep,
                        }
                })
                .then((response)=>{
                    console.log(response.data);
                    this.departments = response.data.data;
                })
            }
        
        }
    }
</script>
<style scoped>

</style>