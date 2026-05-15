document
    .getElementById("analyzeBtn")
    .addEventListener("click", analyzeResume);

async function analyzeResume() {

    try {

        const fileInput =
            document.getElementById("resume");

        const jd =
            document.getElementById("jobDescription").value;

        if (!fileInput.files.length) {

            alert("Upload PDF resume");

            return;
        }

        const formData = new FormData();

        formData.append(
            "resume",
            fileInput.files[0]
        );

        formData.append(
            "job_description",
            jd
        );

        const response = await fetch(

            "http://127.0.0.1:5000/analyze",

            {
                method: "POST",
                body: formData
            }
        );

        // DEBUG
        console.log(response);

        const data = await response.json();

        console.log(data);

        if (data.score !== undefined) {

            document.getElementById("result").innerHTML =

                "ATS Match Score: " + data.score + "%";
        }

        else {

            document.getElementById("result").innerHTML =

                "Error: " + JSON.stringify(data);
        }

    }

    catch(error) {

        console.log(error);

        document.getElementById("result").innerHTML =

            "Something went wrong";
    }
}