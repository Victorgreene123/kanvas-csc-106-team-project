// modules/utils.js

/**
 * Fetches and returns the content of an HTML file.
 * @param {string} filePath - The path to the HTML file.
 * @returns {Promise<string>} A promise that resolves with the HTML content.
 */
export async function getHtml(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const htmlContent = await response.text();
      return htmlContent;
    } catch (error) {
      console.error(`Could not fetch HTML from ${filePath}:`, error);
      return '';
    }
  }