
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const TestCredentials = () => {
    const [adminEmail, setAdminEmail] = useState(false)
    const [adminPass, setAdminPass] = useState(false)

    const [userEmail, setUserEmail] = useState(false)
    const [userPass, setUserPass] = useState(false)
    return (
        <>
            {/*  */}
            <p style={{ fontSize: 14, fontFamily: "monospace", color: "grey", display: "flex", alignItems: "center", gap: 3 }}>Employer Test Email :
                <CopyToClipboard text="rajtech645@gmail.com">
                    {!adminEmail ? <span onClick={() => setAdminEmail(!adminEmail)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copy!</span>
                        : <span onClick={() => setAdminEmail(!adminEmail)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copied!</span>}
                </CopyToClipboard>
            </p>
            <p style={{ fontSize: 14, fontFamily: "monospace", color: "grey", display: "flex", alignItems: "center", gap: 3 }}>Employer Test Password :
                <CopyToClipboard text="12345678">
                    {!adminPass ? <span onClick={() => setAdminPass(!adminPass)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copy!</span>
                        : <span onClick={() => setAdminPass(!adminPass)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copied!</span>}
                </CopyToClipboard>
            </p>
            {/*  */}
            <p style={{ color: "grey" }}>------------------</p>

            {/*  */}
            <p style={{ fontSize: 14, fontFamily: "monospace", color: "grey", display: "flex", alignItems: "center", gap: 3 }}>Job Seeker Test Email :
                <CopyToClipboard text="rajkir783@gmail.com">
                    {!userEmail ? <span onClick={() => setUserEmail(!userEmail)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copy!</span>
                        : <span onClick={() => setUserEmail(!userEmail)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copied!</span>}
                </CopyToClipboard>
            </p>
            <p style={{ fontSize: 14, fontFamily: "monospace", color: "grey", display: "flex", alignItems: "center", gap: 3 }}>Job Seeker Test Password :
                <CopyToClipboard text="12345678">
                    {!userPass ? <span onClick={() => setUserPass(!userPass)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copy!</span>
                        : <span onClick={() => setUserPass(!userPass)} style={{fontSize:12, cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copied!</span>}
                </CopyToClipboard>
            </p>

        </>
    )
}

export default TestCredentials