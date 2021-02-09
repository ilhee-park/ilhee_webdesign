//PREVIOUS QUESTIONS 순차적으로 받은 목록
let previous_questions_lists = [];
var go_next = document.querySelector('#nextBtn');
let enter_flag = true;

//맨 처음 질문 초기화하는 로직
document.querySelector('.Question').textContent = "";

//엔터눌러서 질문 위로 올리고 답변+"공백" 얻어내는 로직
var input = document.querySelector('input');
input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13 && enter_flag == true){ //enter_flag써서 엔터한번만허용
        enter_flag = false;
        console.log(e.target.value + '입력됨!!');
        document.querySelector('.Question').textContent = e.target.value;//질문위로올리기
        document.getElementById("nextBtn").style.visibility="visible";//다음버튼 활성화
        document.querySelector('input').value = e.target.value + ' ';//답변은 질문+'공백'으로 초기화
        console.log('플래그 체크!!', enter_flag);

        //prev-question배열에 저장
        previous_questions_lists.push({
            key_num: previous_questions_lists.length + 1,
            key: e.target.value,
            value: e.target.value + ' '
        });
        console.log("previously asked questions are : ", previous_questions_lists);
    }
    else{//엔터한번만허용하게끔 예외처리
        return;
    }
})

//다음으로 버튼 클릭
go_next.addEventListener('click', () => {
    enter_flag = true;//다음버튼 눌러야 플래그 on
    console.log("go next button clicked!!");
    UpdateQuestionNumbers(previous_questions_lists); //질문번호+1
    document.querySelector('.Question').textContent = "";//올라간질문 지우기
    document.querySelector('input').value = "";//답변 지우기
    document.getElementById("nextBtn").style.visibility="hidden";//다음버튼 지우기

    appendPrevQuestions(previous_questions_lists);//PREVIOUS QUESTIONS에 이제까지 나왔던key-value추가하기
    
    var placeholder = $('#question-input').attr('placeholder');
    $('#question-input').attr('placeholder' ,'');

})
UpdateQuestionNumbers(previous_questions_lists);


function onLoadUpdateQuestionNumbers(){//질문번호 초기화
    let questionNumbers = localStorage.getItem('currentQuestionNumbers');

    if(questionNumbers){
        document.querySelector('.Question-Number').textContent = questionNumbers;
    }
}

function UpdateQuestionNumbers(previous_questions_lists){//질문번호 초기화
    let questionNumbers = localStorage.getItem('currentQuestionNumbers');
    questionNumbers = parseInt(questionNumbers);
    console.log('질문숫자확인: ' + questionNumbers)

    if(questionNumbers){
        localStorage.setItem('currentQuestionNumbers', questionNumbers + 1);
        document.querySelector('.Question-Number').textContent = questionNumbers + 1;

    } else{
        localStorage.setItem('currentQuestionNumbers', 1);
        document.querySelector('.Question-Number').textContent = 1;
    }
}
onLoadUpdateQuestionNumbers();


function appendPrevQuestions(previous_questions_lists){
    //히스토리로 가져온다.
    var list_length = previous_questions_lists.length - 1;
    var temp_key_num = previous_questions_lists[list_length].key_num;
    var temp_key = previous_questions_lists[list_length].key;
    var temp_value = previous_questions_lists[list_length].value;
    
    //새로 아래에 history div 만들기
    var make_history = document.createElement('div');
    make_history.classList.add('history');

    var key_num = document.createElement('span');
    key_num.classList.add('key_num');
    var key = document.createElement('span');
    key.classList.add('key');
    var value = document.createElement('div');
    value.classList.add('value');

    key_num.innerHTML = temp_key_num + ' ';
    key.innerHTML = temp_key
    value.innerHTML = '&nbsp' + '&nbsp' + temp_value;

    make_history.appendChild(key_num);
    make_history.appendChild(key);
    make_history.appendChild(value);
    // console.log('mh--?',make_history);

    document.getElementsByClassName('right-field')[0].appendChild(make_history);
}