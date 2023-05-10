exports.getResponseStructure = (status, message, data) => {
    return {
        status,
        message,
        response: data || {}
    };
};