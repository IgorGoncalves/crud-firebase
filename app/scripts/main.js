var App = {
    manager: {},    
    models: {
        User: function (id = '', name = '', email = '', imageUrl = ''){
            return {
                userid : id,
                username: name,
                email: email,
                profile_picture : imageUrl
            }
        }
    },
    init: (function() {               
        return {
            all: function(){
                App.init.firebase();
            },
            firebase: function() {
                var config = {
                    apiKey: 'AIzaSyDPHOXDa_OcYZOEUFgQmv4ZbmumTjocwN8',
                    authDomain: 'crud-carmelita.firebaseapp.com',
                    databaseURL: 'https://crud-carmelita.firebaseio.com',
                    projectId: 'crud-carmelita',
                    storageBucket: 'crud-carmelita.appspot.com',
                    messagingSenderId: '400796967793'
                };                            
                firebase.initializeApp(config);               
            },        
        };  
 })()
}


App.manager = (function() {    
       App.init.firebase();       
       var database = firebase.database();
       return {
           user: (function(){
               return {
                    addOrUpdate:  function (userId, name, email, imageUrl) {            
                        var newUser = new App.models.User(userId, name, email, imageUrl);
                        database.ref('users/' + userId).set(newUser);
                    },
                    getAll: function (callback){
                        return database.ref('users').on('value', function(snap){
                            var snapUsers = snap.val();
                            if(snapUsers !== null){
                                if(!snapUsers instanceof Array) snapUsers = [snapUsers];                            
                                snapUsers = snapUsers.filter(function (v, k){
                                    if(v != undefined){
                                        v.userid = k
                                        return true;
                                    }
                                    return false;
                                });
                            }
                            console.log(snap.val())
                            callback(snapUsers);
                        });
                    },                    
                    removeByIndex: function (index){
                        database.ref('users/' + vm.users[index].userid).set(null);
                    }
               }
           })()
       };  
})();


var vm = new Vue({
    el: '#app',
    data: {
        users:[],
        user:{},
        isEdit: false

    },
    methods: {
        remove: function (index) {
          // `this` inside methods point to the Vue instance
            App.manager.user.removeByIndex(index);
        },
        toedit: function (user){      
            this.isEdit = true;      
            this.user = _.clone(user);            
        },
        edit: function (){
            App.manager.user.addOrUpdate(this.user.userid, this.user.username, this.user.email, this.user.profile_picture); 
            this.user = {};
            this.isEdit = false;
        },
        add: function (){
            var maxId = _.maxBy(this.users, 'userid').userid;
            App.manager.user.addOrUpdate(maxId+1, this.user.username, this.user.email);
        }
      }
});    


(function() {    
    var daoUser = App.manager.user;
    daoUser.getAll(function(users){
        vm.users = users;
    });    

})();