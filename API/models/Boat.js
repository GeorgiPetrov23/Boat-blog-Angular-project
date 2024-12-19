import { Schema, model, Types } from 'mongoose';

const boatSchema = new Schema({
    name: {type: String},
    companyName: {type: String},
    length: {type: Number},
    range: {type: Number},
    rechargeTime: {type: Number},
    imageUrl: {type: String},
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Boat = model('Boat', boatSchema);
export default Boat;