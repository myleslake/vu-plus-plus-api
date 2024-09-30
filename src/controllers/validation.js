import mongoose from 'mongoose';

const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

export default isValidId;