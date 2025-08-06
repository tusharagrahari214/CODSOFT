// Simple animation for demo graphs
document.addEventListener('DOMContentLoaded', function () {
    const graphs = document.querySelectorAll('.graph-line');
    graphs.forEach(graph => {
        setTimeout(() => {
            graph.style.animationPlayState = 'running';
        }, 500);
    });
});