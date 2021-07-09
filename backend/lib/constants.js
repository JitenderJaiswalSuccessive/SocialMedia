const opt = {
    saltRounds : 10,
    statusCode : {
       "OK" : 200,
       "UnprocessableEntity" : 422,
       "InternalServerError" : 500,
       "Unauthorized"  : 401,
       "Forbidden" : 403,
    },
    jwt_expire: '1h',
}

module.exports = opt;