'use strict';

app.factory('FlashService', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
	var service = {};

    service.Success = Success;
    service.Error = Error;

    return service;

	function Success(data, reload) {

		$rootScope.notifications.code = data;

		if (reload) {
			$rootScope.notifications.reload = true;
		} else {
			$rootScope.notifications.reload = false;
		}
	}

	function Error(data, reload) {
		
	    $rootScope.notifications.code = data;

	    if (reload) {
			$rootScope.notifications.reload = true;
		} else {
			$rootScope.notifications.reload = false;
		}
	}


}]);