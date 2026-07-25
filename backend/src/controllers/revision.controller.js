/** @format */

const mongoose  = require("mongoose");
const Revision = require("../models/revision.model");
const {completeRevisionService} = require("../services/revision.service");


const completeRevision = async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { id } = req.params;
    const { rating } = req.body;

    if (rating === undefined) {
      return res.status(400).json({
        message: "Rating is required",
      });
    }

    const revision = await Revision.findOne(
        {
            _id: id,
            user: req.user._id
        }
    ).session(session);

    if(!revision){
        await session.abortTransaction();

        return res.status(400).json({
            message:"Revision not found",
        })
    }

    await completeRevisionService({
        revision,
        rating,
        session,
    })

     await session.commitTransaction();

     return res.status(200).json({
        message:"Revision completed successfully"
     })

  } catch (error) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }

    console.error(error);
    return res.status(500).json({
        message:"Internal server error",
    })

  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = { completeRevision };
