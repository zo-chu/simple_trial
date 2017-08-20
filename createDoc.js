var fs = require('graceful-fs');
var xml2js = require('xml2js');
        
module.exports = {
    _readXmltoJsonStr:function(template, cb){
        var filepath = __dirname + '/app/data/documentsToRead/'+ template +'.xml'
        
        var parser = new xml2js.Parser();
        fs.readFile(filepath, function(err, data) {
          if(err) {
              console.log(err)
              return cb(err)
          }
            parser.parseString(data, function (err, result) {
                if(err){
                    console.log(err)
                    return cb(err)
                }
                var j = JSON.stringify(result)
                cb(null, j)
            });
        });
    },
    _replaceWithAnswers:function(data, answersObj){
        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), " " + replace + " ");
        }
        var newData = data
        for (var prop in answersObj) {
            // let looseIt = JSON.parse(prop)
            var s = "//_!" + prop
            // s+= looseIt
            console.log(s)
            var where = newData.indexOf(s)
            
            if(where > -1){
                var str = newData.substring(where, where+7)
                newData = replaceAll(newData, str, answersObj[prop])
            }
        }
        
        return newData
    },
    _createDoc:function(data, cb){
        var builder = new xml2js.Builder();
        var json = JSON.parse(data)
        var xml = builder.buildObject(json);
        var filename = new Date().getTime();
        
        fs.writeFile(__dirname +'/public/documentsOutput/'+ filename +'.doc', xml , { flag: 'wx' }, function(err) {
                    if(err) {
                        return cb(err)
                    }
                    cb(null, filename)
                    console.log("Saved xml! " + filename );
              }); 
    },
    create: function(docNumber, answersObj, callback) {
        console.log("doc num" , docNumber)
        console.log("answers", answersObj)

        // var ans = {}
        
        // for (var i in answersObj){
        //     for (var n in quest){
        //         if(quest[n] == i){
        //             var t = '"'+ n + '"'
        //             ans[t] = answersObj[i]
        //             break
        //         }
        //     }
        // }
        // console.log(ans)
        // answersObj = ans
        var self  = this
        var template = '0000'
        this._readXmltoJsonStr(template, function(err, data){
             if (err) return callback(err)
                
            var newData = self._replaceWithAnswers(data, answersObj)
            
            self._createDoc(newData, function(err, filename){
                if (err)
                    return callback(err)
                else return callback(null, filename)
            })
        })
    }
}
