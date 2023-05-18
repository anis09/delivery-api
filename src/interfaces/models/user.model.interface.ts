export interface User {
    _id: string;
    account: {
      role: string,
      email: string,
      password: string,
      activationStatus:string,
      verificationCode: string,
      verificationExpireAt: Date,
      isVerified:string,
      passwordRecoveryToken: string,
      passwordRecoveryExpireAt: Date,
      passwordRecoveredAt: Date,
      lastSignIn: Date,
      lastSignOut: Date,
    };
    profile: {
      firstName: string,
      lastName: string,
      phone: string,
      avatarUrl: string
    },
    isArchived: {
      type: Boolean,
      default: false,
    }
  }
  