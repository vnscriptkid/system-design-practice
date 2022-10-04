import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/models/category.entity';
import { Product } from 'src/models/product.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 33060,
                username: 'root',
                password: 'root',
                database: 'products',
            });
            sequelize.addModels([Category, Product]);
            await sequelize.sync();
            return sequelize;
        },
    },
];