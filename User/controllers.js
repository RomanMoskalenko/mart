'use strict';

app.controller('userCtrl', ['user', 'auth', function (user, auth) {
    let self = this;

    function handleRequest(res) {
        var token = res.data ? res.data.token : null;
        if(token) { console.log('JWT:', token); }
        self.message = res.data.message;
    }

    self.login = function () {
        user.login(self.email, self.password)
            .then(handleRequest, handleRequest)
    }

    self.register = function () {
        user.register(self.email, self.password)
            .then(handleRequest, handleRequest)
    }

    self.getQuote = function () {
        user.getQuote()
            .then(handleRequest, handleRequest)
    }

    self.logout = function () {
        auth.logout && auth.logout();
    }

    self.isAuthed = function () {
        return auth.isAuthed ? auth.isAuthed() : false;
    }

}]);