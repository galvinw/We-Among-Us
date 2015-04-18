angular.module('poorau.controllers', [])

.controller('MenuCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.fbLogin = function() {
    openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})


.controller('ProfileCtrl', function($scope) {

    openFB.api({
        path: '/me',
        params: {fields: 'id,name,city'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;

            });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    })
  })

.controller('CamCtrl', function($scope, $cordovaCamera) {



     $scope.takePicture = function(){

      // var options = {
      //     quality : 75,
      //     destinationType : Camera.DestinationType.DATA_URL,
      //     sourceType : Camera.PictureSourceType.CAMERA,
      //     allowEdit : true,
      //     encodingType: Camera.EncodingType.JPEG,
      //     popoverOptions: CameraPopoverOptions,
      //     targetWidth: 500,
      //     targetHeight: 500,
      //     saveToPhotoAlbum: false
      //     };



      $cordovaCamera.getPicture().then(function(imageData) {
       // syncArray.$add({image: imageData}).then(function() {
            alert("Image has been uploaded");
       // });
    }, function(error) {
        console.error(error);
    });

    }
});