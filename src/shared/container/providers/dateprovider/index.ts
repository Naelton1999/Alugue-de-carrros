import {container} from "tsyringe";
import "dotenv/config";
import "reflect-metadata";
import { Idateprovider } from "./Idateprovider";
import { Dayjsdateprovider } from "./implementatios/dayjsdateprovider";

container.registerSingleton<Idateprovider>(
    "Dayjsdateprovider",Dayjsdateprovider
)

