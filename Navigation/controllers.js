'use strict';

app.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.nav = [{
        url: 'newin',
        title: 'New In',
    }, {
        url: 'artworks',
        title: 'Artworks'
    }, {
        url: 'artists',
        title: 'Artists'
    }, {
        url: 'publications',
        title: 'Publications'
    }, {
        url: 'exhibitions',
        title: 'Exhibitions'
    }, {
        url: 'contacts',
        title: 'Contacts'
    }];

    $scope.navClass = function (page) {
        return ($location.path().substr(0, page.length) === page) ? 'active' : '';
    };

}]);