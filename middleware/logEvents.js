
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
const {v4:uuid} = require('uuid');
const {format} = require('date-fns')


const createLog = async (message, logName) => {

    const logDate = format(new Date(), 'dd/MM/yyyy\t HH:MM:SS');
    const logMessage = `${logDate}\t${uuid()}\t${message}\n`
    console.log(logMessage)
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logMessage);

    }catch(error){

        console.log(error)
    }

}

const logger = (req, res, next) => {
    createLog(`${req.method}\t${req.headers.origin}\t${req.url}`,'requestLog.txt')
    next()
}


module.exports  = {createLog, logger}

