const generateBtn = document.getElementById("generateBtn");
const topic = document.getElementById("topic");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

generateBtn.addEventListener("click", generateScript);

async function generateScript() {

    if (topic.value.trim() === "") {
        alert("Please enter a topic.");
        return;
    }

    loading.style.display = "block";
    output.value = "";

    const language = document.getElementById("language").value;
    const style = document.getElementById("style").value;

    const prompt = `
Write a professional YouTube script.

Topic: ${topic.value}

Language: ${language}

Style: ${style}

Make it engaging with:
- Strong Hook
- Introduction
- Main Content
- Conclusion
- Call To Action
`;

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +"AQ.Ab8RN6K9HgKtwls--YL5EuDuoaUJT1sYj-YDB49KI28E_luOVA ,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        output.value =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response received.";

    } catch (error) {

        output.value = "Error : " + error.message;

    }

    loading.style.display = "none";
}
