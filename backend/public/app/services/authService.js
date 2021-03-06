(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .factory('authService', [
            '$http',
            '$cookies',
            '$state',
            authService
        ]);

    function authService($http, $cookies, $state) {

        var authService = {
            login: login,
            logout: logout,
            signup: signup,
            getUserData: getUserData,
            isAuthenticated: isAuthenticated
        };

        return authService;

        function login(email_id, password) {
            var reqObj = {
                method: 'POST',
                url: '/api/authenticate',
                data: {
                    email_id: email_id,
                    password: password
                }
            };

            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    response = response.data;

                    var expires = new Date(),
                        user = {};

                    user.email_id = response.email_id;
                    user.role = response.role;
                    user.token = response.token;

                    expires.setTime(expires.getTime() + (30 * 60 * 1000));

                    $cookies.put(
                        'user',
                        JSON.stringify(user),
                        { expires: expires }
                    );
                }
            });
        }

        function logout() {
            $cookies.remove('user');
            $state.go('index');
        }

        function isAuthenticated() {
            var user = $cookies.get('user');
            return user && user !== 'undefined';
        }

        function getUserData() {
            if(isAuthenticated()) {
                return JSON.parse($cookies.get('user'));
            }

            return false;
        }

        function signup(email_id, password) {
            var reqObj = {
                method: 'POST',
                url: '/api/signup',
                data: {
                    email_id: email_id,
                    password: password
                }
            };

            return $http(reqObj);
        }
    }
})();