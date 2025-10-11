/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    extends: './.eslintrc.js',
    rules: {
        'no-restricted-imports': [
            'error',
            {
                name: 'n8n-core',
                message: "Please import from 'n8n-workflow' instead.",
            },
        ],
    },
};