angular.module('app').
directive('addRemoveClass', function() {
    
	return {
		restrict: 'A',
		scope: {
			cname : '='
		},
		link: function(scope, elem, attrs) {
			 elem.on('click', function() {
			 });
		}
	}
   
});

