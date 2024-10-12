class StringCalculator {
    // Main function to add numbers in a string
    add(numbers) {
      // Step 1: Handle the empty string case
      if (this.isEmpty(numbers)) return 0;
  
      // Step 2: Determine if a custom delimiter is provided
      const { delimiter, sanitizedNumbers } = this.extractDelimiter(numbers);
  
      // Step 3: Split numbers using the identified delimiter
      const numArray = sanitizedNumbers.split(delimiter).map(Number);
  
      // Step 4: Validate and check for negatives
      this.checkForNegatives(numArray);
  
      // Step 5: Sum the valid numbers
      return this.sumNumbers(numArray);
    }
  
    // Helper to check if the string is empty
    isEmpty(str) {
      return str === "";
    }
  
    // Extracts the delimiter from the input string (if custom delimiter exists)
    extractDelimiter(numbers) {
      let delimiter = /,|\n/; // Default delimiter: comma or newline
      let sanitizedNumbers = numbers;
  
      if (numbers.startsWith("//")) {
        const delimiterLine = numbers.match(/\/\/(.+)\n/);
        delimiter = new RegExp(delimiterLine[1]); // Use the custom delimiter
        sanitizedNumbers = numbers.split("\n").slice(1).join("\n"); // Remove the delimiter line
      }
  
      return { delimiter, sanitizedNumbers };
    }
  
    // Throws an error if there are negative numbers in the array
    checkForNegatives(numArray) {
      const negatives = numArray.filter(num => num < 0);
      if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
      }
    }
  
    // Helper to sum all numbers in an array
    sumNumbers(numArray) {
      return numArray.reduce((total, num) => total + num, 0);
    }
  }
  
  // Testing the String Calculator class
  
  const calculator = new StringCalculator();
  
  // Valid test cases
  console.log(calculator.add("")); // Output: 0
  console.log(calculator.add("1")); // Output: 1
  console.log(calculator.add("1,5")); // Output: 6
  console.log(calculator.add("1\n2,3")); // Output: 6
  console.log(calculator.add("//;\n1;2")); // Output: 3
  
  // Invalid input with negative numbers
  try {
    console.log(calculator.add("1,-2,-3")); // Should throw an error
  } catch (e) {
    console.log(e.message); // Output: Negative numbers not allowed: -2, -3
  }  