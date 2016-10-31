/**
 * Created by Roma on 06.10.2016.
 */

'use strict';

let app = angular.module('mart', ['ngRoute', 'ngCookies', 'localytics.directives']);

app.constant('API', 'http://test-routes.herokuapp.com')

window.routes = {
    "/": {
        templateUrl: 'Home/home.html',
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    },
    /*"/newin": {
        templateUrl: 'templates/newin.html',
        requireLogin: false,
        requireAdmin: false
    },*/
    "/artworks": {
        templateUrl: 'Artworks/artworks.html',
        controller: 'searchArtworksCtrl',
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    },
    "/artworks/:artworkId": {
        templateUrl: 'Artworks/single_artwork.html',
        controller: 'artworkDetailCtrl',
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    },
    "/publications": {
        templateUrl: 'Publications/publications.html',
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    },
    "/publications/:publicationId": {
        templateUrl: 'Publications/single_publication.html',
        controller: 'publicationDetailCtrl',
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    },
    /*"/artists": {
        templateUrl: "templates/artists.html",
        controller: 'artistsCtrl',
        requireLogin: false,
        requireAdmin: false
    },
    "/artists/:artistUsername": {
        templateUrl: "templates/single_artist.html",
        controller: "artistDetailCtrl",
        requireLogin: false,
        requireAdmin: false
    },*/
    "/personal-area": {
        templateUrl: 'PersonalArea/personal_area.html',
        controller: 'personalCtrl',
        requireLogin: true,
        requireAdmin: false,
        requireArtist: false
    },
    "/administrate": {
        templateUrl: 'Admin/admin_page.html',
        requireLogin: true,
        requireAdmin: true,
        requireArtist: false
    },
    "/cart": {
        templateUrl: 'Cart/cart.html',
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    },
    "/upload": {
        templateUrl: "Artworks/upload.html",
        controller: "uploadArtwork",
        requireLogin: true,
        requireAdmin: false,
        requireArtist: true
    },
    "/test": {
        templateUrl: "User/test.html",
        controller: "testCtrl",
        requireLogin: false,
        requireAdmin: false,
        requireArtist: false
    }
};

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider.otherwise({redirectTo: '/'});


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $httpProvider.interceptors.push('authInterceptor');

}]);

app.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
    $rootScope.globals = $cookieStore.get('globals') || {};

    $rootScope.notifications = {};

    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        for(var i in window.routes) {
            if(next.indexOf(i) != -1) {
                var loggedIn = $rootScope.globals.currentUser;
                var status = null;
                if (loggedIn) {
                    status = $rootScope.globals.currentUser.status;
                    console.log(loggedIn);
                }

                if(window.routes[i].requireLogin && !loggedIn) {
                    event.preventDefault();
                    $location.path('/');
                }

                if (window.routes[i].requireArtist && status !== 'artist') {
                    event.preventDefault();
                    $location.path('/');
                }

                if (window.routes[i].requireAdmin && status !== 'admin') {
                    event.preventDefault();
                    $location.path('/');
                }
            }
        }
    });


}]);


var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};
