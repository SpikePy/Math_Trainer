// GLOBAL VARIABLES
var question_answer    = 0
var answer_false_count = 0
var answer_true_count  = 0

function generateQuestion() {
    switch (navigator.language) {
        case "de":
            document.getElementsByTagName('h1')[0].innerHTML   = '<img id="img_logo" src="favicon.svg">Mathe-Trainer'
            document.getElementById('p-description').innerText = 'Diese Webseite wurde erstellt um deine MAthe-Fähigkeiten zu trainieren (Quersumme, Einmaleins, kleine und große Quadratzahlen/Wurzeln).'

            document.querySelector('#div_description h2').innerHTML                    = 'Anleitung'
            document.querySelector('#div_description li:nth-child(1)').innerHTML       = 'Nutze die folgenden Schieberegler um die Aufgaben-Mix bestimmen'
            document.querySelector('#div_description li:nth-child(2)').innerHTML       = 'Geb deine Antwort in das Eingabefeld ein'
            document.querySelector('#div_description li:nth-child(3)').innerHTML       = 'Bestätige deine Eingabe mit <keyboard-key>Enter</keyboard-key>, <keyboard-key>Shift</keyboard-key> oder <keyboard-key>Strg</keyboard-key>'
            document.querySelector('#div_description ol ol li:nth-child(1)').innerHTML = 'Wenn deine Eingabe <true>korrekt</true> ist, erscheint eine neue Aufgabe'
            document.querySelector('#div_description ol ol li:nth-child(2)').innerHTML = 'Wenn deine Eingabe <false>falsch</false> ist, versuche es erneut'


            document.querySelector('#div_setup h2').innerHTML                              = 'Aufgaben-Mix'

            document.querySelector('#div_setup tr:nth-child(1) td:nth-child(1)').innerHTML = 'Quersumme'
            document.querySelector('#div_setup tr:nth-child(2) td:nth-child(1)').innerHTML = 'Einmaleins'
            document.querySelector('#div_setup tr:nth-child(3) td:nth-child(1)').innerHTML = 'Kleine Quadratzahlen/Wurzeln'
            document.querySelector('#div_setup tr:nth-child(4) td:nth-child(1)').innerHTML = 'Große Quadratzahlen/Wurzeln'

            document.querySelector('#div_main h2').innerHTML = 'Aufgabe'
            break;
    }

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

            p_streak.innerText = `Current Streak:  ${++answer_true_count}`
            answer_false_count = 0
        }
        else {
            // Alternate between classes (and therefore animations) to allow repeated effects of answer-true/-false
            if (answer.classList == "answer-false-1") {answer.classList = "answer-false-2"}
            else                                      {answer.classList = "answer-false-1"}
            td_question.title = question_answer
            console.log(`   Your Answer = ${answer.value} \t🗙`)
            history_newEntry("false")

            p_streak.innerText = `Current Streak:  ${answer_true_count = 0}`
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
    div_description.classList.add("hidden")
    div_setup.classList.add("hidden")
    div_main.classList.add("hidden")
    btn_history_show.classList.add("hidden")
    btn_history_hide.classList.remove("hidden")
    div_history.classList.remove("hidden")
}

function history_hide() {
    answer.classList = ""
    div_description.classList.remove("hidden")
    div_setup.classList.remove("hidden")
    div_main.classList.remove("hidden")
    btn_history_show.classList.remove("hidden")
    btn_history_hide.classList.add("hidden")
    div_history.classList.add("hidden")
}
