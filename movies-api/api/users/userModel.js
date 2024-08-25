import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};

UserSchema.pre('save', async function(next) {
    const saltRounds = 10; // you can change the value
    // const user = this;
    if (this.isModified('password') || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model('User', UserSchema);