'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders_itens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  
  this.belongsTo(models.order, { foreignKey: 'order_id' });
  
  this.belongsTo(models.products, { foreignKey: 'product_id' });
  
}
    
  }
  orders_itens.init({
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'orders_itens',
  });
  return orders_itens;
};