$(document).ready(function () {
    //define sections object here (and bolts properties maybe?)
    
    //append bolt-type select menu when "bolted" connection is picked
    $("#bolted").click(function() {
        if ($("#bolt-label").length === 0) {
        var selectMenu = '<label for="bolt" id="bolt-label" class="control-label col-xs-1">Bolt:</label><div id="removeme" class="col-xs-2"><select class="form-control" id="bolt"><option value="12" selected>M12</option><option value="14">M14</option><option value="16">M16</option></select></div>';
        $(selectMenu).appendTo($("#connection"));
        }
    });
    //removes bolt-type select menu when "welded" connection is picked (if it exists)
    $("#welded").click(function() {
        $("#bolt").remove();
        $("#bolt-label").remove();
        $("#removeme").remove();
    });
    
    //store objects that require validation then enter input validation stage (style only)
    update();
    
    //update array of objects that require validation when design procedure value is changed  
    $("#main-selector").change( function() {
        update();
    });
    
    //do a real check for values and then call the required design function
    $("#btn-solve").click( function() {
        var check = true;
        $(".validate").each( function(i,el) {
            $(el).trigger("change");
            if (!$(el).data("valid")) {
                check = false;
                return null;
            }
        });
        if ($("#main-selector").val() === "tension" && check) {
            $("#solution-text").empty();
            var c, b, v
            if ($("#welded").prop("checked")) { c = "welded"; }
            else { c = "bolted"; b = $("#bolt").val(); }
            if ($("#case1").prop("checked")) { v = "1"; }
            else { v = "2"; }
                
            tension($("#df").val(), $("#steel-grade").val(), c, b, $("#member-shape").val(), v, $("#lx").val(), $("#ly").val(), $("#tg").val());
        }
    });
});

function checkMe() {
    if (/^[+-]?\d+(\.\d+)?$/.test($("#" + this.id).val()) === false || $("#" + this.id).val() <= 0) {
        $("#" + this.id).css("border-color","#a94442");
        $("label[for="+this.id+"]").css("color", "#a94442");
        $(this).data("valid", false); 
    }
    else {
        $("#" + this.id).css("border-color","#ccc");
        $("label[for="+this.id+"]").css("color", "#333");
        $(this).data("valid", true);
        
    }
}

function update() {
    var validateArr = $(".validate");
    validateArr.each( function(i,el) {
        $(el).bind("change", checkMe);
    });
    //INSERT HTML-APPENDING INPUT-UPDATING CODE HERE!!
}

function tension(df,sg,connection,bolts,shape,ca,lx,ly,tg) {
    //inline $\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$
    var math = "<div>$A \\geqslant \\frac{"
    var value = ""
    $("#solution-text").append("<p>A-Primary design:</p><p>1-stress:</p>");
    math += "d.f.}{\\sigma_{t} \\times ";
    if (ca == 2) { math += "1.2 \\times "; }
    if (connection === "bolted") { math += "0.85 \\times "; }
    if (shape === "one angle") { math += "0.6} = \\frac{" + df + "}{"; value += df; }
    else { math+= "2} = \\frac{" + df + "}{"; value += df; }
    if (sg == 37) { math += "1.4 \\times "; value += "/(1.4"; }
    else if (sg == 44) { math += "1.6 \\times "; value += "/(1.6"; }
    else { math += "2.1 \\times "; value += "/(2.1"; }
    if (ca == 2) { math += "1.2 \\times "; value += "*1.2"; }
    if (connection === "bolted") { math += "0.85 \\times "; value += "*0.85"; }
    if (shape === "one angle") { math += "0.6} = "; value += "*0.6)"; }
    else { math+= "2} = "; value += "*2)"; };
    var aStress = eval(value).toFixed(3);
    math += aStress + " \\hspace{0.2cm} cm^2 \\hspace{0.5cm} \\sigma_{t}:Page \\hspace{0.2cm} 29$</div>";
    $("#solution-text").append(math);
    
    $("#solution-text").append("<p>2-stiffness:</p>");
    math = "<div>$a \\geqslant \\frac{L_{x} \\times 100}{";
    value = lx*100;
    if (shape === "one angle") { math += "0.2 \\times 300}="; value = value/(0.2*300); }
    else if (shape === "two angle") { math+= "0.3 \\times 300}="; value = value/(0.3*300); }
    else { math+= "0.385 \\times 300}="; value = value/(0.385*300); }
    math += "\\frac{" + parseFloat(lx*100).toFixed(3) + "}{"
    if (shape === "one angle") { math += "0.2 \\times 300}="; }
    else if (shape === "two angle") { math+= "0.3 \\times 300}="; }
    else { math+= "0.385 \\times 300}="; }
    var aStiffness1 = value.toFixed(3);
    math += aStiffness1 + "\\hspace{0.2cm} cm^2$</div>";
    $("#solution-text").append(math);
    
    math = "<div>$a \\geqslant \\frac{L_{y} \\times 100}{";
    value = ly*100;
    if (shape === "one angle") { math += "0.2 \\times 300}="; value = value/(0.2*300); }
    else if (shape === "two angle") { math+= "0.45 \\times 300}="; value = value/(0.45*300); }
    else { math+= "0.385 \\times 300}="; value = value/(0.385*300); }
    math += "\\frac{" + parseFloat(ly*100).toFixed(3) + "}{"
    if (shape === "one angle") { math += "0.2 \\times 300}="; }
    else if (shape === "two angle") { math+= "0.45 \\times 300}="; }
    else { math+= "0.385 \\times 300}="; }
    var aStiffness2 = value.toFixed(3);
    math += aStiffness2 + "\\hspace{0.2cm} cm^2$</div>";
    $("#solution-text").append(math);
    
    var aStiffness = aStiffness1 >= aStiffness2 ? aStiffness1:aStiffness2;
    math = "<div>$\\therefore a=" + aStiffness + "\\hspace{0.7cm}" ;
    //REQUIRES AREA TABLE
    if (aStress >= aStiffness) { math += aStress + " \\geqslant " + aStiffness + "\\rightarrow use \\hspace{0.2cm} x*x*t$</div>"; }
    else { math += aStiffness + "\\geqslant " + aStress + "\\rightarrow use \\hspace{0.2cm} x*x*t$</div>"; }
    $("#solution-text").append(math);
    MathJax.Hub.Typeset();
}