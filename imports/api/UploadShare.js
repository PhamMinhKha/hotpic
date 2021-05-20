import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
    collectionName: 'Images',
    storagePath: '/Users/phamkha/Desktop/Meteor/images',
    allowClientCode: true, // Disallow remove files from Client
    onBeforeUpload(file) {

        if (this.userId) {
            const user = this.user();
            // Allow upload files under 10MB, and only in png/jpg/jpeg formats
            if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
                return true;
            }
            else return 'Please upload image, with size equal or less than 10MB';
        }
        else {
            return 'You are not logged in';
        }

    },
    onBeforeRemove(cursor) {
        const records = cursor.fetch();

        if (records && records.length) {
            if (this.userId) {
                const user = this.user();
                // Assuming user.profile.docs is array
                // with file's records _id(s)

                for (let i = 0, len = records.length; i < len; i++) {
                    const file = records[i];
                    if(file.userId !== user._id)
                    {
                        //kiểm tra xem phải chủ bức hình xoá không
                        return false
                    }
                }
            }
        }

        return true;
    }
});
export default Images;
if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
    Meteor.publish('files.images.all', function () {
        return Images.find().cursor;
    });
}