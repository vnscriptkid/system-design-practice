import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from 'sequelize';

// order of InferAttributes & InferCreationAttributes is important.
export class Attendee extends Model<InferAttributes<Attendee>, InferCreationAttributes<Attendee>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare user_id: string;
    declare conference_id: string;
    // other attributes...
}

export default (sequelize: Sequelize) => {
    Attendee.init(
        {
            user_id: {
                type: DataTypes.STRING,
            },
            conference_id: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName: 'attendees'
        }
    );

    return Attendee;
}