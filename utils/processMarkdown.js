export const processMarkdown = (text) => {
  // Replace *b*...*b* with <b>...</b>
  text = text.replace(/\*b\*(.*?)\*b\*/g, '<b>$1</b>');

  // Replace *i*...*i* with <i>...</i>
  text = text.replace(/\*i\*(.*?)\*i\*/g, '<i>$1</i>');

  // Replace *u*...*u* with <u>...</u>
  text = text.replace(/\*u\*(.*?)\*u\*/g, '<u>$1</u>');

  // Replace *s*...*s* with <s>...</s>
  text = text.replace(/\*s\*(.*?)\*s\*/g, '<s>$1</s>');

  // Replace *sub*...*sub* with <sub>...</sub>
  text = text.replace(/\*sub\*(.*?)\*sub\*/g, '<sub>$1</sub>');

  // Replace *sup*...*sup* with <sup>...</sup>
  text = text.replace(/\*sup\*(.*?)\*sup\*/g, '<sup>$1</sup>');

  // Replace *small*...*small* with <small>...</small>
  text = text.replace(/\*small\*(.*?)\*small\*/g, '<small>$1</small>');

  // Replace *large*...*large* with css'd span
  text = text.replace(/\*large\*(.*?)\*large\*/g, '<span style="font-size: 1.5rem;">$1</span>');

  // Replace *left*...*left* with css'd div
  text = text.replace(/\*left\*(.*?)\*left\*/g, '<div style="text-align: left;">$1</div>');

  // Replace *right*...*right* with css'd span
  text = text.replace(/\*right\*(.*?)\*right\*/g, '<div style="text-align: right;">$1</div>');

  // Replace *br* with <br>
  text = text.replace(/\*br\*/g, '<br/>');

  return text;
}

export const verifyNesting = (htmlString) => {
  const stack = [];
  const regex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    const tag = match[1];

    //  Make an exception for <br/>
    if(tag === 'br') {
      continue
    }
    if (match[0][1] === '/') {
      // Closing tag encountered
      if (stack.length === 0 || stack[stack.length - 1] !== tag) {
        return false;
      }
      stack.pop();
    } else {
      // Opening tag encountered
      stack.push(tag);
    }
  }

  // If there are any remaining opening tags in the stack, the HTML is not correctly nested
  return stack.length === 0;
}
