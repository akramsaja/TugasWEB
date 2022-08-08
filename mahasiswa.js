const {
    MongoClient
} = require('mongodb')
const client = new MongoClient("mongodb://mahasiswa:if2020@if.unismuh.ac.id:27017/web")
const collection = "kelompok4d"

const Mongofunction = {

    ambeMuami: async (offset) => {
        try {
            offset = offset < 0 || offset == null ? 0 : offset
            await client.connect()
            return await client.db('web').collection(collection).find({}).skip(offset).limit(70).sort({
                nim: 1
            }).toArray()
        } finally {
            await client.close()
        }
    },
    ambilDariNim: async (nim) => {

        try {
            await client.connect()
            return await client.db('web').collection(collection).findOne({
                nim: nim
            })

        } finally {
            await client.close()
        }

    }, 
    editData : async (nim, newData) => {
        try {
            await client.connect()
            console.log(newData)
            if(newData == null) {
                return false
            }
            const mahasiswa = await client.db('web').collection(collection).findOneAndUpdate({
                nim: nim
            }, {$set : newData} )
            if(mahasiswa == null) {
                return false
            }
            return true

        } finally {
            await client.close()
        }
        
    }


}

module.exports = Mongofunction