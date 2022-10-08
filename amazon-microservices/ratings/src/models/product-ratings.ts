import { DataTypes, Optional } from 'sequelize';
import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import { Product, ProductAttributes } from './product.entity';

export interface ProductRatingAttributes {
    id: string;
    product_id: string;
    rating: string;
    comment: string;
    product: ProductAttributes;
}

export interface ProductRatingCreationAttributes extends Optional<ProductRatingAttributes, 'id'> { }

@Table({ tableName: 'product_ratings' })
export class ProductRating extends Model<ProductRatingAttributes, ProductRatingCreationAttributes> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @ForeignKey(() => Product)
    @Column(DataTypes.UUID)
    product_id: string;

    @Column(DataTypes.FLOAT)
    rating: number;

    @Column(DataTypes.STRING)
    comment: string;

    @BelongsTo(() => Product)
    product: Product;

    public toData(): any { }
}