'use strict';

app.factory('artworks', ['$http', function ($http) {
	let service = {};

	service.getArtworks = getArtworks;
	service.getArtworksById = getArtworksById;
	service.changeStatusArtwork = changeStatusArtwork;
	service.updateArtwork = updateArtwork;

	return service;

	function getArtworks(params) {
	    return $http.post('backend/getArtworks.php', params).then(handleSuccess, handleError('error getting artworks'));
	}

	function getArtworksById(params) {
		return $http.post('backend/getArtworksById.php', params).then(handleSuccess, handleError('error getting artwork'));
	}

	function changeStatusArtwork(params) {
		return $http.post('backend/changeStatusArtwork.php', params).then(handleSuccess, handleError('error changing artwork'));   
	}

	function updateArtwork() {
	    
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