let currentQuestion = 0;
let responses = [];
const questions = [
    {
        question: "PHYSICAL DIMENSION",
        options: [
            {
                text: "Your skin feels soft and smooth. You have a fair complexion, black curly hair, and dark eyes.(Kapha)",
                image: "images/d1a.jpg"
            },
            {
                text: "You tend to have moles, marks, or freckles. Your skin is soft, glowing, and fair.(Pitta)",
                image: "images/d1b.jpg"
            },
            {
                text: "Your skin and hair feel rough. Your limbs are long, joints move easily, and bones, veins, or tendons are clearly visible.(Vata)",
                image: "images/d1c.jpg"
            }
        ]
    },
    {
        question: "AGNI ASSESSMENT",
        options: [
            {
                text: "You do not feel hungry or thirsty very often. You can easily tolerate delays in meals.",
                image: "images/d2a.jpg"
            },
            {
                text: "You feel hungry and thirsty quickly and cannot tolerate missing meals. You enjoy eating.",
                image: "images/d2b.jpg"
            },
            {
                text: "Your hunger and thirst are irregular. Sometimes you can tolerate delays, sometimes you cannot. Your eating pattern changes often.",
                image: "images/d2c.jpg"
            }
        ]
    },

    {
        question: "BEHAVIOURAL DIMENSION 1 ",
        options: [
            { text: "You take time to start tasks and prefer a steady pace. You may take longer to understand things but remember them well", image: "images/d3a.jpg" },
            { text: "You plan your work carefully. You have sharp understanding and strong intelligence", image: "images/d3b.jpg" },
            { text: "You get excited easily and want to participate in many activities. You understand quickly but may forget things sooner.", image: "images/d3c.jpg" }
        ]
    },

    {
        question: "BEHAVIOURAL DIMENSION 2 ",
        options: [
            { text: "You prefer being alone, speak less, and move slowly. You are calm and rarely get angry.", image: "images/d4a.jpg" },
            { text: "You socialize when necessary. You are courageous and confident but may get angry easily.", image: "images/d4b.jpg" },
            { text: "You are outgoing and talkative. You walk and eat quickly. You may experience mood changes and prefer expressing yourself verbally.", image: "images/d4c.jpg" }
        ]
    },

    {
        question: "PHYSIOLOGICAL DIMENSION",
        options: [
            { text: "You sweat more but the smell is mild.", image: "images/d5a.jpg" },
            { text: "You sweat more and the smell is strong. You cannot tolerate heat well. You pass urine and stool in larger quantities.", image: "images/d5b.jpg" },
            { text: "You sweat very little and cannot tolerate cold. You pass urine frequently and may often experience constipation.", image: "images/d5c.jpg" }
        ]
    }
];

function loadQuestion() {
    const qBox = document.getElementById("questionBox");
    const image = document.getElementById("resultImage");
    image.style.display = "none";
    if (currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        let html = `<h3>${q.question}</h3>`;
        q.options.forEach((option, index) => {
            html += `<button class="option-btn" onclick="showImage(${index})">${option.text}</button>`;
        });
        qBox.innerHTML = html;
    } else {
        generatePDF();
    }
}
function showImage(optionIndex) {
    const image = document.getElementById("resultImage");

    // Prevent selecting multiple times
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    image.src = questions[currentQuestion].options[optionIndex].image;
    image.style.display = "block";

    responses.push({
        question: questions[currentQuestion].question,
        answer: questions[currentQuestion].options[optionIndex].text
    });

    const qBox = document.getElementById("questionBox");

    // Show Next or Finish button
    if (currentQuestion === questions.length - 1) {
        qBox.innerHTML += `<br><br>
            <button class="option-btn" onclick="generatePDF()">Finish</button>`;
    } else {
        qBox.innerHTML += `<br><br>
            <button class="option-btn" onclick="nextQuestion()">Next</button>`;
    }
}
function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function generatePDF() {
    if (!window.jspdf) {
        alert("PDF library not loaded. Please check internet connection.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Prana Ayurveda - Prakruti Self Assessment Report", 10, 15);

    doc.setFontSize(12);
    let y = 30;

    responses.forEach((item, index) => {
        doc.text((index + 1) + ". " + item.question, 10, y);
        y += 7;
        doc.text("Selected: " + item.answer, 15, y);
        y += 12;
    });

    doc.save("Prana_Ayurveda_Assessment_Report.pdf");
}
loadQuestion();