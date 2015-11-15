(function() {
	'use strict';
	angular.module('app')
	.controller('InboxController', InboxController);

	// InboxController.$inject = ['InboxFactory', '$state', "$stateParams", '$rootScope'];

	function InboxController(InboxFactory, $state, $stateParams, UserFactory, $rootScope) {
		var vm = this;
		vm.status = UserFactory.status;


		vm.pusher = new Pusher('ef1c8591b41568dacaaa',{
		  encrypted: true
		});

		if(!vm.status._user){
			$state.go('Home');
		}

		vm.inConversation;
    vm.getConversations = getConversations;
    vm.openConvo = openConvo;
    vm.closeConvo = closeConvo;
    vm.conversations;
    vm.sendMessage = sendMessage;
    // vm.getConversations();

    vm.messageList = angular.element('#convoList');
    vm.messageForm = angular.element('#messageForm');
    messageForm.css('width', messageList.css('width'));

		if($stateParams.recipient) {
			vm.inConversation = true;
			vm.recipient = $stateParams.recipient;
			var users = {
				user1: vm.status._user.id,
				user2: vm.recipient
			};
			getOneConvo(users);
		} else {
			$stateParams.recipient = '';
		}

		function getConversations() {
				vm.loading = true;
				$http.post('api/inbox', {
					userId: UserFactory.status._user.id
				}).then(function(sucRes) {
					if(sucRes.data.conversation.length < 1) {
						v.title = 'No conversation to display';
					} else {
						vm.conversations = sucRes.data.conversations;
					}
				}, function(errRes) {
					console.log(errRes.data);
				});
		}

		vm.sendMessage = function(inbox){
			inbox.user2 = vm.profile._id;
			InboxFactory.sendMessage(inbox).then(function(res){
			});
		};

		vm.showMessage = function(inbox){
			delete vm.msg;
			vm.msg = {};
			vm.messageDisplay = true;
			vm.inboxMessage = inbox;
		};

	};
})();
