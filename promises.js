let central = require('./central'),
db1 = require('./db1'),
db2 = require('./db2'),
db3 = require('./db3'),
vault = require('./vault'),
mark = require('./mark');


module.exports = function(id) { 
const ddbb = {
    "db1": db1,
    "db2": db2, 
    "db3": db3
}

return new Promise((resolve, reject) => {
    let allData = []

     Promise.all([
        
    central(id)
        .then((data) => {
            return ddbb[data](id)
                .catch(() => Promise.reject("Error " + data))
        })

        .catch(() => {return Promise.reject("Error central")} ),
    
    vault(id)
        
        .catch(() => Promise.reject("Error vault"))
    ])
        .then((data) =>  {
            mark(id).then(() => {})

            resolve( 
                {
                    id: id,
                    username : data[0].username,
                    country : data[0].country,
                    firstname : data[1].firstname,
                    lastname : data[1].lastname,
                    email : data[1].email
    
                }
            )
            .catch((error) => reject(error))
        });

        
   
})

};