var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');

var fs = require('fs');

var fn_specsListner = '__registerSpecsListner__();';
var fn_unitsListner = '__registerUnitsListner__();';
var parsed_fn_specsListner = esprima.parse(fn_specsListner);
var parsed_fn_unitsListner = esprima.parse(fn_unitsListner);

var reportHolder = fs.readFileSync(require('path').resolve(__dirname,'reportHolder.js'), 'utf8');

function updatedNode(node, parent, file) {
    var argumentObj = getFunctionName(node, parent);
    if(argumentObj.value){
        var _token = {};
        var fileName = file.originalPath.split('/').join('\\');
        var fileObj = {
            "type": "Literal",
            "value": fileName,
            "raw": '"\"'+fileName+'\""'
        };
        if(parent.type === 'CallExpression' && ['it', 'fit', 'iit'].indexOf(parent.callee.name) != -1){
            var _token = JSON.parse(JSON.stringify(parsed_fn_specsListner.body[0]));
        }else{
            var _token = JSON.parse(JSON.stringify(parsed_fn_unitsListner.body[0]));
        }
        _token.expression.arguments = [argumentObj, fileObj];
        return node.body.body.splice(0, 0, _token);
    }
}

function getFunctionName(node, parent) {
    var name = '';
    var argument = null;
    if(node.type === 'FunctionDeclaration'){
        name = node.id.name;
    }else{
        if(parent.type === 'VariableDeclarator'){
            name = parent.id.name;
        }else if(parent.type === 'AssignmentExpression'){
            name = parent.left.property.name;
        }else if(parent.type === 'Property'){
            name = parent.key.name;
        }else if(parent.type === 'CallExpression' && ['it', 'fit', 'iit'].indexOf(parent.callee.name) != -1){
            argument = parent.arguments[0];
        }
    }
    return argument ? argument: {
        "type": "Literal",
        "value": name,
        "raw": '"\"'+name+'\""'
    };
}

var createUnitCallStackPreprocessor = function(logger) {

    var log = logger.create('preprocessor.unitTestInstrumenter');

    return function(content, file, done){
        log.debug('Processing "%s".', file.originalPath);
        try{
            var parsedObject = esprima.parse(content);
            estraverse.traverse(parsedObject, {
                enter: function (node, parent) {
                    if(node.type === 'FunctionExpression' || node.type === "FunctionDeclaration"){
                        return updatedNode(node, parent, file);
                    }
                }
            });
            var code = escodegen.generate(parsedObject);
            if(reportHolder){
                code += reportHolder;
                reportHolder = null;
            }
            done(null, code);
        }catch(e){
            done(e, null);
        }

    }
}

createUnitCallStackPreprocessor.$inject = ['logger'];

module.exports = createUnitCallStackPreprocessor;