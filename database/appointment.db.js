let appointmentSchema = require('../schema/appointment.schema');

exports.create = (data) => {
    return (new appointmentSchema(data)).save();
}
