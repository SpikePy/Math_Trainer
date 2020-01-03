// GLOBAL VARIABLES
question_answer    = 0
answer_wrong_count = 0

function generateQuestion() {
    // Parse slider values from HTML part (strings) to int
    input_digitSum_int            = parseInt(input_digitSum.value  , 10)
    input_multiplicationTable_int = parseInt(input_multiplicationTable.value, 10)
    input_squaredNumbersSmall_int = parseInt(input_squaredNumbersSmall.value, 10)
    input_squaredNumbersBig_int   = parseInt(input_squaredNumbersBig.value  , 10)

    input_sum = input_digitSum_int + input_multiplicationTable_int + input_squaredNumbersSmall_int + input_squaredNumbersBig_int

    // If all sliders are set to 0 treat them as if probability was evenly spread
    if (input_sum == 0 ) {
      input_digitSum_int            = 1
      input_multiplicationTable_int = 1
      input_squaredNumbersSmall_int = 1
      input_squaredNumbersBig_int   = 1
      input_sum = 4
    }

    // Calculate probabilities of question types
    probability_digitSum            = input_digitSum_int            / input_sum
    probability_multiplicationTable = input_multiplicationTable_int / input_sum
    probability_squaredNumbersSmall = input_squaredNumbersSmall_int / input_sum
    probability_squaredNumbersBig   = input_squaredNumbersBig_int   / input_sum

    propability_digitSum_td.innerHTML            = Math.round(probability_digitSum            * 100) +"&nbsp;%"
    probability_multiplicationTable_td.innerHTML = Math.round(probability_multiplicationTable * 100) +"&nbsp;%"
    propability_squaredNumbersSmall_td.innerHTML = Math.round(probability_squaredNumbersSmall * 100) +"&nbsp;%"
    propability_squaredNumbersBig_td.innerHTML   = Math.round(probability_squaredNumbersBig   * 100) +"&nbsp;%"

    // console.log(input_multiplicationTable.value)
    // console.log("probability_multiplicationTable: " +probability_multiplicationTable )
    // console.log("probability_squaredNumbersSmall: " +probability_squaredNumbersSmall )
    // console.log("probability_squaredNumbersBig: "   +probability_squaredNumbersBig )
    // console.log("")

    answer.value = ""

    questionType_random = Math.random()
    switch (true) {
        // If random number implies _digit sum_
        case questionType_random < probability_digitSum:
            min = 0
            max = 9999
            number_1 = min + Math.round( Math.random() * (max-min) )
            question.innerHTML  = `<math><msub><mi>ds</mi><mn>10</mn></msub><mo>(</mo><mn>${number_1}<mo>)</mo></mn><mo>=</mo></math>`
            question_answer = number_1.toString().split('').map(Number).reduce((sum, el) => sum + el)
            break;

        // If random number implies _multiplication table_
        case questionType_random < probability_digitSum
                                 + probability_multiplicationTable:
            min = 0
            max = 10
            number_1 = min + Math.round( Math.random() * (max-min) )
            number_2 = min + Math.round( Math.random() * (max-min) )
            question.innerHTML  = `<math><mn>${number_1}</mn><mo>*</mo><mn>${number_2}</mn><mo>=</mo></math>`
            question_answer = number_1 * number_2
            break;

        // If random number implies _small squared numbers_
        case questionType_random < probability_digitSum
                                 + probability_multiplicationTable
                                 + probability_squaredNumbersSmall:

            min = 0
            max = 10
            number_1 = min + Math.round( Math.random() * (max-min) )

            if (Math.random() < 0.5) {
              question.innerHTML = `<math><msup><mn>${number_1}</mn><mn>2</mn></msup><mo>=</mo></math>`
              question_answer = number_1 ** 2
            }
            else {
              question.innerHTML = `<math><msqrt><mn>${number_1 ** 2}</mn></msqrt><mo>=</mo></math>`
              question_answer = number_1
            }
            break;

        // If random number implies _big squared numbers_
        case questionType_random < probability_digitSum
                                 + probability_multiplicationTable
                                 + probability_squaredNumbersSmall
                                 + probability_squaredNumbersBig:
            min = 10
            max = 20
            number_1 = min + Math.round( Math.random() * (max-min) )

            if (Math.random() < 0.5) {
              question.innerHTML = `<math><msup><mn>${number_1}</mn><mn>2</mn></msup><mo>=</mo></math>`
              question_answer = number_1 ** 2
            }
            else {
              question.innerHTML = `<math><msqrt><mn>${number_1 ** 2}</mn></msqrt><mo>=</mo></math>`
              question_answer = number_1
            }
            break;

        default:
            alert("Something went wrong: random-question-type was outside of question-range");
    }
}

function check() {
    if( answer.value != '' && (event.key === 'Enter' || event.key === 'Control' || event.key === 'Shift') ) {
        // Log the correct answer and set it as HTML title of the question
        if (answer_wrong_count == 0) {
          console.log("Correct Answer = " +question_answer)
          question.title = question_answer
        }

        // history(true)
        if (answer.value == question_answer) {
          answer.style.boxShadow="0 0"
          answer_wrong_count = 0
          console.log('   Your Answer = ' +answer.value +"\t✔")
          console.log()
          generateQuestion()
        }
        else {
          answer.style.boxShadow="0 0 5px #F00"
          answer_wrong_count++
          console.log('   Your Answer = ' +answer.value +"\t🗙")
          // history(false)
        }
        answer.value = ""
    }
}

function history(bool) {
  var history_node = document.createElement("p");
  if (bool) {
    var history_text = document.createTextNode("" +number_1 +" × " +number_2 +" = " +answer.value +" ✔")
  }
  else {
    var history_text = document.createTextNode("" +number_1 +" × " +number_2 +" = " +answer.value +" 🗙")
  }
  history_node.appendChild(history_text)
  document.body.insertBefore(history_node, history_insert)
}
