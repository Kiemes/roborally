Template.gameChat.helpers({
	messages: function() {
		return Chat.find({gameId: this._id});
	},
	currentGameId: function() {
		return Session.get('currentGameId');
	}
});

Template.gameChat.events({
	'submit form': function(event) {
		event.preventDefault();
		var message = {
			gameId: $(event.target).find('[name=gameId]').val(),
			message: $(event.target).find('[name=message]').val()
		};

		Meteor.call('addMessage', message, function(error, id) {
			if (error)
				return alert(error.reason);

			$(event.target).find('[name=message]').val('');
		});
	}
});

Template.gameChat.rendered = function() {
	Chat.find({gameId: Session.get('currentGameId')}).observe({added: function() {
		var $chat     = $('.chat'),
				$printer  = $('.messages', $chat),
				printerH  = $printer.innerHeight();
		$printer.stop().animate( {scrollTop: $printer[0].scrollHeight - printerH  }, 100);
	}});
};
