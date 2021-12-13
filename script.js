console.log('PROJECT-1//JS');
var heading;
var heading2;
var name_array = [];
var name_array_2 = [];
let last_num = 0;
var exp;
showNotes()
var base_text;
var keep_num;

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    }
    else {
        x.className = "topnav";
    };
};

function btn_x() {
    let message = document.getElementById("message_1");
    if (((String(message.value)).length) !== 0) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        };
        //   console.log(notesObj);
        let x_message = document.getElementById('title');
        let x_notes = localStorage.getItem('headings');
        if (x_notes == null) {
            x_notesObj = [];
        }
        else {
            x_notesObj = JSON.parse(x_notes);
        };
        if (x_message.value.length == 0) {
            notesObj.push("");
            notesObj.forEach(function (element, index) {
                // x_message.value = `NOTE ${index + 1}`;
                // let x_message2 = document.getElementById('title');
                let x_notes2 = localStorage.getItem('headings');
                if (x_notes2 == null) {
                    x_notesObj2 = [];
                }
                else {
                    x_notesObj2 = JSON.parse(x_notes2);
                };
                // let brain;
                if (x_notesObj2.length == 0) {
                    x_message.value = 1;
                    keep_num = Number(x_message.value);
                } else {
                    let a_num = 0;
                    for (let num = 0; num < x_notesObj2.length; num++) {
                        if (typeof x_notesObj2[num] === 'number') {
                            keep_num = (x_notesObj2[num] + 1);
                            a_num = 1;
                        };
                        if (a_num == 0) {
                            keep_num = 1;
                        }
                    };
                };
            });
            notesObj.pop();
        } else {
            keep_num = x_message.value;
        };
        x_notesObj.push(keep_num);
        localStorage.setItem('headings', JSON.stringify(x_notesObj));
        notesObj.push(message.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
        x_message.value = "";
        message.value = "";

    } else { };
};

function renameFiles(arr) {
    var count = {};
    arr.forEach(function (x, i) {

        if (arr.indexOf(x) !== i) {
            var c = x in count ? count[x] = count[x] + 1 : count[x] = 1;
            var j = c + 1;
            var m = j - 1;
            var k = x + '(' + m + ')';

            while (arr.indexOf(k) !== -1) k = x + '(' + (++m) + ')';
            arr[i] = k;
        }
    });
    return arr;
}

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    };

    let x_notes = localStorage.getItem('headings');
    if (x_notes == null) {
        x_notesObj = [];
    }
    else {
        x_notesObj = JSON.parse(x_notes);
    };
    let html = "";
    notesObj.forEach(function (element, index) {
        heading = (JSON.parse(localStorage.getItem('headings')))[index];
        if (typeof heading === 'number') {
            heading2 = ('NOTE ' + heading);
        } else {
            heading2 = heading;
        };
        name_array.push(heading2);
        name_array_2 = name_array;
        renameFiles(name_array_2);
        html += `<div class="noteschild">
        <h3 class="h3">${name_array_2[index]}</h3>
        <textarea readonly id="message${index}" class='message' cols="20" rows="5">${element}</textarea>
        <div class='buttons' id='No.${index}'><button class='btn' id="NO.${index}" onclick="deleteNote(this.id)">Delete Note</button>
        <button class='btn' id='${index + 1}' onclick="make_edit(this.id)">Edit</button>
        </div>
        </div>`;
        // heading2 = "";
        // name_array =/ [];
        // num_array_2 = [];
    });
    name_array = [];
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.style.textAlign = "center"
        notesElm.innerHTML = `Nothing to show! Write something and use "Save" button above to add notes.`;
    };
};

function deleteNote(index) {
    // general_delete();
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    };
    indx = index.slice(3);
    let int_indx = Number(indx);
    notesObj.splice(int_indx, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    let x_notes = localStorage.getItem('headings');
    if (x_notes == null) {
        x_notesObj = [];
    } else {
        x_notesObj = JSON.parse(x_notes);
    };
    indx2 = index.slice(3);
    let int_indx2 = Number(indx2);
    x_notesObj.splice(int_indx2, 1);
    localStorage.setItem("headings", JSON.stringify(x_notesObj));
    showNotes();
    if (x_notesObj.length == 0) {
        name_array_2 = [];
    } else {
        name_array_2.slice(indx2, 1);
    }
    console.log(name_array_2);
};

