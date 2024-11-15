const payservedb = require('payservedb');

const getContractsByFacility = async (request, reply) => {
    try {
        const { facilityId } = request.params;
        const contracts = await payservedb.Contract.find({ facilityId })
            .populate('levy', 'levyName');

        return reply.code(200).send(contracts);
    } catch (err) {
        return reply.code(502).send({ error: err.message });
    }
};

module.exports = getContractsByFacility;
