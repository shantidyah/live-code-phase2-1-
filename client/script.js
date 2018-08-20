var app = new Vue({
    el:"#app",
    data:{
        input_name:'',
        input_price:0,
        input_tags:'',
        list:'',
        username:'',
        password:''
    },
    created(){
        this.listItem()
    },
    methods:{
        searchItem(){
            axios.get(`http://localhost:3000/items?name=${this.input_name}&price_start=${this.input_price}&tag=${this.input_tags}`)
            .then( result =>{
                console.log(result);
                this.list = result.data
            })
            .catch(err=>{
                console.log(err);
                
            })
        },
        listItem(){
            axios.get(`http://localhost:3000/items/all`)
            .then( result =>{
                console.log(result);
                this.list = result.data
            })
            .catch(err=>{
                console.log(err);
                
            })
        },
        login(){
            axios.post('http://localhost:3000/request_token',{
                username: this.username,
                password: this.password
            })
            .then( item =>{
                console.log(item.data.token);
            })
            .catch(err=>{
                console.log(err);
                
            })
        }
    }
})