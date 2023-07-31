const { sequelize } = require('./models');

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully! :)');
  } catch (error) {
    console.error('Database not connected:', error.message);
  }
};
