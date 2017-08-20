var React = require("react");

var RaisedButton = require("material-ui/lib/raised-button");

var DropDownMenu = require('material-ui/lib/DropDownMenu')
var MenuItem = require('material-ui/lib/menus/menu-item')
var topArr = require('../data/types_of_documents')

var styles = require("./../styles.js")

var readyToGo = false // todo need to refactor
var FirstPage = React.createClass({
    getInitialState: function() {
        return {
            amountOfDropDowns: [0],
            readyToGo: false
        }
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
        
        var initialData = topArr
        
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
        this.props.turnPage(2, this.state.amountOfDropDowns.slice(0, this.state.amountOfDropDowns.length-1 ))
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
                 <RaisedButton label="Test first" onTouchTap= {this.testFirst}/>
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

module.exports = FirstPage;
