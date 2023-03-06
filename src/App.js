import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { marked } from 'marked';
import * as DOMPurify from 'dompurify';

const { useState } = React;
const hljs = require('highlight.js');

marked.setOptions({
  breaks: true,
  highlight: code => hljs.highlightAuto(code).value
});

function App() {
  return <div id="app"><Markdown /></div>
}

function Markdown() {
  const [editorMaxed, setEditorMaxed] = useState(false);
  const [previewerMaxed, setPreviewerMaxed] = useState(false);
  const [text, setText] = useState(defaultText());

  function handleEditorMaxedToggle() {
    setEditorMaxed(!editorMaxed);
  }

  function handlePreviewerMaxedToggle() {
    setPreviewerMaxed(!previewerMaxed);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <Editor 
        text={text}
        maxed={editorMaxed} 
        hidden={previewerMaxed} 
        onMaxedToggle={handleEditorMaxedToggle}
        onTextChange={handleTextChange}
      />
      <Previewer 
        text={text}
        maxed={previewerMaxed} 
        hidden={editorMaxed} 
        onMaxedToggle={handlePreviewerMaxedToggle}
        // onTextChange={handleTextChange}
      />
    </div>
  )
}

function Editor({ text, maxed, hidden, onMaxedToggle, onTextChange }) {
  return (
    <Window windowClass='editor' {...{maxed, hidden}}>
      <Toolbar title='Editor' onMaxedToggle={onMaxedToggle} />
      <textarea id='editor' className="document border shadow" onChange={onTextChange}>{text}</textarea>
    </Window>
  )
}

function Previewer({ text, maxed, hidden, onMaxedToggle }) {
  return (
    <Window windowClass='previewer' {...{maxed, hidden}}>
      <Toolbar title='Previewer' onMaxedToggle={onMaxedToggle} />
      <div id='preview' className="document border shadow" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(text)) }} 
      />
    </Window>
  )
}

// compile to one function
function Window({ windowClass, maxed, hidden, children }) {
  const classNames = require('classnames');
  
  return (
    <div className={classNames(windowClass, "window", { maxed, hidden })}>
      {children}
    </div>
  )
}

function Toolbar({ title, onMaxedToggle }) {
  return (
    <div className='toolbar border shadow'>
      <div>
        <FontAwesomeIcon icon={faFreeCodeCamp}></FontAwesomeIcon>
        <span className="title">{title}</span>
      </div>
      <div className="max-control">
        <FontAwesomeIcon icon={faExpand} onClick={onMaxedToggle}></FontAwesomeIcon>
      </div>
    </div>
  )
}

function defaultText() {
  return `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;
}

export default App;