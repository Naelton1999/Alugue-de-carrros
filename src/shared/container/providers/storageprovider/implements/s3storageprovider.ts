import { Istorageprovider } from "../Istorageprovider";
import {S3} from "aws-sdk";
import {resolve} from "path";
import upload from "@config/upload";
import fs from "fs";
import mime from "mime"

class S3storageprovider implements Istorageprovider{
    private client:S3
    constructor(){
        this.client= new S3({
            region: process.env.AWS_BUCKET_REGION,
        })
    }
    async save(file: string, folder: string): Promise<string> {
        const originalName= resolve(upload.tmpfolder, file)
        const fileContent= await fs.promises.readFile(originalName)

        const ContentType= mime.getType(originalName) 

        await this.client.putObject({
            Bucket:`${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            Body: fileContent,
            ContentType
        })
        .promise()
        await fs.promises.unlink(originalName)
        return file
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file
        })
        .promise()
    }

}
export{S3storageprovider}