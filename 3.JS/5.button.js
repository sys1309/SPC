function increment(){
    console.log("증가버튼클릭");
    var result = document.getElementById("result")
    console.log(result);
    result.innerText=Number(result.innerText)+1;

}
function decrement(){
    console.log("감소버튼클릭");
    var result = document.getElementById("result")
    console.log(result);
    result.innerText=Number(result.innerText)-1;
    //if result.innerText

    //감소할때 0이하로 안내려가게 만들기 

}