const dataValuesEl = document.querySelector(".data-values")
const sampleSize = document.querySelector(".sample-Size")
const samplesBtn = document.querySelector(".btn-Enter-samples")
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
function enterSampleData() {

	sum = 0,
	mean = 0,
	range = 0,
	standardDeviation = 0;
	let Length = sampleSize.value * 1;

	cleanUpHTML();
	dataValuesArray = newArray(dataValuesArray);
	inputIndexes = newArray(inputIndexes);

	for (let i = 0; i < Length; i++) {
		sampleName = `sample-${i + 1}`
		inputIndexes[i] = `${sampleName}`
		dataValuesEl.innerHTML += createInputEl(i)	
	}
}

function createInputEl(i) {
	let _s = `
	<input type="number" class="inputEl" 
		 name =${inputIndexes[i]} placeholder="value" />`
	return _s;
}

function cleanUpHTML() {
	document.querySelector(".p--data").innerText = "data: "
	dataValuesEl.innerHTML = ""
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
	/*let _sum = _array.reduce((acc,num) =>{
		acc + num
	}, 0);*/

	let _sum = 0; _array.forEach( num => _sum += num );
	return _sum
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
	const newArray = arrangeElements(_definedValues)
	// OR _definedValues.slice().sort( (a,b) => a > b ? 1 : -1)
	const lastEl = newArray.length - 1;
	let _range = newArray[lastEl] - newArray[0];
	return _range;
}

function displayOutput() {
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
