
/**
 * Sanitizes an input string by escaping special characters.
 *
 * @param {string} input - The input string to be sanitized.
 * @returns {string} The sanitized string with special characters escaped.
 */

export function sanitizeInput(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  