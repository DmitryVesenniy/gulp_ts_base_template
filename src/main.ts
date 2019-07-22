import { sayHello } from "./greet"
import * as $ from 'jquery';

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
    $("h1").hide();
    setTimeout(() => {
    	$("h1").show();
    }, 2000);
}

showHello("greeting", "TypeScript");
