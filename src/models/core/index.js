export { default as Customer }
    from './Customer';
export { default as Users }
    from './Users';
export { default as Role }
    from './Role';
export { default as Bill }
    from './Bill';
export { default as BillProduct }
    from './BillProduct';
export { default as Category }
    from './Category';
export { default as Comment }
    from './Comment';
export { default as Feedback }
    from './Feedback';
export { default as Image }
    from './Image';
export { default as Product }
    from './Product';
export { default as Report }
    from './Report';
export { default as Voucher }
    from './Voucher';
export { default as BillTemp }
    from './BillTemp';

import { sequelize } from '../../connections';

// for (let m in sequelize.models) {
//     sequelize.models[m].sync();
// }

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}