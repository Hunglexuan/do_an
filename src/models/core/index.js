
export { default as Customer } from './Customer';
export { default as Users } from './Users';
export { default as Role } from './Role';



import { sequelize } from '../../connections';

// for (let m in sequelize.models) {
//     sequelize.models[m].sync();
// }

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}