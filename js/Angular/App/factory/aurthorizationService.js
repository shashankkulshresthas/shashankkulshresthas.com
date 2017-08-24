app.factory('AuthService', function ($http, APICallService, $cookies) {
    var authService = {};
 
    authService.login = function (credentials) {
        var authData = $cookies.get('token');

        debugger

        if (!authData) {
            var data = "grant_type=password&username=" + credentials.LoginID + "&password=" + credentials.Password;
            var sssss = SERVICE;

            console.log(sssss);

            return $http
                .post(SERVICE + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (res) {

                    $cookies.put('token', JSON.stringify({ token: res.data.access_token }));

                    return APICallService.Get('User', 'GetUserDetail').success(function (data, status, headers) {
                       
                        data[0].token = res.data.access_token;

                       $cookies.put('token', JSON.stringify(data[0]));
                        return data[0];
                    });


                }, function (error) {
                    return error.data.error_description;
                });
        }
        else {
            JSON.parse($cookies.get('token'));
        }

   
    };
 
    authService.VerifyPassword = function (Pwd) {
        return APICallService.Get('User', 'VerifyUserPassword', { Password: Pwd }).success(function (data, status, headers) {
        
          return data;
          
        });
    }

    authService.logOut = function () {
        $cookies.remove('token');
    };

    authService.UpdateSession = function (user) {
        APICallService.Get('User', 'GetUserDetail').success(function (data, status, headers) {
            Session.create(data[0].UserID, data[0], data[0].UserType);
        });
        
    };

    authService.GetCredential = function () {
        debugger
        if ($cookies.get('token')) {
            var user = JSON.parse($cookies.get('token'));
            return user;

        }
        else {
            return null;
        }
    };

    authService.isAuthenticated = function () {
        debugger
        var data=$cookies.get('token');
        return data ? true : false;
    };
 
    authService.isAuthorized = function (authorizedRoles) {
        debugger
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        var user = null;
        var data = $cookies.get('token');
        if (data) {
            debugger
            user = JSON.parse(data);
            
            return (authService.isAuthenticated() &&
              authorizedRoles.indexOf(user.UserType) !== -1) || (authorizedRoles.indexOf('guest') !== -1);
        }
        else {
         
            return  (authorizedRoles.indexOf('guest') !== -1)
        }
        };
    debugger
    return authService;
})