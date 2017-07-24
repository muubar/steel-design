$("#solution-text").append("<div>$\B-Exact\\hspace{0.2cm}design:-$</div><div>\\[\{1} - Stiffness:\\]</div>");
    var iy = (Math.sqrt((parseFloat(primarySection.Iy)+parseFloat(primarySection.area)*Math.pow(parseFloat(primarySection.e) + (parseFloat(tg)/2), 2))/parseFloat(primarySection.area))).toFixed(3);
    math = "<div>$i_{x}=i_{y}=\\sqrt{\\frac{I_{y}+A(e+\\frac{t_{g}}{2})^2}{A}}=\\sqrt{\\frac{" + primarySection.Iy + "+" + primarySection.area + "(" + primarySection.e + "+\\frac{" + tg + "}{2})^2}{" + primarySection.area + "}}=" + iy + "\\hspace{0.2cm}cm$</div>";
    $("#solution-text").append(math);

    math = "<div>$\\lambda_{x}=\\frac{L_{x} \\times 100}{" + iy + "}=" +((lx*100)/parseFloat(primarySection.ix)).toFixed(3) + "\\leqslant  300 \\hspace{0.5cm}";
    if ((lx*100)/parseFloat(iy) <= 300) { math+= "O.K.$</div>"; }
    else { 
        while ((lx*100)/parseFloat(iy) > 300) {
            var rsec = refind(aPrimary); 
            if (rsec === -1) { return -1; }
            primarySection = rsec[0]; aPrimary = rsec[0].area ; math+= rsec[1];
            $("#solution-text").append(math);
            
             iy = (Math.sqrt((parseFloat(primarySection.Iy)+parseFloat(primarySection.area)*Math.pow(parseFloat(primarySection.e) + (parseFloat(tg)/2), 2))/parseFloat(primarySection.area))).toFixed(3);
            math = "<div>$\\lambda_{x}=\\frac{L_{x} \\times 100}{" + iy + "}=" +((lx*100)/parseFloat(iy)).toFixed(3) + "\\leqslant  300 \\hspace{0.5cm}";
            if ((lx*100)/parseFloat(iy) <= 300) { math+= "O.K.$</div>"; }
        } 
    } 
     $("#solution-text").append(math);
    
    math = "<div>$\\lambda_{y}=\\frac{L_{y} \\times 100}{" + iy + "}=" +((ly*100)/parseFloat(iy)).toFixed(3) + "\\leqslant  300 \\hspace{0.5cm}";
    if ((ly*100)/parseFloat(iy) <= 300) { math+= "O.K.$</div>"; }
    else { 
        while ((ly*100)/parseFloat(iy) > 300) {
            var rsec = refind(aPrimary);
            if (rsec === -1) { return -1; }
            primarySection = rsec[0]; aPrimary = rsec[0].area ; math+= rsec[1];
            $("#solution-text").append(math);
            
            iy = (Math.sqrt((parseFloat(primarySection.Iy)+parseFloat(primarySection.area)*Math.pow(parseFloat(primarySection.e) + (parseFloat(tg)/2), 2))/parseFloat(primarySection.area))).toFixed(3);
            math = "<div>$i_{y}=\\sqrt{\\frac{" + primarySection.Iy + "+" + primarySection.area + "(" + primarySection.e + "+\\frac{" + tg + "}{2})^2}{" + primarySection.area + "}}=" + iy + "\\hspace{0.2cm}cm$</div>";
    $("#solution-text").append(math);
            math = "<div>$\\lambda_{y}=\\frac{L_{y} \\times 100}{" + iy + "}=" +((ly*100)/parseFloat(iy)).toFixed(3) + "\\leqslant  300 \\hspace{0.5cm}";
            if ((ly*100)/parseFloat(iy) <= 300) { math+= "O.K.$</div>"; }
        } 
    }
    $("#solution-text").append(math);