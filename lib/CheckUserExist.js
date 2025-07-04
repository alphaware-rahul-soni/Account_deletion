import mongoose from 'mongoose';
import { ConnectDB } from '@/databases/connectDb';

export const checkUserExists = async (mobileNo = null, email = null, iosUserId = null) => {
    try {
        ConnectDB();
        const userList = mongoose.connection.db.collection('users');
        let userData;

        if (mobileNo) {
            userData = await userList.findOne({ mobileNo: mobileNo });
        }
        else if (email) {
            userData = await userList.findOne({ userEmail: email })
        }
        else {
            userData = await userList.findOne({ iosUserId: iosUserId })
        }

        return userData;
    }
    catch (error) {
        console.error('Error checking user existence:', error);
        return null;
    }
};