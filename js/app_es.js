var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

//output.innerHTML = slider.value;

//slider.oninput = function() {
//  output.innerHTML = this.value;
// }

 
// models variants declaration
// model1 : Prenatal 3 variants
 var model1old=[];
  model1old.Intercept=	16.79759;
  model1old.Edadges=-0.64476;
  model1old.Cir10=0.97177;
  model1old.CortimatParcial=-0.69716;
  model1old.CortimatCompleto=-1.07648;

var model1=[];
 model1.Intercept=16.80431;
 model1.Edadges=-0.64997;
 model1.Cir10=0.98776;
 model1.CortimatParcial=-0.70506;
 model1.CortimatCompleto=-1.09438;
 model1.Sexo=	0.07576;
 model1.Nivelas=	0.50431;
 model1.pmult = 0.29865;

//Model2 : Hospital mortality 24h
var model2=[];
model2.Intercept=	18.52483;
model2.Nivelas	=0.72576;
model2.Edadges	=-0.28489;
model2.Sexo	=0.13269;
model2.CortimatParcial	=-0.43339;
model2.CortimatCompleto = -0.60353;
model2.Peso100	=-0.2739;
model2.Pmult	= 0.31516;
model2.Apgar5	=-0.23023;
model2.Toxemia	=-0.45578;
model2.Reanener =	0.3039;
model2.Temping	= -0.22252;
model2.Emhgr	= 0.32937;

//Model3 : Morbility 24h
var model3=[];
model3.Intercept=5.88479415;
model3.Lugarna =	0.34139506;
model3.Edadges	 =-0.20547614;
model3.Sexo	= 0.23376623;
model3.Peso100	=-0.12587881;
model3.Apgar1	= -0.05962979;
model3.Membrana	=0.69354441;
model3.Emhgr = 	0.2651866;

//Model4 : Mortality w/ days and features
var model40=[];
model40.Intercept=	5.1659655;
model40.Pmult	=0.2898969;
model40.Edadges	=-0.1611302;
model40.Cortipre	 =-0.2027747;
model40.Toxemia =	-0.2303313;
model40.Apgar5 =	-0.1972051;
model40.Peso100 =	-0.2659444;
model40.Emhgr =	0.1304168;
model40.Neumot =	0.5997219;
model40.Entoroco =	1.2482592;
model40.Sepsisgr = 	1.2099799;
model40.Hiv = 	0.6221995;
model40.Hivgr	=0.7881896;
model40.Diastot = 	-0.0346462;

//Model4 : Mortality w/ days and features <=30 days
var model41=[];
model41.Intercept=	6.626619;
model41.Pmult	=0.296523;
model41.Edadges	=-0.162709;
model41.Cortipre	 =-0.306214;
model41.Toxemia =	-0.366932;
model41.Apgar5 =	-0.198088
model41.Peso100 =	-0.321967;
model41.Emhgr =	0.131572
model41.Neumot =	0.859499;
model41.Entoroco =	1.58391;
model41.Sepsisgr = 	1.082574;
model41.Hiv = 	0.46974;
model41.Hivgr	=1.55144;
model41.Diastot = 	-0.049411;
	
//Model4 : Mortality w/ days and features > 30 days
var model42=[];
model42.Intercept=	2.097003;
model42.Pmult = 	0.177383;
model42.Edadges	=-0.189666;
model42.Cortipre=	-0.290679;
model42.Apgar5	=-0.152273;
model42.Peso100	=-0.173882;
model42.Neumot=	0.529165;
model42.Entoroco =	1.393368;
model42.Sepsisgr =	1.478962;
model42.Hivgr = 	0.555501;
model42.Diastot =	-0.003596;
model42.Dbp =	1.187435;
model42.Dbpgr	=0;
model42.Anemia	=0.535424;
model42.Ecngr =	0.129897;
model42.Lmpvgr =	0.655049;


//Variables with multiple choices:
// Cortimat: No - Parcial - Completo
// Sexo - M F
// Lugar Na : Internal External
// Nivel as: 3abc - other

// Variables yes-no:
// Cir10 - Pmult -Cortipre
// Toxemia - Emhgr - Neumot
// Entoroco - Sepsisgr  -Hiv
// Hivgr - Dbp - Dbpgr - Anemia -Ecngr - Lmpvgr
// Reanener - Membrana

// Continuous variables:
// Edadges - Peso100 - Diastot - Apgar5
// Apgar1 - Temping


