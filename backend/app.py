from flask import Flask, request, jsonify

from flask_cors import CORS

import os

from analyzer import extract_text, analyze_resume

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = '../uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/analyze', methods=['POST'])

def analyze():

    # Get uploaded file
    file = request.files['resume']

    # Save file
    file_path = os.path.join(
        app.config['UPLOAD_FOLDER'],
        file.filename
    )

    file.save(file_path)

    # Get job description
    jd = request.form['job_description']

    # Extract resume text
    resume_text = extract_text(file_path)

    # Calculate ATS score
    score = analyze_resume(resume_text, jd)

    return jsonify({
        "score": score
    })

if __name__ == '__main__':
    app.run(debug=True)