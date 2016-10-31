/**
 * Created by Roma on 06.10.2016.
 */

'use strict';

app.controller('publicationsCtrl', ['$scope', 'publicationsData', function ($scope, publicationsData) {

    let count = 50;

    $scope.publications = [];

    publicationsData.getPublications({count: count, status: 'publish'}).then(function (data) {
        $scope.publications = angular.fromJson(data);
    });

}]);

app.controller('publicationsOnMainPageCtrl', ['$scope', 'publicationsData', function ($scope, publicationsData) {

    let count = 10;

    $scope.publications = [];

    publicationsData.getPublications({count: count, status: 'publish'}).then(function (data) {
        $scope.publications = angular.fromJson(data);
    });

}]);



app.controller('publicationDetailCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'publicationsData', '$sce', function ($scope, $rootScope, $location, $routeParams, publicationsData, $sce) {
    $scope.publicationId = $routeParams.publicationId;
    $scope.publication = {};

    publicationsData.getPublicationById({id: $scope.publicationId}).then(function (data) {
        let publication = angular.fromJson(data);
        let userStatus = $rootScope.globals.currentUser;
        if (publication.status != 'publish' && (userStatus == undefined || userStatus.status != 'admin') ) {
            $location.path('/');
            return;
        }
        $scope.publication = publication;
        $scope.publication.text = $sce.trustAsHtml($scope.publication.text);
    });

}]);

app.controller('fotoramaCtrl', ['$scope', 'publicationsData', function ($scope, publicationsData) {

	$scope.fotoArray = [];

	publicationsData.getPublications({count: -1, status: 'publish', slider: true}).then(function (data) {
        let slides = angular.fromJson(data);
        pushSlides(slides);
    });


    function pushSlides(slides) {
    	angular.forEach(slides, function (value, key) {
			let slideHTML = "<div class='slide' style='background-image: url(" + value.image + ")'><div class='slide_content'><div class='wrap wrap_size_2'><h1>" + value.title + "</h1><a href='publications/" + value.id + "' class='bttn bttn_size_1 show_more'>Show more</a></div></div></div>";
			$scope.fotoArray.push({
				"type": "html",
				"html": slideHTML
			});
		});
    }

}]);