/**
 * Created by DavidYu110 on 16/1/14.
 */
(function () {
    'use strict';
    
    angular
    .module('users')
    .controller('UserController', ['userService', '$mdSidenav', '$mdBottomSheet', UserController]);
    
    
    /*
     * Main Controller for Start App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     * */
    
    function UserController(userService, $mdSidenav, $mdBottomSheet) {
        var self = this;
        
        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.toggleList = toggleUsersList;
        self.makeContact = makeContact;
        
        //    Loading all registered users
        
        userService
        .loadAllUsers()
        .then(function (users) {
            self.users = [].concat(users);
            self.selected = users[0];
        });
        
        // **************************
        //    Internal Methods
        // **************************
        
        
        /*
         * Hide or Show the 'left' sideNav area
         * */
        
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }
        
        /*
         * select the current avatars
         * @param menuId
         * */
        
        function selectUser(user) {
            self.selected = angular.isNumber(user) ? $scope.users[user] : user;
        }
        
        /*
         * Show the Contact view in the bottom sheet
         * */
        
        function makeContact(selectedUser) {
            $mdBottomSheet.show({
                controllerAs: 'vm',
                controller: ['$mdBottomSheet', ContactSheetController],
                templateUrl: './src/users/view/contactSheet.html',
                parent: angular.element(document.getElementById('content'))
            });
            
            
            /*
             * User ContactSheet controller
             * */
            
            function ContactSheetController($mdBottomSheet) {
                this.user = selectedUser;
                this.items = [
                    {name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg'},
                    {name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg'},
                    {name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg'},
                    {name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg'}
                ];
                
                this.contactUser = function (action) {
                    $mdBottomSheet.hide(action);
                }
            }
        }
    }
})();
