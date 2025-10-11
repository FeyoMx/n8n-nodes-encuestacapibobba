/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'n8n-nodes-base'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:n8n-nodes-base/community',
    ],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'n8n-workflow',
                        message: "Please import from 'n8n-workflow' instead.",
                    },
                ],
            },
        ],
    },
};