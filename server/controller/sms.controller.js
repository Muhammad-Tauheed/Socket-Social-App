const Sms = require("../Model/sms.model");

exports.store = async (req, res) => {
    const { name, message } = req.body;  
    try { 
      const user = new Sms({ name, message }); 
      const result = await user.save(); 
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        message: "Error occurred while saving the user.",
        error: error.message,
      });
    }
  };

exports.index = async (req, res) => {
  try {
    const sms = await Sms.find();
    res.json({
      message: "Message Created Successfuly",
      status: "201",
      success: "true",
      sms,
    });
  } catch (err) {
    console.log("err");
  }
};
