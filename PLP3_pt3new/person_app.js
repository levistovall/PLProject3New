/**
 * Created by pcannata on 2/20/16.
 */

var person = function(){ // This line to the line with "}();" creates a Closure.
    // private data
    var data = {            // This is an exmaple of a javaScript Object.
        firstname:'',
        $firstname: function(n){
            data.memo += 1; // This, and the object entry "memo: 0" below is an example of Memoization where a function can
                            // keep track of some prior behavior.
            data.firstname = n },
        memo: 0,
        lastname: '',
        $lastname: function(n){data.memo += 1; data.lastname = n},
        email: '',
        $email: function(n){data.memo += 1; data.email = n}
    };
    var F = function(){};
    f = new F();            // This is an example of the conflicted nature of JavaScript.
                            // In the words of Douglas Crockford, "JavaScript itself is not confident in its prototypal nature,
                            // so it offers an object-making syntax that is reminiscent of the classical oo languages. Few
                            // classical progrmmers found prototypal inheritance to be acceptable and classically inspired
                            // syntax obscures the language's true nature. It is the worst of both worlds.

    // public data
    f.run = function (e) {
        return data[e];
    };
    f.pdisplayString = 'Name: ' + f.run('firstname') + ' ' + f.run('lastname') + '\n' +
        'Email Address: ' + f.run('email') + '\n';

    return f;
}();                        // This is an example of Function Application.

var customer = function(p){
    // private data
    var data = {
        firstname:'',
        $firstname: function(n){
            data.memo += 1; // This, and the object entry "memo: 0" below is an example of Memoization where a function can
                            // keep track of some prior behavior.
            data.firstname = n },
        memo: 0,
        lastname: '',
        $lastname: function(n){data.memo += 1; data.lastname = n},
        email: '',
        $email: function(n){data.memo += 1; data.email = n},
        cust_num:'',
        $cust_num: function(n){data.memo += 1; data.cust_num = n}

    };

    var F = function(){};
    F.prototype = p;        // The prototype property sets up Inheritance.
    f = new F();

    // public data
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };
    f.cdisplayString = 'Name: ' + f.run('firstname') + ' ' + f.run('lastname') + '\n' +
        'Email Address: ' + f.run('email') + '\n' + 'Customer Number: ' + f.run('cust_num');

    return f;
}(person);

var employee = function(p){
    // private data
    var data = {
        firstname:'',
        $firstname: function(n){
            data.memo += 1; // This, and the object entry "memo: 0" below is an example of Memoization where a function can
                            // keep track of some prior behavior.
            data.firstname = n },
        memo: 0,
        lastname: '',
        $lastname: function(n){data.memo += 1; data.lastname = n},
        email: '',
        $email: function(n){data.memo += 1; data.email = n},
        social_num:'',
        $social_num: function(n){data.memo += 1; data.social_num = n}

    };

    var F = function(){};
    F.prototype = p;
    f = new F();

    // public data
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };
    f.edisplayString = 'Name: ' + f.run('firstname') + ' ' + f.run('lastname') + '\n' +
        'Email Address: ' + f.run('email') + '\n' + 'Social Security Number: ' + f.run('social_num');

    return f;
}(person);


//var choice = document.getElementById("choice");
var choice = document.getElementById("choice");
var current = "c";
//choice.onchange = function(){
choice.onchange = function() {
    var i =choice.selectedIndex;
    current = choice.options[i].value;
    if(current == "c"){
        document.getElementById("spec_num").innerHTML = "Customer Number:" ;
        document.getElementById("create").value = "Create Customer" ;
    }else{
        document.getElementById("spec_num").innerHTML = "Social Security Number:" ;
        document.getElementById("create").value = "Create Employee" ;
    }
} // added the );

var create = document.getElementById("create");
create.onclick = function(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    if(current == "c"){
        var c1 = Object.create(customer);
        var cust_num = document.getElementById("spec_input").value;
        if((fname != '') && (lname !='') && (email != '') && (cust_num !='')) {

            c1.run('$firstname')(fname);
            c1.run('$lastname')(lname);
            c1.run('$email')(email);
            c1.run('$cust_num')(cust_num);
            var display_string = 'You entered: <br>' + 'Name: ' + c1.run('firstname') + ' ' + c1.run('lastname') + '<br>' +
                'Email Address: ' + c1.run('email') + '<br>' + 'Customer Number: ' + c1.run('cust_num');
            document.getElementById('summary').innerHTML = display_string;
        }else{alert('Please fill all fields.')}

    }else{
        var e1 = Object.create(employee);
        var social_num = document.getElementById("spec_input").value;
        if((fname != '') && (lname !='') && (email != '') && (cust_num !='')) {

            e1.run('$firstname')(fname);
            e1.run('$lastname')(lname);
            e1.run('$email')(email);
            e1.run('$social_num')(social_num);
            var display_string = 'You entered: <br>' + 'Name: ' + f.run('firstname') + ' ' + f.run('lastname') + '<br>' +
                'Email Address: ' + f.run('email') + '<br>' + 'Social Security Number: ' + f.run('social_num');
            document.getElementById('summary').innerHTML = display_string;
        }else{alert('Please fill all fields.')}

    }
}

var clear = document.getElementById("clear");
clear.onclick = function(){
    document.getElementById('createform').reset();
    document.getElementById('summary').innerHTML = '';
}