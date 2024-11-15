const payservedb = require('payservedb');

const getContracts = async (request, reply) => {
    try {
        const contracts = await payservedb.Contract.find()
            .populate('levy', 'levyName')
            .populate('customerId', 'name')
            .populate('unitId', 'unitName');

        return reply.code(200).send(contracts);
    } catch (err) {
        return reply.code(502).send({ error: err.message });
    }
};

module.exports = getContracts;
