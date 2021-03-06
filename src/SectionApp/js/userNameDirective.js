var SectionsApp;
(function (SectionsApp) {
    function userNameDirective(storage) {
        function getProfile(profile) {
            return typeof profile === 'object' ? profile : storage.getProfile(profile);
        }
        ;
        return {
            template: '{{profile.name || profile.first_name+" "+profile.last_name}}',
            scope: {
                profileId: '=',
            },
            link: function ($scope) {
                $scope.profile = getProfile($scope.profileId);
            }
        };
    }
    SectionsApp.userNameDirective = userNameDirective;
    userNameDirective.$inject = [
        'storage',
    ];
})(SectionsApp || (SectionsApp = {}));
//# sourceMappingURL=userNameDirective.js.map