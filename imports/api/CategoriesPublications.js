import { Meteor } from 'meteor/meteor';
import { CategoriesCollection } from '/imports/db/CategoriesCollection';

Meteor.publish('categories', function publishTasks() {
    return CategoriesCollection.find({})
})