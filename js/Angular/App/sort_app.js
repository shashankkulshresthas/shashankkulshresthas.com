/// <reference path="../../../ckeditor_4.6.2_standard/ckeditor/ckeditor.js" />
/// <reference path="../../../ckeditor_4.6.2_standard/ckeditor/ckeditor.js" />
'use strict';

var app = angular.module('Sort', ['angular.filter', 'ui.router', 'ngSanitize', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'ngCookies', 'angular-sortable-view', 'ngAudio', 'dndLists', 'ngDraggable', 'oc.lazyLoad', 'angular-loading-bar', 'angularPromiseButtons', 'wt.easy', 'angularUtils.directives.uiBreadcrumbs', 'credit-cards', 'scroll', 'md.data.table', 'sasrio.angular-material-sidenav']).config(function ($mdIconProvider, cfpLoadingBarProvider, angularPromiseButtonsProvider) {
   
    angularPromiseButtonsProvider.extendConfig({
        spinnerTpl: '<span class="btn-spinner"></span>',
        disableBtn: true,
        btnLoadingClass: 'is-loading',
        addClassToCurrentBtnOnly: false,
        disableCurrentBtnOnly: false,
        minDuration: false,
        CLICK_EVENT: 'click',
        CLICK_ATTR: 'ngClick',
        SUBMIT_EVENT: 'submit',
        SUBMIT_ATTR: 'ngSubmit',
        BTN_SELECTOR: 'button'
    });
    cfpLoadingBarProvider.parentSelector = '#loading-bar';
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    $mdIconProvider
    .iconSet('communication', '../img/communication-icons.svg', 24);
    var wow = new WOW(
  {
      boxClass: 'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0,          // distance to the element when triggering the animation (default is 0)
      mobile: true,       // trigger animations on mobile devices (default is true)
      live: true,       // act on asynchronously loaded content (default is true)
      callback: function (box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: "md-content" // optional scroll container selector, otherwise use window
  }
);
    wow.init();
});
app.filter('secondsToDateTime', [function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])
app.value('redirectToUrlAfterLogin', { url: '/Courses' });
app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});
app.constant('USER_ROLES', {
    all: '*',
    Admin: 'Admin',
    Company:'Company',
    User: 'User',
    guest: 'guest'
})
app.filter('keyboardShortcut', function($window) {
    return function(str) {
        if (!str) return;
        var keys = str.split('-');
        var isOSX = /Mac OS X/.test($window.navigator.userAgent);

        var seperator = (!isOSX || keys.length > 2) ? '+' : '';

        var abbreviations = {
            M: isOSX ? '⌘' : 'Ctrl',
            A: isOSX ? 'Option' : 'Alt',
            S: 'Shift'
        };

        return keys.map(function(key, index) {
            var last = index == keys.length - 1;
            return last ? key : abbreviations[key];
        }).join(seperator);
    };
})
app.run(['$rootScope', function ($rootScope,$state) {
    

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, $state) {
        debugger
        var param = JSON.parse(localStorage.getItem('param1'));
        if (param) {
            if (!toParams.PageId && param.PageId) {
                toParams.PageId = param.PageId
            }
            if (!toParams.CourseID && param.CourseID) {
                toParams.CourseID = param.CourseID
            }
            if (!toParams.ModuleId && param.ModuleId) {
                toParams.ModuleId = param.ModuleId
            } if (!toParams.QuizId && param.QuizId) {
                toParams.QuizId = param.QuizId
            }
            
            
        }
        localStorage.setItem('param1', JSON.stringify(toParams));
       
     

    });
   
    //create a new instance
    var wow = new WOW(
 {
     boxClass: 'wow',      // animated element css class (default is wow)

     animateClass: 'animated', // animation css class (default is animated)
     offset: 0,          // distance to the element when triggering the animation (default is 0)
     mobile: true,       // trigger animations on mobile devices (default is true)
     live: true,       // act on asynchronously loaded content (default is true)
     callback: function (box) {
         // the callback is fired every time an animation is started
         // the argument that is passed in is the DOM node being animated
     },
     scrollContainer: "md-content" // optional scroll container selector, otherwise use window
 }
);
    wow.init();

    $rootScope.$on('$routeChangeStart', function (next, current) {
        var wow = new WOW(
 {
     boxClass: 'wow',      // animated element css class (default is wow)
     animateClass: 'animated', // animation css class (default is animated)
     offset: 0,          // distance to the element when triggering the animation (default is 0)
     mobile: true,       // trigger animations on mobile devices (default is true)
     live: true,       // act on asynchronously loaded content (default is true)
     callback: function (box) {
         // the callback is fired every time an animation is started
         // the argument that is passed in is the DOM node being animated
     },
     scrollContainer: "md-content" // optional scroll container selector, otherwise use window
 }
);
      
         wow.sync();
    });
}]);
app.config(function ($mdThemingProvider, $mdIconProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $mdThemingProvider.theme('default1').primaryPalette('blue-grey', {'default':'900'  ,
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '900', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class})
    })
    .accentPalette('blue-grey',{'default':'900'  ,
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '900', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class})
    })
    .warnPalette('red')
    .backgroundPalette('grey');
    $mdIconProvider
     .iconSet('social', 'img/icons/menu.f1d75e5f.svg', 24)
});

