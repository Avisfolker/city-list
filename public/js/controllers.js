app.controller('MainCtrl', function($scope, $http) {
    $scope.textColor = 'black';
    $scope.searchCity = () => {
        $http.post('/api/searchCity',{
          name: $scope.name
        }).then(function (data) {
          if (data.status === 200) {
            $scope.citys = data.data.result;
          }
          else {
            console.log('Error: '+ data.msg);
          }
        });

    }


});

