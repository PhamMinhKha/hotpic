import { check, Match } from 'meteor/check'
import { CategoriesCollection } from '/imports/db/CategoriesCollection'
import slug from 'slug'

Meteor.methods({
    'categories.insert'(category) {
        console.log('==>', category.name);
        // check(name, String);
        // check(category.keyword, Match.Maybe(String));
        // check(category.description, String);
        // check(category.icon, String);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        }
        return CategoriesCollection.insert({
            name: category.name,
            slug: slug(category.name),
            description: category.description,
            icon: category.icon,
            keyword: category.keyword,
            userId: this.userId,
            createAt: Date.now()
        }, function (error, result) {
            console.log(error, result)
            return result
        })
    },
    'categories.getall'() {
        console.log('vao roi');
        return CategoriesCollection.find({}).fetch();
    }
})