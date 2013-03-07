$("#search").autocomplete({
	source: function( request, response ) {
		$.ajax({
			url: "/item?qry="+request.term,
			dataType: "json",
			data: {
			},
			success: function( data ) {
				response( data );
			}
		});
	},
	appendTo: '#search_results',
	minLength: 2,
	delay: 300,
	select: function( event, ui ) {
		if(ui.item)
		{
			console.log(ui);
		}
	}
});