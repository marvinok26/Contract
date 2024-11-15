const payservedb = require('payservedb');

const deleteContract = async (request, reply) => {
    try {
        const { contractId } = request.params;

        const contract = await payservedb.Contract.findById(contractId);

        if (!contract) {
            return reply.code(404).send({ error: 'Contract not found' });
        }

        if (!contract.disabled) {
            return reply.code(403).send({ error: 'You can only delete a disabled contract' });
        }

        await payservedb.Contract.findByIdAndDelete(contractId);

        return reply.code(200).send('Contract deleted successfully');
    } catch (err) {
        return reply.code(502).send({ error: err.message });
    }
};

module.exports = deleteContract;
