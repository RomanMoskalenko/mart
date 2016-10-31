'use strict';

app.controller('artworksCtrl', ['$scope', 'artworks', function ($scope, artworks) {

	$scope.artworks = [];

    artworks.getArtworks({count: 8, offset: 0, status: 'publish'}).then(function (data) {
        $scope.artworks = data;
    });

}]);

app.controller('searchArtworksCtrl', ['$scope', '$route', '$location', '$routeParams', 'artworks', function ($scope, $route, $location, $routeParams, artworks) {


    $scope.postsPerPage = 99;
    $scope.postsOffset = (parseInt($routeParams.page)-1)*$scope.postsPerPage || 0;

    $scope.pageId = $routeParams.page;

    // минимальная цена артворка и максимальная
    $scope.priceRange = {
        min: 0,
        max: 300
    };

    $scope.search = {
        category: '',
        range: {
            from: parseFloat($routeParams.price_from) || 1,
            to: parseFloat($routeParams.price_to) || 260
        },
        styles: ""
    }


    if ($scope.search.category != undefined) {
        $scope.search.category = $routeParams.category;
    }

    $scope.prevPageId = 1;
    $scope.nextPageId = 2;

    if ($scope.pageId == undefined) {
        $scope.pageId = 1;
    } else {

        $scope.pageId = parseInt($scope.pageId);

        if ($scope.pageId !== 1) {
            $scope.prevPageId = +$scope.pageId - 1;
            $scope.nextPageId = +$scope.pageId + 1;
        }

    }

    
    $scope.artworks = [];

    getArtworks();

    $scope.filterByCategory = function ($event, cat) {
        $event.preventDefault();
        $scope.search.category = cat;
        $location.search('category', cat);
        $location.search('page', 1);
    }

    $scope.priceFilter = function (artwork) {
        return (artwork.price >= $scope.search.range.from && artwork.price <= $scope.search.range.to);
    }

    $scope.applyPrice = function () {
        $location.search('price_from', $scope.search.range.from);
        $location.search('price_to', $scope.search.range.to);
        $route.reload();
    }

    $scope.prevPage = function ($event) {
        $event.preventDefault();
        $location.search('page', $scope.prevPageId);
    }

    $scope.nextPage = function ($event) {
        $event.preventDefault();
        $location.search('page', $scope.nextPageId);
    }

    function getArtworks () {

        if ($scope.pageId != undefined) {
            
        }

        artworks.getArtworks({count: -1, status: 'publish'}).then(function (data) {
            $scope.artworks = data;
            $scope.artworks.category = angular.fromJson($scope.artworks.category);
        });
    }


}]);



app.controller('artworkDetailCtrl', ['$scope', '$routeParams', 'artworks', function ($scope, $routeParams, artworks) {
	$scope.artworkId = $routeParams.artworkId;
	$scope.artwork = {};

    artworks.getArtworksById({ids: [$scope.artworkId]}).then(function (data) {
        $scope.artwork = data[0];

        // artwork details
        $scope.artwork_sizes = [];
        $scope.artwork.users_details = {
            artwork_type: 'print'
        };
    });

    $scope.addToCart = function () {
        alert("ok");
    }

    $scope.selectChange = function () {
        console.log($scope.artwork.users_details);
    }

}]);

app.controller('uploadArtwork', ['$scope', '$http', '$route', '$rootScope', 'FlashService', function ($scope, $http, $route, $rootScope, FlashService) {

    $scope.activeStep = 0;
    $scope.submit = submit;

    $scope.artwork = {
        title: "",
        price: 1.20,
        description: "",
        category: []
    };

    $scope.requires = {
        isImage: null
    }

    $scope.nextStep = function () {
        if ($scope.activeStep < 4)
            $scope.activeStep++;
    }

    $scope.prevStep = function () {
        if ($scope.activeStep > 0)
            $scope.activeStep--;
    }

    let data = new FormData();

    $scope.uploadFile = function(files) {
        data.append("file", files);
    };

    function submit() {

        if (!validate()) return;

        data.append("username", $rootScope.globals.currentUser.username);
        data.append("title", $scope.artwork.title);
        data.append("description", $scope.artwork.description);
        data.append("price", $scope.artwork.price);
        data.append("categories", angular.toJson($scope.artwork.category));

        // вынести в сервис
        $http.post("backend/loadArtwork.php", data, {
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success( function (data) {
            FlashService.Success('upload_1', true);
            //$route.reload();
        }).error( function (data) {console.log(data);FlashService.Error('upload_0', false);} );
    }

    function validate() {
        let title = $scope.artwork.title;
        if (title.length < 2) return false;

        let price = $scope.artwork.price;
        if (price.length < 1) return false;

        return true;
    }

}]);