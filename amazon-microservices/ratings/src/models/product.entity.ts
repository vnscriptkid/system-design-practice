import { DataTypes, Optional } from 'sequelize';
import { Table, Column, Model, PrimaryKey, HasMany } from 'sequelize-typescript';
import { ProductRating, ProductRatingAttributes } from './product-ratings';

export interface ProductAttributes {
    id: string;
    name: string;
    price: number;
    average_rating: number;
    ratings: ProductRatingAttributes;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

@Table({ tableName: 'products' })
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    @PrimaryKey
    @Column(DataTypes.UUID)
    id: string;

    @Column(DataTypes.STRING)
    name: string;

    @Column(DataTypes.FLOAT)
    average_rating: number;

    @Column(DataTypes.DECIMAL)
    price: number;

    @HasMany(() => ProductRating)
    ratings: ProductRating[];

    public toData(): any { }
}