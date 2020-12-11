var developmentDatabase = {
    postgres: {
    host: 'ec2-54-217-236-206.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd464u8jn70gtkt',
    user: 'iuzkpseaqltaaq',
    password: '90644d788eedd3936855dea06f211d8e2052758a4717948118c981cb670cd34d'
    }
    }
    
    var connectionString = "postgres://iuzkpseaqltaaq:90644d788eedd3936855dea06f211d8e2052758a4717948118c981cb670cd34d@ec2-54-217-236-206.eu-west-1.compute.amazonaws.com:5432/d464u8jn70gtkt";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }