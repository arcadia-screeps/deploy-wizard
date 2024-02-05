module.exports = {
    root: true,
    "env": {
        "es2022": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "ecmaFeatures": {
            jsx: true
        },
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
        "project": ["tsconfig.lint.json"]
    },
    "plugins": [
        "@typescript-eslint",
    ],
    "rules": {
        "no-unused-vars": "off",
        "quotes": ["warn", "double"],
        "semi": ["warn", "always"],
        "semi-spacing": ["warn", {
            "before": true,
            "after": false
        }],
        "comma-dangle": ["warn", "always-multiline"],
        "brace-style": ["warn", "1tbs", {
            allowSingleLine: true
        }],
        "no-constant-condition": "warn",
        "arrow-parens": ["warn", "always"],
        "arrow-body-style": ["warn", "as-needed", {
            "requireReturnForObjectLiteral": false
        }],
        "function-call-argument-newline": ["warn", "consistent"],
        "object-property-newline": ["warn", {
            allowAllPropertiesOnSameLine: true
        }],
        "prefer-const": "warn",
        // @typescript-eslint/recommend rules
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-interface": "off",
        // 类的字面量属性必须声明为readonly字段
        "@typescript-eslint/class-literal-property-style": ["warn", "fields"],
        // 实例化泛型类时，必须在类名后显式声明范型
        "@typescript-eslint/consistent-generic-constructors": ["warn", "constructor"],
        "@typescript-eslint/consistent-indexed-object-style": "off",
        // 使用as进行类型转换，并且不允许对object字面量进行as类型转换，除非as const或as any
        "@typescript-eslint/consistent-type-assertions": ["warn"],
        // 限定使用interface声明对象类型声明
        "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
        // 导出类型声明时必须加上关键字type
        "@typescript-eslint/consistent-type-exports": ["warn", {
            fixMixedExportsWithInlineTypeSpecifier: true
        }],
        // 导入类型声明时必须加上关键字type
        "@typescript-eslint/consistent-type-imports": "off",
        // 必须显式声明函数返回类型
        "@typescript-eslint/explicit-function-return-type": ["off", {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false,
            allowedNames: []
        }],
        // 必须显示声明成员变量的可访问性
        "@typescript-eslint/explicit-member-accessibility": "warn",
        // 必须显式声明模块导出中所有的类型
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        // 声明对象方法时，尽量使用method shorthand syntax
        "@typescript-eslint/method-signature-style": ["warn", "property"],
        // 禁止对没有重写toString()方法的对象调用toString()方法
        "@typescript-eslint/no-base-to-string": "warn",
        // 禁止"！ =="这种有歧义的代码
        "@typescript-eslint/no-confusing-non-null-assertion": "warn",
        // 禁止将void返回值进行赋值
        "@typescript-eslint/no-confusing-void-expression": [
            "warn", {
                "ignoreVoidOperator": true
            }],
        // 禁止重复枚举
        "@typescript-eslint/no-duplicate-enum-values": "warn",
        // 避免显式声明为any类型
        "@typescript-eslint/no-explicit-any": "warn",
        // 禁止使用错误地多次使用！运算符
        "@typescript-eslint/no-extra-non-null-assertion": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        // 避免只有静态方法或构造函数地类。推荐将静态方法提升到类外
        "@typescript-eslint/no-extraneous-class": "warn",
        // 禁止对数组进行for-in操作
        "@typescript-eslint/no-for-in-array": "warn",
        // 禁止对ts能进行类型自动推断的简单类型进行声明
        "@typescript-eslint/no-inferrable-types": ["warn", {
            ignoreParameters: true,
            // 允许函数使用缺省值
            ignoreProperties: true // 允许成员变量使用缺省值
        }],

        // 禁止void在函数返回值外的其他地方进行声明
        "@typescript-eslint/no-invalid-void-type": ["warn", {
            allowInGenericTypeArguments: true,
            allowAsThisParameter: true
        }],
        // 允许使用void表示丢弃一个值不使用
        "@typescript-eslint/no-meaningless-void-operator": "off",
        // 避免使用new关键字表示声明一个构造函数
        "@typescript-eslint/no-misused-new": "warn",
        // 禁止将this赋值给其他变量
        "@typescript-eslint/no-this-alias": "warn",
        // 禁止使用类型别名
        "@typescript-eslint/no-type-alias": "off",
        // 避免不必要的条件表达式
        "@typescript-eslint/no-unnecessary-condition": "warn",
        // 类型参数已有缺省值，避免不必要地重新传入相同类型
        "@typescript-eslint/no-unnecessary-type-arguments": "warn",
        // 禁止不安全的any类型
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "warn",
        // 禁止声明同名class与interface，因为ts会合并二者接口，可能导致运行时错误
        "@typescript-eslint/no-unsafe-declaration-merging": "warn",
        // 避免出现 export{}且没有其他顶层export
        "@typescript-eslint/no-useless-empty-export": "warn",
        // 对可能的空值，推荐使用!而非as
        "@typescript-eslint/non-nullable-type-assertion-style": "warn",
        // 避免使用参数属性，即将类的成员变量与构造函数的参数同时声明
        "@typescript-eslint/parameter-properties": "off",
        // 推荐使用as const将字面量推断为字面量类型
        "@typescript-eslint/prefer-as-const": "warn",
        // 枚举类型每个属性必须显式初始化值
        "@typescript-eslint/prefer-enum-initializers": "warn",
        // 如果除了做下标外不再需要i，推荐使用for-of
        "@typescript-eslint/prefer-for-of": "warn",
        // 推荐使用includes(),当includes()与indexOf()可以替代时，
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-optional-chain": "warn",
        // 推荐多使用readonly
        "@typescript-eslint/prefer-readonly": "warn",
        // "@typescript-eslint/prefer-readonly-parameter-types": ["warn",
        //     {
        //         checkParameterProperties: true,
        //         ignoreInferredTypes: true,
        //         treatMethodsAsReadonly: true,
        //     },],
        // 推荐使用reduce()函数时使用泛型
        "@typescript-eslint/prefer-reduce-type-parameter": "off",
        // 使用继承并且实现链式调用时，基类型的方法返回类型必须使用this而非基类类型
        "@typescript-eslint/prefer-return-this-type": "warn",
        // 推荐使用startsWith()与endsWith()
        "@typescript-eslint/prefer-string-starts-ends-with": "warn",
        // 使用@ts-expect-error代替@ts-ignore
        "@typescript-eslint/prefer-ts-expect-error": "warn",
        // 警告当调用数组的.sort()方法时且没有提供比较回调时
        "@typescript-eslint/require-array-sort-compare": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/sort-type-constituents": "warn",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        // 检查switch语句是否对union类型全覆盖
        "@typescript-eslint/switch-exhaustiveness-check": "warn",
        // 检查是否存在未绑定的成员方法。不使用this或将this类型声明为void的成员方法以及用lambda表达式声明的函数均为已绑定
        "@typescript-eslint/unbound-method": "warn",
        // 尽可能合并重载函数声明
        "@typescript-eslint/unified-signatures": "warn",
        // Note: you must disable the base rule as it can report incorrect warns
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "warn",
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-redundant-type-constituents": "warn"
    }
};
