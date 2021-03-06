angular
  .module('Whatsapp')
  .controller('ChatDetailCtrl', ChatDetailCtrl);

function ChatDetailCtrl ($scope, $stateParams, $ionicScrollDelegate, $timeout, $meteor, $ionicPopup, $log) {
  var chatId = $stateParams.chatId;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
  $scope.chat = $scope.$meteorObject(Chats, chatId, false);
    
  $scope.messages = $scope.$meteorCollection(function () {
    return Messages.find({ chatId: chatId });
  }, false);

  $scope.$watchCollection('messages', function (oldVal, newVal) {
    var animate = oldVal.length !== newVal.length;
    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
  });

  $scope.data = {};
  $scope.sendMessage = sendMessage;
  $scope.sendRobotResponse = sendRobotResponse;
  $scope.inputUp = inputUp;
  $scope.inputDown = inputDown;
  $scope.closeKeyboard = closeKeyboard;
  $scope.sendPicture = sendPicture;

  ///

  function sendPicture () {
    MeteorCameraUI.getPicture({}, function (err, data) {
      if (err && err.error == 'cancel') {
        return;
      }

      if (err) {
        return handleError(err);
      }

      $meteor.call('newMessage', {
        picture: data,
        type: 'picture',
        chatId: chatId
      });
    });
  }

  function handleError (err) {
    $log.error('profile save error ', err);
    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  function sendMessage () {
    if (_.isEmpty($scope.data.message)) {
      return;
    }

    $meteor.call('newMessage', {
      text: $scope.data.message,
      type: 'text',
      chatId: chatId,
      owner: 'current'
    });

    delete $scope.data.message;
  }

    /* TO BE USED ONLY ON LOCAL*/
  function sendRobotResponse(){
      $timeout(function(){
      
          $meteor.call('newMessage', {
          text: "I am a robot!",
          type: 'text',
          chatId: chatId,
          owner: 'other'
    });
      
      }, 3000);
    
  }

  function inputUp () {
    if (isIOS) {
      $scope.data.keyboardHeight = 216;
    }

    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }

  function inputDown () {
    if (isIOS) {
      $scope.data.keyboardHeight = 0;
    }

    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  function closeKeyboard () {
    // cordova.plugins.Keyboard.close();
  }
}