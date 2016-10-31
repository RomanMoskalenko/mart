'use strict';

app.controller('adminNewartworksCtrl', ['$scope', '$rootScope', '$route', 'artworks', function ($scope, $rootScope, $route, artworks) {
    
    $scope.newArtworks = [];


    artworks.getArtworks({count: 10, status: 'draft'}).then(function (data) {
        $scope.newArtworks = data;
    });

    $scope.hiddenArtworks = [];

    $scope.publishArt = function (id) {
        if ($rootScope.globals.currentUser.status !== 'admin') return;

        artworks.changeStatusArtwork({id: id, status: 'publish'}).then(function (data) {
        	$scope.hiddenArtworks.push(id);
            //$route.reload();
        });
    }

    $scope.cancelArt = function (id) {
        if ($rootScope.globals.currentUser.status !== 'admin') return;

        let newStatus = 'trash';

        artworks.changeStatusArtwork({id: id, status: newStatus}).then(function (data) {
            //$route.reload();
            $scope.hiddenArtworks.push(id);
        });
    }

}]);

app.controller('adminOrdersCtrl', ['$scope', '$rootScope', 'orders', function ($scope, $rootScope, orders) {

	orders.getOrders({count: -1, status: "pending"}).then(function () {
		// success
	}, function () {
		// error
	});

	$scope.hiddenOrders = [];

	$scope.doneOrder = function (id) {
		changeStatus(id, 'done');
	}

	$scope.cancelOrder = function (id) {
		changeStatus(id, 'canceled');
	}

	function changeStatus (id, status) {
		orders.changeStatus({id: id, status: status}).then(function (data) {
			console.log(data);
			$scope.hiddenOrders.push(id);
		}, function (data) {
			console.log('err' + data);
		})
	}



}]);

app.controller('adminNewpublication', ['$scope', '$http', '$route', 'publicationsData', 'FlashService', function ($scope, $http, $route, publicationsData, FlashService) {

	$scope.publication = {};

	let data = new FormData();

	$scope.requires = {
        isImage: null
    }

    $scope.uploadFile = function(files) {
        data.append("file", files);
    };

    $scope.submit = function () {

        data.append("title", $scope.publication.title);
        data.append("text", $scope.publication.text);
        data.append("excerpt", $scope.publication.excerpt);
        data.append("status", $scope.publication.status);

        // вынести в сервис
        $http.post("backend/createPublication.php", data, {
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success( function (data) {
            console.log(data);
            FlashService.Success('upload_1', false);
            //$route.reload();
        }).error( function (data) {console.log(data);FlashService.Error('upload_0', false);} );


		
	}

}]);

app.controller('adminAllpublications', ['$scope', 'publicationsData', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, publicationsData, DTOptionsBuilder, DTColumnBuilder) {

    let count = -1;
    let vm = this;

    $scope.publications = [];

    publicationsData.getPublications({count: count}).then(function (data) {
        angular.forEach(data, function (value, key) {
            data[key].is_slider = value.is_slider == 1 ? true : false;
            let date = new Date(Date.parse(value.date));
            data[key].date = date.getUTCDate() + "." + (+date.getUTCMonth() + 1) + "." + date.getUTCFullYear();
        });
        $scope.publications = angular.fromJson(data);
    });

    $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withOption('order', [0, 'desc'])
            .withColumnFilter({
                aoColumns: [
                {
                    type: 'number'
                },
                {
                    type: 'text',
                    bRegex: true,
                    bSmart: true
                }, {
                    type: 'text',
                    bRegex: true,
                    bSmart: true
                },
                {
                    type: 'text',
                    bRegex: true,
                    bSmart: true
                },
                {
                    type: 'text',
                    bRegex: true,
                    bSmart: true
                },
                {
                    type: 'select',
                    bRegex: false,
                    values: ['publish', 'pending', 'draft', 'trash']
                },
                {
                    type: 'text',
                    bRegex: true,
                    bSmart: true
                },]
            });
    
    $scope.dtInstance = {};

    $scope.reloadData = function() {
       $scope.dtInstance._renderer.rerender(); 
    }

    $scope.statusChange = function (id, status) {
        publicationsData.updatePublication({id: id, status: status}).then(function (data) {console.log(data)});
        $scope.reloadData();
    }

    /*$scope.filter = {
        slider: '',
        status: 'publish'
    }*/

    $scope.isSliderChange = function (id, index) {
        publicationsData.updatePublication({id: id, is_slider: $scope.publications[index].is_slider}).then(function (data) {console.log(data)});
    }

}])