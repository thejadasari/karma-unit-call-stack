var __cov_unit_call_stack_global = Function('return this')();

if (!__cov_unit_call_stack_global.__coverage__) {
    __cov_unit_call_stack_global.__coverage__ = {};
}

var __unit_call_stack_file = null;
var __unit_call_stack_name = null;
function __registerSpecsListner__(name, file){
    __cov_unit_call_stack_global.__coverage__[file] = __cov_unit_call_stack_global.__coverage__[file] || {};
    __cov_unit_call_stack_global.__coverage__[file].__unit_call_stack__ = __cov_unit_call_stack_global.__coverage__[file].__unit_call_stack__ || {};
    var temp = __cov_unit_call_stack_global.__coverage__[file].__unit_call_stack__;
    temp[name] = temp[name] || [];

    __unit_call_stack_file = file;
    __unit_call_stack_name = name;
}

function __registerUnitsListner__(name){
    __cov_unit_call_stack_global.__coverage__[__unit_call_stack_file].__unit_call_stack__[__unit_call_stack_name].push(name);
}