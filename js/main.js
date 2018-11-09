document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSend").addEventListener("click", getData);
}

function getData() {

    let URL = "http://davidst.edumedia.ca/mad9014/nums.php?";
    let formData = new FormData();

    let Digits = document.getElementById("digits").value;
    let Number = document.getElementById("max").value;

    if (Digits.length > 0 && Number.length > 0) {
        document.getElementById("home").style.display = "none";
        document.getElementById("list").style.display = "block";
        let options = {
            method: 'POST',
            mode: 'cors'
        };
        fetch(URL + "digits=" + Digits + "&max=" + Number, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.code == 0) {
                    let ul = document.querySelector(".num_list");
                    ul.innerHTML = "";
                    for (let item in data.numbers) {
                        let li = document.createElement("li");
                        li.innerHTML = data.numbers[item];
                        ul.appendChild(li);
                    }
                }
            })
            .then(function (back) {
                document.getElementById("btnBack").addEventListener("click", resetForm);
            })
            .catch(function (error) {
                document.getElementById("errorMessage").textContent = "Error: " + error.message;
                document.getElementById("btnBack").addEventListener("click", resetForm);
            })
    } else if (initDigits.length == 0) {
        alert("Valid number between 1 and 10");
        document.getElementById("digits").focus();
    } else if (maxNumber.length == 0) {
        alert("Valid number between 1 and 99");
        document.getElementById("max").focus();
    }
}

function resetForm() {
    let ul = document.querySelector(".num_list");
    ul.innerHTML = "";
    document.getElementById("list").style.display = "none";
    document.getElementById("home").style.display = "block";
    init();
}
