
let currentQuestion = 0;
let responses = [];

const questions = [
    {
        question: "PHYSICAL DIMENSION",
        options: [
            { text: "Your skin feels soft and smooth. You have a fair complexion, black curly hair, and dark eyes.(Kapha)", image: "images/d1a.jpg" },
            { text: "You tend to have moles, marks, or freckles. Your skin is soft, glowing, and fair.(Pitta)", image: "images/d1b.jpg" },
            { text: "Your skin and hair feel rough. Your limbs are long, joints move easily, and bones, veins, or tendons are clearly visible.(Vata)", image: "images/d1c.jpg" }
        ]
    },
    {
        question: "AGNI ASSESSMENT",
        options: [
            { text: "You do not feel hungry or thirsty very often. You can easily tolerate delays in meals.", image: "images/d2a.jpg" },
            { text: "You feel hungry and thirsty quickly and cannot tolerate missing meals. You enjoy eating.", image: "images/d2b.jpg" },
            { text: "Your hunger and thirst are irregular. Sometimes you can tolerate delays, sometimes you cannot. Your eating pattern changes often.", image: "images/d2c.jpg" }
        ]
    },
    {
        question: "BEHAVIOURAL DIMENSION 1",
        options: [
            { text: "You take time to start tasks and prefer a steady pace. You may take longer to understand things but remember them well", image: "images/d3a.jpg" },
            { text: "You plan your work carefully. You have sharp understanding and strong intelligence", image: "images/d3b.jpg" },
            { text: "You get excited easily and want to participate in many activities. You understand quickly but may forget things sooner.", image: "images/d3c.jpg" }
        ]
    },
    {
        question: "BEHAVIOURAL DIMENSION 2",
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
            html += `<button class="option-btn" data-index="${index}">${option.text}</button>`;
        });
        html += `<br><br><button class="option-btn" id="nextBtn" style="display:none;">Next</button>`;
        qBox.innerHTML = html;
    } else {
        showFinalScreen();
    }
}

// Handle clicks
document.addEventListener("click", function(e){
    // Option clicked
    if(e.target && e.target.classList.contains("option-btn") && e.target.id != "nextBtn"){
        const index = e.target.getAttribute("data-index");
        const image = document.getElementById("resultImage");
        image.src = questions[currentQuestion].options[index].image;
        image.style.display = "block";

        responses.push({
            question: questions[currentQuestion].question,
            answer: questions[currentQuestion].options[index].text
        });

        // Show next button
        const nextBtn = document.getElementById("nextBtn");
        if(nextBtn) nextBtn.style.display = "inline-block";
    }

    // Next button clicked
    if(e.target && e.target.id == "nextBtn"){
        currentQuestion++;
        loadQuestion();
    }

    // Copy responses clicked
    if(e.target && e.target.id == "copyBtn"){
        let text = responses.map((r,i) => `${i+1}. ${r.question}\nSelected: ${r.answer}`).join("\n\n");
        navigator.clipboard.writeText(text).then(() => alert("Responses copied to clipboard!"));
    }
});

// Show final screen
function showFinalScreen() {
    const qBox = document.getElementById("questionBox");
    const image = document.getElementById("resultImage");
    image.style.display = "none";

    let html = "<h3>Thank you for completing the assessment!</h3><br>";
    responses.forEach((item, index) => {
        html += `<b>${index+1}. ${item.question}</b><br>`;
        html += `${item.answer}<br><br>`;
    });

    html += `<button id="copyBtn">Copy My Responses</button>`;
    qBox.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
});

