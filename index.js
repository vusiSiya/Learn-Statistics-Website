
const quizCards = document.querySelector(".cards");
const anotherCardBtn = document.querySelector(".btn--another-quiz");
const calculatorBtn = document.querySelector(".btn-calculator");
const inputElementsContainer = document.querySelector(".input-elements-container")
const input = document.querySelector(".sample-size")
const samplesBtn = document.querySelector(".btn-Enter-samples")

const quizData = [{
	topic: `Hypothesis Testing`,
	question: `Practical 1. Q1. A manufacturer claims that his market share is 60%.
            However a random sample of 500 customers reveals that only 275 are users of his product.
            Test the manufacturer’s claim at the 1% level of significance. `,
	answer: `HEllo World`
}, {
	topic: `Confidence Interval`,
	question: `5.	A tyre manufacturer found that the sample mean tread life of 49 radial tyres tested was 52345 km with standard deviation 12943 km. <br/>
            Construct a 99% confidence interval estimate for the true mean tread life of all radial tyres manufactured.`,
	answer: ``
}, {
	topic: 'ANOVA',
	question: `
            Complete the analysis of variance table and test whether for the difference amongst the treatment (Factor A) means and block (Factor B) means. Test at 10% significance level.           
            `,
	answer: `HEllo World`
}, {
	topic: 'Chi-Square',
	question: `Conduct a goodness of fit test at a 1% level of significance to see whether the following sample appears to have been selected from a normal distribution.
            The sample mean and sample standard deviation are 69 and 17.8237 respectively: <br/>
            50  	80  	90   	50   	55   	90   	55    	50   	70   	95
            90    	60   	85     	58   	60   	98   	62   	80	     62	    40
        `,
	answer: `HEllo World`
}, {
	topic: 'Rank Sum Test',
	question: ``,
	answer: `HEllo World`
}]
let cardIndexes = [] //quizData.map( el => Math.floor(Math.random()* quizData.length) + 1 );
console.log(cardIndexes)
let cardIsClicked = false;
let answer;
let randomIndex;
let currentCardData;
let isNewCard = false;

//modal variables
let inputIndexes = []
let dataValuesArray = []
let sampleName
let isChanged = false;
let sum = 0
  , mean = 0
  , range = 0
  , standardDeviation = 0;
const newArray = (_array) => _array.map( value => value *= 0);
const getDefinedValues = (_array) => _array.filter( num => num != null);


calculatorBtn.addEventListener("click", modalLogic)

anotherCardBtn.addEventListener("click", ()=>{
	isNewCard = true;
	const anotherCard = getCardIndex(cardIndexes);
	quizCards.innerHTML += newCard(anotherCard, randomIndex);
})

document.addEventListener("click", (e)=>{
	const {id, classList} = e.target;
	if (classList[0] === "solution") {

		let cardData = quizData[id];
		cardIsClicked = !cardIsClicked;

		if (cardIsClicked) {
			answer = cardData.answer;
		}
		let cardIndex = classList[1]
		let cardContentEl = quizCards.children[cardIndex].children[1];
		cardContentEl.innerHTML = updatedCardContent(cardData);
	}
})

initialCardsDisplay(quizData);

function initialCardsDisplay(data) {
	const cards = data.reduce((acc, quiz, i)=> acc + newCard(quiz, i),"");
	quizCards.innerHTML = cards;
}

function newCard(props, i) {
	let arrayLength = quizCards.children.length;
	let elementCount = isNewCard ? arrayLength : i;
	return `
        <div class="card " >
			<h3 class = 'card--topic' >${props.topic}</h3>
			<div class="card-content">
				<pre>Quiz Question:</pre>
				<p class='question'>
					${props.question}
				</p>
			</div>
			<button id = "${elementCount}" class="solution ${elementCount}" >See Solution</button>
        </div>`
}