function make_edit(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    };
    let int_index = Number(index);
    (document.getElementById(`message${int_index - 1}`).removeAttribute('readonly'));
    let just_chose = (document.getElementById(`message${int_index - 1}`));
    base_text = just_chose.value;
    let child1 = document.createElement("button");
    child1.className = "btn";
    child1.id = `${int_index + 1}`;
    child1.innerHTML = "Cancel";
    child1.setAttribute("onclick", "lets_cancel(this.id)")
    let child2 = document.createElement("button");
    child2.className = "btn";
    child2.id = `${int_index + 2}`;
    child2.innerHTML = "Save";
    child2.setAttribute("onclick", "lets_save(this.id)")
    let parent1 = document.createElement("div");
    parent1.className = "buttons";
    parent1.id = "notHappen";
    parent1.appendChild(child1);
    parent1.appendChild(child2);
    let to_be_replaced = document.getElementById(`No.${int_index - 1}`);
    to_be_replaced.replaceWith(parent1);
}

function lets_cancel(index) {
    let int_index2 = Number(index);
    let parent2 = document.getElementById("notHappen");
    let to_be_replaced1 = document.createElement("div");
    to_be_replaced1.className = "buttons";
    to_be_replaced1.id = `No.${int_index2 - 2}`;
    let child_x1 = document.createElement("button");
    child_x1.className = "btn";
    child_x1.id = `NO.${int_index2 - 2}`;
    child_x1.setAttribute("onclick", "deleteNote(this.id)")
    child_x1.innerText = "Delete Note";
    to_be_replaced1.appendChild(child_x1);
    let child_x2 = document.createElement("button");
    child_x2.className = "btn";
    child_x2.id = `${int_index2 - 1}`;
    child_x2.setAttribute("onclick", "make_edit(this.id)");
    child_x2.innerText = "Edit";
    to_be_replaced1.appendChild(child_x2);
    parent2.replaceWith(to_be_replaced1);
    // console.log(to_be_replaced1)
    let just_chose2 = (document.getElementById(`message${int_index2 - 2}`));
    just_chose2.setAttribute("readonly", true);
    just_chose2.value = base_text;
};

function lets_save(index) {
    let int_index2 = Number(index);
    let parent2 = document.getElementById("notHappen");
    let to_be_replaced1 = document.createElement("div");
    to_be_replaced1.className = "buttons";
    to_be_replaced1.id = `No.${int_index2 - 3}`;
    let child_x1 = document.createElement("button");
    child_x1.className = "btn";
    child_x1.id = `NO.${int_index2 - 3}`;
    child_x1.setAttribute("onclick", "deleteNote(this.id)")
    child_x1.innerText = "Delete Note";
    to_be_replaced1.appendChild(child_x1);
    let child_x2 = document.createElement("button");
    child_x2.className = "btn";
    child_x2.id = `${int_index2 - 2}`;
    child_x2.setAttribute("onclick", "make_edit(this.id)");
    child_x2.innerText = "Edit";
    to_be_replaced1.appendChild(child_x2);
    parent2.replaceWith(to_be_replaced1);
    // console.log(to_be_replaced1)
    let just_chose2 = (document.getElementById(`message${int_index2 - 3}`));
    just_chose2.setAttribute("readonly", true);
    just_chose2.innerText = just_chose2.value;
    let x_try = JSON.parse(localStorage.getItem('notes'));
    let y = Number(`${int_index2 - 3}`)
    x_try[y] = just_chose2.value;
    localStorage.setItem("notes", JSON.stringify(x_try));
};

let x_search_a = document.createElement('a');
x_search_a.className = "searchbar";
x_search_a.id = "searchbar_parent_id"
let x_search_input = document.createElement('input');
x_search_input.className = "searchbar";
x_search_input.setAttribute('placeholder', 'Search');
x_search_input.id = "searchbar_id"
x_search_a.appendChild(x_search_input);
let x_search = document.getElementById('search');
function change_to_searchable() {
    x_search.replaceWith(x_search_a);
};
// x_search_input.addEventListener('click',make_searchable_2);
// function make_searchable_2() {
//           x_search_input.style.background = "#ddd";
// };
x_search_input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        let lower_search = x_search_input.value.toLowerCase();
        let note_cards = document.getElementsByClassName('h3');
        var c_title, note_cards_2, txtValue;
        for (c_title = 0; c_title < note_cards.length; c_title++) {
            note_cards_2 = note_cards[c_title];
            console.log(note_cards_2);
            // console.log(note_cards)
            txtValue = note_cards_2.innerText;
            if (txtValue.toLowerCase().indexOf(lower_search) > -1) {
                note_cards[c_title].parentNode.style.display = "";
            } else {
                note_cards[c_title].parentNode.style.display = "none";
            };
        }
        x_search_a.replaceWith(x_search);
        x_search_input.value = "";
    };
});


