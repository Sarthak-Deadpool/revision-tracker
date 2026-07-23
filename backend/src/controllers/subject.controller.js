/** @format */

const Subject = require("../models/subject.model");

// to create new subject

const createSubject = async (req, res) => {
  try {
    const { name, color, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Subject name is required",
      });
    }

    const subject = await Subject.create({
      user: req.user._id,
      name,
      color,
      description,
    });

    return res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Subject already exist",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//To get all subjects

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Subjects Fetch Successfully",
      subjects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//to get subject by ID

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      message: "Subject found",
      subject,
    });

  } catch (error) {
    console.error(error);

    if(error.name === "CastError"){

        return res.status(400).json({
            message: "Invalid Subject Id"
        })
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// to update Subject

const updateSubject = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, color, description} = req.body;

        if(!name && !color && !description){
            return res.status(400).json({
                message: "At least one field require to update",
            })
        }

        if(name !== undefined && !name.trim()){
            return res.status(400).json({
                message: "Subject name can not be empty "
            })
        }

        
    const subject = await Subject.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    const updateData = {}

    if(name !== undefined){
        updateData.name = name;
    }

    if(color !== undefined){
        updateData.color = color;
    }

    if(description !== undefined){
        updateData.description = description;
    }

    Object.assign(subject, updateData);
    await subject.save();

    return res.status(200).json({
        message: "Subject updated successfully",
        subject,
    })


    } catch (error) {
        console.error(error);

         if(error.name === "CastError"){

        return res.status(400).json({
            message: "Invalid Subject Id"
        })
    }
        return res.status(500).json({
      message: "Internal server error",
    });
    }
}

module.exports = { createSubject, getSubjects, getSubjectById, updateSubject};
