'use strict';

app.directive('packery', function (){
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			var img = element.find('img');
			img.bind('load', function () {
                var pckry = new Packery( '.packery', {
					itemSelector: '.item',
		  			gutter: 20
				});
            });
		}
	}
});

app.directive('blockNotifications', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	return {
		restrict: "E",
		templateUrl: "Home/notifications.html",
		link: function (scope, element, attrs) {

			$rootScope.$watch('notifications.code', function() {
				console.log($rootScope.notifications);
		        	

		        if (!$rootScope.notifications) return;

		        $(document).find("[data-popup-id='"+ $rootScope.notifications.code +"']").arcticmodal({
				    overlay: {
				        css: {
				            backgroundColor: '#000',
				            opacity: .75
				        }
				    }
				});

				$timeout(function () {
					$("[data-popup-id='" + $rootScope.notifications.code + "']").arcticmodal('close');

					if ($rootScope.notifications.reload) {
						window.location.reload();
					}

				}, 2000);


		    });
		}
	}
}]);