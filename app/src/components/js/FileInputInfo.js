
// IMPORT
import Alert from 'react-bootstrap/Alert';

// CODE
// This components shows info about file, which can be inputted
export default function FileInputInfo ( {show} ) {

    return (

        <Alert variant='secondary' show={show}>
            <p>
                - maximum size of file can be <b>100 kB</b>
                <br/>
                - content of the file must be in <b>JSON format</b>
                <br/>
                - file extension is irrelevant 
            </p>
            <hr/>
            <p>
                <b>File content example:</b>
                <br/>
                {`{`}
                <br/>
                &emsp;"directed": true,
                <br/>
                &emsp;"weighted": true,
                <br/>
                &emsp;"nodes": ["0", "1", "2"],
                <br/>
                &emsp;"edges": [
                <br/>
                &emsp;&emsp;{'{'}"source": "0", "target": "1", "weight": 42{'}'},
                <br/>
                &emsp;&emsp;{'{'}"source": "1", "target": "2", "weight": 3.14{'}'}
                <br/>
                &emsp;]
                <br/>
                {`}`}
            </p>
        </Alert>

    );

}