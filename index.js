// Import the 'fs' (filesystem) module to read files from the disk
import fs from 'fs';

/**
 * Reads raw text from a file.
 * @param {string} filePath - The path to the file to be read
 * @returns {string} - The content of the file or an empty string if an error occurs
 */
function readInput (filePath) {
    try {
        // Read file synchronously with 'utf8' encoding for plain text
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        // Log an error message to the console if the file is missing or unreadable
        console.log(`Error: ${filePath} not found.`);
        console.log(error);// Log the error object for debugging
        // Return an empty string to prevent the program from crashing
        return '';
    }
}

/**
 * Apply regex patterns to extract and validate data.
 * This function handles 8 different data types and includes security checks.
 * @param {string} text - The raw input text to process
 * @returns {Object} - An object containing arrays of extracted and validated data
 */
function extractData (text) {
    // Initialize the results object with empty arrays for each data type
    const results = {
        emails: [], // Extract email addresses
        urls: [], // Extract URLs
        phoneNumbers: [], // Extract phone numbers
        currencyAmounts: [], // Extract currency amounts
        creditCards: [], // This will hold masked sensitive data
        timestamps: [], // Extract timestamps
        htmlTags: [], // Extract HTML tags
        hashtags: [] // Extract hashtags
    };

    // Email Extraction
    // Regex matches common email formats starting and ending at word boundaries
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    // Extract all matches from the text; default to an empty array if none found
    const emailMatches = text.match(emailRegex) || [];
    // Filter out malformed emails (security/validation check)
    results.emails = emailMatches.filter(email => { // post-regex validation
        // Reject emails that contain double dots, which are invalid but often caught by loose regex
        return !email.includes('..');
    });

    // URL Extraction & Security Sanitization
    // Regex matches standard http/https URLs with various path and query parameters
    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    // Extract all URL matches; default to an empty array
    const urlMatches = text.match(urlRegex) || [];
    // Sanitize URLs to prevent malicious content from being processed downstream
    results.urls = urlMatches.filter(url => {
        // Security check: Block URLs that contain script tags or suspicious JavaScript protocols
        const lowerUrl = url.toLowerCase();
        return !lowerUrl.includes('<script>') && !lowerUrl.includes('javascript:');
    });

    // Phone Number Extraction
    // Regex handles formats like (123) 456-7890, 123-456-7890, and international prefixes
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    // Store all valid-looking phone matches
    results.phoneNumbers = text.match(phoneRegex) || [];

    // Currency Amount Extraction
    // Regex matches amounts starting with '$', handling commas for thousands and cent decimals
    const currencyRegex = /\$\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g;
    // Store all found currency values
    results.currencyAmounts = text.match(currencyRegex) || [];

    // Credit Card Number Extraction (SENSITIVE DATA - MASKING)
    // Regex identifies 16-digit patterns separated by spaces or dashes
    const ccRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b/g;
    // Extract all credit card matches; default to empty array
    const ccMatches = text.match(ccRegex) || [];
    // Mask sensitive data before it reaches output (Privacy protection)
    results.creditCards = ccMatches.map(cc => {
        // Remove spaces and dashes to confirm the number of digits
        const cleaned = cc.replace(/[-\s]/g, '');
        // If it's a valid 16-digit card, keep only the last 4 digits visible
        if (cleaned.length === 16) {
            return '****-****-****-' + cleaned.slice(-4);
        }
        // If format is unexpected, return as is (but the pattern should prevent this)
        return cc;
    });

    // Time Extraction
    // Regex handles 24-hour time (14:30) and 12-hour AM/PM formats
    const timeRegex = /\b(?:[01]?\d|2[0-3]):[0-5]\d(?:\s?[APM]{2})?\b/gi;
    // Store all timestamps found in the text
    results.timestamps = text.match(timeRegex) || [];

    // HTML Tag Extraction (Security check included)
    // Regex matches opening and closing HTML tags including attributes
    const tagRegex = /<\/?[a-z][\s\S]*?>/gi;
    // Extract tags; default to an empty array
    const tagMatches = text.match(tagRegex) || [];
    // Security: Filter out script tags to prevent potential Cross-site Scripting data
    results.htmlTags = tagMatches.filter(tag => !tag.toLowerCase().includes('script'));

    // Hashtag Extraction
    // Regex matches words starting with #
    const hashtagRegex = /#\w+/g;
    // Store all hashtags found
    results.hashtags = text.match(hashtagRegex) || [];

    // Return the final object containing all organized and validated data
    return results;
}

/*
 * Main function to start the program
 */
function main () {
    
    // Reading all the input data from the text file
    const inputText = readInput('input.txt');
    // Exit if the file was empty or could not be found

    if (!inputText) return; // If the file is empty or not found, the program will exit
    // console.log(inputText); // this can be used when you want to display your raw input data

    // Pass the text to the regex extraction function
    const extractedData = extractData(inputText);

    // Printing the final structured data as a formatted JSON string
    // This makes the output machine-readable and easy to verify
    console.log(JSON.stringify(extractedData, null, 4));
    // console.log(extractedData); // this can be used when you don't want to display your results in JSON format
}

// Calling the main function to start the program
main();
