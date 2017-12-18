app.directive('slider', function($timeout) {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			images: '='
		},
		link: function(scope, elem, attrs) {

			elem.ready(function() {
				scope.imageneslista = true; // Change state
			})

			scope.currentIndex = 0;

			scope.next = function() {
				scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
			};

			scope.prev = function() {
				scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
			};

			scope.$watch('currentIndex', function() {
				scope.images.forEach(function(image) {
					image.visible = false;
				});
				scope.images[scope.currentIndex].visible = true;
			});

			/* Start: For Automatic slideshow*/

			var timer;

			var sliderFunc = function() {
				timer = $timeout(function() {
					scope.next();
					timer = $timeout(sliderFunc, 5000);
				}, 5000);
			};

			sliderFunc();

			scope.$on('$destroy', function() {
				$timeout.cancel(timer);
			});

			/* End : For Automatic slideshow*/

		},
		templateUrl: 'partials/slider'
	}
});



app.directive('imagenproducto', function() {

    var template = '<md-progress-circular ng-disabled="!cargandoimagen" ng-if="cargandoimagen" class="md-hue-2" md-diameter="20px"></md-progress-circular><div class="md-card-image" ng-if="!hover"><img ng-src="{{imagen.imagen}}"><div>';

    return {
        scope: {
            id: '@'
        },
        restrict: 'EA',
        template: template,
        controller: function($scope, Producto) {

            var id = $scope.id;
            $scope.cargandoimagen = true;

			Producto.imagen(id).then(res => {
				$scope.imagen = res.data;
				$scope.cargandoimagen = false;
				$scope.$digest();

			})
        }
    };

});

app.directive('refreshable', [function () {
    return {
        restrict: 'A',
        scope: {
            refresh: "=refreshable"
        },
        link: function (scope, element, attr) {
            var refreshMe = function () {
                element.attr('src', element.attr('src'));
            };

            scope.$watch('refresh', function (newVal, oldVal) {
                if (scope.refresh) {
                    scope.refresh = false;
                    refreshMe();
                }
            });
        }
    };
}])

// app.directive('catalogo', function() {
//
//
//     return {
//         scope: {
//             refresh: "@"
//         },
//         restrict: 'EA',
// 		// template: '<iframe style="width:100%; height:700px;" src="{{linked}}" frameborder="0" allowfullscreen></iframe>',
//         // template: '<md-card><p>{{id}}</p></md-card>',
//         // controller: function($scope) {
//         //
//         //     var refresh = $scope.linked
//         //
// 		// 	console.log('cambio')
//         //
//         // },
// 		link: function (scope, element, attr) {
//
//             var refreshMe = function () {
// 				console.log(element)
//                 element.attr('src', element.attr('src'));
//             };
//
//             scope.$watch('refresh', function (newVal, oldVal) {
//
//
// 				console.log(scope.refresh)
//                 if (scope.refresh) {
//                     scope.refresh = false;
//                     refreshMe();
//                 }
//             });
//         }
//     };
//
// });


app.directive('clPaging', ClPagingDirective);

ClPagingDirective.$inject = [];
function ClPagingDirective() {
    return {
        restrict: "EA",
        scope: {
            clPages: "=",
            clAlign: "@",
            clAlignModel: "=",
            clPageChanged: "&",
            clSteps: "=",
            clCurrentPage: "="
        },
        controller: ClPagingController,
        controllerAs: "vm",
        templateUrl: '/partials/paginacion'
    }
}

