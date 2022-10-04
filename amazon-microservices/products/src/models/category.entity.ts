import { DataTypes, Optional } from 'sequelize';
import { Table, Column, Model, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { Product } from './product.entity';

export interface CategoryAttributes {
    id: string;
    name: string;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> { }

@Table({ tableName: 'categories' })
export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @Column(DataTypes.STRING)
    name: string;

    @HasMany(() => Product)
    products: Product[];
}