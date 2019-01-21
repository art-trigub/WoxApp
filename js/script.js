`use strict`;
var json;
var sorted = 1;
var content;

function loadPhones(url, id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
  	if (xhr.status != 200) {
       alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
       json = JSON.parse(xhr.response);
       createTable(id, url)
    }
}

function createTable(arg, url) {
  	content = document.getElementById(arg);
  	content.innerHTML = '';
    var thisBody = "tbody";
    var thisTable = "table";
    if(arg == 'content2') thisBody = "tbody2";
    if(arg == 'content2') thisTable = "table2";
  	var table = document.createElement("table");
  	var tbody = document.createElement("tbody");

    if (url == '/country.json') table.innerHTML = `<thead><tr><th id="th1" data-type="int"> ${json[0].id} </th> <th id="th2" data-type="str"> ${json[0].country} </th> </tr></thead>`
    if (url == '/capital.json') table.innerHTML = `<thead><tr><th id="th1" data-type="int"> ${json[0].id} </th> <th id="th2" data-type="str"> ${json[0].country} </th> <th id="th3" data-type="str"> ${json[0].capital} </th></tr></thead>`
    if (url == '/allData.json') table.innerHTML = `<thead><tr><th id="th1" data-type="int"> ${json[0].id} </th> <th id="th2" data-type="str"> ${json[0].country} </th> <th id="th3" data-type="str"> ${json[0].capital} </th> <th id="th4" data-type="int"> ${json[0].population} </th><th id="th5" data-type="int"> ${json[0].square} </th></tr></thead>`

  	table.id = thisTable;
  	tbody.id = thisBody;
  	table.appendChild(tbody);
  	content.appendChild(table);
    table.addEventListener('click', tableSort(thisTable, thisBody));
    formTable();

   	for (var i = 1; i < 51; i++) {
        var tr = document.createElement('tr');
    		var trOne = tbody.appendChild(tr);
    		for( var j = 0; j < json[i].length; j++ ) {
      			var td = document.createElement('td');
      			td.innerHTML = json[i][j];
      			trOne.appendChild(td);
        }
    }

    var quantityButton = Math.ceil(json.length / 50);
    console.log(i, quantityButton)

    for ( var m = 0; m < quantityButton; m++) {
    	var btn = document.createElement('input');
    	btn.id = 'btn'+ (m + 1);
    	btn.className = "btnClass";
    	btn.type = 'button';
    	btn.value = '' + (m + 1);
    	content.appendChild(btn);
    }
    var btn1 = document.getElementById("btn1")
    btn1.onclick = paganation1;
    var btn2 = document.getElementById("btn2")
    btn2.onclick = paganation2;
    var btn3 = document.getElementById("btn3")
    btn3.onclick = paganation3;
    var div = document.createElement("div");
    div.innerHTML = '<input type="button" value="Добавить еще один блок" onclick="addBlock()" id="inputAdd">'
    content.appendChild(div);
    choose()

}

function paganation1() {
    let tbody2 = document.getElementById("tbody");
    tbody2.innerHTML = ''
    for (var i = 1; i < 51; i++) {
        var tr = document.createElement('tr');
        var trOne = tbody.appendChild(tr);
        for( var j = 0; j < json[i].length; j++ ) {
          var td = document.createElement('td');
          td.innerHTML = json[i][j];
          trOne.appendChild(td);
        }
    }
} 

function paganation2() {
    let tbody2 = document.getElementById("tbody");
    tbody2.innerHTML = ''
    for (var i = 51; i < 101; i++) {
        var tr = document.createElement('tr');
        var trOne = tbody.appendChild(tr);
        for( var j = 0; j < json[i].length; j++ ) {
          var td = document.createElement('td');
          td.innerHTML = json[i][j];
          trOne.appendChild(td);
        }
    }
} 

function paganation3() {
    let tbody2 = document.getElementById("tbody");
    tbody2.innerHTML = '';
    for (var i = 101; i < json.length; i++) {
        var tr = document.createElement('tr');
        var trOne = tbody.appendChild(tr);
        for( var j = 0; j < json[i].length; j++ ) {
          var td = document.createElement('td');
          td.innerHTML = json[i][j];
          trOne.appendChild(td);
        }
    }
} 

function addBlock() {
  var divSet = document.createElement("div");
  divSet.id = "addData"
  divSet.innerHTML = `Набор данных:<input type="radio" name="check2" id="radio1" onclick="loadPhones('/country.json', 'content2')"> Только страны
                      <input type="radio" name="check2" id="radio2" onclick="loadPhones('/capital.json', 'content2')"> Страны и столицы
                      <input type="radio" name="check2" id="radio3" onclick="loadPhones('/allData.json', 'content2')"> Полная информация`
  content.appendChild(divSet);
}

function tableSort(arg, arg2) {
	var header = document.getElementById(arg);
    header.onclick = function(e) {
      var target = e.target;
      if (target.tagName != 'TH') return;

      sortTab(target.cellIndex, target.getAttribute('data-type'));
    }

    function sortTab(n, type) {
      var body = document.getElementById(arg2),
        rows = [].slice.call(body.rows);

    if (sorted == 1) {
        rows.sort(sortReverse);
        sorted = 0;
    } else {
        rows.sort(sortByType);
        sorted = 1;
    }

    for (var i = 0; i < rows.length; i++) {
        body.appendChild(rows[i]);
       console.log(rows[i])
    }

    function sortByType(a, b) {
        if (type == 'int') return a.cells[n].innerText - b.cells[n].innerText;
        if (type =='str') return a.cells[n].innerText > b.cells[n].innerText;
    }

    function sortReverse(a, b) {
        if (type == 'int') return b.cells[n].innerText - a.cells[n].innerText;
        if (type == 'str' )return b.cells[n].innerText > a.cells[n].innerText;
      	}
    }
}

function formTable(){
  var form1 = document.getElementById("form1");
  var table1 = document.getElementById("table");
    
  form1.onkeyup = function(ev){
      
    var country = form1.elements[0].value.toLowerCase();
    var capital  = form1.elements[1].value.toLowerCase();

      for(var i = 1; i < table1.rows.length; i++){  
      table1.rows[i].className = "";
        if( 
        table1.rows[i].cells[0].innerHTML.toLowerCase().indexOf(country) == -1 ||
        table1.rows[i].cells[1].innerHTML.toLowerCase().indexOf(capital) == -1 ) {
        table1.rows[i].className = "hide";
      }
    }    
  }  
}
 function choose() {
  var dataDiv = document.createElement("div");
    dataDiv.id = "dataDiv"
    dataDiv.innerHTML = 'Выбрано: '
    content.appendChild(dataDiv);
    document.getElementById("tbody").onclick = (event) => {
        let row = event.target;
        let dataRow;
        if (row.tagName != 'TH') {
        dataRow = row.parentNode;
        var dataTab = dataRow.cloneNode(1)
        console.log(dataTab);
        var divTd = document.createElement("div")
        content.appendChild(divTd);
        
        var tbl = document.createElement ('table');
        tbl.id = "tableChoose"
        tbl.appendChild (dataTab);
        dataDiv.appendChild(tbl)
       }
    }
 }
