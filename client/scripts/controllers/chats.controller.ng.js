angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $ionicModal,$meteor) {
  $scope.chats = $scope.$meteorCollection(Chats, false);

  $ionicModal.fromTemplateUrl('client/templates/new-chat.ng.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.openNewChatModal = openNewChatModal;
  $scope.remove = remove;
  $scope.customFunction = customFunction;

  ////////////

  function openNewChatModal () {
      $scope.modal.show();
  }

  function remove (chat) {
    console.log(chat);
//      $scope.chats.remove(chat);
    $meteor.call('removeChat', chat._id);
  }
    
  function customFunction () {
        console.log('this is something!');
  }
}