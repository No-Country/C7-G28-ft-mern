module.exports = {
    root: true,
    extends: ['custom'],
    overrides: [
        {
            files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
            rules: {
                'storybook/hierarchy-separator': 'error'
            }
        }
    ]
}