app.directive('userAvatar', function () {
    return {
        replace: true,
        template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
    };
});

app.config(function ($mdThemingProvider, ssSideNavSectionsProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
      .primaryPalette('customBlue', {
          'default': '500',
          'hue-1': '50'
      })
      .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
          .primaryPalette('grey')

    ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
    ssSideNavSectionsProvider.initWithSections([{
        id: 'Dashboard',
        name: 'Dashboard',
        state: 'Dashboard',
        type: 'link'
    },{
        id: 'UserList',
        name: 'Activate User',
        state: 'UserList',
        type: 'link'
    }
    ]
        
       );
});


app.directive('confirmPwd', function($interpolate, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModelCtrl) {

            var pwdToMatch = $parse(attr.confirmPwd);
            var pwdFn = $interpolate(attr.confirmPwd)(scope);

            scope.$watch(pwdFn, function(newVal) {
                ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
            })

            ngModelCtrl.$validators.password = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return value == pwdToMatch(scope);
            };

        }
    }
});

app.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d]/g,'') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

app.directive('angularYoutube', function ($sce) {
    return {
        restrict: 'E',
        scope: { video: '=' },
        replace: true,
        template: '<div style="height:100%;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0"></iframe></div>',
        link: function (scope) {
            scope.$watch('video', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    }
})




app.run(function ($rootScope, $state, loginModal, AuthService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && typeof AuthService.isAuthenticated) {
            event.preventDefault();

            loginModal()
              .then(function () {
                  return $state.go(toState.name, toParams);
              })
              .catch(function () {
                  return $state.go('courses');
              });
        }
    });

});
app.run(function ($rootScope, AUTH_EVENTS, AuthService, $location, $state, $window, Session) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {

        var authorizedRoles = toState.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                $rootScope.$broadcast(AUTH_EVENTS.logOut);
                $state.go('home');
                event.preventDefault();


            }
        
        
   
    });
})

