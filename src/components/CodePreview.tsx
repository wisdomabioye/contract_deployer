import React from "react";
import LowLight from "react-lowlight";
import { solidity } from "highlightjs-solidity";
import "highlight.js/styles/stackoverflow-dark.css";
// import "highlight.js/styles/dark.css";
// import "highlight.js/styles/xcode.css";

function CodePreview({ code }: { code: string; }) {
    LowLight.registerLanguage("solidity", solidity);

    return (
        <div className="code-preview" style={{ maxHeight: "500px", overflowY: "scroll" }}>
            <LowLight
                language="solidity"
                value={code} />
        </div>
    );
}

export default CodePreview;