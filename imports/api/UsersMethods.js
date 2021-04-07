import { check } from 'meteor/check'
import { Accounts } from 'meteor/accounts-base'


Meteor.methods({
    'users.Insert':function(data){
      let prepare_data = {
        email: data.email,
        password: data.password,
        profile:{
          name: data.name,
          agreement: data.agreement
        }
      }
      return Accounts.createUser(prepare_data);
    },
  });