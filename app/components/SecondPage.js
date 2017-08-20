var React = require("react");

var RaisedButton = require("material-ui/lib/raised-button");
var DropDownMenu = require('material-ui/lib/DropDownMenu')
var MenuItem = require('material-ui/lib/menus/menu-item')

var styles = require("./../styles.js")

var topObj = require("../data/documents/document_0000")

var readyToGo = false // todo need to refactor
var SecondPage = React.createClass({
    getInitialState: function() {
        return {
            amountOfDropDowns: [0],
            readyToGo: false,
            data: [],
            name: ""
        }
    },
    componentWillMount:function(){
        var prop = this.props.data.join("")
        var data = topObj[prop]
        var name = 'wat'
        for (var prop in data) {
            name = prop
        }
        data = data[name]
        this.setState({name: name, data:data})
        
    },
    handlefirstChange(indexOfDropDown, event, index) {
        //if there are more add a dropDown
        var arr = this.state.amountOfDropDowns

        arr[indexOfDropDown] = index
        arr = arr.slice(0, indexOfDropDown+1)
        arr.push(0)
   
        this.setState({
            amountOfDropDowns: arr
        })

    },
    getArrOfObj: function(indexOfDropDown) {
        
        var initialData = this.state.data
        
        //prepare array with the order of existing dropdown picks
        var indexesOfPicked = []
        for (var i = 0; i < indexOfDropDown; i++) {
            indexesOfPicked.push(this.state.amountOfDropDowns[i])
        }
        
        var arrayOfObjects = initialData
        
        for (var index in indexesOfPicked) {
            var nowDropDownDataObj = arrayOfObjects[indexesOfPicked[index]]
            
            if(typeof(nowDropDownDataObj) == "string" || nowDropDownDataObj instanceof String){
                return false
            }
            // get array of this object
             for (var prop in nowDropDownDataObj) {
                arrayOfObjects = nowDropDownDataObj[prop]
            }
        }
       
        return arrayOfObjects
    },
    goToNextPage:function(){
        this.props.turnPage(3, this.state.amountOfDropDowns)
    },
    addDropDown: function(value, indexOfDropDown) {
        
        var data = this.getArrOfObj(indexOfDropDown)
        
        if(data == false){
            readyToGo = true
            return
        }
        readyToGo = false
        
        var theData = []
        for (var prop in data) {

            //check if last 
            if (typeof data[prop] === "object") {
                for (var innerProp in data[prop]) {
                    theData.push(innerProp)
                }
            }
            else {
                theData.push(data[prop])
            }
        }
        return (<DropDownMenu style={styles.dropDown} value={value} onChange={this.handlefirstChange.bind(this, indexOfDropDown)} key={indexOfDropDown}>
                {theData.map(function (m, index) {
                return (
                    <MenuItem key = {index} value={index} label={m} primaryText={m} />
                )}
                )}
        </DropDownMenu>)
    },
    render: function() {
        var self = this
        var button = readyToGo ? <RaisedButton label="Next" onTouchTap= {this.goToNextPage}/> : null
        return (
            <div>
                {this.state.amountOfDropDowns.map(function (m, index) {
                return (
                        self.addDropDown(self.state.amountOfDropDowns[index], index)
                )}
                )}
                {button}
            </div>
        )
    }
})

module.exports = SecondPage;
