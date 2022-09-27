module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: ['next', 'turbo', 'prettier', 'standard'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
        'react/jsx-key': 'off',
        indent: ['error', 4],
        'space-before-function-paren': ['error', 'never']
    }
}
