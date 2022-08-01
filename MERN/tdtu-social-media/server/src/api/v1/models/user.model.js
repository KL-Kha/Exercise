const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true }, //'unique' adds index => fastens the querying process
        // -> Can be used as primaryKey
        password: { type: String, required: true },
        name: { type: String, required: true },
        class: { type: String },
        department: { type: String },
        avatar: { type: String },
        bio: { type: String },
        joinDate: { type: Date, default: Date.now },
        dayOfBirth: { type: Date, default: Date.now },
        role: { type: String, enum: ['Admin', 'Department', 'Student'], required: true },
        posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }], // Embedded Post
        //comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }], // Embedded Comment
        following: [{ type: mongoose.Types.ObjectId, ref: 'User' }], // Following another user
        followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }], // followers
        followedTags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],

        refreshToken: { type: String },
    },
    {
        timestamps: true,
    },
);

// Hash password before save
UserSchema.pre('save', async function (next) {
    const user = this;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    this.password = hashedPassword;
    next();
});

UserSchema.methods.validatePassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

module.exports = mongoose.model('User', UserSchema);
