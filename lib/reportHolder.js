var __unit_tests_call_order_ = {};
var __current_spec = null;
function __registerSpecsListner__(name){
    __current_spec = name;
}

function __registerUnitsListner__(name){
    __unit_tests_call_order_[__current_spec] = __unit_tests_call_order_[__current_spec] || [];
    __unit_tests_call_order_[__current_spec].push(name);
}