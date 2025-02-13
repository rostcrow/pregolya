
import GraphTag from '../../classes/GraphTag';
import { useState } from 'react';
import FileAlert from './FileAlert';
import JSONValidator from '../../classes/JSONValidator';
import Form from 'react-bootstrap/Form';

const MAX_FILE_SIZE_KB = 500;

export default function FileInput( {changeImportedGraphFunc} ) {

    //States
    const [showFileAlert, setShowFileAlert] = useState(false);
    const [fileAlertHeading, setFileAlertHeading] = useState("");
    const [fileAlertErrorStack, setFileAlertErrorStack] = useState([]);

    //Funcs
    function clearFileInput() {
        document.getElementById("file-input").value = "";
    }

    function invokeFileAlert(heading, errorStack) {
        clearFileInput();
        setFileAlertHeading(heading);
        setFileAlertErrorStack(errorStack);
        setShowFileAlert(true);
    }

    function handleImportFileChange(e) {

        //Closing previous file alert
        setShowFileAlert(false);

        //Getting file
        let file = e.target.files[0];

        //Checking file size
        if (file.size > MAX_FILE_SIZE_KB * 1024) {
            //Too big

            const message = `Maximum size of chosen file can be ${MAX_FILE_SIZE_KB} kB.`;
            invokeFileAlert("File too large", [message]);

            return;
        }

        if (file.size === 0) {
            //Empty

            const message = "Chosen file is empty.";
            invokeFileAlert("Empty file", [message]);

            return;
        }

        //Reading
        var reader = new FileReader();

        reader.onload = function(e) {

            let content = e.target.result;
            let json;    
        
            //Parsing json
            try {
                json = JSON.parse(content);
            } catch (e) {
                //Parsing error

                const message = "Content of chosen file is not JSON format";
                invokeFileAlert("Content not JSON", [message]);
                return;
            }

            //Validating json schema
            const errorsArray = JSONValidator.validate(json);

            if (errorsArray.length !== 0) {
                //Some erros found in schema
                invokeFileAlert("Schema of JSON not valid", errorsArray);
                return;
            }

            //Creating graph tag
            let graphTag;
            try {
                graphTag = new GraphTag(json);
            } catch (e) {
                //Error met
                invokeFileAlert("Graph is illogical", [e.message]);
                return;
            }

            //Successful
            changeImportedGraphFunc(graphTag);
        };

        reader.readAsText(file);

    }

    return (
        <>
            <Form.Group className='mt-2'>
                <Form.Label>or import file</Form.Label>
                <Form.Control id="file-input" type="file" onChange={e => handleImportFileChange(e)}/>
            </Form.Group>
            <FileAlert show={showFileAlert} setShowFunc={setShowFileAlert}
            heading={fileAlertHeading} errorStack={fileAlertErrorStack} />
        </>

    );

}