import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PostsCollection } from '/imports/db/PostsCollection'
import { TaskCollection } from '/imports/db/TaskCollection'
import bodyParser from 'body-parser'
import '/imports/api/PostsPublications';
import '/imports/api/PostsMethods';
import '/imports/api/UsersMethods';
import '/imports/api/UploadShare';
import '/imports/api/CategoriesMethods';
import '/imports/api/CategoriesPublications';
// const insertTask = (taskText, user) => {
//   TaskCollection.insert({
//     text: taskText,
//     userId: user._id,
//     createAt: new Date(),
//   })
// };

Meteor.startup(() => {
    WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: true }))
    WebApp.connectHandlers.use('/hello', (req, res, next) => {
        console.log(req.query);
        console.log(req.body);
        res.writeHead(200);
        res.end(JSON.stringify({hello: 123}));
    });
});
