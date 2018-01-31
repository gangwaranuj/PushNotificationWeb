angular.module('app').directive('ngFileSelect', function () {
return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.$parent.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
      
    }
    
  }
});
