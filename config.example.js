var config = {}

config.facebook = {};

config.facebook.app_id = "my-app-id";
config.facebook.secret = process.env.FACEBOOK_SECRET || "my-secret";

module.exports = config;
