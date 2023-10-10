const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
function validateDate(dateString) {
    if (!dateRegex.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const ageDiffMs = Date.now() - inputDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age >= 16;
}


module.exports = validateDate;