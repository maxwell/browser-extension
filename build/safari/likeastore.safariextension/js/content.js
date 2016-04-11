;(function () {
	var app = window.app = window.app || {};
	var App = function (block) {

		return {
			run: function () {
					if(location.host.indexOf('kickstarter') === -1){
						this.doIndiegogo();
					}else{
						this.doKickstarter();
					}
			},
			
			doKickstarter: function(){
				var url = $("*[rel='canonical']").first().attr('href'),
						prependTarget = $('.container-flex.px2').first();

						if(url === undefined){
							return;
						}
						if(url.indexOf('creator_bio') !== -1){
							return;
						}
						url = url.replace('/creator_bio')
					
				this.insertIframe(url, prependTarget);
			},
			
			doIndiegogo: function(){
				var url = $("*[rel='canonical']").first().attr('href').split('/x/')[0],
						prependTarget = $('.i-campaign-page.ng-isolate-scope');
				this.insertIframe(url, prependTarget);
			},
			
			insertIframe: function(url, prependTarget){
				if(url.indexOf('/projects') === -1){
					return
				}
				var parser = document.createElement('a');
				parser.href = url;
				
				$('<iframe>', {src:'https://www.backerkit.com' + parser.pathname + '/iframe', frameBorder: "0", width: prependTarget.width(), height:'352px', scrolling:'no'}).prependTo(prependTarget);
			}
		};
	};
	
	new App($(this)).run();
})();
