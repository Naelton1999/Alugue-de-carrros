import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserDeleteUsername1662473519797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name:"username",
                type: "varchar",
            })
        );
    }

}

//assim que se remove algo do seu banco de dados, cria um migration(yarn typeorm migration:create -n AlterUserDeleteUsername)
// e depois yarn typeorm migration:run. Aqui esta removendo o username