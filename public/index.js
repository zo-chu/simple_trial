var React = require("react");
var ReactDOM = require("react/lib/ReactDOM");

var Router = require('react-router').Router
var browserHistory = require("react-router").browserHistory
var injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin();


var routes = require("./../routes");

ReactDOM.render(
 <Router history={browserHistory}>
        {routes}
</Router> , document.getElementById('react-root'))

