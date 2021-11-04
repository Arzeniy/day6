<template>
<div>
        <h1>Счетчик студентов</h1>
        Счетчик студентов - {{studentsCount}}   
    <table>
                <tr>
                    <th>Фото</th>
                    <th>Имя</th>
                    <th>Группа</th>
                    <th>Оценка</th>
                    <th>Практическая</th>
                </tr>
                <tr v-for="stud in students" v-bind:key="stud._id">
                    <td><img v-bind:src="stud.photo" width="50px"></td>
                    <td v-bind:style="stud.name.indexOf(search)>-1 && search.length >0  ? 'background-color:#CA2C2C' : 'background-color:#fff'">
                    <router-link :to="'/student-info/'+stud._id">
                    {{stud.name}}</router-link></td>
                    <td>{{stud.group}}</td>
                    <td>{{stud.mark}}</td>
                    <td><input type="checkbox" v-bind:checked="stud.isDonePr"></td>
                    <td><a href="#" v-on:click="deleteStudent(stud._id)">Удалить</a></td>
                    <td><button v-on:click="getData(stud._id,stud.name,stud.group,stud.mark,stud.isDonePr)"><img src="media/pencil.png" width="20px"></button></td>
                </tr>
            </table>

            <br>Введите фамилию <input v-model="search">
            <p><h3>Добавить нового студента</h3>
            <br>Введите имя: <input v-model="name">
            <br>Введите группу: <input v-model="group">
            <br>Оценка : <input type="number" v-model="mark">
            <br>Введите сдана ли Практичная : <input type="checkbox" v-model="isDonePr">
            <br><button v-on:click="addStudent">Добавить студента</button>

             <p><h3>Обновить студента </h3>
            <br>Введите имя: <input v-model="name1">
            <br>Введите группу:: <input v-model="group1">
            <br>Оценка : <input type="number" v-model="mark1">
            <br>Введите сдана ли Практическая : <input type="checkbox" v-model="isDonePr1">
            <br><button v-on:click="updateStudent()">Обновить студента</button>
            <br>
            <br>Введите сумму: <input type="number" value="100" v-model="start_value">
            <br>Конвертировать из 
            <br><input type="radio" value="USD" name="value"  v-model="start_ccy"><label for="USD">USD</label>
            <br><input type="radio" value="EUR" name="value" v-model="start_ccy"><label for="EUR">EUR</label>
            <br><input type="radio" value="RUR" name="value" v-model="start_ccy"><label for="RUR">RUR</label>
            <br>в
            <br><input type="radio" value="USD" name="Convert" v-model="end_ccy"><label for="USD">USD</label>
            <br><input type="radio" value="EUR" name="Convert" v-model="end_ccy"><label for="EUR">EUR</label>
            <br><input type="radio" value="RUR" name="Convert" v-model="end_ccy"><label for="RUR">RUR</label>
            <button v-on:click="convert">Конвертировать</button>
            <br>{{result}}{{end_value | roundValue}}{{end_ccy}}
</div>

</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'


export default {
    data: function() {
           return {
  students: [],
            currency:[],
            search:"",
            start_ccy:"",
            end_ccy:"",
            sell:0,
            buy:0,
            start_value:0,
            end_value:0,
            result:"",
             newStudent: {},
            search:"",
            result:"",
            name:"",
            group:"",
            mark:0,
            isDonePr:false,
            names:"",
            groups:"",
            isDonePrs:false,
            names:"",
            groups:"",
            isDonePrs:false,
            studId:"",
             showInput:false,
            idTest:"",
            marks:0,
        }}, 
         mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response)=>{
            console.log(response.data);
            this.students = response.data;
            this.$store.commit('setCount',this.students.length);
           })
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
          })
                  },
         methods:{
                choseTheme: function(theme){
                this.$store.commit('setTheme', theme);
            },
        addStudent:function(){
            Vue.axios.post("http://46.101.212.195:3000/students", {
                name: this.name,
                group: this.group,
                mark: this.mark,
                isDonePr: this.isDonePr,
            })
            .then((response) => {
                console.log(response.data)
                axios.get("http://46.101.212.195:3000/students").then((response)=>{
                this.students = response.data;
                this.$store.commit('setCount',this.students.length);
            })
            })
        },
        deleteStudent:function(id){
            Vue.axios.delete("http://46.101.212.195:3000/students/"+id)
            .then((repsonse)=>{

            axios.get("http://46.101.212.195:3000/students").then((response)=>{
                this.students = response.data;
                this.$store.commit('setCount',this.students.length);
            })
            })
        },
        getData: function(id,name,group,mark,isDone){
            this.studId = id;
            this.name1 = name;
            this.group1 = group;
            this.mark1 = mark;
            this.isDonePr1 = isDone;
        },
        updateStudent:function(){
            Vue.axios.put("http://46.101.212.195:3000/students/"+this.studId, {
                name: this.name1,
                group: this.group1,
                mark: this.mark1,
                isDonePr: this.isDonePr1,
            })
            axios.get("http://46.101.212.195:3000/students").then((response)=>{
                this.students = response.data;
            })
        },
        convert:function(){
            for(let i=0; i<this.currency.length; i++)
            {
                if (this.currency[i].ccy==this.start_ccy)
                      this.sell=this.currency[i].sale;
                if (this.currency[i].ccy==this.end_ccy)
                      this.buy=this.currency[i].buy;
            }
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " + this.start_ccy + " = " ;
            
        },
         },   
             filters:{
            roundValue: function(value){
                return parseFloat(value.toFixed(2));
            },
        }, 
            computed: {
            studentsCount () {
                return this.$store.getters.getCount
            },
            chosenTheme(){
                return this.$store.getters.getTheme
            },
        }
}
</script>