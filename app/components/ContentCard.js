var React = require("react");

var FirstPage = require("./FirstPage")
var SecondPage = require("./SecondPage")
var ThirdPage = require("./ThirdPage")
var ResultPage = require("./ResultPage")

var ContentCard = React.createClass({
    getInitialState:function(){
        return({
            nowPresent: 1,
            docIndexes: [],
            answersObj: {},
            filename: ""
        })
    },
    turnPage: function(goToPage, docIndexes, answersObj, answersArr){
        var self =  this
        if(docIndexes == null || goToPage == 4){
            var tempArr = JSON.stringify(this.state.docIndexes)
            var tempObj = JSON.stringify(answersObj)
            var options = {
             answersObj: tempObj ,
             docIndexes: tempArr,
            }
            $.get('/create', options, function(result) {
                if(result.err) return console.log(result.err)
                var filename = result.filename
                self.setState({nowPresent:goToPage, answersObj:answersObj, isSuccess: result, filename: filename })
            })
        }else{
            var newArr = this.state.docIndexes.concat(docIndexes)
            this.setState({nowPresent:goToPage, docIndexes:newArr})
        }
    },
    render:function(){
        var content = null
        if(this.state.nowPresent == 1)
            content = <FirstPage turnPage={this.turnPage}/>
        else if (this.state.nowPresent == 2)
            content = <SecondPage turnPage={this.turnPage} data={this.state.docIndexes} />
        else if (this.state.nowPresent == 3){
            content = <ThirdPage turnPage={this.turnPage} data={this.state.docIndexes}/>
        }else if(this.state.nowPresent == 4){
            content = <ResultPage filename = {this.state.filename} data={this.state.docIndexes} answersObj={this.state.answersObj}/>
        }
         return <div> 
                   {content} 
                </div>
    }
})

module.exports = ContentCard;
