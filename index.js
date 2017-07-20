
$(document).ready(function () {
    //define sections object here (and bolts properties maybe?)
    
    //append bolt-type select menu when "bolted" connection is picked
    $("#bolted").click(function() {
        if ($("#bolt-label").length === 0) {
        var selectMenu = '<label for="bolt" id="bolt-label">Bolt:</label><select class="form-control" id="bolt" required><option value="M12" selected>M12</option><option value="M14">M14</option><option value="M16">M16</option></select>';
        $(selectMenu).appendTo($("#connection"));
        }
    });
    //removes bolt-type select menu when "welded" connection is picked (if it exists)
    $("#welded").click(function() {
        $("#bolt").remove();
        $("#bolt-label").remove();
    });
    
    //store objects that require validation then enter input validation stage (style only)
    update();
    
    //update array of objects that require validation when design procedure is changed  
    $("#main-selector").change( function() {
        update();
    });
    
    //do a real check for values and then call the required design function
    $("#btn-solve").click( function() {
        $(".validate").each( function(i,el) {
            if (!$(el).data("valid")) {
                return null;
            }
            else {
                //pick design function and call it
            }
        });
    });
    
    
});

function checkMe() {
    if (/\D+/.test($("#" + this.id).val()) === true || $("#" + this.id).val() <= 0) {
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