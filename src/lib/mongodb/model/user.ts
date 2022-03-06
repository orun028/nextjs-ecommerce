import { model, Schema, models } from "mongoose";
import { hashPassword } from "@/lib/hash";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, index: { unique: true }, maxlength: 20 },
    password: { type: String, default: null, maxlength: 30 },
    phone: { type: String, required: false, index: { unique: true, sparse: true }, maxlength: 10 },
    blocked: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    address: [{
        road: String,
        district: String,
        city: String
    }, {required: false} ],
    image: { type: String, default: 'https://static.productionready.io/images/smiley-cyrus.jpg'},
    addressActive: { type: Schema.Types.ObjectId },
    role: { type: Schema.Types.ObjectId, ref: 'role' },
}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    if(await this.address[0]){
        this.addressActive = this.address[0]._id
    }
    next();
});

UserSchema.pre('save' || 'findByIdAndUpdate', async function (next) {
    if (this.password) this.password = await hashPassword(this.password);
    /* if (this.name && this.email && !this.password && !this.confirmed) {
        await Role.findOne({ code: 'role_user_public' })
            .then(e => this.role = e._id)
            .catch(next)
    } else if(this.name && this.email ) {
        await Role.findOne({ code: 'role_user_auth' })
            .then(e => this.role = e._id)
            .catch(next)
    } */
    next();
});

export default models.user || model('user', UserSchema);