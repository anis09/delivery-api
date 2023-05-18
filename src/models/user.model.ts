import { vars } from "./../constants/vars";
import { User } from "./../interfaces/models/user.model.interface";
import { connection, Schema, Document } from "mongoose";

const userSchema: Schema = new Schema(
    {
      account: {
        role: String,
        email: String,
        password: String,
        verificationCode: String,
        verificationExpireAt: Date,
        isVerified:String,
        activationStatus: String,
        passwordRecoveryToken: String,
        passwordRecoveryExpireAt: Date,
        passwordRecoveredAt: Date,
        lastSignIn: Date,
        lastSignOut: Date,
      },
      profile: {
        firstName: String,
        lastName: String,
        phone: String,
        avatarUrl: String
      },
      isArchived: {
        type: Boolean,
        default: false,
      }
    },
    { collection: "users", timestamps: true, versionKey: false }
  );
  
  const db = connection.useDb(vars.mongoDb);
  const userModel = db.model<User & Document>("User", userSchema);
  
  export { userModel };