import { Meteor } from 'meteor/meteor';
import { PostsCollection } from '/imports/db/PostsCollection';

Meteor.publish('posts', function publishTasks() {
    return PostsCollection.find({ userId: this.userId })
})