'use strict';

app.directive('blockAuth', function ($route) {
	return {
		restrict: "E",
		templateUrl: "User/block-auth.html",
		link: function (scope, element, attrs) {


			let tag = "[data-btn]";

			$(document).on('click', tag, function () {
				let task = $(this).data('btn');
				$.arcticmodal('close');
				$("[data-popup-id=" + task + "]").arcticmodal({
				    overlay: {
				        css: {
				            backgroundColor: '#000',
				            opacity: .75
				        }
				    }
				});
			});
		}
	}
});