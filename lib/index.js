// Publish DI module

module.exports = {
    'preprocessor:unit-call-stack': ['factory', require('./instrumenter')],
    'reporter:unit-call-stack': ['type', require('./reporter')]
}