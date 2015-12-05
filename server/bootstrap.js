Meteor.startup(function () {
  if (Accounts.users.find().count() === 0) {
    Accounts.createUserWithPhone({
      phone: '+972501234567',
      profile: {
        name: 'Renee',
        picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
      }
    });

    Accounts.createUserWithPhone({
      phone: '+972501234568',
      profile: {
        name: 'Wenzel',
        picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
      }
    });

    Accounts.createUserWithPhone({
      phone: '+972501234569',
      profile: {
        name: 'Luna',
        picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
          
      }
    });
  }
});