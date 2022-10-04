import { DataTypes, Optional } from 'sequelize';
import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import { Category } from './category.entity';
import { ProductData, CategoryData } from '@kidsorg/amazon-common'

export interface ProductAttributes {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

@Table({ tableName: 'products' })
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @Column(DataTypes.STRING)
    name: string;

    @Column(DataTypes.STRING)
    description: string;

    @Column(DataTypes.DECIMAL)
    price: number;

    @ForeignKey(() => Category)
    @Column(DataTypes.UUID)
    category_id: string;

    @BelongsTo(() => Category)
    category: Category;

    public toData(): ProductData {
        return ProductData.build({
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            category: CategoryData.build({
                id: this.category.id,
                name: this.category.name
            })
        })
    }
}