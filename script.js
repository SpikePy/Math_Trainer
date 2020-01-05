// GLOBAL VARIABLES
question_answer    = 0
answer_false_count = 0
answer_true_count  = 0

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
            td_question.innerHTML  = `<math><msub><mi>s</mi><mi>d</mi></msub><mo>(</mo><mn>${number_1}<mo>)</mo></mn><mo>=</mo></math>`
            question_answer = number_1.toString().split('').map(Number).reduce((sum, el) => sum + el)
            break;

        // If random number implies _multiplication table_
        case questionType_random < probability_digitSum
                                 + probability_multiplicationTable:
            min = 0
            max = 10
            number_1 = min + Math.round( Math.random() * (max-min) )
            number_2 = min + Math.round( Math.random() * (max-min) )
            td_question.innerHTML  = `<math><mn>${number_1}</mn><mo>*</mo><mn>${number_2}</mn><mo>=</mo></math>`
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
              td_question.innerHTML = `<math><msup><mn>${number_1}</mn><mn>2</mn></msup><mo>=</mo></math>`
              question_answer = number_1 ** 2
            }
            else {
              td_question.innerHTML = `<math><msqrt><mn>${number_1 ** 2}</mn></msqrt><mo>=</mo></math>`
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
              td_question.innerHTML = `<math><msup><mn>${number_1}</mn><mn>2</mn></msup><mo>=</mo></math>`
              question_answer = number_1 ** 2
            }
            else {
              td_question.innerHTML = `<math><msqrt><mn>${number_1 ** 2}</mn></msqrt><mo>=</mo></math>`
              question_answer = number_1
            }
            break;

        default:
            alert("Something went wrong: random-question-type was outside of question-range");
    }
}

function check() {
    if( answer.value != '' && (event.key === 'Enter' || event.key === 'Control' || event.key === 'Shift') ) {
        // Log the correct answer to the console
        if (answer_false_count == 0) {
          console.log("Correct Answer = " +question_answer)
        }

        if (answer.value == question_answer) {
            // Alternate between classes (and therefore animations) to allow repeated effects of answer-true/-false
            if (answer.classList == "answer-true-1") {answer.classList = "answer-true-2"}
            else                                     {answer.classList = "answer-true-1"}
            td_question.title = ""
            console.log(`   Your Answer = ${answer.value} \t✔`)
            console.log()
            history_newEntry("true")
            generateQuestion()

            answer.title = `Streak: ${++answer_true_count}`
            answer_false_count = 0
        }
        else {
            // Alternate between classes (and therefore animations) to allow repeated effects of answer-true/-false
            if (answer.classList == "answer-false-1") {answer.classList = "answer-false-2"}
            else                                      {answer.classList = "answer-false-1"}
            td_question.title = question_answer
            console.log(`   Your Answer = ${answer.value} \t🗙`)
            history_newEntry("false")

            answer.title = `Streak: ${answer_true_count = 0}`
            answer_false_count++
        }
        answer.value = ""
    }
}

function history_newEntry(check_result_bool) {
    history_node = document.createElement("li")
    history_node.innerHTML = `<${check_result_bool}>${td_question.innerHTML.substring(0,td_question.innerHTML.length - 7)}<mn>${answer.value}</mn></math>\t</${check_result_bool}>`

    var position = document.getElementById("div_history_items")
    position.insertBefore(history_node, position.childNodes[0])
}

function history_show() {
    answer.classList = ""

    // img_logo.className          = "hidden"
    div_description.className   = "hidden"
    btn_history_show.className  = "hidden"
    btn_history_hide.className  = ""
    div_history_items.className = ""
    div_setup.className         = "hidden"
    div_main.className          = "hidden"
}

function history_hide() {
    answer.classList = ""

    // img_logo.className          = ""
    div_description.className   = ""
    btn_history_show.className  = ""
    btn_history_hide.className  = "hidden"
    div_history_items.className = "hidden"
    div_setup.className         = ""
    div_main.className          = ""
}
