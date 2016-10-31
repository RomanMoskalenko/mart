'use strict';

app.factory('authInterceptor', ['API', 'auth', function (API, auth) {
	return {
		// automatically attach Authorization header
		request: function (config) {
			let token = auth.getToken();
			if (config.url.indexOf(API) === 0 && token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			
			return config;
		},
		// If a token was sent back, save it
		response: function (res) {
			if(res.config.url.indexOf(API) === 0 && res.data.token) {
			    auth.saveToken(res.data.token);
			}

			return res;
		}
	}
}]);

app.service('user', ['$http', 'API', 'auth', function ($http, API, auth) {
	let self = this;

	self.getQuote = function () {
		return $http.get(API + '/auth/quote')
	};

	// add authentication methods here

	self.register = function (email, password) {
		return $http.post(API + '/auth/register', {
			email: email,
			password: password
		})
	};

	self.login = function (email, password) {
		return $http.post(API + '/auth/login', {
			email: email,
			password: password
		})
	};

}]);

app.service('auth', ['$window', function ($window) {
	let self = this;

	self.parseJwt = function(token) {
	  var base64Url = token.split('.')[1];
	  var base64 = base64Url.replace('-', '+').replace('_', '/');
	  return JSON.parse($window.atob(base64));
	}

	self.saveToken = function(token) {
	  $window.localStorage['jwtToken'] = token;
	}

	self.getToken = function() {
	  return $window.localStorage['jwtToken'];
	}

	self.isAuthed = function() {
	  var token = self.getToken();
	  if(token) {
	    var params = self.parseJwt(token);
	    return Math.round(new Date().getTime() / 1000) <= params.exp;
	  } else {
	    return false;
	  }
	}

	self.logout = function() {
	  $window.localStorage.removeItem('jwtToken');
	}

	
}]);