function getCardIndex(_cardIndexes) {
	
	const getIndex = ()=>Math.floor(Math.random() * quizData.length);
	const checkIndex = (rndmIndex)=>{
		let isRepeated = _cardIndexes.includes(rndmIndex);
		if (isRepeated === false) {
			_cardIndexes.push(rndmIndex);
			return;
		} else {
			rndmIndex = getIndex();
			checkIndex(rndmIndex);
		}
	} 
	let rndmIndex = getIndex(); //_cardIndexes.map(num => numbers.findLast(el => el === num))
	checkIndex(rndmIndex); // chose to make the function void, to make it call itself
	randomIndex = rndmIndex; // updating the global randomIndex, to use it in other functions.
	let randomCard = quizData[rndmIndex];
	return randomCard;
}

function updatedCardContent(props) {
	return cardIsClicked ? 
		`<pre>Solution:</pre>
		<p class="answer"> ${answer}</p`
		:
		`<pre>Quiz Question:</pre>
		<p class='question'>${props.question}</p>`;

}

	// code for calculator-modal:

function modalLogic() {
	
	document.querySelector(".calculator").style.display="grid"
	displayOutput();
	samplesBtn.addEventListener("click", ()=>{
		isChanged = true;
		enterSampleData();
	})
	
	document.addEventListener("change", (e)=>{
		const {className} = e.target;
		if (className === "inputEl") {
			handleValueChange(e);
		} else if (className === "sample-Size") {
			isChanged ? enterSampleData() : isChanged;
		}
	})	
}

function enterSampleData() {

	sum = 0,
	mean = 0,
	range = 0,
	standardDeviation = 0;
	let sampleSize = input.value * 1;

	cleanUpHTML();
	dataValuesArray = newArray(dataValuesArray);
	inputIndexes = newArray(inputIndexes);

	for (let i = 0; i < sampleSize; i++) {
		sampleName = `sample-${i + 1}`
		inputIndexes[i] = `${sampleName}`
		inputElementsContainer.innerHTML += createInputEl(i)	
	}
}

function createInputEl(i) {
	let _s = `
	<input type="number" class="inputEl" 
		 name =${inputIndexes[i]} placeholder="value" />`
	return _s;
}

function cleanUpHTML() {
	inputElementsContainer.innerHTML = ""
	displayOutput()
}

function handleValueChange(event) {
	const {value, name} = event.target;
	//let isWantedValue = inputIndexes.includes(name);
	inputIndexes.forEach((string,i) =>{
		if (string === name) {
			dataValuesArray[i] = value * 1;
		}
	})
	const definedValues = getDefinedValues(dataValuesArray)
	sum = Sum(definedValues);
	mean = Mean(sum, definedValues)
	range = Range(definedValues);
	standardDeviation = StandardDeviation(mean, definedValues);
	displayOutput();
}

function Sum(_array) {
	let sum = _array.reduce((acc,num) =>{
		return acc + (num * 1);
	}, 0);
	return sum
}

function Mean(_sum, _definedValues) {
	let _mean = _sum / _definedValues.length;
	return _mean.toFixed(2)
}

function StandardDeviation(_mean, _definedValues) {
	const _array = _definedValues.map( number => Math.pow(number - _mean, 2));
	const _sum = Sum(_array);
	let N = _array.length - 1;
	let standardDeviation = Math.sqrt( (_sum / N), 2);
	return standardDeviation.toFixed(2);
}

function Range(_definedValues) {
	const arrangeElements = (_array)=>{
		let smallestNum = _array[0];
		let highestNum = _array[0];
		const nArray = []
		_array.map( num =>{
			if (num < highestNum) {
				nArray.unshift(num);
				smallestNum = num
			} else {
				nArray.push(num);
				highestNum = num
			}
		})
		return nArray
	}
	const newArray = arrangeElements(_definedValues)// OR  _definedValues.slice().sort( (a,b) => a > b ? 1 : -1)
	const lastEl = newArray.length - 1;
	let _range = newArray[lastEl] - newArray[0];
	return _range;
}

function displayOutput() {
	let s_ = `
		<p>Sum:${sum}</p>
		<p>Mean: ${mean}</p>
  		<p>Standard Dev: ${standardDeviation}</p>
		<p>Range: ${range}</p>
		`
	document.querySelector(".output").innerHTML = s_
}