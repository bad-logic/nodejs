const { favicon, express } = require("./modules");

const listener = express();

listener.use(favicon());

listener.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    // don't show sensitive errors
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  } else if (process.env.NODE_ENV === "development") {
    // show sesible error so that they can be corrected
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
});

exports.listener = listener;
