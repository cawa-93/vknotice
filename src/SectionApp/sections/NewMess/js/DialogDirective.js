var SectionsApp;
(function (SectionsApp) {
    function DialogDirective(storage) {
        function getProfile(profile) {
            return typeof profile === 'object' ? profile : storage.getProfile(profile);
        }
        ;
        return {
            templateUrl: '/SectionApp/sections/NewMess/dialog.tpl',
            replace: true,
            link: function ($scope) {
                $scope.dialog = angular.copy($scope.dialog);
                $scope.dialog.profiles = $scope.dialog.profiles.map(getProfile);
            }
        };
    }
    SectionsApp.DialogDirective = DialogDirective;
    DialogDirective.$inject = [
        'storage',
    ];
})(SectionsApp || (SectionsApp = {}));
//# sourceMappingURL=DialogDirective.js.map