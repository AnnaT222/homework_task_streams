import fs from "fs"
import { Transform, pipeline } from "stream"
const transformData = (readableStream, writableStream, operation) => {
    let transform
    switch (operation) {
        case "uppercase":
            transform = new Transform({
                transform(chunk, enc, callback) {
                    callback(null, chunk.toString().toUpperCase())
                }
            })
            break;
        case "lowercase":
            transform = new Transform({
                transform(chunk, enc, callback) {
                    callback(null, chunk.toString().toLowerCase())
                }
            })
            break;
        case "reverse":
            transform = new Transform({
                transform(chunk, enc, callback) {
                    callback(null, chunk.reverse())
                }
            })
            break;
        default:
            console.log("Invalid operation!!!!!");
            process.exit(0)
            break;
    }
    pipeline(readableStream, transform, writableStream, (err) => {
        if (err) {
            console.error("Pipeline failed:", err);
        }
    })
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