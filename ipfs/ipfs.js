const ipfsAPI = require('ipfs-api')
const fs =require('fs')

const ipfs = ipfsAPI({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https'
});

const ipfs_method = {
    add : async(file) => {
        const readData = await fs.readFileSync(file.path)

        const data = {
            path : file.path,
            content : readData
        }   
    
        const result = await ipfs.add(data)

/*         await fs.unlink(file.path, (err) => {
            if (err) return console.log(err)
        })	 */

        return result[0].hash

    }
    
}

module.exports = ipfs_method