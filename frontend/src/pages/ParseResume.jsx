import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// ✅ Import worker as a URL (Vite/Webpack compatible)
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Tell pdf.js where the worker is (must be a string URL)
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ParseResume() {
    const [parsedData, setParsedData] = useState(null);
    const [load, setLoad] = useState(false);

    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        setLoad(true)
        const file = e.target.files[0];
        if (!file) return;

        let text = "";
        if (file.type === "application/pdf") {
            text = await extractFromPDF(file);
        } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            text = await extractFromDocx(file);
        } else if (file.type.startsWith("text/")) {
            text = await file.text();
        }

        const parsed = parseResume(text);
        console.log("Parsed Resume Data:", parsed);
        setParsedData(parsed);
        setLoad(false)
    };

    // -------- PDF Extract ----------
    async function extractFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((s) => s.str).join(" ") + "\n";
        }
        return text;
    }

    // -------- DOCX Extract ----------
    async function extractFromDocx(file) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    // -------- Resume Parser ----------
    function parseResume(text) {
        const nameRegex = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\d{10})/;

        return {
            name: text.match(nameRegex)?.[0] || "Not found",
            email: text.match(emailRegex)?.[0] || "Not found",
            phone: text.match(phoneRegex)?.[0] || "Not found",
            "some skills": extractSkills(text),
        };
    }

    function extractSkills(text) {
        const skillsList = [
            "JavaScript",
            "React.js",
            "Node.js",
            "Python",
            "Java",
            "SQL",
            "AWS",
            "Express.js",
            "Typescript",
            "CSS",
            "Material UI",
            "Tailwind"


        ];
        return skillsList.filter((skill) =>
            new RegExp(`\\b${skill}\\b`, "i").test(text)
        );
    }

    return (
        <div style={{ padding: "5px", fontFamily: "Arial", background: "white", borderRadius: 5 }}>
            <p style={{ fontFamily: "monospace", color: "grey", margin: 3 }}>
                Throw your resume to see name, email & skills!
            </p>
            {load && <p style={{ color: "grey" }}>wait...</p>}
            {/* Hidden Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
            />

            {/* Custom Button */}
            <button
                onClick={() => fileInputRef.current.click()}
                style={{
                    background: "green",
                    color: "white",
                    borderRadius: "6px",
                    padding: "3px 5px",
                    cursor: "pointer",
                    border: "none",
                }}
            >
                Upload
            </button>

            {parsedData && (
                <pre
                    style={{
                        marginTop: "20px",
                        background: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    {JSON.stringify(parsedData, null, 2)}
                </pre>
            )}
        </div>
    );
}
