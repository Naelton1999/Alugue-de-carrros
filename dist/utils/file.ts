import fs from "fs"


export const deleteFile= async(filename:string)=>{
    //o stat verifica se o arquivo existe ou não na url que passarmos
    try{
        await fs.promises.stat(filename)

    }catch{
        return;
    }
    //o unlink remove o arquivo se não existir
    await fs.promises.unlink(filename)
}