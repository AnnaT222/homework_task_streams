import fs, { createReadStream, createWriteStream } from "fs"
import { Transform } from "stream"

const transformData = (readableStream, writableStream, operation) => {
    switch (true) {
        case operation == "uppercase":
            const upperCase = new Transform({
                transform(chunk, enc, callback) {
                    callback(null, chunk.toString().toUpperCase())
                }
            })
            readableStream.pipe(upperCase).pipe(writableStream)
            break;
        case operation == "lowercase":
            const lowerCase = new Transform({
                transform(chunk, enc, callback) {
                    callback(null, chunk.toString().toLowerCase())
                }
            })
            readableStream.pipe(lowerCase).pipe(writableStream)
            break;
        case operation == "reverse":
            const reversedData = new Transform({
                transform(chunk, enc, callback) {
                    callback(null, chunk.reverse())
                }
            })
            readableStream.pipe(reversedData).pipe(writableStream)
            break;
        default:
            console.log("Invalid operation!");
            process.exit(0)
            break;
    }
}

const inputFileName = () => {
    const data = process.argv
    if (!fs.existsSync(data[2])) {
        console.log("File not found!");
        process.exit(0)
    } else if (data.length < 5) {
        console.log("Invalid operation!");
        process.exit(0)
    } else {
        const readableStream = fs.createReadStream(data[2].toString().trim())
        const writableStream = fs.createWriteStream(data[3].toString().trim())
        const operation = data[4].toString().trim()
        transformData(readableStream, writableStream, operation)
    }
}
inputFileName()