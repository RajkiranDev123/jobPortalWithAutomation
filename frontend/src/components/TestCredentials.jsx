import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
const TestCredentials = () => {
    return (
        <>
            {/*  */}
            <p style={{ fontSize: 12, fontFamily: "monospace", color: "red", display: "flex", alignItems: "center", gap: 3 }}>Employer Test Email :
                <CopyToClipboard text="rajtech645@gmail.com">
                    <span style={{fontSize:11, cursor: "pointer", color: "blue", display: "flex", alignItems: "center"}}> Copy!</span>
                </CopyToClipboard>
            </p>
            <p style={{ fontSize: 12, fontFamily: "monospace", color: "red", display: "flex", alignItems: "center", gap: 3 }}>Employer Test Password :
                <CopyToClipboard text="12345678">
                    <span style={{fontSize:11,  cursor: "pointer", color: "blue", display: "flex", alignItems: "center" }}> Copy!</span>
                </CopyToClipboard>
            </p>
            {/*  */}
            <p style={{color:"grey"}}>------------------</p>

            {/*  */}
            <p style={{ fontSize: 12, fontFamily: "monospace", color: "red", display: "flex", alignItems: "center", gap: 3 }}>Job Seeker Test Email :
                <CopyToClipboard text="rajkir783@gmail.com">
                    <span style={{fontSize:11,  cursor: "pointer", color: "blue", display: "flex", alignItems: "center" }}> Copy!</span>
                </CopyToClipboard>
            </p>
            <p style={{ fontSize: 12, fontFamily: "monospace", color: "red", display: "flex", alignItems: "center", gap: 3 }}>Job Seeker Test Password :
                <CopyToClipboard text="12345678">
                    <span style={{fontSize:11,  cursor: "pointer", color: "blue", display: "flex", alignItems: "center", }}> Copy!</span>
                </CopyToClipboard>
            </p>
       
        </>
    )
}

export default TestCredentials