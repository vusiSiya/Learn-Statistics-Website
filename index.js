//const displayCalculator = document.querySelector(".calculatorDisplay")

/*import {createServer} from "miragejs"*/
const quizCards = document.querySelector(".cards");
const anotherCardBtn = document.querySelector(".btn--another-quiz");
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
//let server = createServer()
//server.get("/api/users", { quizes: [quizData] })

let indexes = [0]
let cardIsClicked = false;
let answer
let randomIndex
let currentCardData
let isNewCard = false;

initialCardsDisplay();

function initialCardsDisplay() {
	quizCards.innerHTML = getCards(quizData);
}

function getCards(data) {
	let s = ""
	data.map((quiz,i)=>s += newCard(quiz, i))
	return s;
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

anotherCardBtn.addEventListener("click", ()=>{
	const anotherCard = getCardIndex(indexes);
	isNewCard = true;
	return quizCards.innerHTML += newCard(anotherCard, randomIndex);
})

function getCardIndex(_indexes) {
	
	const getIndex = ()=>Math.floor(Math.random() * quizData.length);
	let _randomIndex = getIndex();
	const check = (_randomIndex)=>{
		let isRepeated = _indexes.includes(_randomIndex);
		if (isRepeated === false) {
			_indexes.push(_randomIndex);
			return;
		} else {
			_randomIndex = getIndex();
			check(_randomIndex);
		}
	}
	check(_randomIndex);
	randomIndex = _randomIndex; // syncing the global and local randomIndex, to use the global randomIndex variable in other functions;
	let randomCard = quizData[_randomIndex];
	return randomCard;
}

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

function updatedCardContent(props) {
	let value = cardIsClicked ? `<pre>Solution:</pre>
        <p class="answer"> ${answer}</p` : `<pre>Quiz Question:</pre>
            <p class='question'>${props.question}</p>`

	return value;
}
