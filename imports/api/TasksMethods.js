import { check } from 'meteor/check'
import { TaskCollection } from '/imports/db/TaskCollection'


Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        }
        TaskCollection.insert({
            text,
            createAt: new Date,
            userId: this.userId
        })
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        }
        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.remove(taskId);
    },
    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);
        if (!this.userId) { throw new Meteor.Error('Not authorized'); }
        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }
        TaskCollection.update(taskId, {
            $set: {
                isChecked
            }
        })
    }
})