import UserSchema from "./UserSchema.js"

export const createNewUser = (obj) => {
    return UserSchema(obj).save();

}

export const updateUser = (filter, obj) => {
    return UserSchema.findOneAndUpdate(filter, obj, { new: true });
};



// find a user, @filter must be an obj
export const findUser = (filter) => {
    return UserSchema.findOne(filter);
};
