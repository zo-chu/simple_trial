var React = require("react");

var TextField = require('material-ui/lib/text-field')
var RaisedButton = require("material-ui/lib/raised-button");
var Dialog = require("material-ui/lib/dialog");
var FlatButton = require("material-ui/lib/flat-button");
var LinearProgress = require('material-ui/lib/linear-progress');
var Snackbar = require("material-ui/lib/snackbar");
var DropDownMenu = require('material-ui/lib/DropDownMenu')
var MenuItem = require('material-ui/lib/menus/menu-item')


var styles = require("./../styles.js")

var topObj = require("../data/documents/document_0000")

var readyToGo = false // todo need to refactor
var ResultPage = React.createClass({
    getInitialState: function() {
        return {
            name: ""
        }
    },
    componentWillMount:function(){
        
    },
    render: function() {
        console.log(this.props.data)
        console.log(this.props.answersObj)
        var self = this
        var filename = '/documentsOutput/'+this.props.filename + '.doc'
        return (
            <div>
                 <a style={styles.downloadButton}   href={filename}
                     download={filename}>download</a>
            </div>
        )
    }
})

module.exports = ResultPage
