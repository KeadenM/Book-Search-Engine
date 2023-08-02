const {User, Book} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('books')
                return userData;
            }
        },
    },
    Mutation: {
        login: async (parent, args, context, {email, password}) => {
            const UserData = await User.findOne({email});
            if (!UserData) {
                console.log('no user found');
                return
            }
            const goodPass = await UserData.isCorrectPassword(password);
            if  (!goodPass) {
                console.log('bad password');
                return
            }
            const token = signToken(UserData);
            return {token, UserData};
        },
        addUser: async (parent, args) => {
            const newUser = await User.create(args);
            const token = signToken(newUser);
            return {token, newUser};
        },
    },
};  
module.exports = resolvers;