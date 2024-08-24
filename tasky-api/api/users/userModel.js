import mongoose from "mongoose";

const Schema = mongoose.Schema;

const passwordValidator = {
    validator: function(value) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
    },
    msg: props => `${props.value} is not a vaild password! It must contain at least 8 characters, one letter, one number and one special character`
};

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, validate: passwordValidator }
});

export default mongoose.model('User', UserSchema);