//This function finds the probaility  based on the 
//drop down selection
function getCortimat(model)
{
    var outval=0;
    //Get a reference to the form"
    var theForm = document.forms.totprob;
    var cortimat = theForm.elements["Cortimat"];
     
    if(cortimat.value =="Parcial")
    {
        outval=model["CortimatParcial"];
    }
    
    if(cortimat.value =="Completo")
    {
        outval=model["CortimatCompleto"];
    }
        
    //finally we return cakeFillingPrice
    return outval;
}


function calculateTotal(model=model1)
{
    //Model with intercept + continuous variables part + Cortimat
    var totProb = getCortimat(model)  +
                  document.forms.totprob.Edadges.value * model.Edadges +
                  model.Intercept;
    if(document.forms.totprob.Cir10.checked){
        totProb = totProb + model.Cir10;
     }
    
    if (document.forms.totprob.Nivelas.value == 'Other'){
         totProb = totProb + model.Nivelas;
     }
    
    if (document.forms.totprob.Sexo.value == 'M'){
         totProb = totProb + model.Sexo;
     }
	
    if(document.forms.totprob.pmult.checked){
        totProb = totProb + model.pmult;
     }

          
    totProb = (1)/(1 + Math.exp(-totProb));
    //display the result
    var divobj = document.getElementById('totProb');
    divobj.style.display='block';
     if(totProb < 0.160){
                divobj.style.color = '#0d0'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very high survival probability";  }
            else  if(totProb <0.374){
                divobj.style.color = '#E7C518'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> High survival probability";
            }else  if(totProb <0.564){
                divobj.style.color = '#EB8420'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Low survival probability";
            }else{
                divobj.style.color = '#d00'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very low survival probability";
            }
//    divobj.innerHTML = "Exitus: "+totProb.toFixed(2).replace(".", ",") + "%";

}


function calculateTotal_model2(model = model2)
{
    //Model with intercept + continuous variables part
    var totProb = getCortimat(model)  +
                  document.forms.totprob.Edadges.value * model.Edadges +
                  (document.forms.totprob.Peso100.value /100.0)* model.Peso100 +
                  document.forms.totprob.Apgar5.value * model.Apgar5 +
                  document.forms.totprob.Temping.value * model.Temping +
                  model.Intercept;
     //yes no              
    if(document.forms.totprob.Pmult.checked){
        totProb = totProb + model.Pmult;
     }
    
    if(document.forms.totprob.Toxemia.checked){
        totProb = totProb + model.Toxemia;
     }
    
    if(document.forms.totprob.Reanener.checked){
        totProb = totProb + model.Reanener;
     }
    
    if(document.forms.totprob.Emhgr.checked){
        totProb = totProb + model.Emhgr;
     }
     // multiple choice but binary in reality
     if (document.forms.totprob.Nivelas.value == 'Other'){
         totProb = totProb + model.Nivelas;
     }
    
     if (document.forms.totprob.Sexo.value == 'M'){
         totProb = totProb + model.Sexo;
     }
    
    totProb = (1)/(1 + Math.exp(-totProb));
    //display the result
    var divobj = document.getElementById('totProb');
    divobj.style.display='block';
   if(totProb < 0.169){
                divobj.style.color = '#0d0'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very high survival probability";  }
            else  if(totProb <0.420){
                divobj.style.color = '#E7C518'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> High survival probability";
            }else  if(totProb <0.649){
                divobj.style.color = '#EB8420'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Low survival probability";
            }else{
                divobj.style.color = '#d00'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very low survival probability";
            }

    //divobj.innerHTML = "Exitus: "+totProb.toFixed(2).replace(".", ",") + "%";

}


function calculateTotal_model3(model = model3){}

function calculateTotal_model4(model = model40){
   var totProb = 0;
   if (document.forms.totprob.Diastot.value <=30 ){
    model = model41 ;
     //Model with intercept + continuous variables part
    totProb =  document.forms.totprob.Edadges.value * model.Edadges +
                  (document.forms.totprob.Peso100.value /100.0)* model.Peso100 +
                  document.forms.totprob.Apgar5.value * model.Apgar5 +
                  document.forms.totprob.Diastot.value * model.Diastot +
                  model.Intercept;
     //yes no              
    if(document.forms.totprob.Pmult.checked){
        totProb = totProb + model.Pmult;
     }
     
    if(document.forms.totprob.Cortipre.checked){
        totProb = totProb + model.Cortipre;
     }
    
    if(document.forms.totprob.Toxemia.checked){
        totProb = totProb + model.Toxemia;
     }
    
    if(document.forms.totprob.Emhgr.checked){
        totProb = totProb + model.Emhgr;
     }
     
    if(document.forms.totprob.Neumot.checked){
        totProb = totProb + model.Neumot;
     }
     
    if(document.forms.totprob.Entoroco.checked){
        totProb = totProb + model.Entoroco;
     }
    if(document.forms.totprob.Sepsisgr.checked){
        totProb = totProb + model.Sepsisgr;
     }
    if(document.forms.totprob.Hiv.checked){
        totProb = totProb + model.Hiv;
     }
    if(document.forms.totprob.Hivgr.checked){
        totProb = totProb + model.Hivgr;
     }

   }
   else {
    model = model42 ;
     //Model with intercept + continuous variables part
    totProb =  document.forms.totprob.Edadges.value * model.Edadges +
                  (document.forms.totprob.Peso100.value /100.0)* model.Peso100 +
                  document.forms.totprob.Apgar5.value * model.Apgar5 +
                  document.forms.totprob.Diastot.value * model.Diastot +
                  model.Intercept;
     //yes no  
    if(document.forms.totprob.Pmult.checked){
        totProb = totProb + model.Pmult;
     }
     
    if(document.forms.totprob.Cortipre.checked){
        totProb = totProb + model.Cortipre;
     }
    if(document.forms.totprob.Entoroco.checked){
        totProb = totProb + model.Entoroco;
     }
    if(document.forms.totprob.Sepsisgr.checked){
        totProb = totProb + model.Sepsisgr;
     }
    if(document.forms.totprob.Hivgr.checked){
        totProb = totProb + model.Hiv;
     }

    if(document.forms.totprob.Dbp.checked){
        totProb = totProb + model.Dbp;
     }
    //if(document.forms.totprob.Dbpgr.checked){
    //    totProb = totProb + model.Dbpgr;
    // }
    if(document.forms.totprob.Anemia.checked){
        totProb = totProb + model.Anemia;
     }
    if(document.forms.totprob.Ecngr.checked){
        totProb = totProb + model.Ecngr;
     }
    if(document.forms.totprob.Lmpvgr.checked){
        totProb = totProb + model.Lmpvgr;
     }

    
   }
    totProb = (1)/(1 + Math.exp(-totProb));
    //display the result
    var divobj = document.getElementById('totProb');
    divobj.style.display='block';


    if (model.Diastot <= 30){    
            if(totProb < 0.146){
                divobj.style.color = '#0d0'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very high survival probability";  }
            else  if(totProb <0.418){
                divobj.style.color = '#E7C518'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> High survival probability";
            }else  if(totProb <0.746){
                divobj.style.color = '#EB8420'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Low survival probability";
            }else{
                divobj.style.color = '#d00'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very low survival probability";
            }
    }else{
            if(totProb < 0.0277){
                divobj.style.color = '#0d0'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very high survival probability";  }
            else  if(totProb <0.114){
                divobj.style.color = '#E7C518'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> High survival probability";
            }else  if(totProb <0.29){
                divobj.style.color = '#EB8420'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Low survival probability";
            }else{
                divobj.style.color = '#d00'
                divobj.innerHTML = "Mortality Score: "+totProb.toFixed(3).replace(".", ",")  + "<br /> Very low survival probability";
        }


    }     

     
 
}


//useless function but will stay here anywasys
function hideTotal(){
    var divobj = document.getElementById('totProb');
    divobj.style.display='block';
    divobj.innerHTML = " ";
}




// Utilities functions

function updateValue(slider) {
        var id        = slider.id;
        if (!id) {
            return;
        }
        var val       = document.getElementById(id + '_value');
        // Find the span whose id is the id of the slider + _value..
        if (val) {
            val.innerHTML = slider.value; // And update it!
        }
    }


// SLIDERS UPDATE
function updateSliders(model=1) {
   var sliders = document.getElementsByClassName('slider');
   // class='slider' elements :p
   var len     = sliders.length;

   for ( var i = 0; i < len; i++ ) {
       var slider = sliders[i];
       slider.addEventListener('change', function() {
           updateValue(this);
       });
   
       updateValue(slider);
   }
   
   //switch(model) {
   //    case 1:
   //        calculateTotal();
   //        break;
   //    case 2:
   //        calculateTotal_model2();
   //        break;
   //    case 3:
   //        calculateTotal_model3();
   //        break;
   //    case 4:
   //      calculateTotal_model4();
   //      break;
   //    default:
   //        calculateTotal();
   //}

   
}



/*menu cortina*/


var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            
            //if (modeltype ==1 ){
            //calculateTotal();
            //  
            //}else {
            //  if (modeltype==2){
            //    calculateTotal_model2();
            //  }else{
            //    calculateTotal_model4();
            //  }
            //}
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
