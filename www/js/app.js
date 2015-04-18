var AmongApp = angular.module('poorau', ['ionic','angular-timeline','ngCordova','poorau.controllers']);
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
// AmongApp.factory('Camera', function($q) {
//   return {
//       getPicture: function(options) {
//         var q = $q.defer();
//         navigator.camera.getPicture(function(result) {
//           // Do any magic you need
//           q.resolve(result);
//         }, function(err) {
//           q.reject(err);
//         }, options);
//         return q.promise;
//       }
//   }
// });

AmongApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

AmongApp.config(function($stateProvider, $urlRouterProvider) {
  openFB.init({appId: '369153533274716'});
  
  $stateProvider
 
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

  .state('app.timeline', {
    url: "/timeline",
    views: {
      'menuContent': {
        templateUrl: "templates/timeline.html"
      }
    }
  })

  .state('app.friendprofile', {
    url: "/friendprofile",
    views: {
      'menuContent': {
        templateUrl: "templates/friendprofile.html"
      }
    }
  })

  .state('app.myprofile', {
    url: "/profile",
    views: {
        'menuContent' :{
            templateUrl: "templates/profile.html",
            controller: "ProfileCtrl"
        }
    }
  })

  .state('app.camera', {
    url: "/camera",
    views: {
        'menuContent' :{
            templateUrl: "templates/camera.html",
            controller: "CamCtrl"
        }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/timeline');
});





// .factory('Projects', function() {
//   return {
//     all: function() {
//       var projectString = window.localStorage['projects'];
//       if(projectString) {
//         return angular.fromJson(projectString);
//       }
//       return [];
//     },
//     save: function(projects) {
//       window.localStorage['projects'] = angular.toJson(projects);
//     },
//     newProject: function(projectTitle) {
//       // Add a new project
//       return {
//         title: projectTitle,
//         tasks: []
//       };
//     },
//     getLastActiveIndex: function() {
//       return parseInt(window.localStorage['lastActiveProject']) || 0;
//     },
//     setLastActiveIndex: function(index) {
//       window.localStorage['lastActiveProject'] = index;
//     }
//   }
// })





// .controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate,Camera){

//   // A utility function for creating a new project
//   // with the given projectTitle
//   var createProject = function(projectTitle) {
//     var newProject = Projects.newProject(projectTitle);
//     $scope.projects.push(newProject);
//     Projects.save($scope.projects);
//     $scope.selectProject(newProject, $scope.projects.length-1);
//   }

//    $scope.getPhoto = function() {
//     Camera.getPicture().then(function(imageURI) {
//       console.log(imageURI);
//       $scope.lastPhoto = imageURI;
//     }, function(err) {
//       console.err(err);
//     }, {
//       quality: 75,
//       targetWidth: 320,
//       targetHeight: 320,
//       saveToPhotoAlbum: false
//     });
//   };


//   // Load or initialize projects
//   $scope.projects = Projects.all();

//   // Grab the last active, or the first project
//   $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

//   // Called to create a new project
//   $scope.newProject = function() {
//     var projectTitle = prompt('Project name');
//     if(projectTitle) {
//       createProject(projectTitle);
//     }
//   };

//   // Called to select the given project
//   $scope.selectProject = function(project, index) {
//     $scope.activeProject = project;
//     Projects.setLastActiveIndex(index);
//     $ionicSideMenuDelegate.toggleLeft(false);
//   };

//   // Create our modal
//   $ionicModal.fromTemplateUrl('/templates/new-task.html', function(modal) {
//     $scope.taskModal = modal;
//   }, {
//     scope: $scope
//   });

//   $scope.createTask = function(task) {
//     if(!$scope.activeProject || !task) {
//       return;
//     }
//     $scope.activeProject.tasks.push({
//       title: task.title
//     });
//     $scope.taskModal.hide();

//     // Inefficient, but save all the projects
//     Projects.save($scope.projects);

//     task.title = "";
//   };

//   $scope.newTask = function() {
//     $scope.taskModal.show();
//   };

//   $scope.closeNewTask = function() {
//     $scope.taskModal.hide();
//   }

//   $scope.toggleProjects = function() {
//     $ionicSideMenuDelegate.toggleLeft();
//   };


//   // Try to create the first project, make sure to defer
//   // this by using $timeout so everything is initialized
//   // properly
//   $timeout(function() {
//     if($scope.projects.length == 0) {
//       while(true) {
//         var projectTitle = prompt('Your first project title:');
//         if(projectTitle) {
//           createProject(projectTitle);
//           break;
//         }
//       }
//     }
//   });



