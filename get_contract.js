const payservedb = require('payservedb')
const get_contract = async (request, reply) => {
    try {
        const { contractId } = request.params;
        const contract = await payservedb.Contract.findById(contractId)
        .populate('levy', 'levyName');
        return reply.code(200).send(contract);

    }
    catch (err) {
        return reply.code(502).send({ error: err.message });
    }
}

module.exports = get_contract