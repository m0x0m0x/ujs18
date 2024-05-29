/*
Various functions here will be called in other JS files
*/

/* 
Make a write function that prints in color and that will be used for ur headers
*/

// Main header
export function mainHead(headText) {
    console.log(
      `%c 
  ----------------
  ${headText}
  ----------------
            `,
      "color:yellow;font-size:1.2rem"
    );
  }
  
  // Sub Headers
  export function subHead(subText) {
    console.log(
      `%c 
  ${subText}
                `,
      "color:orange;font-size:15px"
    );
  }
  
  // Paragraph lines
  
  export function paraText(paraText) {
    console.log(
      `%c 
  ${paraText}
            `,
      "color:#15F5BA;font-size:13px;font-style:italic "
    );
  }