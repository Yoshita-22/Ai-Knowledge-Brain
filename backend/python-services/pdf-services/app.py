from flask import Flask, request, jsonify
import pdfplumber

app = Flask(__name__)

@app.route('/extract', methods=['POST'])
def extract():
    file = request.files['file']

    tables = []

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                tables.append(table)

    return jsonify({
        "tables": tables
    })

if __name__ == '__main__':
    app.run(port=5000)