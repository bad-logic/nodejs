const { favicon, express } = require("./modules");

const listener = express();

// express configurations
listener.set("value", 1);
console.log(listener.get("value"));

// for booleans
listener.set("logs", true);
listener.enable("logs");
listener.disable("logs");
// check booleans
console.log(listener.enabled("logs"));
console.log(listener.disabled("logs"));

// express settings
// env, view cache, view engine, views, trust proxy, jsonp callback name, json replacer and json spaces,
// case sensitive routing, strict routing, x-powered-by, etag, query parser, subdomain offset

// env = process.env.NODE_ENV || 'development'
// evn = 'development' || 'test' || 'stage' || 'preview' || 'production'

// trust proxy
// set to true if node app is functioning behind reverse proxy such as varnish or Nginx
// will permit trusting in the X-Forwarded-* headers such as X-Forwarded-Proto(req.protocol) or X-Forwarded-For(req.ips)
// disabled by default. to enable use
// listener.set('trust proxy', true) or
// listener.enable('trust proxy')

// jsonp callback name use this to support cross domain, instead of using CORS

// etag
// Other possible values are false (no ETag), true (weak ETag), and strong(strong ETag).
// The last option (for advanced developers) that Express.js provides is using your own ETag algorithm:

// query parser ?name=value&name2=value2 => {name:'value',name2:'value2'}

// listener.set('query parser', true); //uses qs
// listener.set('query parser', false);// disable parsing
// listener.set('query parser', 'simple');// Uses the core querystring module’s functionality
// listener.set('query parser', customQueryParsingFunction);

listener.use(favicon());

// request object
// request.query,request.params,request.body,request.route, request.header,
// request.ip, request.ips (array of ips if trust proxy configurations is enabled)

// response object
// response.render,response.locals,response.set,response.status,response.send,
// response.json,response.jsonp,response.redirect

listener.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    // don't show sensitive errors
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  } else if (process.env.NODE_ENV === "development") {
    // show sensible error so that they can be corrected
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
});

exports.listener = listener;
