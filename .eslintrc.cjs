module.exports = {
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-function-return-type": "error",
		"no-async-promise-executor": "off",
		"no-useless-catch": "off"
	},
	parser: "@typescript-eslint/parser",
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	plugins: ["@typescript-eslint"],
	env: {
		node: true
	}
};
