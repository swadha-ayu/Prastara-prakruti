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
            { text: "You sweat less. Can tolerate heat.", image: "d5a.jpg" },
            { text: "You sweat more and the smell is strong. <br>  You cannot tolerate heat well. <br> You pass urine and stool in larger quantities.", image: "d5b.jpg" },
            { text: "You sweat very little and cannot tolerate cold. <br> You pass urine frequently <br> You may often experience constipation.", image: "d5c.jpg" }
        ]
    }
];


let currentQuestion = 0;
let responses = [];

function loadQuestion() {

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const image = document.getElementById("resultImage");

    nextBtn.style.display = "none";
    image.style.display = "none";
    optionsEl.innerHTML = "";

    if (currentQuestion >= questions.length) {
        showFinalResult();
        return;
    }

    questionEl.innerText = questions[currentQuestion].question;

    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.innerHTML = option.text;
        button.setAttribute("data-index", index);
        optionsEl.appendChild(button);
    });
}

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("option-btn")) {

        const index = e.target.getAttribute("data-index");
        const image = document.getElementById("resultImage");

        image.src = questions[currentQuestion].options[index].image;
        image.style.display = "block";

        responses.push({
            question: questions[currentQuestion].question,
            answer: questions[currentQuestion].options[index].text,
            image: questions[currentQuestion].options[index].image
        });

        const buttons = document.querySelectorAll(".option-btn");

        buttons.forEach(btn => {
            if (btn !== e.target) {
                btn.disabled = true;
                btn.classList.add("disabled-not-selected");
            } else {
                btn.classList.add("selected");
            }
        });

        document.getElementById("nextBtn").style.display = "inline-block";
    }

    if (e.target.id === "nextBtn") {
        currentQuestion++;
        loadQuestion();
    }
});

function showFinalResult() {

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const image = document.getElementById("resultImage");
    const nextBtn = document.getElementById("nextBtn");

    questionEl.innerHTML = "🙏 Thank You for Completing Prakruti Pariksha 🙏";
    optionsEl.innerHTML = "";
    image.style.display = "none";
    nextBtn.style.display = "none";

    responses.forEach(r => {

        const block = document.createElement("div");
        block.style.marginBottom = "25px";

        block.innerHTML = `
            <h3>${r.question}</h3>
            <p><strong>Selected:</strong> ${r.answer}</p>
            <img src="${r.image}" style="width:180px; border-radius:8px; margin-top:10px;">
        `;

        optionsEl.appendChild(block);
    });
}

loadQuestion();




