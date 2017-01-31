var htmlReporter = require('./html');
var unitCallStackReporter = function (baseReporterDecorator, helper) {
    baseReporterDecorator(this);

    this.onBrowserComplete = function (browser, report) {
        if(report && report.coverage){
            htmlReporter(report.coverage)
        }
    }

    this.onRunComplete = function (browsers, results) {
    }
}
unitCallStackReporter.$inject = [ 'baseReporterDecorator', 'helper'];
// PUBLISH
module.exports = unitCallStackReporter
