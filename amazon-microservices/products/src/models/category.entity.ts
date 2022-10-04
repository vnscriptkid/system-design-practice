import { DataTypes } from 'sequelize';
import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Category extends Model {
    @PrimaryKey
    @Column(DataTypes.UUID)
    id: string;

    @Column(DataTypes.STRING)
    name: string;
}