
const btnEncrypt = document.querySelector('#encrypt');
const btnDecrypt = document.querySelector('#decrypt');
const key = document.querySelector('#key');
const textArea = document.querySelector('#text');
const copyBtn = document.querySelector('#copy');
const downloadBtn = document.querySelector('#download');


const listLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                   'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                   's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

let newText = '';

btnEncrypt.addEventListener('click', () => {
  const textarea = document.querySelector('#text');
  const keyValue = parseInt(key.value);

  if (isNaN(keyValue) || keyValue < 0 || keyValue > 25) {
    alert('Please enter a number within the range 1 to 25 for the key.');
    return; // Exit the function if key is invalid
  }

  newText = '';


  for (let letter of textarea.value) {
    letter = letter.toLowerCase();

    if (!listLetters.includes(letter)) {
      newText += letter;
      continue;
    }

    const indexLetter = listLetters.findIndex((item) => item === letter);
    let indexNewLetter = indexLetter + keyValue;

    if (indexNewLetter > 25) {
      indexNewLetter -= 26;
    }

    newText += listLetters[indexNewLetter];
    
  }
textarea.value = newText;
alert('Encryption successful!'); 

newText = '';
});

btnDecrypt.addEventListener('click', () => {
  const textarea = document.querySelector('#text');
  const keyValue = parseInt(key.value);

  if (isNaN(keyValue) || keyValue < 0 || keyValue > 25) {
    alert('Please enter a number within the range 0 to 25 for the key.');
    return; // Exit the function if key is invalid
  }

  newText = '';

  for (const letter of textarea.value) {
    if (!listLetters.includes(letter)) {
      newText += letter;
      continue;
    }

    const indexLetter = listLetters.findIndex((item) => item === letter);
    let indexNewLetter = indexLetter - keyValue;

    if (indexNewLetter < 0) {
      indexNewLetter += 26;
    }

    newText += listLetters[indexNewLetter];
    textarea.value = newText;
  }
  textarea.value = newText;
  alert('Decryption successful!');

  newText = '';
});


copyBtn.addEventListener('click', () => {
  textArea.select();
  document.execCommand('copy');
  alert('Text copied to clipboard!');
});


downloadBtn.addEventListener('click', () => {
  const blob = new Blob([textArea.value], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'encrypted_or_decrypted_text.txt';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  alert('Text downloaded!');
});