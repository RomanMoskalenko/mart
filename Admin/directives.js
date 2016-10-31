'use strict';

app.directive('adminNewartworks', function () {
	return {
		restrict: "E",
		controller: "adminNewartworksCtrl",
		templateUrl: "Admin/admin-newartworks.html"
	}
});

app.directive('adminOrders', function () {
	return {
		restrict: "E",
		controller: "adminOrdersCtrl",
		templateUrl: "Admin/admin-orders.html"
	}
});

app.directive('adminNewpublication', function () {
	return {
		restrict: "E",
		controller: "adminNewpublication",
		templateUrl: "Admin/new-publication.html"
	}
});

app.directive('adminAllpublications', function () {
	return {
		restrict: "E",
		controller: "adminAllpublications",
		templateUrl: "Admin/all-publications.html"
	}
});

app.directive('editor', function () {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			tinymce.init({ selector:'textarea' });
		}
	}
});