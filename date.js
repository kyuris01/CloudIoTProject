function getFormattedYesterday() {
    const today = new Date();
    // 어제의 날짜를 가져오기 위해 현재 날짜에서 1을 빼줍니다.
    today.setDate(today.getDate() - 1);
    
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = today.getDate();

    // 달과 일이 한 자리 숫자일 경우, 앞에 0을 추가합니다.
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

const formattedYesterday = getFormattedYesterday();
console.log(formattedYesterday);

module.exports = {
    formattedYesterday:formattedYesterday
}