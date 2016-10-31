app.directive('listPublications', function () {
	return {
		restrict: "E",
		templateUrl: "Publications/list-publications.html",
		controller: "publicationsCtrl",
	};
});

app.directive('publicationsOnMainPage', function () {
	return {
		restrict: "E",
		templateUrl: "Publications/list-publications.html",
		controller: "publicationsOnMainPageCtrl",
	};
});

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

app.directive('blockSlider', function () {
	return {
		restrict: "E",
		templateUrl: "Publications/slider.html"
	};
});

app.directive('fotorama', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
			scope.$watch(attrs.item, function (value) {
                  var val = angular.copy(value);
                  if (val) {
					$timeout(function () {
					  var fotoramaKey = [];
					  angular.forEach(val, function (val, key) {
					      var fotoObj = {};

					      if (val.type == 'image') { // it is an image
					          fotoObj.img = val.url;
					          fotoObj.thumb = val.url;
					          fotoObj.caption = val.caption;
					          fotoramaKey.push(fotoObj);
					      }

					      if (val.type == 'html') {
					        fotoObj.html = val.html;

					        fotoramaKey.push(fotoObj);
					      }

					      if (val.type == 'video') { // it is  video
					          fotoObj.thumb = val.thumb;
					          fotoObj.caption = val.caption;
					          fotoObj.video = val.url;
					          fotoramaKey.push(fotoObj);
					      }

					  });

					   $(element).fotorama({
					      data:fotoramaKey
					  });
					});

                  }
              }, true);
        }
    };
}]);