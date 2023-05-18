import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const vars = {
  env: process.env.NODE_ENV || "",
  host: process.env.HOST || "",
  port: parseInt(process.env.PORT) || 0,
  maxApiRequestsPerHour: parseInt(process.env.MAX_API_REQUESTS_PER_HOUR) || 0,
  verificationCodeExpInHours:
    parseInt(process.env.VERIFICATION_CODE_EXP_IN_HOURS) || 0,
  recoveryTokenExpInHours: parseInt(process.env.RECOVERY_TOKEN_EXP_IN_HOURS) || 0,
  mongoUri: process.env.MONGO_URI || "",
  mongoDb: process.env.MONGO_DB || "",
  appLink: process.env.APP_LINK || "",
  dashLink: process.env.DASH_LINK || "",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: parseInt(process.env.SMTP_PORT) || 0,
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "",
  jwtRefreshKey: process.env.JWT_SECRET_KEY || "",
  jwtRefreshExpiresIn: process.env.JWT_EXPIRES_IN || ""
};