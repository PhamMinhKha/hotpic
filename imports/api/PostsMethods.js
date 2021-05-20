import { check, Match } from 'meteor/check'
import { PostsCollection } from '/imports/db/PostsCollection'


Meteor.methods({
    'posts.insert'(post) {
        // console.log(post);
        check(post.post_title, String);
        check(post.post_description, Match.Maybe(String));
        check(post.post_images, Array);
        check(post.post_category, Array);
        check(post.post_type, String);
        check(post.cover_uid, String);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        }
        return PostsCollection.insert({
            title: post.post_title,
            description: post.post_description,
            images: post.post_images,
            category: post.post_category,
            type: post.post_type,
            cover_uid: post.cover_uid,
            userId: this.userId,
            like: 0,
            dislike: 0,
            share:0,
            createAt: Date.now()
        }, function (error, result) {
            console.log(error, result)
            return result
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