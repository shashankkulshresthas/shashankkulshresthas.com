app.factory('authInterceptorService', ['$q', '$location', '$cookies', function ($q, $location, $cookies) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {
        
        config.headers = config.headers || {};
     
        var authData = $cookies.get('token');
      
        if (authData) {
            config.headers.Authorization = 'Bearer ' + JSON.parse(authData).token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        //if (rejection.status === 401) {
        //    $location.path('/login');
        //}
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);