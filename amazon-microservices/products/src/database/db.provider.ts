import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/models/category.entity';
import { Product } from 'src/models/product.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'products',
            });
            sequelize.addModels([Category, Product]);
            await sequelize.sync();
            return sequelize;
        },
    },
];