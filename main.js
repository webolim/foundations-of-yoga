document.addEventListener("DOMContentLoaded", function() {
    const containers = [
        { id: 'questions-2marks-container', url: 'questions_2marks.json' },
        { id: 'questions-6marks-container', url: 'questions_6marks.json' },
        { id: 'questions-15marks-container', url: 'questions_15marks.json' }
    ];

    let questionCounter = 1;
    const fetchPromises = containers.map(container => fetch(container.url).then(response => response.json()));

    Promise.all(fetchPromises)
        .then(dataArrays => {
            dataArrays.forEach((data, index) => {
                const container = document.getElementById(containers[index].id);
                data.forEach(item => {
                    const button = document.createElement('button');
                    button.className = 'accordion';

                    const questionNumber = document.createElement('span');
                    questionNumber.className = 'question-number';
                    questionNumber.textContent = `${questionCounter}.`;
                    button.appendChild(questionNumber);

                    const questionText = document.createElement('span');
                    questionText.className = 'question-text';
                    questionText.textContent = item.question;
                    button.appendChild(questionText);

                    questionCounter++;

                    const panel = document.createElement('div');
                    panel.className = 'panel';
                    const panelContent = document.createElement('div');
                    panelContent.className = 'panel-content';
                    panelContent.innerHTML = item.answer;
                    panel.appendChild(panelContent);

                    container.appendChild(button);
                    container.appendChild(panel);
                });
            });

            const acc = document.getElementsByClassName("accordion");
            for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    for (let j = 0; j < acc.length; j++) {
                        if (i !== j) {
                            acc[j].classList.remove("active");
                            acc[j].nextElementSibling.style.maxHeight = null;
                        }
                    }

                    this.classList.toggle("active");
                    const panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        let content = panel.querySelector('.panel-content');
                        panel.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            }
        });
});
