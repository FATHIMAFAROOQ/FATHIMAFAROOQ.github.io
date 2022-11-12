const grab = document.getElementById("check");
const p1 = document.createElement('p');
const p2 = document.createElement('p');
const dynamic = document.querySelector('.select');

grab.addEventListener('submit', (e) => {

    //* prevent form from reloading the page
    e.preventDefault()
    console.log('form is submited');

    const request = new XMLHttpRequest();

    request.open("post", "https://httpbin.org/post");

    //* when req comes back
    request.onload = function () {
        //* type was string parsed to object now.
        const reply_array = JSON.parse(request.responseText).form.students;
        //* Adding txt inode input box dynamically: 2-ways
        // document.getElementById("inp").value = reply_array;
        if (reply_array !== undefined)
            document.getElementById("inp").setAttribute('value', reply_array)
        else
            document.getElementById("inp").setAttribute('value', 'no-absentees :)')
        dynamic.style.display = 'contents';
        p1.innerText = `No of present = ${reply_array.length}`;
        dynamic.appendChild(p1);
        p2.innerText = `No of absent = ${58 - reply_array.length}`;
        dynamic.appendChild(p2);
    }

    //* sending form data through post request with help of FormData class
    request.send(new FormData(check));
})


let val = true;
document.getElementById('reset').addEventListener('click', toggle);
function toggle() {
    dynamic.style.display = 'none';
    if (val) {
        for (const iterator of document.querySelectorAll("input:checked")) {
            iterator.removeAttribute('checked');
        }
        val = false;
    }
    else{
        for (const iterator of document.querySelectorAll("input[name]")) {
            iterator.setAttribute('checked', '');
            console.log('object');
        }
        val = true;
    }
}

const myInp = document.getElementById("inp");
const btnc = document.getElementById("btncpy");
btnc.onclick = function () {
    // stp1: select the txt
    myInp.select();
    // stp2: selected txt is copied
    document.execCommand("Copy");
}
