'use strict';

app.factory('orders', ['$http', function ($http) {
	let service = {};

	service.getOrders = getOrders;
	service.changeStatus = changeStatus;

	return service;

	function getOrders(params) {
		return $http.post('backend/getOrders.php', params).then(handleSuccess, handleError('error getting orders'));
	}

	function changeStatus(params) {
		return $http.post('backend/changeStatusOrder.php', params).then(handleSuccess, handleError('error getting orders'));
	}

	function handleSuccess(res) {
	    return res.data;
	}

	function handleError(error) {
	    return function () {
	        return { success: false, message: error };
	    };
	}

}]);