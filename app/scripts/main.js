var App = {
    component: {},
    models: {
        User: function (name = "", email = "", imageUrl = ""){
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
                        console.log(newUser);
                        database.ref('users/' + userId).set(newUser);
                    },
                    getAll: function (){
                        database.ref("users").on('value', function(snap){
                            console.log(snap.val());
                        });
                    }
               }
           })()
       };  
})();


(function() {    
    var daoUser = App.component.database.user;        
    daoUser.addOrUpdate(2, "beatriz", "beatriz_carvalho@gmail.com", "");
    daoUser.getAll();
})();



