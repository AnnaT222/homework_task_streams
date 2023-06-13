import fs from "fs"
import { Transform, pipeline } from "stream"
let operation = process.argv[4]
function transformData(readableStream, writableStream) {
    const transform = new Transform({
        transform(chunk, enc, callback) {
            const data = chunk.toString()
            console.log(data);
            switch (operation) {
                case "uppercase":
                    callback(null, data.toUpperCase())
                    break;
                case "lowercase":
                    callback(null, data.toLowerCase())
                    break;
                case "reverse":
                    callback(null, data.reverse())
                    break;
                default:
                    console.log("Invalid operation!!!!!");
                    process.exit(0)
                    break;
            }
        }
    })
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
        transformData(readableStream, writableStream)
    }
}
inputFileName()