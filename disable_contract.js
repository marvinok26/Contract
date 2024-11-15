const payservedb = require('payservedb');

const toggleDisableContract = async (request, reply) => {
    try {
        const { contractId } = request.params;
        const { disabled } = request.body;

        const updatedContract = await payservedb.Contract.findByIdAndUpdate(
            contractId,
            { disabled },
            { new: true }
        );

        if (!updatedContract) {
            return reply.code(404).send({ error: 'Contract not found' });
        }

        return reply.code(200).send(`Contract ${disabled ? 'disabled' : 'enabled'} successfully`);
    } catch (err) {
        return reply.code(502).send({ error: err.message });
    }
};

module.exports = toggleDisableContract;
