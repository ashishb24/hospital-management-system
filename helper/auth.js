// to verify token detail
exports.setDecodedPayload = (req, payload) => {
    req.headers.decodedPayload = payload
};

// to decode payload(js Object) || JSON Object || Collection
exports.getDecodedPayload = (req) => {
    return req.headers.decodedPayload
};