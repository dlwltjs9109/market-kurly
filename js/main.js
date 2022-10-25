;(($)=>{
    
    const kurly = {
        init(){
            this.memberForm();
        },
        memberForm(){
            let isIdOk = false;
            let isEmailOk = false;
            let num = 0;
            let setId = 0;
            let isHpOk = false;
            let genderVal = '';
            let choogaItem = '';

            // 1. 아이디 error 메세지
            $('#id').on({
                keyup: function(){
                    const regExp1 = /[`!@#$%\^&*()\-_=+\\\|\{\}\[\]'";:\/?.>,<]/g;  //특수문자
                    const regExp2 = /.{6,16}/g;  //6~16
                    const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g;  //영문 또는 영문, 숫자조합
                    
                    if(regExp1.test($(this).val()) === true){  //특수문자이면
                        $(this).val($(this).val().replace(regExp1, ''));  //공백으로 치환
                    }
                    else if(regExp2.test($(this).val()) === false){  //6~16 범위가 아니면
                        $('.guid-id').addClass('error');
                        $('.guid-id').text('최소 6자 이상 입력');
                    }
                    else if(regExp3.test($(this).val()) === false){  //영문 또는 영문, 숫자조합이 아니면
                        $('.guid-id').addClass('error');
                        $('.guid-id').text('영문 혹은 영문,숫자조합');
                    }
                    else{
                        $('.guid-id').removeClass('error');
                        // error 클래스가 빠지면 p태그는 안보이게 설정해놨기 때문에 이건 써도 되고 안써도 됌
                        $('.guid-id').text('');
                    }
                }
            });


            // 1-1. 아이디 중복확인 검증
            $('.idok-btn').on({
                click: function(e){
                    e.preventDefault();
                    const regExp1 = /[`!@#$%\^&*()\-_=+\\\|\{\}\[\]'";:\/?.>,<]/g;  //특수문자
                    const regExp2 = /.{6,16}/g;  //6~16
                    const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g;  //영문 또는 영문, 숫자조합

                    // 잘못된 경우
                    if($('#id').val() === '' || regExp1.test($('#id').val()) === true || regExp2.test($('#id').val()) === false || regExp3.test($('#id').val()) === false){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
                        return;
                    }
                    // 정상 -> 아이디 중복확인 수행(로컬스토레이지 데이터를 가져와야 함)
                    else{
                        // 로컬스토레이지에 데이터가 0인 경우
                        if(localStorage.length === 0){
                            $('.modal').fadeIn(300);
                            $('.modal-msg').text('사용 가능한 아이디입니다.');
                            isIdOk = true;
                        }
                        // 로컬스토레이지에 데이터가 하나라도 들어 있는 경우
                        else{
                            for(let i=0; i<localStorage.length; i++){
                                // 로컬데이터와 아이디 값이 일치하는 경우
                                if(localStorage.key(i) === $('#id').val()){
                                    $('.modal').fadeIn(300);
                                    $('.modal-msg').text('이미 등록된 아이디입니다.');
                                    return;
                                }
                                // 로컬데이터와 아이디 값이 일치하지 않는 경우
                                else{
                                    $('.modal').fadeIn(300);
                                    $('.modal-msg').text('사용 가능한 아이디입니다.');
                                    isIdOk = true;
                                }
                            }  
                        }
                    }
                }
            });


            // 2. 비밀번호 error 메세지
            $('#pw1').on({
                keyup: function(){
                    const regExp1 = /.{10,16}/g;
                    const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%^&*_-])+)+)+[^\s][A-Za-z0-9!@#$%^&*_-]/g;
                    const regExp3 = /(.)\1\1/g;

                    // 비밀번호 제한 조건(1)
                    if(regExp1.test($(this).val()) === false){  //10~16이 아니면
                        $('.guid-pw1').addClass('error');
                        $('.guid-pw1').text('최소 10자 이상 입력');
                    }
                    else{
                        // 비밀번호 제한 조건(2), 영문은 반드시 필수 숫자와 특수문자 중 하나는 반드시 와야 함
                        if(regExp2.test($(this).val()) === false){
                        $('.guid-pw1').addClass('error');
                        $('.guid-pw1').text('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합');
                        }
                        // 비밀번호 제한 조건(3)
                        else if(regExp3.test($(this).val()) === true){
                        $('.guid-pw1').addClass('error');
                        $('.guid-pw1').text('동일한 숫자 3개 이상 연속 사용 불가');
                        }
                        else{
                        $('.guid-pw1').removeClass('error');
                        }
                    }
                }
            });


            // 2-1. 비밀번호 확인 error 메세지
            $('#pw2').on({
                keyup: function(){
                    if($('#pw1').val() !== $(this).val()){  //#pw1값과 #pw2값이 다르다면
                        $('.guid-pw2').addClass('error');
                        $('.guid-pw2').text('동일한 비밀번호 입력');
                    }
                    else{  //#pw1값과 #pw2값이 같다면
                        $('.guid-pw2').removeClass('error');
                    }
                }
            });


            // 3. 이름 error 메세지
            $('#name').on({
                keyup: function(){
                    const regExp = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g;

                    if($(this).val() === ''){  //#name값이 공백이라면
                        $('.guid-name').addClass('error');
                        $('.guid-name').text('이름을 입력해 주세요.');
                    }
                    else{  //#name값이 공백이 아니라면
                        $('.guid-name').removeClass('error');
                        $(this).val($(this).val().replace(regExp, ''));  //영문, 한글, 숫자를 제외한(regExp) 문자는 공백으로 치환
                    }
                }
            });


            // 4. 이메일 error 메세지
            $('#email').on({
                keyup: function(){
                    const regExp = /^[A-Z0-9]+([.\-_]?[A-Z0-9]*)*@[A-Z0-9]+([.\-_]?[A-Z0-9]*)*\.[A-Z]{2,3}$/gi;

                    if($('#email').val() === ''){  //#email값이 공백이면
                        $('.guid-email').addClass('error');
                        $('.guid-email').text('이메일을 입력해 주세요.');
                    }
                    else if(regExp.test($(this).val()) === false){
                        $('.guid-email').addClass('error');
                        $('.guid-email').text('이메일 형식으로 입력해 주세요.');
                    }
                    else{
                        $('.guid-email').removeClass('error');
                    }
                }
            });


            // 4-1. 이메일 중복 확인
            $('.emailok-btn').on({
                click: function(e){
                    e.preventDefault();

                    const regExp = /^[A-Z0-9]+([.\-_]?[A-Z0-9]*)*@[A-Z0-9]+([.\-_]?[A-Z0-9]*)*\.[A-Z]{2,3}$/gi;

                    // 잘못된 경우(1), 공백
                    if($('#email').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('이메일을 입력해 주세요.');
                        return;
                    }
                    // 잘못된 경우(2), 정규표현식 부합x
                    else if(regExp.test($('#email').val()) === false){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('이메일 형식으로 입력해 주세요.');
                        return;
                    }
                    // 정상 -> 이메일 중복확인 수헹(로컬스토레이지 데이터를 가져와야 함)
                    else{
                        // 로컬스토레이지에 데이터가 0인 경우
                        if(localStorage.length === 0){
                            $('.modal').fadeIn(300);
                            $('.modal-msg').text('사용 가능한 이메일입니다.');
                            isEmailOk = true;
                        }
                        // 로컬스토레이지에 데이터가 하나라도 들어 있는 경우
                        else{
                            for(let i=0; i<localStorage.length; i++){
                                // 문자형식으로 바꾼 것을 다시 객체형식으로 변경해서 객체의 속성 중 이메일을 뽑아야 함
                                const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));

                                // 로컬데이터와 이메일 값이 일치하는 경우
                                if(obj.이메일 === $('#email').val()){
                                    $('.modal').fadeIn(300);
                                    $('.modal-msg').text('이미 등록된 이메일입니다.');
                                    return;
                                }
                                // 로컬데이터와 이메일 값이 일치하지 않는 경우
                                else{
                                    $('.modal').fadeIn(300);
                                    $('.modal-msg').text('사용 가능한 이메일입니다.');
                                    isEmailOk = true;
                                }
                            }
                        }
                    }
                }
            });


            // 5. 휴대폰 error 메세지
            $('#hp').on({
                keyup: function(){
                   const regExp = /[^0-9]/g;  //숫자 제외

                    // 입력과 동시에 숫자를 제외한 나머지는 삭제
                    $(this).val($(this).val().replace(regExp, ''));  //숫자가 아니면 공백으로 치환

                    if($(this).val() !== ''){  //공백이 아니면 error 삭제
                        $('.guid-hp').removeClass('error');
                        $('.guid-hp').text('');

                        // 휴대폰 번호가 10자 이상이면 우측버튼을 활성화 (사용가능)
                        if($(this).val().length >= 10){
                            $('.hp-btn').removeClass('off');
                            // disabled의 속성값을 -> false(해제)로 변경
                            $('.hp-btn').attr('disabled', false);
                        }
                        else{
                            $('.hp-btn').addClass('off');
                            // disabled의 속성값을 -> true(설정)로 변경
                            $('.hp-btn').attr('disabled', true);
                        }
                    }
                    else{  //공백이면 error 추가
                        $('.guid-hp').addClass('error');
                        $('.guid-hp').text('휴대폰 번호를 입력해 주세요.');
                    }
                }
            });


            // 5-1. 휴대폰 버튼 클릭 이벤트
            $('.hp-btn').on({
                click: function(e){
                    e.preventDefault();
                    const regExp = /^01[0|1|6|7|8|9]+\d{3,4}\d{4}$/g;

                    // 다른번호 인증
                    if($('.hp-btn').text() === '다른번호 인증'){
                        $('.hp-btn').text('인증번호 받기');
                        $('#hp').attr('disabled', false); //입력상자 사용가능하게 만듬
                        $('#hp').val(''); //입력값 공백으로 만듬
                        $('.guid-hp').addClass('error');
                        $('.guid-hp').text('휴대폰 번호를 입력해 주세요.');
                        return;
                    }

                    // 더 엄격한 정규표현식이 틀리면 오류 모달창 추가
                    if(regExp.test($('#hp').val()) === false){
                        $('.modal').fadeIn(600);
                        $('.modal-msg').text('휴대폰 번호를 확인해 주세요.');
                    }
                    //더 엄격한 정규표현식이 맞으면 인증번호 발송 모달창 불러들임
                    else{ 
                        // Math.random() = 랜덤함수  Math.ceil() = 자리올림  Math.floor() = 자리내림  Math.round() = 반올림
                        num = Math.floor(Math.random()*900000+100000);
                        
                        // 모달창을 6초간 서서히 불러들임
                        $('.modal').fadeIn(600);
                        $('.modal-msg').text(`인증번호[${num}]가 발송되었습니다.`);
                        // 인증번호 입력상자와 인증번호 확인 버튼을 불러들임
                        $('#hp2').addClass('on');
                        $('.hp2-btn').addClass('on');
                        // 타이머 텍스트 보이고 함수 실행
                        $('#countTimer').addClass('on');
                        timerCount();
                    }
                }
            });


            // 5-2. 타이머 함수
            function timerCount(){
                let min = 2;
                let sec = 59;
                
                clearInterval(setId);  // 2번 이상 호출 시 타이머 정지
                // 1초에 한번씩 타이머가 동작함
                setId = setInterval(function(){
                    sec--;
                    if(sec < 0){
                        sec=59;
                        min--;
                        if(min < 0){
                            sec=0;
                            min=0;
                            // 타이머 종료
                            clearInterval(setId);
                            $('#countTimer').removeClass('on');  // 타이머 숨기기
                            $('.minutes').text('');
                            $('.seconds').text('');
                            return;
                        }
                    }
                    $('.minutes').text(min);
                    $('.seconds').text(sec<10 ? `0${sec}` : sec);
                }, 1000);
            }


            // 5-3. 인증번호가 발송되었습니다. 라는 모달창 닫기
            $('.modal-close-btn').on({
                click: function(e){
                    e.preventDefault();
                    $('.modal').fadeOut(600);
                }
            });


            // 5-4. 인증번호 입력상자
            $('#hp2').on({
                keyup: function(){
                    const regExp = /[^0-9]/g;  //숫자 제외

                    // 입력과 동시에 숫자를 제외한 나머지는 삭제
                    $(this).val($(this).val().replace(regExp, ''));  //숫자가 아니면 공백으로 치환
                    
                    if($(this).val() !== ''){  //공백이 아니면 off 없앰
                        $('.hp2-btn').removeClass('off');  // 회색에서 보라색이 되게
                        $('.hp2-btn').attr('disabled', false);  // disabled 해제
                    }
                    else{  //공백이면 off 추가
                        $('.hp2-btn').addClass('off');
                        $('.hp2-btn').attr('disabled', true);
                    }
                }
            });


            // 5-5. 인증번호를 입력해서 맞을때랑 틀릴때
            $('.hp2-btn').on({
                click: function(e){
                    e.preventDefault();

                    if(Number($('#hp2').val()) === num){  //인증번호가 맞을 때
                        $('.modal').fadeIn(600);
                        $('.modal-msg').text('인증에 성공했습니다.');

                        // 인증번호 확인 버튼을 누르면 확인 됌(true), 유효성 검사
                        isHpOk = true;

                        $('#hp2').val('');  // 인증번호 입력값 공백으로 만든 후
                        $('#hp2').removeClass('on');  //인증번호 입력상자 숨기기
                        $('.hp2-btn').removeClass('on');  //인증번호 확인버튼 숨기기
                        $('.hp-btn').text('다른번호 인증');
                        // 입력상자 사용불가하게 만들어야 함
                        $('#hp').attr('disabled', true);

                        // 타이머 종료
                        clearInterval(setId);
                        $('#countTimer').removeClass('on');
                        $('.minutes').text('');
                        $('.seconds').text('');
                    }
                    else{  //인증번호가 틀릴 때
                        $('.modal').fadeIn(600);
                        $('.modal-msg').text('잘못된 인증 코드입니다.');
                        $('#hp2').addClass('on');  //인증번호 입력상자 안없어짐
                        $('.hp2-btn').addClass('on');  //인증번호 확인버튼 안없어짐
                    }
                }
            });


            // 6. 주소 error 메세지
            // 카카오 다음 주소 검색 사용
            $('.addr-btn').on({
                click: function(e){
                    e.preventDefault();

                    // 1. 버튼의 자식요소 span 텍스트 내용이 주소검색이면
                    // 버튼 클래스 addr을 삭제한다.
                    if($(this).find('span').text() === '주소검색'){
                        $(this).removeClass('addr');  // 버튼 크기 작아짐
                        $(this).find('span').text('재검색'); // 재검색으로 바뀜
                        $('#address1').removeClass('addr');  // input타입 보임
                        $('#address2').removeClass('addr');  // input타입 보임

                        // 주소검색 API 함수 가져와서 실행하기
                        daumAddress();
                    }
                    // 2. 버튼의 자식요소 span 텍스트 내용이 재검색이면
                    // 입력값과 밑에 조그만 텍스트들 지우고 다시 주소검색 API 가져옴
                    else{
                       $('#address1, #address2').val('');  // 입력값 사라짐
                       $('.address').find('p').removeClass('addr-p');  // 샛별배송 텍스트 사라짐
                        daumAddress();
                    }
                }
            });


            // 6-1. 주소검색 API 함수
            function daumAddress(){
                new daum.Postcode({
                    oncomplete: function(data) {
                        $('#address1').val(`${data.zonecode}, ${data.address}`);
                        $('.address').find('p').addClass('addr-p');

                        let nowH = new Date().getHours();  // 24시간제

                        if(nowH < 23 && (data.address.indexOf('서울')>=0 || data.address.indexOf('인천')>=0 || data.address.indexOf('경기')>=0 || data.address.indexOf('충청')>=0)){
                            $('.star').text('샛별배송');
                        }
                        else if(nowH < 20 && data.address.indexOf('대구')>=0){
                            $('.star').text('샛별배송');
                        }
                        else if(nowH < 18 && (data.address.indexOf('부산')>=0 || data.address.indexOf('울산')>=0)){
                            $('.star').text('샛별배송');
                        }
                        else{
                            $('.star').text('낮배송');
                        }
                    }
                }).open();
            }


            // 7. 성별
            $('.gender-btn').on({
                change: function(){
                    genderVal = $(this).val();
                }
            });


            // 8. 년(year) error 메세지
            $('#year').on({
                keyup: function(){
                    const regExp = /[^0-9]/g;  // 숫자 제외

                    // 입력과 동시에 숫자를 제외한 나머지는 삭제
                    $(this).val($(this).val().replace(regExp, ''));  // 숫자가 아니면 공백으로 치환
                    
                    // year이 공백이면 메세지 삭제
                    if($(this).val() === ''){ 
                        $('.birth-text').removeClass('error').text('');
                        return;
                    }
                    // 생년월일 유효성 체크 함수
                    birthCheck();
                }
            });


            // 8-1. 월(month) error 메세지
            $('#month').on({
                keyup: function(){
                    const regExp = /[^0-9]/g;  // 숫자 제외

                    // 입력과 동시에 숫자를 제외한 나머지는 삭제
                    $(this).val($(this).val().replace(regExp, ''));  // 숫자가 아니면 공백으로 치환
                    
                    // month가 공백이면 메세지 삭제
                    if($(this).val() === ''){
                        $('.birth-text').removeClass('error').text('');
                        return;
                    }
                    // 생년월일 유효성 체크 함수
                    birthCheck();
                }
            });


            // 8-2. 일(day) error 메세지
            $('#day').on({
                keyup: function(){
                    const regExp = /[^0-9]/g;  // 숫자 제외

                    // 입력과 동시에 숫자를 제외한 나머지는 삭제
                    $(this).val($(this).val().replace(regExp, ''));  // 숫자가 아니면 공백으로 치환
                    
                    // day가 공백이면 메세지 삭제
                    if($(this).val() === ''){
                        $('.birth-text').removeClass('error').text('');
                        return;
                    }
                    // 생년월일 유효성 체크 함수
                    birthCheck();
                }
            });


            // 8-3. 년 > 월 > 일 체크 함수
            function birthCheck(){

                // 생년월일 모든 조건
                const regExpYear = /^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g;  // 년 1900~2999
                const regExpMonth = /^(?:0[1-9]|1[0-2])$/g;  // 월 01~09 또는 10~12
                const regExpDay = /^(?:0[0-9]|1[0-9]|2[0-9]|3[0-1])$/g;  // 일 01~09 또는 10~19 또는 20~29 또는 30~31

                const nowYear = new Date().getFullYear();  // 년도 4자리, 미래년도와 14세미만 비교하기 위해 필요함

                // 년(year) 체크
                if(regExpYear.test($('#year').val()) === false){
                    $('.birth-text').addClass('error').text('태어난 년도 4자리를 정확하게 입력해주세요.');
                }
                // 문자열과 숫자는 비교과 안되기 때문에 숫자로 바꿔줌
                else if(Number($('#year').val()) > nowYear){
                    $('.birth-text').addClass('error').text('생년월일이 미래로 입력 되었습니다.');
                }
                // 14세 미만 조건, (2022-14) = 2008이상이면 오류
                else if(Number($('#year').val()) >= (nowYear-14)){
                    $('.birth-text').addClass('error').text('만 14세 미만은 가입이 불가합니다.');
                }
                else{
                    // 년(year)이 정상이면 오류 메세지 삭제, 월(month) 체크
                    $('.birth-text').removeClass('error').text('');

                    if(regExpMonth.test($('#month').val()) === false){
                        $('.birth-text').addClass('error').text('태어난 월을 정확하게 입려해주세요.');
                    }
                    else{
                        // 월(month)이 정상이면 오류 메세지 삭제, 일(day) 체크
                        $('.birth-text').removeClass('error').text('');

                        if(regExpDay.test($('#day').val()) === false){
                            $('.birth-text').addClass('error').text('태어난 일을 정확하게 입력해주세요.');
                        }
                        else{
                            // 일(day)이 정상이면 오류메세지 삭제
                            $('.birth-text').removeClass('error').text('');
                        }
                    }
                }
            }


            // 9. 추가입력 사항 (라디오 버튼)
            $('.chooga-btn').on({
                change: function(e){
                    $('.chooga-text').show();

                    choogaItem = $(this).val();
                    
                    // 추천인 아이디를 선택하면
                    if($(this).val() === '추천인 아이디'){
                        $('#addText').attr('placeholder', '추천인 아이디를 입력해주세요.');
                    }
                    // 참여 이벤트 명을 선택하면
                    else{
                        $('#addText').attr('placeholder', '참여 이벤트명을 입력해주세요.');
                    }
                }
            });


            // 10. 이용약관 동의 (체크박스 버튼)
            // 전체 동의합니다. 를 눌렀을 때 모두 체크되게 구현
            $('#chk1').on({
                change: function(){
                    // 내가 #chk1을 선택하면 모두 체크(true)
                    if($(this).is(':checked')){
                        $('.chk-btn').prop('checked', true);
                    }
                    // 내가 #chk1을 해제하면 모두 해제(false)
                    else{
                        $('.chk-btn').attr('checked', false);
                    }
                }
            });


            // 10-1. 체크박스 이벤트 반복 처리
            $('.chk-btn').on({
                change: function(){
                    checkAll();
                }
            });


            // 10-2. 함수
            // 전체 동의합니다. 를 제외한 전체 체크박스 7개 중 모두 체크되면 전체 체크 되게하고 한개라도 체크 해제되면 전체 체크도 해제 됌
            function checkAll(){
                // 체크할 때 마다 즉시 전체 체크된 갯수를 확인
                let count = 0;
                for(let i=0; i<$('.chk-btn').length; i++){  //0 1 2 3 4 5 6 
                    if($('.chk-btn').eq(i).is(':checked')===true){
                        count++;  // 1 2 3 4 5 6 7
                    }
                }
                // 전체 체크가 되면
                if(count === 7){
                    $('#chk1').prop('checked', true)
                }
                // 하나라도 체크 해제되면
                else{
                    $('#chk1').prop('checked', false)
                }
            }


            // 10-3. 체크5, 체크6, 체크7
            // 5번이 체크되면 6,7번 모두 체크
            $('#chk5').on({
                change: function(){
                    // 5번이 체크 되면
                    if($(this).is(':checked')===true){
                        // 6, 7번 둘다 체크
                        $('#chk6, #chk7').prop('checked', true);
                    }
                    // 체크 안되면
                    else{
                        $('#chk6, #chk7').prop('checked', false);
                    }
                    checkAll();
                }
            });


            // 10-4. 체크6, 체크7 둘다 체크되면
            // 5번이 체크되고 하나라도 체크 안되면 5번 체크 해제
            $('#chk6').on({
                change: function(){
                    if($('#chk6').is(':checked') === true && $('#chk7').is(':checked') === true){
                        $('#chk5').prop('checked', true);
                    }
                    else{
                        $('#chk5').prop('checked', false);
                    }
                    checkAll();
                }
            });

            $('#chk7').on({
                change: function(){
                    if($('#chk6').is(':checked') === true && $('#chk7').is(':checked') === true){
                        $('#chk5').prop('checked', true);
                    }
                    else{
                        $('#chk5').prop('checked', false);
                    }
                    checkAll();
                }
            });


            // 11. 가입하기 버튼 전송
            $('.submit-btn').on({
                click: function(e){
                    e.preventDefault();
                    // 아이디 필수
                    if($('#id').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('아이디를 입력해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 비밀번호 필수
                    if($('#pw1').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('비밀번호를 입력해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 비밀번호 확인 필수
                    if($('#pw2').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('비밀번호를 확인해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 이름 확인 필수
                    if($('#name').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('이름을 입력해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 이메일 확인 필수
                    if($('#email').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('이메일을 입력해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 휴대폰 확인 필수
                    if($('#hp').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('휴대폰을 입력해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 주소 확인 필수
                    if($('#address1').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('주소를 검색해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 주소 확인 필수(2)
                    if($('#address2').val() === ''){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('세부주소를 입력해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    let count = 0;
                    let arr = [];
                    $('.chk-btn').each(function(index, item){
                        // 체크된 것 중에서 필수라는 단어가 있는지 없는지 찾음, >=0은 찾은 것
                        if($('.chk-btn').eq(index).is(':checked') === true && item.value.indexOf('필수') >= 0){
                            count++;
                        }
                        // 체크된 항목의 값을 배열에 저장한다.
                        if($('.chk-btn').eq(index).is(':checked') === true){
                            arr.push($('.chk-btn').eq(index).val());  // 누적이 되서 배열에 저장
                        }
                    });

                    if(count < 3){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('이용약관동의 필수항목을 선택해주세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 중복확인 버튼 유효성 검사
                    if(isIdOk === false){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('아이디 중복검사를 하세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    if(isEmailOk === false){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('이메일 중복검사를 하세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }
                    
                    if(isHpOk === false){
                        $('.modal').fadeIn(300);
                        $('.modal-msg').text('휴대폰 인증을 하세요.');
                        return;
                    }
                    else{
                        $('.modal').fadeOut(300);
                        $('.modal-msg').text('');
                    }

                    // 2. 여기까지 정상이면 객체(obj)에 보관 후 꼭 텍스트 형식으로 저장소(로컬스토레이지)에 저장한다.
                    let 회원 = {
                        아이디: $('#id').val(),
                        비밀번호: $('#pw1').val(),
                        비밀번호확인: $('#pw2').val(),
                        이름: $('#name').val(),
                        이메일: $('#email').val(),
                        휴대폰: $('#hp').val(),
                        주소: `${$('#address1').val()} ${$('#address2').val()}`,
                        성별: genderVal,
                        생년월일: `${$('#year').val()}-${$('#month').val()}-${$('#day').val()}`,
                        추가입력사항: `${choogaItem} : ${$('#addText').val()}`,
                        이용약관동의: arr
                    }

                    // 3. 로컬스토레이지에 저장 localStorage.setItem(키값, 전체값)
                    localStorage.setItem(회원.아이디, JSON.stringify(회원));
                    $('.modal').fadeIn(300);
                    $('.modal-msg').text('저장완료');
                }
            });


        }  // memberGaib(end)
    }
    kurly.init();

})(jQuery);