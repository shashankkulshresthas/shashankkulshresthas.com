app.service('Session', function ($cookies, $rootScope, AUTH_EVENTS) {
  
    this.getSessionId = function () {
        if ($cookies.get('credential')) {
            var user = JSON.parse($cookies.get('credential'));
            this.id = user.UserID;
            this.user = user;
            this.userRole = user.UserType;
        }
        else {
            $cookies.remove('credential');
            this.id = null;
            this.user = null;
            this.userRole = null;

        }
        return this.id;
    }

    
   
    this.create = function (userId, user, userRole) {
        $cookies.put('credential', JSON.stringify(user));
        this.id = userId;
        this.user = user;
        this.userRole = userRole;
    };
    this.Update = function (userId, user, userRole) {
        $cookies.put('credential', JSON.stringify(user));
        this.id = userId;
        this.user = user;
        this.userRole = userRole;
    };
    this.destroy = function () {
        $cookies.remove('credential');
        $cookies.remove('token');
        this.id = null;
        this.user = null;
        this.userRole = null;
    };
})