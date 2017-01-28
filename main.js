var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');

var fs = require('fs');
var content = fs.readFileSync('users.js', 'utf8');
var parsedObject = esprima.parse(content);
//console.log(JSON.stringify(parsedObject));
var tokenIdentifier = 'registerFunctionInvoking();'
var parsedTokenIdentifier = esprima.parse(tokenIdentifier);

estraverse.traverse(parsedObject, {
    enter: function (node, parent) {
        if(node.type === 'FunctionExpression' || node.type === "FunctionDeclaration"){
            return updatedNode(node, parent);
        }
    }
});


function updatedNode(node, parent) {
    var argumentObj = getFunctionName(node, parent);
    if(argumentObj.value){
        var _token = JSON.parse(JSON.stringify(parsedTokenIdentifier.body[0]));
        _token.expression.arguments = [argumentObj];
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
    console.log(parent.type);
    return argument ? argument: {
        "type": "Literal",
        "value": name,
        "raw": '"\"'+name+'\""'
    };
}
fs.writeFile('output.js', escodegen.generate(parsedObject), function(err) {
    if(err)
        return console.log(err)
    console.log('Done');
})