
let currentQuestion = 0;
let responses = [];

const questions = [
    {
        question: "PHYSICAL DIMENSION",
        options: [
            { text: "Your skin feels soft and smooth. <br>  You have a fair complexion, <br> black curly hair, and dark eyes.(Kapha)", image: "d1a.jpg" },
            { text: "You tend to have moles, marks, or freckles. <br>  Your skin is soft, glowing, and fair.(Pitta)", image: "d1b.jpg" },
            { text: "Your skin and hair feel rough.  <br> Your limbs are long, joints move easily, <br> bones, veins, or tendons are clearly visible.(Vata)", image: "d1c.jpg" }
        ]
    },
    {
        question: "AGNI ASSESSMENT",
        options: [
            { text: "You do not feel hungry or thirsty very often. <br> You can easily tolerate delays in meals.", image: "d2a.jpg" },
            { text: "You feel hungry and thirsty quickly.  <br> cannot tolerate missing meals. <br> You enjoy eating.", image: "d2b.jpg" },
            { text: "Your hunger and thirst are irregular. <br>  Sometimes you can tolerate delays, sometimes you cannot. <br> Your eating pattern changes often.", image: "d2c.jpg" }
        ]
    },
    {
        question: "BEHAVIOURAL DIMENSION 1",
        options: [
            { text: "You take time to start tasks and prefer a steady pace. <br> You may take longer to understand things but remember them well", image: "d3a.jpg" },
            { text: "You plan your work carefully. <br> You have sharp understanding and strong intelligence", image: "d3b.jpg" },
            { text: "You get excited easily <br> want to participate in many activities. <br> You understand quickly but may forget things sooner.", image: "d3c.jpg" }
        ]
    },
    {
        question: "BEHAVIOURAL DIMENSION 2",
        options: [
            { text: "You prefer being alone, speak less, and move slowly. <br> You are calm and rarely get angry.", image: "d4a.jpg" },
            { text: "You socialize when necessary. <br> You are courageous and confident <br>  may get angry easily.", image: "d4b.jpg" },
            { text: "You are outgoing and talkative. <br> You walk and eat quickly. <br> You may experience mood changes<br> You prefer expressing yourself verbally.", image: "d4c.jpg" }
        ]
    },
    {
        question: "PHYSIOLOGICAL DIMENSION",
        options: [
            { text: "You sweat more but the smell is mild.", image: "d5a.jpg" },
            { text: "You sweat more and the smell is strong. <br>  You cannot tolerate heat well. <br> You pass urine and stool in larger quantities.", image: "d5b.jpg" },
            { text: "You sweat very little and cannot tolerate cold. <br> You pass urine frequently <br> You may often experience constipation.", image: "d5c.jpg" }
        ]
    }
];



function loadQuestion() {
    const qBox = document.getElementById("questionBox");
    const image = document.getElementById("resultImage");
    image.style.display = "none";

    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        let html = `<h3>${q.question}</h3>`;
html += '<div class="options-container">';
q.options.forEach((option, index) => {
    html += `<button class="option-btn" data-index="${index}">${option.text}</button>`;
});
html += '</div>';
html += `<br><button class="option-btn" id="nextBtn" style="display:none;">Next</button>`;
qBox.innerHTML = html;
       
    } else {
        showFinalScreen();
    }
}


// Handle clicks
document.addEventListener("click", function(e) {
    if(e.target && e.target.classList.contains("option-btn") && e.target.id != "nextBtn" && e.target.id != "copyBtn"){
        const index = e.target.getAttribute("data-index");
        const image = document.getElementById("resultImage");
        image.src = questions[currentQuestion].options[index].image;
        image.style.display = "block";

        responses.push({
            question: questions[currentQuestion].question,
            answer: questions[currentQuestion].options[index].text,
            image: questions[currentQuestion].options[index].image
        });

        // Disable other options
        const buttons = document.querySelectorAll(".option-btn[data-index]");
        buttons.forEach(btn => btn.disabled = true);
        e.target.style.backgroundColor = "#8c6b4f"; // Highlight selected

        // Add download button if not already
        let qBox = document.getElementById("questionBox");
        if(!document.getElementById("downloadBtn")) {
            let downloadHTML = `<br><a id="downloadBtn" href="${questions[currentQuestion].options[index].image}" download="Prakruti_${currentQuestion+1}.jpg">
                                <button class="option-btn">Download Image</button></a>`;
            qBox.innerHTML += downloadHTML;
        }

        // Show next button
        const nextBtn = document.getElementById("nextBtn");
        if(nextBtn) nextBtn.style.display = "inline-block";
    }

    if(e.target && e.target.id == "nextBtn"){
        currentQuestion++;
        loadQuestion();
    }

    if(e.target && e.target.id == "copyBtn"){
        let text = responses.map((r,i) => `${i+1}. ${r.question}\nSelected: ${r.answer}`).join("\n\n");
        navigator.clipboard.writeText(text).then(() => alert("Responses copied to clipboard!"));
    }
});

function showFinalScreen() {
    const qBox = document.getElementById("questionBox");
    const image = document.getElementById("resultImage");
    image.style.display = "none";

    let html = "<h3>Thank you for completing the assessment!</h3><br>";

    responses.forEach((item, index) => {
        html += `<b>${index+1}. ${item.question}</b><br>`;
        html += `${item.answer}<br>`;
        html += `<a href="${item.image}" download="Prakruti_${index+1}.jpg">
                    <img src="${item.image}" style="width:150px; border-radius:10px; margin:10px;">
                 </a><br><br>`;
    });

    html += `<button id="copyBtn">Copy My Responses</button>`;
    qBox.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", loadQuestion);