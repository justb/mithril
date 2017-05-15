// src/models/User.js
var m = require("mithril")

var User = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users",
            withCredentials: true,
        })
        .then(function(result) {
            User.list = result.data
        })
    },

    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/:id",
            data: {id: id},
            withCredentials: true,
        })
        .then(function(result) {
            User.current = result
        })
    },

    save: function() {
        if(User.current.id){
            return m.request({
                method: "PUT",
                url: "https://rem-rest-api.herokuapp.com/api/users/:id",
                data: User.current,
                withCredentials: true,
            }).then(function(){
                m.route.set('/list')
            })
        }else{
            return m.request({
                method: "POST",
                url: "https://rem-rest-api.herokuapp.com/api/users",
                data: {firstName:User.current.firstName,lastName:User.current.lastName},
                withCredentials: true,
            }).then(function(){
                m.route.set('/list')
            })
        }
        
        
    },

    create: function(){
        alert(123)
    }
}

module.exports = User