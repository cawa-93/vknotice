/// <reference path="../all.d.ts"/>
module StorageApp {
// eslint-disable-next-line angular/no-service-method
	const DefaultStorage: IStorageData = {
		access_token: '',
		user_id: 0,
		options: {
			friends: true,
			photos: true,
			videos: true,
			messages: true,
			groups: true,
			wall: true,
			mentions: true,
			comments: true,
			likes: true,
			reposts: true,
			followers: true,
			audio: 1,
		},
		counter: [],
		currentSection: '',
		friends: [],
		newfriends: [],
		dialogs: [],
		dialogs_cache: [],
		groups: [],
		users: [],
		profiles: [],
		lang: 0,
		notifyLast_viewed: Date.now()/1000,
	};
	angular.module('StorageApp', [])
		.constant('DefaultStorage', DefaultStorage)
		.service('storage', StorageService);
}
