const registerUser = (req, res) =>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All Field are required!"
        });
    }

    return res.status(201).json({
        message: "Register successfully",
        data:{
            name,
            email,
        }
    })


}

module.exports = registerUser;