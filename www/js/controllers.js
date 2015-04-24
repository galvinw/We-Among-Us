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

    fb.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }


    }, {
      remember: "default",
      scope: 'public_profile,email,publish_actions,user_likes'
    }
    );
  };

})


.controller('ProfileCtrl', function($scope) {

    // openFB.api({
    //     path: '/me',
    //     params: {fields: 'id,name,city'},
    //     success: function(user) {
    //         $scope.$apply(function() {
    //             $scope.user = user;

    //         });
    //     },
    //     error: function(error) {
    //         alert('Facebook error: ' + error.error_description);
    //     }
    // })
  })

.controller('CamCtrl', function($scope, $cordovaCamera) {



     $scope.takePicture = function(){

        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
            };



        $cordovaCamera.getPicture().then(function(imageData) {
         // syncArray.$add({image: imageData}).then(function() {
              alert("Image has been uploaded");
         // });
      }, function(error) {
          console.error(error);
      });
    };

      $scope.takeAudio = function() {
          // capture callback
      var captureSuccess = function(mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
              path = mediaFiles[i].fullPath;
              console.log(path);
              // do something interesting with the file
          }
      };

      // capture error callback
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };

      // start audio capture
      navigator.device.capture.captureAudio(
        captureSuccess, captureError, {limit:2}

        );
  };

});