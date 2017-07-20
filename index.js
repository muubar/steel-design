$(document).ready(function () {
    $("#btnSave").click(function() { 
        html2canvas($("#solution"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                var data = canvas.toDataURL('image/png');
                var image = new Image();
                image.src = data;
                var doc = new jsPDF();
                doc.addImage(image,0,0,0)
                doc.save('solution.pdf')
                }
        });
    });
    
    $("#bolted").click(function() {
        if ($("#bolt-label").length == 0) {
        var selectMenu = '<label for="bolt" id="bolt-label">Bolt:</label><select id="bolt" required><option value="M12" selected>M12</option><option value="M14">M14</option><option value="M16">M16</option></select>';
        $(selectMenu).appendTo($("#connection"));
        }
    });
    $("#welded").click(function() {
        $("#bolt").remove();
        $("#bolt-label").remove();
    });
});