module.exports = function (api) {
    api.cache(false)


    return {
        plugins: ['macros', '@babel/plugin-syntax-jsx'],
        presets: [
            '@babel/preset-react'
        ]
    }
}