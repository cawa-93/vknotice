var BgApp;
(function (BgApp) {
    var BgClass = (function () {
        function BgClass(storage, $vk, deamon, Config, Analytics) {
            var _this = this;
            this.storage = storage;
            this.$vk = $vk;
            this.deamon = deamon;
            this.Config = Config;
            this.Analytics = Analytics;
            this.stg = {};
            storage.ready.then(function (stg) { _this.StgReady(stg); });
            storage.onChanged(function (changes) { _this.StgChanged(changes); });
        }
        BgClass.prototype.StgReady = function (stg) {
            var _this = this;
            this.stg = stg;
            this.cacheProfiles(stg.users, stg.groups);
            stg.profiles && stg.profiles.length && this.storage.clearProfiles(this.Config.profilesLimit);
            stg.counter && this.setBadge();
            this.$vk.auth().then(function () {
                _this.deamon
                    .setConfig({
                    method: 'execute.ang',
                    params: function () { return _this.getDeamonParams(); },
                    DoneCB: function (resp) { return _this.deamonDoneCB(resp); },
                    FailCB: function (error) { return _this.deamonFailCB(error); },
                })
                    .start();
            });
            return this;
        };
        BgClass.prototype.cacheProfiles = function () {
            var _this = this;
            var arraysProfiles = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arraysProfiles[_i - 0] = arguments[_i];
            }
            arraysProfiles.forEach(function (profiles) { return profiles && profiles.length && _this.storage.setProfiles(profiles); });
            return this;
        };
        BgClass.prototype.setBadge = function () {
            var newBadge = 0;
            if (!angular.isArray(this.stg.counter)) {
                angular.forEach(this.stg.counter, function (counter) {
                    newBadge += angular.isNumber(counter) ? counter : 0;
                });
                this.playSound(newBadge);
            }
            this.badge = newBadge;
            chrome.browserAction.setBadgeText({ text: newBadge > 0 ? "" + newBadge : '' });
            return this;
        };
        BgClass.prototype.playSound = function (newBadge) {
            if (this.stg.options.audio === StorageApp.OptionsStatus.Never || newBadge <= this.badge)
                return this;
            var audio = document.getElementById('audio');
            if (this.stg.options.audio === StorageApp.OptionsStatus.Always) {
                audio.play();
                return this;
            }
            chrome.tabs.query({ url: '*://*.vk.com/*' }, function (tabs) {
                if (!tabs.length)
                    audio.play();
            });
            return this;
        };
        BgClass.prototype.getDeamonParams = function () {
            var apiOptions = {
                access_token: this.stg.access_token,
                options: '',
                notifyLast_viewed: this.stg.notifyLast_viewed,
            };
            if (this.stg.options.friends)
                apiOptions.options += 'friends,';
            if (this.stg.options.photos)
                apiOptions.options += 'photos,';
            if (this.stg.options.videos)
                apiOptions.options += 'videos,';
            if (this.stg.options.messages)
                apiOptions.options += 'messages,';
            if (this.stg.options.groups)
                apiOptions.options += 'groups,';
            if (this.stg.options.notifications)
                apiOptions.options += 'notifications,';
            return apiOptions;
        };
        BgClass.prototype.deamonDoneCB = function (resp) {
            if (resp === void 0) { resp = {}; }
            chrome.browserAction.setIcon({ path: 'img/icon38.png' });
            resp.dialogs && resp.dialogs.map(function (dialog) {
                dialog.message.attachments && dialog.message.attachments.map(function (attach) { return attach.type; });
                return dialog;
            });
            delete resp.system;
            this.storage.set(resp);
            return true;
        };
        BgClass.prototype.deamonFailCB = function (error) {
            console.error(error);
            chrome.browserAction.setIcon({ path: 'img/icon38-off.png' });
            return error === 'connect_error';
        };
        BgClass.prototype.StgChanged = function (changes) {
            if (changes.users) {
                this.cacheProfiles(changes.users.newValue);
                delete changes.users;
            }
            if (changes.groups) {
                this.cacheProfiles(changes.groups.newValue);
                delete changes.groups;
            }
            if (changes.counter && changes.counter.newValue) {
                this.stg.counter = angular.copy(changes.counter.newValue);
                this.setBadge();
                delete changes.counter;
            }
            if (changes.user_id && changes.user_id.newValue) {
                this.Analytics.set('&uid', changes.user_id.newValue);
                this.stg.user_id = changes.user_id.newValue;
                delete changes.user_id;
            }
            var newStg = {};
            angular.forEach(changes, function (change, key) {
                if (angular.isDefined(change.newValue))
                    newStg[key] = angular.copy(change.newValue);
            });
            this.storage.set(newStg, false);
            return this;
        };
        BgClass.$inject = [
            'storage',
            '$vk',
            'deamon',
            'Config',
            'Analytics',
        ];
        return BgClass;
    }());
    BgApp.BgClass = BgClass;
})(BgApp || (BgApp = {}));
//# sourceMappingURL=BgClass.js.map