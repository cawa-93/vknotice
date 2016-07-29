var StorageApp;!function(t){!function(t){t[t.Never=0]="Never",t[t.SomeConditions=1]="SomeConditions",t[t.Always=2]="Always"}(t.AudioOptionStatus||(t.AudioOptionStatus={}));var e=(t.AudioOptionStatus,function(){function t(t,e,o){var s=this;this.$rootScope=e,this.stg={};var i=t.defer();this.ready=i.promise,chrome.storage.local.get(o,function(t){s.stg=angular.copy(t),e.$apply(),i.resolve(s.stg)})}return t.prototype.onChanged=function(t){var e=this;void 0===t&&(t=function(t,e){}),chrome.storage.onChanged.addListener(function(o){t(o,e.stg),e.$rootScope.$apply()})},t.prototype.set=function(t,e,o){void 0===e&&(e=!0),void 0===o&&(o=function(){}),angular.extend(this.stg,angular.copy(t)),e&&chrome.storage.local.set(t,o)},t.prototype.clear=function(t){chrome.storage.local.clear(t)},t.prototype.getProfileIndex=function(t){return t&&this.stg&&this.stg.profiles?this.stg.profiles.findIndex(function(e){return e.id===t}):-1},t.prototype.getProfile=function(t){var e=this.getProfileIndex(t);return e>=0?this.stg.profiles[e]:{}},t.prototype.setProfiles=function(t){var e=this;this.stg.profiles||this.initEmptyProfilesCash();var o=this.stg.profiles.length>0;return angular.isArray(t)?(t.map(function(t){if(t&&t.id){var s=o?e.getProfileIndex(t.id):-1;s>=0?e.stg.profiles[s]=t:e.stg.profiles.unshift(t)}}),this.set({profiles:this.stg.profiles}),this.stg.profiles):this.stg.profiles},t.prototype.clearProfiles=function(t){return t&&this.stg.profiles?(this.stg.profiles=this.stg.profiles.filter(function(t){return t&&t.id}).slice(0,t),this.stg.profiles):this.initEmptyProfilesCash()},t.prototype.initEmptyProfilesCash=function(){return this.set({profiles:[]}),[]},t.$inject=["$q","$rootScope","DefaultStorage"],t}());t.StorageService=e}(StorageApp||(StorageApp={}));var StorageApp;!function(t){var e={access_token:"",user_id:0,options:{friends:!0,photos:!0,videos:!0,messages:!0,groups:!0,wall:!0,mentions:!0,comments:!0,likes:!0,reposts:!0,followers:!0,audio:1},counter:[],currentSection:"",friends:[],newfriends:[],dialogs:[],groups:[],users:[],profiles:[],lang:0,notifyLast_viewed:Date.now()/1e3,state:{name:"home",params:{}}};angular.module("StorageApp",[]).constant("DefaultStorage",e).service("storage",t.StorageService)}(StorageApp||(StorageApp={}));