# Data Extraction & Secure Validation

This project extracts structured data from raw text using Regular Expressions (Regex) and validates it for security and accuracy.

## How to Run

1. Ensure you have Node.js installed.
2. Place your raw text in `input.txt`.
3. Run the program:
   ```bash
   node index.js
   ```

## Features

- Extracts Emails, URLs, Phone Numbers, and Currency Amounts ...
- Handles malformed and malicious input.
- Masks sensitive information like Credit Card numbers.
- Outputs data in a structured JSON format.

## Security Considerations

- **Sanitization:** Rejects entries containing potential script injections.
- **Privacy:** Masks sensitive data fields.
- **Robustness:** Uses specific regex patterns to avoid performance issues like Regular Expression Denial of Service (ReDoS)