function ClPagingController($scope) {
    var vm = this;
    vm.first = "navigate_before",
    vm.last = "navigate_next",
    vm.index = 0,
    vm.clSteps = $scope.clSteps,
    vm["goto"] = function(index) {
        $scope.clCurrentPage = vm.page[index]
    },
    vm.gotoPrev = function() {
        $scope.clCurrentPage = vm.index,
        vm.index -= vm.clSteps
    },
    vm.gotoNext = function() {
        vm.index += vm.clSteps,
        $scope.clCurrentPage = vm.index + 1
    },
    vm.gotoFirst = function() {
        vm.index = 0,
        $scope.clCurrentPage = 1
    },
    vm.gotoLast = function() {
        vm.index = parseInt($scope.clPages / vm.clSteps) * vm.clSteps,
        vm.index === $scope.clPages
            ? vm.index = vm.index - vm.clSteps
            : "",
        $scope.clCurrentPage = $scope.clPages
    },
    $scope.$watch("clCurrentPage", function(value) {
        vm.index = parseInt((value - 1) / vm.clSteps) * vm.clSteps,
        $scope.clPageChanged()
    }),
    $scope.$watch("clPages", function() {
        vm.init()
    }),

    vm.init = function() {
        vm.stepInfo = function() {
            for (var result = [], i = 0; i < vm.clSteps; i++)
                result.push(i);
            return result
        }(),
        vm.page = function() {
            for (var result = [], i = 1; i <= $scope.clPages; i++)
                result.push(i);
            return result
        }()
    }
}


app.directive('placeAutocomplete', function() {
    return {
        templateUrl: 'partials/autocomplete',
        restrict: 'E',
        replace: true,
        scope: {
            'ngModel': '='
        },
        controller: function($scope, $q) {
            if (!google || !google.maps) {
                throw new Error('Google Maps JS library is not loaded!');
            } else if (!google.maps.places) {
                throw new Error('Google Maps JS library does not have the Places module');
            }
            var autocompleteService = new google.maps.places.AutocompleteService();
            var map = new google.maps.Map(document.createElement('div'));
            var placeService = new google.maps.places.PlacesService(map);
            $scope.ngModel = {};

            /**
            * @ngdoc function
            * @name getResults
            * @description
            *
            * Helper function that accepts an input string
            * and fetches the relevant location suggestions
            *
            * This wraps the Google Places Autocomplete Api
            * in a promise.
            *
            * Refer: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
            */
            var getResults = function(address) {
                var deferred = $q.defer();
                autocompleteService.getQueryPredictions({
                    input: address
                }, function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            /**
            * @ngdoc function
            * @name getDetails
            * @description
            * Helper function that accepts a place and fetches
            * more information about the place. This is necessary
            * to determine the latitude and longitude of the place.
            *
            * This wraps the Google Places Details Api in a promise.
            *
            * Refer: https://developers.google.com/maps/documentation/javascript/places#place_details_requests
            */
            var getDetails = function(place) {
                var deferred = $q.defer();
                placeService.getDetails({
                    'placeId': place.place_id
                }, function(details) {
                    deferred.resolve(details);
                });
                return deferred.promise;
            };

            $scope.search = function(input) {
                if (!input) {
                    return;
                }
                return getResults(input).then(function(places) {
                    return places;
                });
            };
            /**
            * @ngdoc function
            * @name getLatLng
            * @description
            * Updates the scope ngModel variable with details of the selected place.
            * The latitude, longitude and name of the place are made available.
            *
            * This function is called every time a location is selected from among
            * the suggestions.
            */
            $scope.getLatLng = function(place) {
                if (!place) {
                    $scope.ngModel = {};
                    return;
                }
                getDetails(place).then(function(details) {

                    console.log(details);

                    var numero = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'street_number' })});
                    var calle = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'route' })});
                    var estado = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'locality' })});
                    var colonia = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'sublocality_level_1' })});
                    var codigopostal = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'postal_code' })});

                    $scope.ngModel = {
                        'nombre': place.description,
                        'latitude': details.geometry.location.lat(),
                        'longitude': details.geometry.location.lng()
                    };

                    if(numero !== undefined){   $scope.ngModel.numero =  numero.long_name }
                    if(calle !== undefined){   $scope.ngModel.calle =  calle.long_name }
                    if(colonia !== undefined){   $scope.ngModel.colonia =  colonia.long_name }
                    if(estado !== undefined){   $scope.ngModel.estado =  estado.long_name }
                    if(codigopostal !== undefined){   $scope.ngModel.codigopostal =  codigopostal.long_name }

                });
            }
        }
    };
});
