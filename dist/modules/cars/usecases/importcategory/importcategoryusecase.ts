import fs from 'fs';
import { parse as csvParse } from "csv-parse";
import { resolve } from 'path';
import { rejects } from 'assert';

import { inject, injectable } from 'tsyringe';
import { Icategoriesrepository } from '@modules/cars/repositore/Icategoriesrepositore';

interface IImportcategory{
    name: string,
    description: string}
@injectable()
class Importcategoryusecase{
    constructor(
    @inject("CategoriesRepository")
    private categoriesrepository: Icategoriesrepository){}

    loadCategories(file: Express.Multer.File): Promise<IImportcategory[]> {
        return new Promise((resolve, reject)=>{
            const stream= fs.createReadStream(file.path);
            const categories:IImportcategory[]=[];
    
            const parseFile= csvParse()
        
            // a função pipe pega o que foi lido e joga pra onde determinarmos
            //aqui ele esta pegando o pedaço lido(stream) e passando pra função parseFile
            stream.pipe(parseFile);

            parseFile
            .on("data", async (line)=>{
                const [name, description]= line;
            categories.push({
                name,
                description});
            })
            .on("end", ()=>{
                fs.promises.unlink(file.path)
                resolve(categories) })
            .on('error',(err)=>{
                reject(err)
            })
        })    
}

    async execute(file: Express.Multer.File): Promise<void>{
        const categories= await this.loadCategories(file)
        //o map permite que vc percorra algo
        categories.map(async category=>{
        const {name, description }= category
        const existCategory= await this.categoriesrepository.findByName(name)
        if(!existCategory){await this.categoriesrepository.create({
            name,
            description})}
        })   } 
}

export{Importcategoryusecase}