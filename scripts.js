//Computer Architecture, Bahadir Can Yildiz - 100301034
$(document).ready(function(){
	$("#header").slideDown(1000);//this is for making my application fabulous.
	});
var result=0; //this is our register a`s value after execution of our command. Every calculation on reg A will effect this value.
var priority = false; // query for looking if any value is loaded to reg A.
var calcs = new Array(); // this is the array for keeping information about which memories keep functions.
var res = false; // result of array checking.
var first, choice, second, query, target, swap, stepcount=1;
//first: takes value of c.a.r.
//choice: takes value of c.r.`s process part.
//second: takes value of cr`s address part.
//query: the value of what will be written as a function inside the memory.
//swap: keeps the previous value of the memory when you try to change it by double-clicking.
//stepcount: for counting which step is going to be printed.
function yaz(){ //for printing cell quantity value dynamically above the "create" button.
		$("#sayi").html($("#range").val());
	}
	function olustur(){//for creating memory and it`s informations, instructions and their elements for giving commands.
		priority = false;//values will be reset every time when you press "Create" button, so it`s used more than one time.
		calcs = new Array();
		result="null";
		var range = $("#range").val();
		var a, temp, tablecode, assembler;
		tablecode += "<th>Address</th><th>Memory</th>";//injecting all the elements
		for(a=1;a<=range;a++){
			tablecode +="<tr>";
			tablecode +="<td class='memory'>"+a+"</td><td id='"+a+"' ondblclick='return insert("+a+")' class='memory'></td>";
			tablecode +="</tr>";
			}
		assembler = "<p>Command Address Register:<span id='inc'><input type='number' id='1staddress' onblur='return stepper();' class='bar' min='1' max='"+range+"'></span></p><p>Command Register: <select id='islem'><option value='ADD'>ADD</option><option value='SUB'>SUB</option><option value='MULT'>MULT</option><option value='DIV'>DIV</option><option value='LDA'>LD A</option><option value='MOV'>MOV</option></select> <input type='number' id='2ndaddress' class='bar' onblur='return stepper();' min='1' max='"+range+"'></p>";
		button = "<center><input type='button' value='Execute' onclick='return calistir();'/></center>";
		temp = "<p>Register A (accumulator): <span id='tempreg'></span></p><p> Calculation Row: <span id='islemler'></span></p>";
		document.getElementById("memory").innerHTML = tablecode;
		$("#assembler").html(assembler + temp + button);
		document.getElementById("tempreg").innerHTML = "null";
		document.getElementById("islemler").innerHTML = ""; 
		document.getElementById("islem").selectedIndex = -1;
		$("#stepdiv").html("");
		stepcount=1;
	}
	
function calistir(){//for executing the command 
	first = parseInt($("#1staddress").val());//takes values of input boxes
	choice = $("#islem").val();
	second = $("#2ndaddress").val();
	sabitle();//disabling c.a.r. editing 
	if (choice=="LDA"){//this is the query part of which function should be executed
		priority=true;
		target = "#"+second;//loads which address should be loaded to reg A
		result = parseInt($(target).html());
		document.getElementById("tempreg").innerHTML = result; // enters the reg A value to the document
		document.getElementById("islemler").innerHTML = result; 
		query = "LD A, "+second; //creates the command register query to write inside the memory
		console.log(result);
		}
	else if (isNaN(result)) alert("Load specific number to Temp Register"); //if reg A is null, give alert
	else if (arraycheck(first)) alert("Invalid Memory Address"); // if used c.a.r. is used before, give alert.
	else if (choice=="MOV" && priority == true){
		query = choice+" "+second;//creates the command register query to write inside the memory
		target="#"+second; 
		$(target).html(result);  //adds the chosen address`s memory to the result
		}
	else if (choice=="ADD"&& priority == true){
		query = choice+" "+second;//creates the command register query to write inside the memory
		target="#"+second; 
		result += parseInt($(target).html()); //adds the chosen address`s memory to the result
		document.getElementById("tempreg").innerHTML = result; //enters the new value of result to the document.
		document.getElementById("islemler").innerHTML = "("+document.getElementById("islemler").innerHTML+"+"+$(target).html()+")";
		console.log(result);
		}
	else if (choice=="SUB"&& priority == true){
		query = choice+" "+second;//creates the command register query to write inside the memory
		target="#"+second; 
		result -= parseInt($(target).html()); //subs the chosen address`s memory to the result
		document.getElementById("tempreg").innerHTML = result;//enters the new value of result to the document.
		document.getElementById("islemler").innerHTML = "("+document.getElementById("islemler").innerHTML+"-"+$(target).html()+")";
		console.log(result);
		}
	else if (choice=="MULT"&& priority == true){
		query = choice+" "+second;//creates the command register query to write inside the memory
		target="#"+second; 
		result *= parseInt($(target).html()); //multiplies the chosen address`s memory to the result
		document.getElementById("tempreg").innerHTML = result;//enters the new value of result to the document.
		document.getElementById("islemler").innerHTML = "("+document.getElementById("islemler").innerHTML+"*"+$(target).html()+")";
		console.log(result);		
		}
	else if (choice=="DIV"&& priority == true){
		query = choice+" "+second;//creates the command register query to write inside the memory
		target="#"+second; 
		result /= parseInt($(target).html()); //divides the chosen address`s memory to the result
		document.getElementById("tempreg").innerHTML = result;//enters the new value of result to the document.
		document.getElementById("islemler").innerHTML = "("+document.getElementById("islemler").innerHTML+"/"+$(target).html()+")";
		console.log(result);		
		}
	else if (priority == false){ //if anything isn`t loaded to the register A;
		alert("Please load a data in Temp Register for Executing");
		}
	target ="#"+first;
	$(target).html(query);
	calcs.push(first);
	console.log(first);
	console.log(arraycheck(first));
	stepper();//for generating steps when "Execute" button is pressed.
}

	function arraycheck(address){//checks for not overwriting to the function memories
		res=false;
		for(var a=0;a<calcs.length;a++) if (calcs[a]==address) res=true;
		return res;
	}
	function insert(a){//helps us for entering new values for memories. 
		var address = "#"+a;
		swap = $(address).html();
		console.log(swap);
		console.log($("#inserter").val());
		var inserter = "<input type='number' id='inserter' value='"+swap+"' onblur='return replace("+a+");'>";
		if (swap!=$("#inserter").val()) $(address).html(inserter);
		document.getElementById('inserter').focus();
	}
	function replace(a){//for replacing the new value inside the input box to memory.
		var address = "#"+a;
		var replacer = $("#inserter").val();
		$(address).html(replacer);
	}
	function sabitle(){//to disable modifying the c.a.r. value and increments it automatically.
		swap=parseInt($("#1staddress").val())+1;
		$("#1staddress").val(swap);
		document.getElementById("1staddress").disabled = true;
	}
	function stepper(){//for generating 
		var car = $("#1staddress").val();
		var cr = $("#islem").val()+", "+$("#2ndaddress").val();
		var a = $("#tempreg").html();
		var build =  "<div class='step'><fieldset class='step'><legend>"+stepcount+". step</legend><table><tr><td>C.A.R.:</td><td>"+car+"</td></tr><tr><td>Cmd. Reg.:</td><td>"+cr+"</td></tr>  <tr><td>Reg. A:</td><td>"+a+"</td></tr></table></fieldset></div>";
		$("#stepdiv").append(build);
		stepcount++;
	}