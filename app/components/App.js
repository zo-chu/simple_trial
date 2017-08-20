var React = require("react");


var TextField = require('material-ui/lib/text-field')
var  ThemeManager = require('material-ui/lib/styles/theme-manager');
var  LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var  Colors = require('material-ui/lib/styles/colors');
var  ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var ContentCard = require("./ContentCard")

var styles = require("./../styles.js");

var palette = {
    primary1Color: Colors.green900,
    primary2Color: Colors.green700,
    primary3Color: Colors.lightBlack,
    accent1Color: "#AA3939",
    accent2Color: Colors.pink900,
    accent3Color: Colors.pink300,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: "#FAFAFA",
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.green700
}

var App = React.createClass({
childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {
            muiTheme: ThemeManager.modifyRawThemePalette(ThemeManager.getMuiTheme(LightRawTheme), palette)
        }
    },
  render: function () {
        return (
            <div>
                <ContentCard/>
            </div>
            )
    }
});

exports.App = App;

