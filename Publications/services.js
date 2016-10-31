'use strict';

app.factory('publicationsData', ['$http', function ($http) {
	
	let url = "backend/getPublications.php";

	let service = {};

	service.getPublications = getPublications;
	service.getPublicationById = getPublicationById;
	service.create = create;
	service.changeStatusPublication = changeStatusPublication;
	service.updatePublication = updatePublication;

	return service;

	function getPublications(params) {
	    return $http.post('backend/getPublications.php', params).then(handleSuccess, handleError('error getting artworks'));
	}

	function getPublicationById(params) {
		return $http.post('backend/getOnePublication.php', params).then(handleSuccess, handleError('error getting artwork'));
	}

	function create(publication) {
		return $http.post('backend/createPublication.php', publication).then(handleSuccess, handleError('error changing artwork'));   
	}

	function changeStatusPublication(params) {
		return $http.post('backend/changeStatusPublication.php', params).then(handleSuccess, handleError('error changing artwork'));   
	}

	function updatePublication(data) {
	    return $http.post('backend/updatePublication.php', data).then(handleSuccess, handleError('error changing artwork'));   
	}

	function handleSuccess(res) {
	    return res.data;
	}

	function handleError(error) {
	    return function () {
	        return { success: false, message: error };
	    };
	}

	/*return function (param) {
		let data = {};
		angular.forEach(param, function (value, key) {
			data[key] = value;
		});

		if (data.task === "all") {
			return $http({
			    url: url, 
			    method: "POST",
			    data: data
			})
			.success(function (data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
		}

		if (data.task === "one") {
			return $http({
			    url: url, 
			    method: "POST",
			    data: data
			})
			.success(function (data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
		}

	};*/

}]);