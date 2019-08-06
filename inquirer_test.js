/**
 type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；
 name: 存储当前问题回答的变量；
 message：问题的描述；
 default：默认值；
 choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)；
 validate：对用户的回答进行校验；
 filter：对用户的回答进行过滤处理，返回处理后的值；
 transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
 when：根据前面问题的回答，判断当前问题是否需要被回答；
 pageSize：修改某些type类型下的渲染行数；
 prefix：修改message默认前缀；
 suffix：修改message默认后缀。
 */
var inquirer = require('inquirer');
inquirer.prompt([{
    type:'confirm',
    name:'test',
    message:'Are you handsome?',
    default:true 
}]).then((answers) => {
    "use strict";
    console.log("结果为:");
    console.log(answers);
});