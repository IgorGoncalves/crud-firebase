var App = {
    component: {},
    bag:{},
    models: {
        User: function (name = '', email = '', imageUrl = ''){
            return {
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


App.component.database = (function() {    
       App.init.firebase();       
       var database = firebase.database();
       return {
           user: (function(){
               return {
                    addOrUpdate:  function (userId, name, email, imageUrl) {            
                        var newUser = new App.models.User(name, email, imageUrl);                        
                        database.ref('users/' + userId).set(newUser);
                    },
                    getAll: function (callback){
                        return database.ref('users').on('value', function(snap){
                            var snapUsers = snap.val();
                            if(snapUsers !== null){
                                if(!snapUsers instanceof Array) snapUsers = [snapUsers];                            
                                snapUsers = snapUsers.filter(function (v, k){
                                    if(v != undefined){
                                        v.id = k
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
                        database.ref('users/' + vm.users[index].id).set(null);
                    }
               }
           })()
       };  
})();


var vm = new Vue({
    el: '#app',
    data: {
        users:[]
    },
    methods: {
        remove: function (index) {
          // `this` inside methods point to the Vue instance
            App.component.database.user.removeByIndex(index);
        }
      }
});    


(function() {    
    var daoUser = App.component.database.user;        
    daoUser.addOrUpdate(2, "beatriz", "beatriz_carvalho@gmail.com", "");
    daoUser.addOrUpdate(1, "Igor", "igorgoncalves@gmail.com", "");
    daoUser.addOrUpdate(3, "marreta", "marreta@gmail.com", "");
    daoUser.getAll(function(users){
        vm.users = users;        
    });    

})();



