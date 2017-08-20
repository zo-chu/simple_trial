var React = require("react");

var TextField = require('material-ui/lib/text-field')
var RaisedButton = require("material-ui/lib/raised-button");

var styles = require("./../styles.js")

var topObj = require("../data/detales/detales_0000")
var topObjVals = require("../data/form_questions")

var ThirdPage = React.createClass({
    getInitialState: function() {
        return {
            questionsArr:[],
            answersArr:[],
            readyToGo: false,
            answersObj:{}
        }
    },
    componentWillMount:function(){
        var questionsArr = []
        var indexes = this.props.data
        var tempStr = ""
        for(var num in indexes) {
            tempStr += indexes[num]
            if(topObj[tempStr]){
                questionsArr = questionsArr.concat(topObj[tempStr])
            }
        }
        this.setState({questionsArr:questionsArr})
        
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
        var answersObj = this.state.answersObj
        var areEmpty = false
        var counter = 0
        for (var prop in answersObj) {
            counter++
            if(answersObj[prop].length == 0) areEmpty = true
        }
        if(!areEmpty){
            var answArr = []
            for (var i in  this.state.questionsArr) {
                var temp = this.state.questionsArr[i]
                var answ = this.state.answersObj[temp]
                answArr.push(answ)
            }
                this.props.turnPage(4, null , this.state.answersObj, answArr)
        }else{
            console.log("empty")
        }
        
    },
    fieldChanged:function( indexOfField, key,  event){
          console.log(key, event.target.value)
          var temp = this.state.answersObj
          temp[key] = event.target.value
          this.setState({answersObj:temp})
    },
    addTextField: function(key, indexOfField) {
        var theKey = topObjVals[key]
        return (<TextField style={styles.dropDown} defaultValue="test" onChange={this.fieldChanged.bind(this, indexOfField, key)} textareaStyle={styles.textField} hintText={theKey} key= {indexOfField}/>)
    },
    render: function() {
        var self = this
        
        return (
            <div>
                {this.state.questionsArr.map(function (m, index) {
                return (
                        self.addTextField(self.state.questionsArr[index], index)
                )}
                )}
                <RaisedButton label="Next" onTouchTap= {this.goToNextPage}/>
            </div>
        )
    }
})

module.exports = ThirdPage;
