'use strict';

app.directive('listArtworks', function () {
	return {
		restrict: "E",
		templateUrl: "Artworks/list-artworks.html"
	};
});

app.directive('uploadArt', function () {
	return {
		restrict: "E",
		controller: "uploadArtwork",
		templateUrl: "Artworks/upload-art.html"
	}
});

app.directive("category", function () {
	return {
		restrict: "A",
		link: function (scope, element, attributes) {
			element.find(".cat").on('click', function () {
				if ($(this).hasClass("active")) {
					$(this).removeClass("active").find("input").prop("checked", false);
				} else {
					$(this).addClass("active").find("input").prop("checked", true);
				}
				scope.artwork.category = [];
				element.find("input:checked").each(function () {
					scope.artwork.category.push($(this).val());
				});
			});
			/*element.find("input").bind("change", function (changeEvent) {
				console.log($(this).prop('checked'));
			});*/
		}
	}
});

app.directive('preview', function () {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			let input = element.find("input[type=file]");
			input.change(function () {
				var reader = new FileReader();
				if (!this.files[0]) {
					return;
				}
				reader.onload = function (e) {
					element.css("background-image", "url(" + e.target.result + ")");
				}
				reader.readAsDataURL(this.files[0]);
			});
		}
	}
});

app.directive("fileread", [function () {
	return {
		link: function (scope, element, attributes) {
			element.bind("change", function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.requires.isImage = loadEvent.target.result;
						scope.uploadFile(changeEvent.target.files[0]);
					});
				}
				if (changeEvent.target.files[0]) {
					reader.readAsDataURL(changeEvent.target.files[0]);
				}
			});
		}
	}
}]);

app.directive('nouislider', function (){
	return {
		restrict: "A",
		link: function(scope, element, attrs) {

			let id = attrs.id;
			let slider = document.getElementById(id);

			let min = parseInt(attrs.min);
			let max = parseInt(attrs.max);
			let from = parseInt(attrs.from);
			let to = parseInt(attrs.to);

			noUiSlider.create(slider, {
				start: [from, to],
				connect: true,
				range: {
					'min': min,
					'max': max
				}
			});

			slider.noUiSlider.on('change', function(){
				let range = slider.noUiSlider.get();
				let from = parseFloat(range[0]);
				let to = parseFloat(range[1]);

				scope.search.range.from = from;
				scope.search.range.to = to;
				scope.applyPrice();
			});
		}
	}
});