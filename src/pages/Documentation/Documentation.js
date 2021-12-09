import React, { useEffect, useState } from 'react';
import "./Documentation.css";
import documentationmd from "./Documentation.md";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

function Documentation() {
  // https://stackoverflow.com/questions/65395125/how-to-load-an-md-file-on-build-when-using-create-react-app-and-typescript
  const [md, setMd] = useState("");

  useEffect(() => {
    fetch(documentationmd)
    .then(res => res.text())
    .then(md => setMd(md))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="documentation">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  )
}

export default Documentation
