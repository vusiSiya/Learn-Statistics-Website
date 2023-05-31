const dataSamples = document.querySelector(".samples")
const sampleSize = document.querySelector(".sample-Size")
const samplesBtn = document.querySelector(".btn-Enter-samples")
let inputIndexes = []
let dataValuesArray = []
let sampleName
let isChanged = false;
let sum = 0, mean = 0, range = 0, standardDeviation = 0;


samplesBtn.addEventListener("click", ()=>{
	isChanged = true;
	enterSamples()
})

document.addEventListener("change", (e) => {
	if (e.target.className=== "inputEl"){
		return  handleValueChange(e)
	}
	else if(e.target.className=== "sample-Size"){
		return isChanged ?  enterSamples() : isChanged
	}
}) 
function enterSamples() {
	 
	sum = 0, mean = 0, range = 0, standardDeviation = 0;
	let Length = sampleSize.value * 1;
	
	cleanUpDataValuesArray() 
	
	for (let i = 0; i < Length; i++)
	{	
		sampleName = `sample-${i + 1}`
		inputIndexes[i] = `${sampleName}`
		dataSamples.innerHTML += createInputEl(i) // the function that creates the input elements 		
	}		
	//(inputIndexes.length > 0) ? clearInputIndexes() : createInputIndexes()	
}

function createInputEl(i) {
	let sInput = `
	<input type="number" class="inputEl" 
		 name =${inputIndexes[i]} placeholder="value" />`
	return sInput;
}

function cleanUpDataValuesArray() {
	document.querySelector(".p--data").innerText="data: "
	dataSamples.innerHTML = ""
	for (let k = 0; k < dataValuesArray.length; k++) {
		dataValuesArray[k] = 0;
		if ( k=== dataValuesArray.length - 1) {
			displayOutput()
		}
	}
}

function handleValueChange(event) {
	const { value, name } = event.target
	console.log(event)
	for (let i = 0; i < inputIndexes.length; i++) {
		if ( name === inputIndexes[i]) {
			dataValuesArray[i] = value * 1
		}
	}
	sum = Sum()		
	console.log(sum)
	mean = Mean(sum)
	range = Range()
	standardDeviation = StandardDeviation(mean)
	
	displayOutput() 
}

function Sum() {
	let num = 0;
	for (let i = 0; i < dataValuesArray.length; i++) {
		num += (dataValuesArray[i] ?  dataValuesArray[i] : 0 )
	}
	return num
}

function Mean(sum) {
	mean = sum / dataValuesArray.length;
	
	return mean.toFixed(2)
}

function StandardDeviation(mean) {
	let stSum = 0
	let arrayLength = dataValuesArray.length
	for (let i = 0; i < arrayLength; i++) {
		let currentValue = dataValuesArray[i]
		let difference = currentValue ? currentValue - mean : 0 
		stSum += Math.exp(difference, 2)
	}
	let n = arrayLength - 1
	let standardDeviation = Math.sqrt((stSum /n), 2)
	return standardDeviation.toFixed(2);
}

function Range() {
	let arrayLength = dataValuesArray.length 
	let smallestNum = dataValuesArray[0] ? dataValuesArray[0]: 0;
	let highestNum = dataValuesArray[0] ? dataValuesArray[0]: 0;

	for (let i = 0; i < arrayLength; i++) {
		let num = dataValuesArray[i]
		if (num <= smallestNum) {
			smallestNum = num
		}
		else if (num > highestNum) {
			highestNum = num 
		}
	}
	let range = highestNum - smallestNum
	return range
}

function  displayOutput() {
	let s_ = `
	<section class="sought-value">
		<p class="sum-El">Sum:${sum}</p>
 		<p class ="range-El">Range: ${range}</p>
		<p class ="meanEl">Mean: ${mean}</p>
		<p class ="standardDeviationEl">
			Standard deviation: ${standardDeviation}
		</p>
	</section>
		`		
	document.querySelector(".output").innerHTML = s_
}