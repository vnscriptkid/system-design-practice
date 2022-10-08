import { Sequelize } from 'sequelize-typescript';
import { ProductRating } from 'src/models/product-ratings';
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
                database: 'ratings',
            });
            sequelize.addModels([Product, ProductRating]);
            await sequelize.sync();
            return sequelize;
        },
    },
];