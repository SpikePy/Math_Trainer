// GLOBAL VARIABLES
questionType_random = 0

min                = 0
max                = 0
number_1           = 0
number_2           = 0
question_answer    = 0
answer_wrong_count = 0

probability_multiplicationTable = 0
probability_squaredNumbersSmall = 0
probability_squaredNumbersBig   = 0


function generateQuestion() {
    // Parse slider values from HTML part (strings) to int
    input_multiplicationTable_int = parseInt(input_multiplicationTable.value, 10)
    input_squaredNumbersSmall_int = parseInt(input_squaredNumbersSmall.value, 10)
    input_squaredNumbersBig_int   = parseInt(input_squaredNumbersBig.value  , 10)

    input_sum = input_multiplicationTable_int + input_squaredNumbersSmall_int + input_squaredNumbersBig_int

    // If all sliders are set to 0 treat them as if probability was evenly spread
    if (input_sum == 0 ) {
      input_multiplicationTable_int = 1
      input_squaredNumbersSmall_int = 1
      input_squaredNumbersBig_int   = 1
      input_sum = 3
    }

    // Calculate probabilities of question types
    probability_multiplicationTable = input_multiplicationTable_int / input_sum
    probability_squaredNumbersSmall = input_squaredNumbersSmall_int / input_sum
    probability_squaredNumbersBig   = input_squaredNumbersBig_int   / input_sum

    probability_multiplicationTable_td.innerText = Math.round(probability_multiplicationTable * 100) +"%"
    propability_squaredNumbersSmall_td.innerText = Math.round(probability_squaredNumbersSmall * 100) +"%"
    propability_squaredNumbersBig_td.innerText   = Math.round(probability_squaredNumbersBig   * 100) +"%"

    // console.log(input_multiplicationTable.value)
    // console.log("probability_multiplicationTable: " +probability_multiplicationTable )
    // console.log("probability_squaredNumbersSmall: " +probability_squaredNumbersSmall )
    // console.log("probability_squaredNumbersBig: "   +probability_squaredNumbersBig )
    // console.log("")

    answer.value = ""

    questionType_random = Math.random()
    if (questionType_random < probability_multiplicationTable) {
        // console.log("multiplicationTable: " +probability_multiplicationTable)
        min = 0
        max = 10
        number_1 = min + Math.round( Math.random() * (max-min) )
        number_2 = min + Math.round( Math.random() * (max-min) )
        question.value  = "" +number_1 +" × " +number_2 +" = "
        question_answer = number_1 * number_2
    }
    else if (questionType_random >= 1 - probability_squaredNumbersBig) {
        // console.log("squaredNumbersBig: " +probability_squaredNumbersBig)
        min = 10
        max = 20
        number_1 = min + Math.round( Math.random() * (max-min) )
        question.value = "" +number_1 +"² = "
        question_answer = number_1 ** 2
    }
    else {
        // console.log("squaredNumbersSmall: " +probability_squaredNumbersSmall)
        min = 0
        max = 10
        number_1 = min + Math.round( Math.random() * (max-min) )
        question.value = "" +number_1 +"² = "
        question_answer = number_1 ** 2
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
          answer_wrong_count = 0
          console.log('   Your Answer = ' +answer.value +"\t✔")
          console.log()
          generateQuestion()
        }
        else {
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
