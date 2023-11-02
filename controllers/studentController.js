

const getStudents = (req, res) => {

    res.status(200).json({'success' : 'students gotten'})
}

module.exports = {getStudents}