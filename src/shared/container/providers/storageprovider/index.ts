import { diskStorage } from "multer";
import {container} from "tsyringe";
import { Localstorageprovider } from "./implements/localstorageprovider";
import { S3storageprovider } from "./implements/s3storageprovider";

import { Istorageprovider } from "./Istorageprovider";

const dickstorage={
    local:Localstorageprovider,
    s3:S3storageprovider
}

container.registerInstance<Istorageprovider>(
    "StorageProvider", diskStorage[process.env.disk]
)