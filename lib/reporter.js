var unitCallStackReporter = function (baseReporterDecorator, helper) {
    baseReporterDecorator(this);
    this.onRunStart = function () {
        console.log(0);
    }

    this.onBrowserStart = function (browser) {
        console.log(browser+ '1');
    }

    this.writeCommonMsg = function (msg) {
        console.log(browser+ '2');
    }

    this.specSuccess = function () {
        console.log('3');
        console.log(JSON.stringify(arguments));
        console.log('.................3...................');
    }

    this.onBrowserComplete = function (browser) {
        console.log(browser+ '4');
    }

    this.onRunComplete = function (browsers, results) {
        console.log(5);
        console.log(JSON.stringify(browsers));
        console.log(JSON.stringify(results));
        //console.log(__unit_tests_call_order_);
        console.log('.........................55.......................');
    }
}
unitCallStackReporter.$inject = [ 'baseReporterDecorator', 'helper'];
// PUBLISH
module.exports = unitCallStackReporter
