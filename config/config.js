
var config = {
    port: process.env.PORT,
    schema: process.env.SCHEMA,
    baseurl: process.env.BASEURL,
    sourceEmail: process.env.SES_EMAIL,
}
console.log(config);
module.exports = config;
