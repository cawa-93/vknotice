/* globals jQuery, chrome, navigator, Vk, console, Popup, App*/
/*jshint esnext: true */
/*jshint -W097*/
"use strict";
jQuery(function ($) {

	$.when(new App().loadTranslate(), Popup.checkError(), Popup.loadProfiles()).done(() => {
		$.when(Popup.setCurrentProfile(), Popup.builFriendsOnline(), Popup.buildCounters(), Popup.buildDialogs(), Popup.buildNewFriends()).done(() => {
			Popup.setTranslate().show().initScroll().initSlide();

			$('.dropdown').on('click', function () {
				$(this).toggleClass('open');
			});

			const app = new App();
			// Ссылка на страницу расширения
			$('.review').attr('href', app.comment);

			// Ссылка на страницу настроек
			$('.settings').attr('href', 'chrome-extension://' + app.id + '/options/index.html');

			// Share ссылка
			$('.share').attr('href', app.share);

			// Событие нажатия на кнопку выхода
			$('.logout').on('click', function () {
				chrome.storage.local.set({
					'user_id': -1,
					'access_token': 'Not access_token'
				});
				Popup.buildAlert({
					'body': {
						'ancor'	: 'Login',
						'url'	: new Vk().authUrl
					}
				}).addClass('error');
			});

			new Vk().load().done(vk => vk.api('stats.trackVisitor'));
		});

	}).fail(code => {
		if (code === 3) {
			Popup.buildAlert({
				code: 3,
				header: 'Error',
				body: {
					text: '3. Load translate failed'
				}
			}).addClass('error');
		}
	}).always(() => {
		const vk = new Vk();

		$('#alert').on('click', `a[href="${vk.authUrl}"]`, function () {
			vk.auth();
			return false;
		}).on('click', 'a[href]', function () {
			$('#alert').removeClass('show');
		});
	});
});


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-71609511-2']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();