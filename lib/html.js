var HandleBars = require('handlebars').create();
var fs = require('fs');
var wstream = fs.createWriteStream('unit_call_stack_report.html');
var functionReportTemplate = HandleBars.compile('<div><h5>{{_key_}}</h5><ul>{{#each functions}}<li>{{this}}</li>{{/each}}</ul></div>');

var fileNameTempalte = HandleBars.compile('<h4>{{file}}</h4>');

function generateReport(report) {
    Object.keys(report).forEach(function(key) {
        var fileReport = report[key];
        console.log(JSON.stringify(fileReport));
        if(fileReport.__unit_call_stack__){
            wstream.write(fileNameTempalte({'file': key}));
            var callStack = fileReport.__unit_call_stack__;
            Object.keys(callStack).forEach(function(_key_) {
                var report = functionReportTemplate({
                        '_key_': _key_,
                        'functions': callStack[_key_]
                    });
                wstream.write(report);
            });
        }
    });
    wstream.end();
}

module.exports = generateReport