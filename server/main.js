import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PostsCollection } from '/imports/db/PostsCollection'
import '/imports/api/PostsMethods';
import '/imports/api/tasksPublications';
import '/imports/api/UsersMethods';
import '/imports/api/UploadShare';
// const insertTask = (taskText, user) => {
//   TaskCollection.insert({
//     text: taskText,
//     userId: user._id,
//     createAt: new Date(),
//   })
// };

Meteor.startup(() => {
  
});
