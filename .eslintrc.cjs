module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "ignorePatterns": [".eslintrc.cjs"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // Note: you must disable the base rule as it can report incorrect errors
        "quotes": "off",
        "@typescript-eslint/quotes": ["error", "double"],
        "semi": "off",
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "no-type-imports"}],
        "@typescript-eslint/member-delimiter-style": [ "error", {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            },
            "singleline": {
              "delimiter": "semi",
              "requireLast": false
            },
            "multilineDetection": "brackets"
        }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "indent": "off",
        "@typescript-eslint/indent": ["error", "tab"],
        "no-tabs": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error", "stroustrup"],
        "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
        "react/react-in-jsx-scope": "off",
        "multiline-ternary": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/restrict-template-expressions": ["error", { allowAny: true }],
    }
}
