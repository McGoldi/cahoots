$(document).ready(function() {
	//$.each(author, function(key, value) {
	//	$("*").highlight(key, {caseSensitive: false, className: value });
	//});
	
	$.each(author,function(key,val){
       $('*').contents()
       .filter(function(){
           return this.nodeType === 3;
       })
       .filter(function(){
           // Only match when contains keyword anywhere in the text
           return this.nodeValue.toLowerCase().indexOf(key.toLowerCase()) != -1;
       })
       .each(function(){
           $(this).highlight(key, {caseSensitive: false, className: val });
       });
      });

	$('span[class*=CahootsID]').tooltipster({
		interactive: true,
		contentAsHTML: true,
		maxWidth: 320,
		animation: 'grow',
		content: 'Daten werden geladen…',
		delay: '200',
		speed: '200',
		timer: '400',
		functionBefore: function(origin, continueTooltip) {
			continueTooltip();
			var id = $(this).attr('class').replace(' tooltipstered','');
			self.port.emit('gotID', id);
			self.port.on('gotContent', function(cahoots_content){
				origin.tooltipster('content', cahoots_content);
			});
		}
	});
});