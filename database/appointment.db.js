let appointmentSchema = require('../server/schema/appointment.schema');

exports.create = (data) => {
    return (new appointmentSchema(data)).save();
}
