const registerStudent = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Student Registration API Working 🚀"
    });

};

module.exports = {
    registerStudent
};