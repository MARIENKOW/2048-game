import help from './heplfulScripts';

const startInfo={
   startArray:help.emptyArr,
   startScore:0,
   bestScore:+localStorage.getItem('bestScore')
}

const data = JSON.parse(localStorage.getItem('data'));
const score = localStorage.getItem('startScore');

const empty = help.takeEmpty(data);

if (empty && empty.length !== 0 & empty.length !== 16) {
   startInfo.startArray = data;
   startInfo.startScore = +score;
}


export default startInfo