async function formatCpf(cpf) {
    const regex = /\d+/g;
    const cpfNumbers = cpf.match(regex).join('');   
    return cpfNumbers;
}

module.exports = {
    formatCpf
};