const translate = require('google-translate-api-cn');
const readline = require('readline')

const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout,
	prompt: '> '
});
let target='en';

rl.prompt();
function printHelp(){
	let help='直接输入文本敲下回车进行翻译，默认目标语言为英语\n'+
	'$help 显示命令使用方法\n'+
	'$quit 退出翻译\n'+
	'$change 更改目标语言\n'+
	'$target 查看当前目标语言\n'
	console.log(help)
	//TODO
}
rl.on('line',(line)=>{

	if (line.startsWith('$')){
		line = line.substr(1)
		switch(line){
			case 'quit':
				rl.close();
				break;
			case 'help':
				printHelp();
				break;
			case 'change':
				if(target=='en')
					target='zh-CN'
				else
					target='en'
			case 'target':
				let text = '';
				if(target=='en')
					text='英语'
				else
					text = '中文'
				console.log('当前目标语言为：'+target)
		}
		rl.prompt();
	}else{
		translate(line, {to: target}).then(res => {
		    console.log(res.text);
		    //console.log(res.from.language.iso);
		    rl.prompt();
		}).catch(err => {
		    console.error(err);
		    rl.prompt();
		});
	}
}).on('close',()=>{
	console.log('谢谢使用!');
	process.exit(0);
})