const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
const envConfig = require(`./keys_${env}`);

Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
