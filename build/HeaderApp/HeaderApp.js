var HeaderApp;!function(e){var t=function(){function e(e,t,r,i,o){var a=this;this.storage=e,this.Analytics=t,this.$state=r,this.optionUrl=chrome.extension.getURL("OptionsApp/index.html"),this.shareUrl="https://vk.com/share.php?"+i({url:"https://vk.com/note45421694_12011424",title:o.getString("Информер Вконтакте"),description:o.getString("Отображает количество непрочитанных сообщений и позволяет ответить не заходя в ВК!"),image:"https://pp.vk.me/c628716/v628716694/2c20c/f3gq0pcaqHI.jpg",noparse:"true"}),this.reviewUrl=/(opera|opr|Yandex|YaBrowser)/i.test(navigator.userAgent)?"https://addons.opera.com/extensions/details/app_id/ephejldckfopeihjfhfajiflkjkjbnin#feedback-container":"https://chrome.google.com/webstore/detail/jlokilojbcmfijbgbioojlnhejhnikhn/reviews",e.ready.then(function(t){a.stg=t,a.current_user=e.getProfile(t.user_id)})}return e.prototype.logout=function(e){e.preventDefault(),this.storage.set({user_id:0,access_token:""})},e.prototype.trackActivity=function(e){this.Analytics.trackEvent("Activity",e,"dropdown-menu")},e.prototype.isHome=function(){var e=this.$state.is("home");return void 0===e||e},e.$inject=["storage","Analytics","$state","$httpParamSerializer","gettextCatalog"],e}();e.HeaderCtrl=t}(HeaderApp||(HeaderApp={}));var HeaderApp;!function(e){angular.module("HeaderApp",["StorageApp","gettext","angular-google-analytics","ui.router"]).config(["$compileProvider",function(e){e.aHrefSanitizationWhitelist(/^\s*(https?|mailto|chrome-extension):/)}]).controller("HeaderCtrl",e.HeaderCtrl).directive("vkHeader",function(){return{templateUrl:"/HeaderApp/Header.tpl",restrict:"E",scope:!1,replace:!0}})}(HeaderApp||(HeaderApp={}));