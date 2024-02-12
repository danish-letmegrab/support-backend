// Model definition for Ticket
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "ticket",
    {
      ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_type_id: DataTypes.INTEGER,
      ticket_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mem_id: DataTypes.INTEGER,
      assigned_memid: DataTypes.INTEGER,
      order_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      subject: DataTypes.STRING,
      user_type: DataTypes.TINYINT,
      status: DataTypes.TINYINT,
      close_by: DataTypes.TINYINT,
      review: DataTypes.STRING,
      rating: DataTypes.TINYINT,
      is_reported: DataTypes.INTEGER,
      report_reason: DataTypes.TEXT,
      reopen_reason: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: DataTypes.DATE,
      closed_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      readstatus: DataTypes.TINYINT,
    },
    {
      timestamps: false, // Avoids additional timestamp columns due to potential conflicts
      tableName: "ticket", // Explicitly sets the table name
    }
  );
  return Ticket;
};
