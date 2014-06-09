var paper, set;
paper = Raphael(0, 0, 900, 600);

paper.setStart();

paper.path('M125 75 L150 50 L215 115 L180 150 L145 115 L215 50 L240 75').attr({ stroke: '#5CE600', 'stroke-width': 14 });

set = paper.setFinish();
set.attr({
    'font-family': 'Arial'
});
