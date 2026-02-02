# Data Extraction & Secure Validation Project

## Overview

This project is a specialized Regular Expression (Regex) engine designed to extract, validate, and secure sensitive data from raw text files. It processes unstructured text to identify specific patterns such as URLs, phone numbers, currency amounts, credit card numbers, timestamps, HTML tags, and hashtags.

The system places a strong emphasis on security and privacy by effectively converting raw data into structured, sanitized JSON output.

## Project Structure & File Descriptions

The project consists of the following key files:

- **`index.js`**:
  - The core entry point of the application.
  - Contains all the logic for reading the input file.
  - Implements specific regex patterns for each data type.
  - Handles data sanitization (e.g., preventing XSS by filtering script tags).
  - Masks sensitive information like credit card numbers.
  - Outputs the final processed data to the console.

- **`input.txt`**:
  - A sample raw text file serving as the data source.
  - Contains a mix of unstructured text including invoices, emails, phone numbers, and hidden malicious code snippets for testing the validation logic.

- **`output.json`**:
  - Represents the final structure of the data after extraction.
  - Shows how the text from `input.txt` is transformed into clean, organized JSON arrays.
  - _Note: The program prints to the console; this file serves as a reference or a target for output redirection._

- **`package.json`**:
  - Manages project metadata and dependencies.
  - Defines the project as an ES module (`"type": "module"`), allowing the use of modern `import` statements.

## Features

This tool identifies and processes the following 8 data categories:

1. **URLs**: Extracts web links while stripping out potentially malicious javascript protocols.
2. **Phone Numbers**: Identifies various formats (e.g., (555) 123-4567, +1-555...).
3. **Currency Amounts**: Extracts monetary values like $1,250.50.
4. **Credit Cards**: Detects 16-digit card numbers and **masks** them (e.g., `****-****-****-1234`) to ensure privacy.
5. **Timestamps**: Captures time formats including 24-hour and AM/PM styles.
6. **HTML Tags**: Extracts HTML elements but explicitly filters out `<script>` tags to prevent checking for injection attacks.
7. **Hashtags**: Pulls social media tags (e.g., #DataSecurity).
8. **Email Addresses**: (Note: The extraction logic implies handling of contact info, though specific email regex might be part of a broader contact extraction or future enhancement).

## Prerequisites

- **Node.js**: The runtime environment required to execute the JavaScript code.

## How to Run the Program

1. **Install Dependencies**:
   Open your terminal in the project directory and run:

   ```bash
   npm install
   ```

2. **Execute the Script**:
   Run the main application file:

   ```bash
   node index.js
   ```

3. **View Output**:
   The extracted and sanitized data will constitute a JSON object printed directly to your terminal.

   To save the output to a file (like `output.json`), you can redirect it:

   ```bash
   node index.js > output.json
   ```

## What You Get (Output)

The program generates a clean JSON object containing arrays for each data type.

**Example Output:**

```json
{
  "urls": [
    "https://portal.company-corp.io/updates/v2.",
    "http://docs.internal.net/help/index.html."
  ],
  "phoneNumbers": ["(555) 123-4567", "555.987.6543", "+1-555-000-1111"],
  "currencyAmounts": ["$1,250.50", "$450.00"],
  "creditCards": ["****-****-****-3456", "****-****-****-7654"],
  "timestamps": ["08:30", "16:45", "11:15 PM"],
  "htmlTags": [
    "<div class=\"news-item\">",
    "<img src=\"logo.png\" alt=\"Company Logo\">"
  ],
  "hashtags": ["#4592", "#DataSecurity", "#JuniorDeveloper2024"]
}
```