app.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, USER_ROLES, $ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        'debug': true, // For debugging 'true/false'
        'events': true
      
    });
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
          url: '/home',
          controller: 'HomeCtrl',
          templateUrl: 'templates/Home.html?ie=' + (new Date()).getTime()
          ,params: {pagetoScroll:null},
          data: { displayName: 'Home',
        authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
              }
      }).state('lawNRule', {
          url: '/lawNRule',

          //      controllerAs:'',
          templateUrl: 'templates/Pages/LawNRule.html?ie=' + (new Date()).getTime()
          ,
          data: {
              authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
          }
      }).state('about', {
          url: '/about',

          //      controllerAs:'',
          templateUrl: 'templates/Pages/about.html?ie=' + (new Date()).getTime()
          ,
          data: {
              authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
          }
      })
        .state('contact', {
            url: '/contact',

            //      controllerAs:'',
            templateUrl: 'templates/Pages/contact.html?ie=' + (new Date()).getTime()
          ,
            data: {
                authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
            }
        })
    .state('MyAccount', {
        url: '/MyAccount',
        abstract: true,
        //      controllerAs:'',
        templateUrl: 'templates/Pages/MyAccount.html?ie=' + (new Date()).getTime(),
        data: {
            displayName: 'My Account',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
        }
    }).state('Reset', {
        url: '/Reset/:code',
        controller: 'ResetPasswordCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/ResetPassword.html?ie=' + (new Date()).getTime(),
        data: {
            displayName: 'Reset password',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/ResetPasswordCntrl.js?ie=' + (new Date()).getTime());
            }]
        }
    })
        .state('changepassword', {
            url: '/changepassword',
            controller: 'ChangePasswordCtrl',
            parent: 'MyAccount',
            templateUrl: 'templates/Pages/changepassword.html',
            data: {
                displayName: 'Change password',
                authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
            }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/Angular/App/Pages/ChangePasswordCtrl.js?ie=' + (new Date()).getTime());
                }]
            }
        })
      .state('courses', {
          url: '/courses',
          controller: 'CoursesCntrl',
          parent: 'MyAccount',
          templateUrl: 'templates/Pages/courses.html',
          data: {
              authorizedRoles: [USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
          }
      })
     .state('SecurityQues', {
             url: '/SecurityQues',
             controller: 'SecurityQuestionController',
             parent: 'MyAccount',
             templateUrl: 'templates/Pages/ManageSecurityQuestions.html?id=2',
             data: {
                 displayName: 'Settings',
                 authorizedRoles: [USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
             }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load('js/Angular/App/Pages/SecurityQuestionController.js?ie=' + (new Date()).getTime());
                 }]
             }
     })
        .state('UploadUsers', {
            url: '/UploadUsers',
            controller: 'Companyctrl',
            parent: 'MyAccount',
            templateUrl: 'templates/Pages/uploadusers.html',
            data: {
                displayName: 'Upload Users',
                authorizedRoles: [USER_ROLES.Company]
            }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['js/Angular/Plugins/angular-file-upload.js', 'js/Angular/App/Pages/uploadusers.js']);
                }]
            }
        })

         .state('UsrList', {
             url: '/UsrList',
             controller: 'UserDisplay',
             parent: 'MyAccount',
             templateUrl: 'templates/Pages/urerslist.html',
             data: {
                 displayName: 'Users List',
                 authorizedRoles: [USER_ROLES.Company]
             }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {                    
                     
                     return $ocLazyLoad.load('js/Angular/App/Pages/userdisplay.js');
                 }]
             }
         })

         .state('Coupans', {
             url: '/Coupans',
             controller: 'Coupansctrl',
             parent: 'MyAccount',
             templateUrl: 'templates/Pages/Coupans.html',
             data: {
                 displayName: 'Coupans',
                 authorizedRoles: [USER_ROLES.Company]
             }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {                    
                     return $ocLazyLoad.load('js/Angular/App/Pages/Coupans.js');
                 }]
             }
         })
	 
	  .state('Promotions', {
            url: '/Promotions',
            controller: 'Promotionsctrl',
            parent: 'MyAccount',
            templateUrl: 'templates/Pages/promotions.html',
            data: {
                displayName: 'Promo Code ',
                authorizedRoles: [USER_ROLES.Company]
            }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {                 
                  
                   
                    return $ocLazyLoad.load('js/Angular/App/Pages/promotional.js');
                }]
            }
	  })
        .state('userdashboard', {
            url: '/userdashboard',
            controller: 'compuserdash',
            parent: 'MyAccount',
            templateUrl: 'templates/Pages/dashboard-companyuser.html',
            data: {
                displayName: 'User Dashboard',
                authorizedRoles: [USER_ROLES.Company]
            }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {

                    return $ocLazyLoad.load('js/Angular/App/Pages/CompUserDashCtrl.js');
                }]
            }
        })

        .state('RenewCourses', {
            url: '/RenewCourses',
            controller: 'RenewCoursesctrl',
            parent: 'MyAccount',
            templateUrl: 'templates/Pages/RenewCourses.html',
            data: {
                displayName: 'Renew Courses',
                authorizedRoles: [USER_ROLES.Company, USER_ROLES.User]
            }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {

                    return $ocLazyLoad.load('js/Angular/App/Pages/RenewCourses.js');
                }]
            }
        })      

        .state('certificates', {
        url: '/certificates',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/certificate.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
        }
    }).state('cart', {
        url: '/cart',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/cart.html',
        data: {
            displayName: 'Cart Items',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
        }
    }).state('MyCourses', {
        url: '/MyCourses',
        controller: 'PurchasedCoursesCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/MyCourses.html?ie=' + (new Date()).getTime(),
        data: {
            displayName: 'My Courses',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: {
            UserCourses: function (CourseService) {            
                return CourseService.GetMyCourse();
            },
            lazy: ['$ocLazyLoad', function($ocLazyLoad) {          
                return $ocLazyLoad.load('js/Angular/App/Pages/MyCourses.js');
            }]
        }

        
    }).state('MyPackages', {
        url: '/MyPackages',
        controller: 'PurchasedPackageCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/PurchasedPackages.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/MyPackages.js');
            }]
        }


    }).state('Training', {
        url: '/MyAccout/Training',
        controller: 'TrainingCntrl',
        parent: 'MyAccount',
        params: {
            CourseID: null,ModuleId:null,PageId:null
        },
        templateUrl: 'templates/Pages/Training.html',
        data: {
            displayName: 'Training',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazyT: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/training.js?id=1');
            }]
        }


    }).state('Training.Slide', {
        url: '.Slide',
        controller: 'SlideCntrl',
        parent: 'Training',       
        templateUrl: 'templates/Pages/Slide.html',
        data: {
            displayName: 'Slide',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            
            lazyS: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/Slide.js?d='+new Date());
            }]
        }


    }).state('Training.QuickCheck', {
        url: '.QuickCheck',
        controller: 'QCQCntrl',
        parent: 'Training',      
        templateUrl: 'templates/Pages/QCQ.html',
        data: {
            displayName: 'Quick Check',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded

            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/QCQ.js');
            }]
        }


    })
    .state('CheckOut', {
        url: '/CheckOut',
        controller: 'CartCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/CheckOut.html?id=2',
        data: {
            displayName: 'Cart Items',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
        }

    })

         .state('paymentSuccessfullModel', {
             url: '/paymentSuccessfullModel/:PurchaseType',
             controller: 'CartCntrl',
             parent: 'MyAccount',
             templateUrl: 'templates/Pages/paymentSuccessfullModel.html',
             data: {                 
                 authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
             }

         })


        //

    .state('PackageCourses', {
        url: '/PackageCourses/:PackageId/:Action',
        controller: 'CoursesCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/PackageCoursesMapping.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.Company]
        }


    })
    .state('CourseModules', {
        url: '/CourseModules',
        controller: 'CoursesModuleCntrl',
        parent: 'MyAccount',
        params: {
            CourseID: null,
        },
        templateUrl: 'templates/Pages/UserModules.html',
        data: {
            displayName: 'Course Modules',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function($ocLazyLoad) {          
                return $ocLazyLoad.load('js/Angular/App/Pages/CourseModule.js');
            }]
        }
        

    })
    .state('PlayerHolder', {
        url: '/PlayerHolder/:CourseID/:ModuleId/:PageId',
        controller: 'SlidePlayerCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/PlayerHolder.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function($ocLazyLoad) {          
                return $ocLazyLoad.load('js/Angular/App/Pages/SlidePlayer.js');
            }]
        }
        
    })

    .state('quiz', {
        url: '/Quiz/:QuizId',
        controller: 'QuizCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/quiz.html',
        data: {
            displayName: 'Final Exam',
        authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/Quiz.js');
            }]
        }
    }).state('QuestionReview', {
        url: '/QuestionReview',
        controller: 'QuestionReviewCntrl',
        parent: 'MyAccount',
        templateUrl: 'templates/Pages/QuestionReview.html',
        params: {
            QuizId: null
        },
        data: {
            displayName: 'Review Exam',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/QuestionReview.js');
            }]
        }
    }).state('QuestionReview.List', {
        parent:'QuestionReview',
        url: '.List',
        controller: 'QuestionReviewCntrl',
        params: {
            QuizId: null
        },
        templateUrl: 'templates/Pages/ReviewList.html',
        data: {
            displayName: 'Review Questions',
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded

            lazyS: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/Angular/App/Pages/Slide.js', 'js/Angular/App/Pages/QCQ.js']);
            }]
        }
    }).state('QuestionReview.ReviewSlide', {
        url: '.Slide',
        controller: 'SlideCntrl',
        parent: 'QuestionReview',
        params: {
            PageId: null
        },
        templateUrl: 'templates/Pages/Slide.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded

            lazyS: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/Slide.js');
            }]
        }


    }).state('QuestionReview.QuickCheck', {
        url: '.QuickCheck',
        controller: 'QCQCntrl',
        parent: 'QuestionReview',
        templateUrl: 'templates/Pages/QCQ.html',
        params: {
            PageId: null
        },
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.Company]
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded

            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/QCQ.js');
            }]
        }


    })

    
     .state('Instruction', {
         url: '/Instruction/:QuizId',
         controller: 'QuizCntrl',
         parent: 'MyAccount',
         templateUrl: 'templates/Pages/Instructions.html',
         data: {
             displayName: 'Instructions',
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         },
         resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/App/Pages/Quiz.js');
             }]
         }
     })
   
        .state('ManagePage', {
        url: '/ManagePage/',
        controller: 'ManagePageCntrl',
        parent: 'Admin',
        templateUrl: 'templates/Pages/ManagePage.html?id=1',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function($ocLazyLoad) {          
                return $ocLazyLoad.load('js/Angular/App/Pages/ManagePage.js');
            }]
        }

            
        })
          .state('UserList', {
              url: '/UserList/',
              controller: 'UserListCntrl',
              parent: 'Admin',
              templateUrl: 'templates/Admin/UserList.html?id=1',
              data: {
                  authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
              }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                  lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                      return $ocLazyLoad.load('js/Angular/App/Pages/UserList.js');
                  }]
              }


          })
    .state('ExecutiveDirector', {
        url: '/ExecutiveDirector/',
        controller: 'stactrl',
        templateUrl: 'templates/Pages/ExecutiveDirector.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function($ocLazyLoad) {          
                return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
            }]
        }
            
    })

    .state('OurBoardMembers', {
        url: '/OurBoardMembers/',
        controller: 'stactrl',
        templateUrl: 'templates/Pages/OurBoardMembers.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
            }]
        }

    })

    .state('Newsletters', {
        url: '/Newsletters/',
        controller: 'stactrl',
        templateUrl: 'templates/Pages/Newsletters.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
            }]
        }

    })

    .state('FeesandFines', {
        url: '/FeesandFines/',
        controller: 'stactrl',
        templateUrl: 'templates/Pages/FeesandFines.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
            }]
        }

    })
     .state('FAQ', {
         url: '/FAQ/',
         controller: 'stactrl',
         templateUrl: 'templates/Pages/FAQ.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
             }]
         }

     })

    .state('Forms', {
        url: '/Forms/',
        controller: 'stactrl',
        templateUrl: 'templates/Pages/Forms.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
            }]
        }

    })

     .state('DisciplinaryActions', {
         url: '/DisciplinaryActions/',
         controller: 'stactrl',
         templateUrl: 'templates/Pages/DisciplinaryActions.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/App/Pages/stapage.js');
             }]
         }

     }).state('Admin', {
         url: '/Admin/',
         abstract:true,
         templateUrl: 'templates/Admin/main.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin]
         },
         resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/Admin/SideMenu.js');
             }]
         }

     }).state('ManageCourse', {
         url: '/ManageCourse/',
         controller: 'CourseConfigCntrl',
         parent: 'Admin',
         templateUrl: 'templates/Admin/ManageCourse.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/Admin/CourseConfiguration.js');
             }]
         }


     }).state('Course', {
         url: '/Course/',
         controller: 'CourseConfigCntrl',
         parent: 'Admin',
         templateUrl: 'templates/Admin/Course.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/Admin/CourseConfiguration.js');
             }]
         }


     }).state('Dashboard', {
         url: '/Dashboard/',
         controller: 'ManagePageCntrl',
         parent: 'Admin',
         templateUrl: 'templates/Admin/Dashboard.html?id=1',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/App/Pages/ManagePage.js');
             }]
         }


     }).state('EmailConfig', {
         url: '/EmailConfig/',
         controller: 'ConfigurationCntrl',
         parent: 'Admin',
         templateUrl: 'templates/Admin/EmailConfiguration.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/Admin/Configuration.js');
             }]
         }


     }).state('SystemConfig', {
         url: '/SystemConfig/',
         controller: 'ConfigurationCntrl',
         parent: 'Admin',
         templateUrl: 'templates/Admin/SystemConfiguration.html',
         data: {
             authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
         }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load('js/Angular/Admin/Configuration.js');
             }]
         }


     })

    .state('TemplateMaster', {
        url: '/TemplateMaster/',
        controller: 'TemplateMasterCntrl',
        parent: 'Admin',
        templateUrl: 'templates/Admin/TemplateMaster.html',
        data: {
            authorizedRoles: [USER_ROLES.Admin, USER_ROLES.User, USER_ROLES.guest, USER_ROLES.company]
        }, resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) { ''
                return $ocLazyLoad.load({ files: ['js/Angular/Admin/TemplateMaster.js', 'https://cdn.ckeditor.com/4.4.0/standard/ckeditor.js', 'js/Angular/Admin/ng-ckeditor.js'] });
            }]
        }


    })






}]);

app.controller('Faq', ['$scope', '$http', function ($scope, $http) {
    $http.get('_js/faq.json').then(function (response) {
        $scope.faqs = response.data;
        console.log(response.data);
    });
}]);

app.directive('routeLoader', function () {
    return {
        restrict: 'EA',
        link: function (scope, element) {
            // Store original display mode of element
            var shownType = element.css('display');
            function hideElement() {
                element.css('display', 'none');
            }

            scope.$on('$routeChangeStart', function () {
                element.css('display', shownType);
            });
            scope.$on('$routeChangeSuccess', hideElement);
            scope.$on('$routeChangeError', hideElement);
            // Initially element is hidden
            hideElement();
        }
    }
});

app.directive('backButton', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);

app.service('anchorSmoothScroll', function () {

    this.scrollTo = function (eID) {

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 10);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        leapY = leapY - 120;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});

